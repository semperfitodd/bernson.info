# Todd Bernson's Personal Website

## Overview

This repository contains the code and infrastructure for Todd Bernson's personal website. The website is a single-page React application hosted on Amazon S3 and distributed via Amazon CloudFront. It features a daily-updated list of Todd's published articles, fetched using a Lambda function that parses LinkedIn articles and saves the metadata to an S3 bucket.

## Project Structure
```plaintext
├── README.md
└── terraform
├── backend.tf
├── main.tf
├── modules
│   └── site
├── package-lock.json
├── package.json
├── plan.out
├── terraform.tfvars
├── todd-site
│   ├── README.md
│   ├── build
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
├── variables.tf
└── versions.tf
```

## Hosting

The website is hosted on Amazon S3 and served via Amazon CloudFront for improved performance and security.

## Features

- **React.js Frontend**: The frontend is a single-page React application.
- **Daily Article Updates**: A Lambda function runs daily to fetch the latest articles from LinkedIn and updates the S3 bucket.
- **Infrastructure as Code**: The infrastructure is managed using Terraform.

## Installation and Setup

### Prerequisites

- Node.js
- AWS CLI
- Terraform
- Python

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/bernson.info.git
   cd bernson.info
   ```
2.	Install dependencies

    ```bash
    cd terraform/todd-site
    npm install
    ```
## Lambda Function

The Lambda function is responsible for fetching article data from LinkedIn and saving it to an S3 bucket as articles.json.

## Terraform Configuration

### Main Terraform Files

 -	backend.tf: Configures the backend for Terraform state.
 -	main.tf: Main Terraform configuration.
 -	variables.tf: Defines variables used in the Terraform configuration.
 -	versions.tf: Specifies the Terraform version.

### Site Module

The site module contains the configuration for the React application deployment, including S3 bucket and CloudFront distribution.

### Deployment

After setting up the Lambda function and Terraform configuration, deploy the React application by running the build command and uploading the build directory to the S3 bucket.

1.	Build the React application

```bash
npm run build
```
2. Deploy Terraform and application

```bash
terraform init
terraform plan -out=plan.out
terraform apply plan.out 
```