resource "aws_route53_zone" "primary" {
  name = "digitaltraininglog.com"
}

resource "aws_acm_certificate" "cert" {
  domain_name       = "${var.subdomain}.digitaltraininglog.com"
  validation_method = "DNS"

  tags = {
    Name        = "Website-Cert-${var.env}"
    Environment = "${var.env}"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "example" {
  certificate_arn = aws_acm_certificate.cert.arn
}

resource "aws_s3_bucket" "static_website" {
  bucket = "${var.env}.digitaltraininglog.com"

  tags = {
    Name        = "StaticWebsite-${var.env}"
    Environment = var.env
  }
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  default_root_object = "pace-calculator.html"
  is_ipv6_enabled     = true
  wait_for_deployment = true
  price_class         = "PriceClass_100"
  aliases             = ["${var.subdomain}.digitaltraininglog.com"]

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    target_origin_id       = aws_s3_bucket.static_website.id
    viewer_protocol_policy = "redirect-to-https"
  }

  origin {
    domain_name              = aws_s3_bucket.static_website.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
    origin_id                = aws_s3_bucket.static_website.bucket
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "s3-cloudfront-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_iam_policy_document" "cloudfront_oac_access" {
  statement {
    principals {
      identifiers = ["cloudfront.amazonaws.com"]
      type        = "Service"
    }

    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.static_website.arn}/*"]

    condition {
      test     = "StringEquals"
      values   = [aws_cloudfront_distribution.site.arn]
      variable = "AWS:SourceArn"
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.static_website.id
  policy = data.aws_iam_policy_document.cloudfront_oac_access.json
}

resource "aws_route53_record" "site" {
  name    = "${var.subdomain}.digitaltraininglog.com"
  type    = "A"
  zone_id = aws_route53_zone.primary.id

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
  }

  depends_on = [aws_cloudfront_distribution.site]
}
