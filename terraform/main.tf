resource "aws_route53_zone" "primary" {
  name = "digitaltraininglog.com"
}

module "website_s3_bucket" {
  source = "./modules/aws-s3-static-website-bucket"

  env   = var.env
  error = "404.html"
}

resource "aws_route53_record" "website" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "${var.env}.example.com" # Will create dev.example.com, staging.example.com, etc.
  type    = "CNAME"
  ttl     = 300

  records = [aws_cloudfront_distribution.website.domain_name]

  depends_on = [aws_cloudfront_distribution.website]
}
