variable "aws_region" {
  description = "AWS region to deploy resources"
  default     = "us-east-1" # Specify your region
}

variable "env" {
  description = "Environment (e.g., dev, staging, prod)"
  type        = string
}
