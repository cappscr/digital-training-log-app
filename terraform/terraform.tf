terraform {
  cloud {
    organization = "Digital_Training_Log_App"
    workspaces {
      name = "digital-training-log-app"
    }
  }
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}
