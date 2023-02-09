terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }

  backend "s3" {
    bucket = "fastfastnews-system"
    key    = "prod/terraform.tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  access_key = "AKIA4SEPNJOPIQD4LUNX"
  secret_key = "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"
  region = "eu-central-1"
}
