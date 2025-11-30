output "cluster_name" {
  value = module.eks.cluster_name
}

output "alb_dns_name" {
  value = aws_lb.app_alb.dns_name
}

