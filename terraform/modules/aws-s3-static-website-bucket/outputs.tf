# Output variable definitions

output "arn" {
  description = "ARN of the bucket"
  value       = aws_s3_bucket.static_website.arn
}

output "name" {
  description = "Name (id) of the bucket"
  value       = aws_s3_bucket.static_website.id
}

output "bucket_regional_domain_name" {
  description = "Domain name of the bucket"
  value       = aws_s3_bucket.static_website.bucket_regional_domain_name
}

output "domain" {
  description = "Domain name of the bucket"
  value       = aws_s3_bucket_website_configuration.site.website_domain
}

output "cloudfront_endpoint" {
  description = "Cloudfront endpoint"
  value       = aws_cloudfront_distribution.website.domain_name
}
