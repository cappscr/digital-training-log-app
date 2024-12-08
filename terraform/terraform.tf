terraform {
  cloud {
    organization = "Digital_Training_Log_App"
  }
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}
