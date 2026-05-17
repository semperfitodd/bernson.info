import json
import logging
import math
import os
import re
import time
from datetime import datetime, timedelta

import boto3
import requests
from botocore.exceptions import ClientError
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
WORDS_PER_MINUTE = 200
MAX_ARTICLES = 6
TTL_DAYS = 60
LINKEDIN_MAX_RETRIES = 3
LINKEDIN_BASE_RETRY_DELAY = 2

s3_client = boto3.client("s3")
dynamodb = boto3.resource("dynamodb")
secrets_client = boto3.client("secretsmanager")

S3_BUCKET = os.environ["S3_BUCKET"]
AUTHOR = os.environ["AUTHOR"]
BASEURL = os.environ["BASEURL"]
DYNAMO_TABLE = os.environ["DYNAMO_TABLE"]
LINKEDIN_SECRET = os.environ["LINKEDIN_SECRET"]


class LinkedInPoster:
    API_BASE = "https://api.linkedin.com/v2"

    def __init__(self, access_token, person_id):
        self.access_token = access_token
        self.person_id = person_id
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0",
        }

    def upload_image(self, image_url):
        register_payload = {
            "registerUploadRequest": {
                "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
                "owner": f"urn:li:person:{self.person_id}",
                "serviceRelationships": [
                    {
                        "relationshipType": "OWNER",
                        "identifier": "urn:li:userGeneratedContent",
                    }
                ],
            }
        }

        resp = requests.post(
            f"{self.API_BASE}/assets?action=registerUpload",
            headers=self.headers,
            json=register_payload,
            timeout=30,
        )
        resp.raise_for_status()
        upload_data = resp.json()

        image_resp = requests.get(image_url, timeout=30)
        image_resp.raise_for_status()

        upload_mechanism = upload_data["value"]["uploadMechanism"]
        upload_url = upload_mechanism[
            "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
        ]["uploadUrl"]
        asset_id = upload_data["value"]["asset"]

        put_resp = requests.put(
            upload_url,
            data=image_resp.content,
            headers={"Authorization": f"Bearer {self.access_token}"},
            timeout=60,
        )
        if put_resp.status_code != 201:
            raise RuntimeError(f"Image upload failed: {put_resp.status_code}")

        time.sleep(3)
        return asset_id

    def create_post(self, article, asset_id):
        payload = {
            "author": f"urn:li:person:{self.person_id}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": (
                            f"New article: {article['title']}\n\n"
                            f"Read time: {article['read_time']}\n\n"
                            f"Click here to read: {article['url']}"
                        )
                    },
                    "shareMediaCategory": "IMAGE",
                    "media": [
                        {
                            "status": "READY",
                            "description": {"text": article["title"]},
                            "media": asset_id,
                            "title": {"text": article["title"]},
                        }
                    ],
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            },
        }

        resp = requests.post(
            f"{self.API_BASE}/ugcPosts",
            headers=self.headers,
            json=payload,
            timeout=30,
        )
        resp.raise_for_status()
        return resp.json()


def _get_linkedin_credentials():
    logger.info("Retrieving LinkedIn credentials from Secrets Manager")
    try:
        response = secrets_client.get_secret_value(SecretId=LINKEDIN_SECRET)
        secret = json.loads(response["SecretString"])
        return secret["LINKEDIN_TOKEN"], secret["LINKEDIN_MEMBERID"]
    except ClientError:
        logger.exception("Failed to retrieve LinkedIn credentials")
        raise


def _post_to_linkedin(article):
    delay = LINKEDIN_BASE_RETRY_DELAY

    for attempt in range(1, LINKEDIN_MAX_RETRIES + 1):
        try:
            logger.info("LinkedIn post attempt %d/%d: %s", attempt, LINKEDIN_MAX_RETRIES, article["title"])
            access_token, member_id = _get_linkedin_credentials()

            poster = LinkedInPoster(access_token, member_id)
            asset_id = poster.upload_image(article["thumbnail"])
            logger.info("Image uploaded, asset: %s", asset_id)

            poster.create_post(article, asset_id)
            logger.info("LinkedIn post created for: %s", article["title"])
            return True

        except Exception:
            logger.exception("LinkedIn post attempt %d failed", attempt)
            if attempt < LINKEDIN_MAX_RETRIES:
                time.sleep(delay)
                delay *= 2

    logger.error("All LinkedIn post attempts exhausted for: %s", article["title"])
    return False


def _ttl_timestamp():
    return int((datetime.now() + timedelta(days=TTL_DAYS)).timestamp())


def _article_exists(url):
    table = dynamodb.Table(DYNAMO_TABLE)
    try:
        return "Item" in table.get_item(Key={"url": url})
    except ClientError:
        logger.exception("DynamoDB lookup failed for %s", url)
        return False


def _save_article(article):
    table = dynamodb.Table(DYNAMO_TABLE)
    try:
        table.put_item(
            Item={
                "url": article["url"],
                "title": article["title"],
                "thumbnail": article.get("thumbnail"),
                "read_time": article["read_time"],
                "expiry_time": _ttl_timestamp(),
            }
        )
        logger.info("Saved to DynamoDB: %s", article["url"])
        return True
    except ClientError:
        logger.exception("DynamoDB save failed for %s", article["url"])
        return False


def _calculate_read_time(text):
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
    text = re.sub(r"`.*?`", "", text)
    text = re.sub(r"#.*?\n", "", text)
    minutes = math.ceil(len(text.split()) / WORDS_PER_MINUTE)
    return f"{minutes} min read"


def _fetch_page(url):
    resp = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=30)
    resp.raise_for_status()
    return BeautifulSoup(resp.content, "html.parser")


def _get_article_details(url):
    try:
        soup = _fetch_page(url)

        h1 = soup.find("h1")
        title = h1.text.strip() if h1 else url.split("/")[-1].replace("-", " ").title()

        picture = soup.find("picture")
        thumbnail = None
        if picture and picture.find("img"):
            thumbnail = f"{BASEURL}{picture.find('img')['src']}"

        content = soup.find("article")
        read_time = _calculate_read_time(content.text) if content else "Unknown"

        return {"title": title, "thumbnail": thumbnail, "read_time": read_time, "url": url}

    except Exception:
        logger.exception("Failed to fetch article details: %s", url)
        return None


def _get_author_articles():
    try:
        soup = _fetch_page(f"{BASEURL}/insights")
    except Exception:
        logger.exception("Failed to fetch insights page")
        return []

    articles = []
    for h3 in soup.find_all("h3"):
        read_more = h3.find_next("p")
        if not read_more:
            continue
        link = read_more.find("a")
        if not link or not link.get("href"):
            continue

        article_url = f"{BASEURL}{link['href']}"
        details = _get_article_details(article_url)
        if details:
            articles.append(details)
            logger.info("Found article: %s", article_url)
            if len(articles) >= MAX_ARTICLES:
                break
        time.sleep(1)

    logger.info("Total articles found: %d", len(articles))
    return articles


def _process_new_articles(articles):
    new_articles = []
    linkedin_results = []

    for article in articles:
        if _article_exists(article["url"]):
            continue

        logger.info("Processing new article: %s", article["title"])
        if not _save_article(article):
            continue

        new_articles.append(article)
        posted = _post_to_linkedin(article)
        linkedin_results.append({"title": article["title"], "linkedin_posted": posted})

    logger.info("New articles processed: %d", len(new_articles))
    return {"articles": new_articles, "linkedin_results": linkedin_results}


def lambda_handler(event, context):
    logger.info("Lambda execution started")

    articles = _get_author_articles()
    if not articles:
        logger.warning("No articles found")
        return {"statusCode": 404, "body": json.dumps({"message": "No articles found"})}

    try:
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key="articles.json",
            Body=json.dumps(articles, indent=2),
            ContentType="application/json",
        )
        logger.info("Uploaded articles.json to s3://%s", S3_BUCKET)
    except ClientError:
        logger.exception("S3 upload failed")
        return {"statusCode": 500, "body": json.dumps({"message": "S3 upload failed"})}

    results = _process_new_articles(articles)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": f"Saved {len(articles)} articles to S3",
            "new_articles": results["articles"],
            "linkedin_results": results["linkedin_results"],
        }),
    }
