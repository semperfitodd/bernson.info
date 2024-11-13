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

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
secrets_client = boto3.client('secretsmanager')
S3_BUCKET = os.getenv('S3_BUCKET')
AUTHOR = os.getenv('AUTHOR')
BASEURL = os.getenv('BASEURL')
DYNAMO_TABLE = os.getenv('DYNAMO_TABLE')
LINKEDIN_SECRET = os.getenv('LINKEDIN_SECRET')


class LinkedInPoster:
    def __init__(self, access_token, person_id):
        self.access_token = access_token
        self.person_id = person_id
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0"
        }

    def upload_image(self, image_url):
        register_url = "https://api.linkedin.com/v2/assets?action=registerUpload"
        register_payload = {
            "registerUploadRequest": {
                "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
                "owner": f"urn:li:person:{self.person_id}",
                "serviceRelationships": [{
                    "relationshipType": "OWNER",
                    "identifier": "urn:li:userGeneratedContent"
                }]
            }
        }

        response = requests.post(register_url, headers=self.headers, json=register_payload)
        if response.status_code != 200:
            raise Exception(f"Failed to register upload: {response.text}")

        upload_data = response.json()

        image_response = requests.get(image_url)
        if image_response.status_code != 200:
            raise Exception("Failed to download image")

        image_data = image_response.content

        upload_url = \
            upload_data['value']['uploadMechanism']['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'][
                'uploadUrl']
        asset_id = upload_data['value']['asset']

        upload_response = requests.put(
            upload_url,
            data=image_data,
            headers={
                'Authorization': f'Bearer {self.access_token}'
            }
        )

        if upload_response.status_code != 201:
            raise Exception(f"Failed to upload image: {upload_response.text}")

        time.sleep(3)
        return asset_id

    def create_post(self, article, asset_id):
        url = "https://api.linkedin.com/v2/ugcPosts"

        payload = {
            "author": f"urn:li:person:{self.person_id}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": f"New article: {article['title']}\n\nRead time: {article['read_time']}\n\nClick here to read: {article['url']}"
                    },
                    "shareMediaCategory": "IMAGE",
                    "media": [
                        {
                            "status": "READY",
                            "description": {
                                "text": article['title']
                            },
                            "media": asset_id,
                            "title": {
                                "text": article['title']
                            }
                        }
                    ]
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }

        response = requests.post(url, headers=self.headers, json=payload)
        if response.status_code != 201:
            raise Exception(f"Failed to create post: {response.text}")

        return response.json()


def get_linkedin_credentials():
    try:
        logger.info(f"Getting LinkedIn credentials from secret: {LINKEDIN_SECRET}")
        response = secrets_client.get_secret_value(SecretId=LINKEDIN_SECRET)
        secret = json.loads(response['SecretString'])
        logger.info("Successfully retrieved LinkedIn credentials")
        return secret['LINKEDIN_TOKEN'], secret['LINKEDIN_MEMBERID']
    except ClientError as e:
        logger.error(f"Error getting LinkedIn credentials: {str(e)}")
        raise e


def post_to_linkedin(article):
    max_retries = 3
    retry_delay = 2

    for attempt in range(max_retries):
        try:
            logger.info(f"Attempt {attempt + 1}/{max_retries} to post article to LinkedIn: {article['title']}")

            access_token, member_id = get_linkedin_credentials()
            logger.info(f"Successfully retrieved credentials for member ID: {member_id}")

            poster = LinkedInPoster(access_token, member_id)

            logger.info(f"Uploading image from URL: {article['thumbnail']}")
            asset_id = poster.upload_image(article['thumbnail'])
            logger.info(f"Successfully uploaded image. Asset ID: {asset_id}")

            logger.info("Creating LinkedIn post...")
            result = poster.create_post(article, asset_id)
            logger.info(f"Successfully created LinkedIn post. Response: {json.dumps(result, indent=2)}")

            return True

        except Exception as e:
            logger.error(f"Attempt {attempt + 1}/{max_retries} failed: {str(e)}")
            if attempt < max_retries - 1:
                logger.info(f"Waiting {retry_delay} seconds before retry...")
                time.sleep(retry_delay)
                retry_delay *= 2
            else:
                logger.error(f"All attempts failed to post article to LinkedIn: {article['title']}")
                return False


def get_ttl_timestamp():
    return int((datetime.now() + timedelta(days=60)).timestamp())


def check_article_exists(url):
    try:
        table = dynamodb.Table(DYNAMO_TABLE)
        response = table.get_item(
            Key={'url': url}
        )
        return 'Item' in response
    except Exception as e:
        logger.error(f"Error checking DynamoDB: {str(e)}")
        return False


def save_to_dynamodb(article_info):
    try:
        table = dynamodb.Table(DYNAMO_TABLE)

        item = {
            'url': article_info['url'],
            'title': article_info['title'],
            'thumbnail': article_info.get('thumbnail'),
            'read_time': article_info['read_time'],
            'expiry_time': get_ttl_timestamp()
        }

        table.put_item(Item=item)
        logger.info(f"Successfully saved article to DynamoDB with URL: {article_info['url']}")
        return True
    except Exception as e:
        logger.error(f"Error saving to DynamoDB: {str(e)}")
        return False


def calculate_read_time(text):
    WPM = 200
    text = re.sub(r'```.*?```', '', text, flags=re.DOTALL)
    text = re.sub(r'`.*?`', '', text)
    text = re.sub(r'#.*?\n', '', text)
    words = len(text.split())
    minutes = math.ceil(words / WPM)
    return f"{minutes} min read"


def get_article_details(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

        logger.debug(f"Fetching article from {url}")
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            logger.error(f"Failed to fetch article. Status code: {response.status_code}")
            return None

        soup = BeautifulSoup(response.content, 'html.parser')

        title = soup.find('h1')
        title = title.text.strip() if title else url.split('/')[-1].replace('-', ' ').title()

        picture = soup.find('picture')
        if picture and picture.find('img'):
            img = picture.find('img')
            image_url = f"{BASEURL}{img['src']}"
        else:
            image_url = None

        content = soup.find('article')
        read_time = calculate_read_time(content.text) if content else "Unknown"

        article_info = {
            "title": title,
            "thumbnail": image_url,
            "read_time": read_time,
            "url": url
        }

        logger.info(f"Successfully processed article: {url}")
        return article_info

    except Exception as e:
        logger.error(f"Error processing article {url}: {str(e)}")
        logger.exception("Full traceback:")
        return None


def get_author_articles():
    try:
        url = f"{BASEURL}/insights"
        logger.info(f"Attempting to fetch content from {url}")

        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

        response = requests.get(url, headers=headers)
        logger.info(f"Response status code: {response.status_code}")

        if response.status_code != 200:
            logger.error(f"Failed to fetch page. Status code: {response.status_code}")
            return []

        soup = BeautifulSoup(response.content, 'html.parser')

        articles = []
        for h3 in soup.find_all('h3'):
            article_title = h3.text.strip()
            read_more = h3.find_next('p').find('a')
            if read_more and read_more.get('href'):
                url = f"{BASEURL}{read_more['href']}"
                articles.append({
                    'title': article_title,
                    'url': url
                })
                logger.debug(f"Found article: {article_title} at {url}")

        logger.info(f"Found {len(articles)} total articles")

        author_articles = []
        for article in articles:
            article_info = get_article_details(article['url'])
            if article_info:
                author_articles.append(article_info)
                logger.info(f"Found {AUTHOR} article: {article['url']}")
                if len(author_articles) >= 6:
                    break
            time.sleep(1)

        logger.info(f"Total articles by {AUTHOR} found: {len(author_articles)}")
        return author_articles

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        logger.exception("Stack trace:")
        return []


def process_new_articles(articles):
    new_articles = []
    linkedin_results = []

    for article in articles:
        if not check_article_exists(article['url']):
            logger.info(f"\nProcessing new article: {article['title']}")

            if save_to_dynamodb(article):
                new_articles.append(article)

                linkedin_success = post_to_linkedin(article)
                linkedin_results.append({
                    'title': article['title'],
                    'linkedin_posted': linkedin_success
                })

                if linkedin_success:
                    logger.info(f"Successfully posted article to LinkedIn: {article['title']}")
                else:
                    logger.error(f"Failed to post article to LinkedIn: {article['title']}")
            else:
                logger.error(f"Failed to save article to DynamoDB: {article['title']}")

    if new_articles:
        logger.info("\nNEW ARTICLES FOUND:\n" + "=" * 50)
        logger.info(json.dumps(new_articles, indent=2))
        logger.info("\nLINKEDIN POSTING RESULTS:\n" + "=" * 50)
        logger.info(json.dumps(linkedin_results, indent=2))
    else:
        logger.info("\nNo new articles found")

    return {
        'articles': new_articles,
        'linkedin_results': linkedin_results
    }


def lambda_handler(event, context):
    logger.info("Starting Lambda function execution")
    articles = get_author_articles()

    if not articles:
        logger.warning("No articles were found")
        return {"statusCode": 404, "body": json.dumps("No articles found")}

    articles_json = json.dumps(articles, indent=4)

    try:
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key="articles.json",
            Body=articles_json,
            ContentType="application/json"
        )
        logger.info(f"Successfully saved articles.json to {S3_BUCKET}")

        results = process_new_articles(articles)

        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Successfully saved articles.json to S3",
                "new_articles": results['articles'] if results['articles'] else "No new articles found",
                "linkedin_results": results['linkedin_results']
            })
        }
    except Exception as e:
        logger.error(f"Failed to upload articles.json to S3: {str(e)}")
        logger.exception("Full traceback:")
        return {"statusCode": 500, "body": json.dumps("Failed to save articles to S3")}
