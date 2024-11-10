resource "aws_s3_bucket" "static_website" {
  bucket = "digital-training-log-web-${var.env}" # Replace with a globally unique name

  tags = {
    Name        = "StaticWebsite-${var.env}"
    Environment = var.env
  }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.static_website.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable website configuration for the S3 bucket
resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.static_website.id

  index_document {
    suffix = var.index
  }

  error_document {
    key = var.error
  }
}

resource "aws_acm_certificate" "cert" {
  domain_name       = "${var.env}.${var.domain}"
  validation_method = "DNS"

  tags = {
    Environment = var.env
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn = aws_acm_certificate.cert.arn
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "static-website-oac-${var.env}"
  description                       = "OAC for CloudFront to access S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name              = aws_s3_bucket.static_website.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.static_website.id
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = var.index

  default_cache_behavior {
    target_origin_id       = aws_s3_bucket.static_website.id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate_validation.cert.certificate_arn
    ssl_support_method  = "sni-only"
  }

  tags = {
    Name        = "CloudFrontStaticWebsite-${var.env}"
    Environment = var.env
  }
}
