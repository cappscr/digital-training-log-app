resource "aws_s3_bucket" "static_website" {
  bucket = "${var.env}.digitaltraininglog.com"

  tags = {
    Name        = "StaticWebsite-${var.env}"
    Environment = var.env
  }
}

resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.static_website.id

  index_document {
    suffix = var.index
  }

  error_document {
    key = var.error
  }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.static_website.id

  block_public_acls       = var.public_access_enabled
  block_public_policy     = var.public_access_enabled
  ignore_public_acls      = var.public_access_enabled
  restrict_public_buckets = var.public_access_enabled
}
