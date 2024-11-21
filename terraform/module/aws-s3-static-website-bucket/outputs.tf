# Output variable definitions

output "arn" {
  description = "ARN of the bucket"
  value       = aws_s3_bucket.static_website.arn
}

output "name" {
  description = "Name (id) of the bucket"
  value       = aws_s3_bucket.static_website.id
}

output "domain" {
  description = "Domain name of the bucket"
  value       = aws_s3_bucket_website_configuration.site.website_domain
}

output "hosted_zone_id" {
  description = "Domain name of the bucket"
  value       = aws_s3_bucket.static_website.hosted_zone_id
}

output "public_access_block" {
  description = "The public access block of the bucket"
  value       = aws_s3_bucket_public_access_block.site
}
