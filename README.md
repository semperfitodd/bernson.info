# bernson.info

Static Next.js personal sites hosted on AWS (S3 + CloudFront + Route53).

## Structure

```
shared/               Shared Next.js base config
todd-site-next/       bernson.info
josephine-site-next/  josephine.bernson.info
terraform/            AWS infrastructure
  modules/site/       Shared CloudFront + S3 + ACM module
  modules/todd/       Todd site + LinkedIn article Lambda
  modules/josephine/  Josephine site
```

## Development

```bash
cd todd-site-next && npm install && npm run dev        # http://localhost:3001
cd josephine-site-next && npm install && npm run dev   # http://localhost:3000
```

## Build & Deploy

```bash
cd todd-site-next && npm run build
cd josephine-site-next && npm run build
cd terraform && terraform init && terraform apply
```

Static output in each site's `out/` directory is uploaded to S3 by Terraform.
