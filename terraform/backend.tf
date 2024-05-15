terraform {
  backend "s3" {
    bucket = "bernson.terraform"
    key    = "bernson.info"
    region = "us-east-2"
  }
}
