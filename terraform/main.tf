module "todd" {
  source = "./modules/todd"

  bsc_insights_url = var.bsc_insights_url
  domain           = var.domain
  environment      = var.environment
  my_name          = var.todd_full_name
  name             = var.todd_name
  site_directory   = var.todd_site_directory
  #   web_acl_id     = aws_wafv2_web_acl.this.arn

  tags = var.tags
}