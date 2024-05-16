locals {
  lambda_directory = "lambda"
}
module "lambda_function_linkedin" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "${var.name}-${local.environment}-linkedin"
  description   = "${var.name}-${local.environment} function to get LinkedIn articles"
  handler       = "app.lambda_handler"
  publish       = true
  runtime       = "python3.11"
  timeout       = 30

  environment_variables = {
    S3_BUCKET = module.site_s3_bucket.s3_bucket_id
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
    s3 = {
      effect  = "Allow",
      actions = ["s3:*"],
      resources = [
        module.site_s3_bucket.s3_bucket_arn,
        "${module.site_s3_bucket.s3_bucket_arn}/*",
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