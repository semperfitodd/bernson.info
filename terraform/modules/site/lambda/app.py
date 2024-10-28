from bs4 import BeautifulSoup
import boto3
import json
import logging
import math
import os
import re
import requests
import time

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

s3_client = boto3.client('s3')
S3_BUCKET = os.getenv('S3_BUCKET')
AUTHOR = os.getenv('AUTHOR')
BASEURL = os.getenv('BASEURL')


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
        return {"statusCode": 200, "body": json.dumps("Successfully saved articles.json to S3")}
    except Exception as e:
        logger.error(f"Failed to upload articles.json to S3: {str(e)}")
        logger.exception("Full traceback:")
        return {"statusCode": 500, "body": json.dumps("Failed to save articles to S3")}
