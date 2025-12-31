# bernson.info

Personal websites for the Bernson family, hosted on AWS with Terraform infrastructure.

## Sites

- **todd.bernson.info**: Professional site with LinkedIn article integration
- **josephine.bernson.info**: Executive leadership portfolio

## Infrastructure

React frontends hosted on S3 and served via CloudFront. Infrastructure managed with Terraform.

## Development

```bash
cd todd-site  # or josephine-site
npm install
npm start
```

## Deployment

```bash
cd terraform
terraform init
terraform plan -out=plan.out
terraform apply plan.out
```

## Configuration

- Terraform variables: `terraform/terraform.tfvars`
- LinkedIn token: AWS Secrets Manager
- Token generation: https://www.linkedin.com/developers/tools/oauth/token-generator
