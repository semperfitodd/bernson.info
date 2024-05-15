locals {
  site = {
    todd = {
      domain      = var.domain
      environment = var.environment
      site_directory = "./NAME-site/build"
    }
  }
}

module "site" {
  source   = "./modules/site"
  for_each = local.site

  domain         = each.value.domain
  environment    = each.value.environment
  name           = each.key
  site_directory = replace(each.value.site_directory, "NAME", each.key)

  tags = var.tags
}