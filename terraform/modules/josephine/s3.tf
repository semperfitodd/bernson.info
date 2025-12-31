data "aws_iam_policy_document" "site" {
  statement {
    effect = "Allow"
    principals {
      identifiers = ["cloudfront.amazonaws.com"]
      type        = "Service"
    }
    actions   = ["s3:GetObject"]
    resources = ["${module.site_s3_bucket.s3_bucket_arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [module.cdn.cloudfront_distribution_arn]
    }
  }
}

module "site_s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "5.9.1"

  bucket = local.site_domain

  attach_public_policy = true
  attach_policy        = true
  policy               = data.aws_iam_policy_document.site.json

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

  control_object_ownership = true
  object_ownership         = "BucketOwnerPreferred"

  expected_bucket_owner = data.aws_caller_identity.current.account_id

  server_side_encryption_configuration = {
    rule = {
      apply_server_side_encryption_by_default = {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = local.tags
}

resource "aws_s3_object" "website-object" {
  for_each = fileset(var.site_directory, "**/*")

  bucket       = module.site_s3_bucket.s3_bucket_id
  key          = each.value
  source       = "${var.site_directory}/${each.value}"
  etag         = filemd5("${var.site_directory}/${each.value}")
  content_type = lookup(local.mime_types, split(".", each.value)[length(split(".", each.value)) - 1])

  tags = var.tags
}