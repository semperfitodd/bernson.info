locals {
  site_domain = var.subdomain != "" ? "${var.subdomain}.${var.domain}" : var.domain
  www_domain  = "www.${var.domain}"

  mime_types = {
    "css"   = "text/css"
    "html"  = "text/html"
    "ico"   = "image/ico"
    "jpg"   = "image/jpeg"
    "js"    = "application/javascript"
    "json"  = "application/json"
    "map"   = "application/octet-stream"
    "png"   = "image/png"
    "svg"   = "image/svg+xml"
    "txt"   = "text/plain"
    "woff"  = "font/woff"
    "woff2" = "font/woff2"
    "xml"   = "application/xml"
  }

  tags = merge(var.tags, {
    site = local.site_domain
  })
}

variable "domain" {
  description = "Root domain name"
  type        = string
}

variable "subdomain" {
  description = "Subdomain prefix. Empty string deploys to the apex domain."
  type        = string
  default     = ""
}

variable "site_directory" {
  description = "Local path to built site files"
  type        = string
}

variable "add_www" {
  description = "Whether to add www subdomain as an alias (only valid for apex domain deployments)"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
}