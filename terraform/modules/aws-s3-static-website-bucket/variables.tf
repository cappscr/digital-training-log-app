variable "env" {
  description = "Environment (e.g., dev, staging, prod)"
  type        = string
}

variable "domain" {
  description = "The domain name to use for the static site"
  type        = string
  default     = "digitaltraininglog.com"
}

variable "index" {
  description = "Index page to be utilized in the website configuration for the S3 bucket"
  type        = string
  default     = "index.html"
}

variable "error" {
  description = "Default error page to be utilized in the website configuration for the S3 bucket"
  type        = string
  default     = "error.html"
}
