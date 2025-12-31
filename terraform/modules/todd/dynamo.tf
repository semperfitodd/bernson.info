resource "aws_dynamodb_table" "article_table" {
  name         = "${var.name}-${local.environment}-articles-state"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "url"

  attribute {
    name = "url"
    type = "S"
  }

  ttl {
    enabled        = true
    attribute_name = "expiry_time"
  }

  tags = local.tags
}