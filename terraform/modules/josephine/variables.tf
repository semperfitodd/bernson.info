variable "domain" {
  description = "Root domain name"
  type        = string
}

variable "name" {
  description = "Short name identifier used in resource naming"
  type        = string
}

variable "site_directory" {
  description = "Local path to the built site files"
  type        = string
}

variable "tags" {
  description = "Tags applied to all resources"
  type        = map(string)
}
