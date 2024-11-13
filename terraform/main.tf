locals {
  site = {
    todd = {
      bsc_insights_url = var.bsc_insights_url
      domain           = var.domain
      environment      = var.environment
      my_name          = "Todd Bernson"
      site_directory   = "./NAME-site/build"
    }
    # josephine = {
    #   bsc_insights_url = var.bsc_insights_url
    #   domain           = var.domain
    #   environment      = var.environment
    #   my_name          = "Josephine Bernson"
    #   site_directory   = "./NAME-site/build"
    # }
  }
}

module "site" {
  source   = "./modules/site"
  for_each = local.site

  bsc_insights_url = each.value.bsc_insights_url
  domain           = each.value.domain
  environment      = each.value.environment
  my_name          = each.value.my_name
  name             = each.key
  site_directory   = replace(each.value.site_directory, "NAME", each.key)
  #   web_acl_id     = aws_wafv2_web_acl.this.arn

  tags = var.tags
}