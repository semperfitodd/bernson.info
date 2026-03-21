locals {
  environment = replace(var.environment, ".", "-")
}

variable "bsc_insights_url" {
  description = "Base URL for the BSC Analytics blog"
  type        = string
}

variable "domain" {
  description = "Root domain name"
  type        = string
}

variable "environment" {
  description = "Environment identifier used in resource naming"
  type        = string
}

variable "my_name" {
  description = "Full name used for Lambda author attribution"
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
