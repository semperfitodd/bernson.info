module "todd" {
  source = "./modules/todd"

  bsc_insights_url = var.bsc_insights_url
  domain           = var.domain
  environment      = var.environment
  my_name          = var.todd_full_name
  name             = var.todd_name
  site_directory   = var.todd_site_directory

  tags = var.tags
}

module "josephine" {
  source = "./modules/josephine"

  domain           = var.domain
  name             = var.josephine_name
  site_directory   = var.josephine_site_directory

  tags = var.tags
}
