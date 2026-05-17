provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Owner       = var.todd_name
      Provisioner = "Terraform"
    }
  }
}
