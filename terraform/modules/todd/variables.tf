locals {
  environment = replace(var.environment, ".", "-")

  mime_types = {
    "css"  = "text/css"
    "html" = "text/html"
    "ico"  = "image/ico"
    "jpg"  = "image/jpeg"
    "js"   = "application/javascript"
    "json" = "application/json"
    "map"  = "application/octet-stream"
    "png"  = "image/png"
    "svg"  = "image/svg+xml"
    "txt"  = "text/plain"
    "xml"  = "application/xml"
  }

  site_domain = "${var.name}.${var.domain}"

  tags = merge(var.tags, {
    site = local.site_domain
  })
}

variable "bsc_insights_url" {
  description = "Base URL for BSC Blog"
  type        = string
}

variable "domain" {
  description = "Domain"
  type        = string
}

variable "environment" {
  description = "Environment all resources will be built"
  type        = string
}

variable "my_name" {
  description = "My full name"
  type        = string
}

variable "name" {
  description = "First name"
  type        = string
}

variable "site_directory" {
  description = "local location of site build"
  type        = string
}

variable "tags" {
  description = "Tags to be applied to resources"
  type        = map(string)
}

# variable "web_acl_id" {
#   description = "WAF ARN"
#   type        = string
# }
