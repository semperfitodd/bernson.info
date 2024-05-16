import json
import os
import boto3
import requests
from bs4 import BeautifulSoup

s3 = boto3.client('s3')

# Define your S3 bucket name here
BUCKET_NAME = os.environ.get('S3_BUCKET')

# Read article URLs from a text file
def load_article_urls(file_path):
    with open(file_path, 'r') as file:
        urls = file.read().splitlines()
    return urls

def fetch_article_data(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        title = soup.find('meta', property='og:title')['content'].replace('\n', ' ')
        thumbnail = soup.find('meta', property='og:image')['content']
        read_time = '3 min read'  # Placeholder for read time

        return {'title': title, 'thumbnail': thumbnail, 'read_time': read_time, 'url': url}
    except Exception as e:
        print(f"Error fetching article data from {url}: {e}")
        return None

def save_articles_to_s3(articles_data):
    file_name = 'articles.json'
    file_content = json.dumps(articles_data, indent=4)
    s3.put_object(Bucket=BUCKET_NAME, Key=file_name, Body=file_content)
    print(f"Article data saved to s3://{BUCKET_NAME}/{file_name}")

def lambda_handler(event, context):
    article_urls = load_article_urls('article_urls.txt')
    articles_data = []

    for url in article_urls:
        article_data = fetch_article_data(url)
        if article_data:
            articles_data.append(article_data)

    save_articles_to_s3(articles_data)

    return {
        'statusCode': 200,
        'body': json.dumps('Article data successfully saved to S3')
    }

if __name__ == "__main__":
    article_urls = load_article_urls('article_urls.txt')
    articles_data = []

    for url in article_urls:
        article_data = fetch_article_data(url)
        if article_data:
            articles_data.append(article_data)

    # Print articles to console (for local testing)
    print(json.dumps(articles_data, indent=4))
