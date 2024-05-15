data "aws_caller_identity" "current" {}

data "aws_route53_zone" "this" {
  name = var.domain

  private_zone = false
}