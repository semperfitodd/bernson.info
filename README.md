# Bernson Family Sites

Next.js static sites with SEO optimization.

## Structure

```
josephine-site-next/  - Josephine Bernson professional site
todd-site-next/       - Todd Bernson professional site
terraform/            - AWS infrastructure
```

## Build

```bash
cd josephine-site-next && npm install && npm run build
cd todd-site-next && npm install && npm run build
```

## Deploy

Static output in each site's `out/` directory. Upload to S3 or static hosting.

## Features

- Next.js 14 App Router
- Static site generation
- SEO metadata (Open Graph, Twitter Cards)
- Dynamic sitemaps
- Mobile responsive
