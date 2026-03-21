output "cloudfront_arn" {
  value = module.cdn.cloudfront_distribution_arn
}

output "s3_bucket_id" {
  value = module.site_s3_bucket.s3_bucket_id
}

output "s3_bucket_arn" {
  value = module.site_s3_bucket.s3_bucket_arn
}