module "site" {
  source = "../site"

  add_www        = true
  domain         = var.domain
  subdomain      = ""
  site_directory = var.site_directory
  tags           = var.tags
}
