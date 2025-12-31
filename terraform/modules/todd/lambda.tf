locals {
  lambda_directory = "lambda"
}

module "lambda_function_linkedin" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "8.1.2"

  description   = "${var.name}-${local.environment} function to get LinkedIn articles"
  function_name = "${var.name}-${local.environment}-linkedin"
  handler       = "app.lambda_handler"
  memory_size   = 128
  publish       = true
  runtime       = "python3.11"
  timeout       = 60

  environment_variables = {
    AUTHOR          = var.my_name
    BASEURL         = var.bsc_insights_url
    DYNAMO_TABLE    = aws_dynamodb_table.article_table.name
    LINKEDIN_SECRET = aws_secretsmanager_secret.linkedin_token.name
    S3_BUCKET       = module.site_s3_bucket.s3_bucket_id
  }

  source_path = [
    {
      path             = "${path.module}/${local.lambda_directory}"
      pip_requirements = true
    }
  ]

  attach_policies = true
  policies        = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]

  attach_policy_statements = true
  policy_statements = {
    dynamodb = {
      effect    = "Allow",
      actions   = ["dynamodb:*"]
      resources = [aws_dynamodb_table.article_table.arn]
    }
    s3_bucket = {
      effect    = "Allow",
      actions   = ["s3:ListBucket"]
      resources = [module.site_s3_bucket.s3_bucket_arn]
    }
    s3_object = {
      effect = "Allow",
      actions = [
        "s3:PutObject",
        "s3:GetObject",
      ]
      resources = ["${module.site_s3_bucket.s3_bucket_arn}/*"]
    }
    secrets = {
      effect  = "Allow",
      actions = ["secretsmanager:*"]
      resources = [
        aws_secretsmanager_secret.linkedin_token.arn,
        aws_secretsmanager_secret_version.linkedin_token_value.arn
      ]
    }
  }

  cloudwatch_logs_retention_in_days = 3

  tags = var.tags
}

resource "aws_cloudwatch_event_rule" "daily_trigger" {
  name                = "${var.name}-${local.environment}-linkedin-daily-trigger"
  description         = "Daily trigger for LinkedIn articles Lambda function"
  schedule_expression = "rate(1 day)"
}

resource "aws_cloudwatch_event_target" "lambda_target" {
  rule      = aws_cloudwatch_event_rule.daily_trigger.name
  target_id = "lambda"
  arn       = module.lambda_function_linkedin.lambda_function_arn
}

resource "aws_lambda_permission" "allow_cloudwatch" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_function_linkedin.lambda_function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.daily_trigger.arn
}