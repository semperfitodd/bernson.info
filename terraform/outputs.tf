output "gha_secret_aws_role_arn" {
  description = "GitHub Secret: AWS_ROLE_ARN"
  value       = aws_iam_role.github_actions.arn
}

output "gha_var_aws_region" {
  description = "GitHub Variable: AWS_REGION"
  value       = var.region
}

output "gha_var_s3_bucket" {
  description = "GitHub Variable: S3_BUCKET"
  value       = module.site_s3_bucket.s3_bucket_id
}

output "gha_var_cloudfront_distribution_id" {
  description = "GitHub Variable: CLOUDFRONT_DISTRIBUTION_ID"
  value       = module.cdn.cloudfront_distribution_id
}
