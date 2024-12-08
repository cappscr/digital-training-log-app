output "hosted_zone_id" {
  description = "Hosted Zone Id"
  value       = aws_route53_zone.primary.zone_id
}

output "cert_domain" {
  description = "The domain that the SSL certificate is issued for"
  value       = aws_acm_certificate.cert.domain_name
}

output "cert_arn" {
  description = "The arn of the SSL certification issued by Amazon Certificate Manager (ACM)"
  value       = aws_acm_certificate.cert.arn
}
