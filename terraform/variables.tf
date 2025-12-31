variable "bsc_insights_url" {
  description = "Base URL for BSC Blog"
  type        = string

  validation {
    condition     = can(regex("^https?://", var.bsc_insights_url))
    error_message = "The bsc_insights_url must be a valid URL starting with http:// or https://."
  }
}

variable "domain" {
  description = "Root domain name"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\\.[a-z]{2,}$", var.domain))
    error_message = "The domain must be a valid domain name (e.g., example.com)."
  }
}

variable "environment" {
  description = "Environment identifier for resources"
  type        = string

  validation {
    condition     = length(var.environment) > 0 && length(var.environment) <= 64
    error_message = "The environment must be between 1 and 64 characters."
  }
}

variable "josephine_name" {
  description = "Subdomain/site identifier (e.g., 'josephine' for josephine.domain.com)"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$", var.josephine_name))
    error_message = "The name must be a valid subdomain (lowercase alphanumeric and hyphens only, 3-63 characters)."
  }
}

variable "josephine_site_directory" {
  description = "Local path to the built site files"
  type        = string

  validation {
    condition     = length(var.josephine_site_directory) > 0
    error_message = "The site_directory cannot be empty."
  }
}

variable "region" {
  description = "AWS Region where resources will be deployed"
  type        = string

  validation {
    condition     = can(regex("^[a-z]{2}-[a-z]+-[0-9]{1}$", var.region))
    error_message = "The region must be a valid AWS region (e.g., us-east-1, eu-west-2)."
  }
}

variable "tags" {
  description = "Common tags to be applied to all resources"
  type        = map(string)
  default     = {}

  validation {
    condition     = alltrue([for k, v in var.tags : length(k) <= 128 && length(v) <= 256])
    error_message = "Tag keys must be 128 characters or less, and values must be 256 characters or less."
  }
}

variable "todd_full_name" {
  description = "Full name for site attribution"
  type        = string

  validation {
    condition     = length(var.todd_full_name) > 0 && length(var.todd_full_name) <= 100
    error_message = "The my_name must be between 1 and 100 characters."
  }
}

variable "todd_name" {
  description = "Subdomain/site identifier (e.g., 'todd' for todd.domain.com)"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$", var.todd_name))
    error_message = "The name must be a valid subdomain (lowercase alphanumeric and hyphens only, 3-63 characters)."
  }
}

variable "todd_site_directory" {
  description = "Local path to the built site files"
  type        = string

  validation {
    condition     = length(var.todd_site_directory) > 0
    error_message = "The site_directory cannot be empty."
  }
}
