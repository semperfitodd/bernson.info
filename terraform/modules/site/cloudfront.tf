resource "aws_cloudfront_function" "www_redirect" {
  name    = "${replace(local.site_domain, ".", "-")}-www-redirect"
  runtime = "cloudfront-js-2.0"
  publish = true

  code = <<-EOF
    function handler(event) {
      var request = event.request;
      var host = request.headers.host.value;
      if (host.startsWith('www.')) {
        return {
          statusCode: 301,
          statusDescription: 'Moved Permanently',
          headers: {
            location: { value: 'https://' + host.slice(4) + request.uri }
          }
        };
      }
      return request;
    }
  EOF
}

resource "aws_cloudfront_response_headers_policy" "security" {
  name = "${replace(local.site_domain, ".", "-")}-security-headers"

  security_headers_config {
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }

    content_type_options {
      override = true
    }

    frame_options {
      frame_option = "SAMEORIGIN"
      override     = true
    }

    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }

    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }
  }
}

module "cdn" {
  source  = "terraform-aws-modules/cloudfront/aws"
  version = "6.4.0"

  depends_on = [aws_acm_certificate_validation.this]

  aliases = var.add_www ? [local.site_domain, local.www_domain] : [local.site_domain]

  comment             = "${local.site_domain} Site CDN"
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  retain_on_delete    = false
  wait_for_deployment = false

  default_root_object = "index.html"

  origin_access_control = {
    (local.site_domain) = {
      description      = "Site Bucket Access Control"
      origin_type      = "s3"
      signing_behavior = "always"
      signing_protocol = "sigv4"
    }
  }

  origin = {
    s3_one = {
      domain_name               = module.site_s3_bucket.s3_bucket_bucket_domain_name
      origin_access_control_key = local.site_domain
    }
  }

  default_cache_behavior = {
    target_origin_id           = "s3_one"
    viewer_protocol_policy     = "redirect-to-https"
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    query_string    = true

    function_association = {
      "viewer-request" = {
        function_arn = aws_cloudfront_function.www_redirect.arn
      }
    }
  }

  custom_error_response = [
    {
      error_code         = 403
      response_code      = 404
      response_page_path = "/404.html"
    },
    {
      error_code         = 404
      response_code      = 404
      response_page_path = "/404.html"
    },
  ]

  viewer_certificate = {
    acm_certificate_arn = aws_acm_certificate.this.arn
    ssl_support_method  = "sni-only"
  }

  tags = var.tags
}

resource "aws_acm_certificate" "this" {
  domain_name               = local.site_domain
  subject_alternative_names = var.add_www ? [local.www_domain] : []
  validation_method         = "DNS"

  tags = merge(var.tags, { Name = local.site_domain })

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "verify" {
  for_each = {
    for dvo in aws_acm_certificate.this.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.this.zone_id
}

resource "aws_acm_certificate_validation" "this" {
  certificate_arn         = aws_acm_certificate.this.arn
  validation_record_fqdns = [for record in aws_route53_record.verify : record.fqdn]
}
