module "site" {
  source = "../site"

  domain         = var.domain
  subdomain      = var.name
  site_directory = var.site_directory
  tags           = var.tags
}
