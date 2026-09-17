# Infrastructure

## Domain Name, DNS, SSL

The `digitaltraininglog.com` domain is currently registered through Amazon Route53.

DNS is configured through Cloudflare

- A record for `@` pointed to `192.0.2.0` as a placeholder
- CNAME record for `www` pointed to `@`
- A records for `app` and `dev` pointed to AWS CloudFront CDN

At present there is a Redirect Rule that redirects all traffic to `digitaltraininglog.com` and `www.digitaltraininglog.co` to `app.digitaltraininglog.com`. *Note, this will be removed when the app has a suitable homepage and the hosting has been moved to Netlify.*