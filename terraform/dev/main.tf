module "website_s3_bucket" {
  source = "../module/aws-s3-static-website-bucket"

  env   = var.env
  error = "404.html"
}

resource "aws_s3_bucket_ownership_controls" "dev" {
  bucket = module.website_s3_bucket.name

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "dev" {
  depends_on = [
    aws_s3_bucket_ownership_controls.dev,
    module.website_s3_bucket.public_access_block,
  ]

  bucket = module.website_s3_bucket.name

  acl = "public-read"
}

resource "aws_s3_bucket_policy" "dev" {
  depends_on = [aws_s3_bucket_acl.dev]

  bucket = module.website_s3_bucket.name
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "PublicReadGetObject",
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : [
          "s3:GetObject"
        ],
        "Resource" : [
          "arn:aws:s3:::${module.website_s3_bucket.name}/*"
        ]
      }
    ]
  })
}

module "aws_route53_zone" {
  source = "../module/dns-hosted-zone"
}

resource "aws_route53_record" "website" {
  zone_id = module.aws_route53_zone.zone_id
  name    = "${var.env}.digitaltraininglog.com"
  type    = "A"

  alias {
    name                   = module.website_s3_bucket.domain
    zone_id                = module.website_s3_bucket.hosted_zone_id
    evaluate_target_health = false
  }

  depends_on = [module.website_s3_bucket.website]
}
