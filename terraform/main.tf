locals {
  environment = replace(var.environment, ".", "-")
  site_domain = var.domain
  www_domain  = "www.${var.domain}"
}

data "aws_route53_zone" "this" {
  name         = var.domain
  private_zone = false
}
