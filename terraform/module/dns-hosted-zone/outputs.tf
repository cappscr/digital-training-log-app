output "zone_id" {
  description = "Hosted Zone Id"
  value       = aws_route53_zone.primary.zone_id
}
