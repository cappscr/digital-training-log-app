module "website_s3_bucket" {
  source = "./modules/aws-s3-static-website-bucket"

  env   = var.env
  error = "404.html"
}
