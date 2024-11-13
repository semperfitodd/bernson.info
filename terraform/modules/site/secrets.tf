resource "aws_secretsmanager_secret" "linkedin_token" {
  name = "${var.name}-${local.environment}-linkedin"

  tags = local.tags
}

resource "aws_secretsmanager_secret_version" "linkedin_token_value" {
  secret_id = aws_secretsmanager_secret.linkedin_token.id
  secret_string = jsonencode(
    {
      LINKEDIN_MEMBERID = ""
      LINKEDIN_TOKEN    = ""
    }
  )

  lifecycle {
    ignore_changes = [secret_string]
  }
}