terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      # Pinning the AWS provider to a version that supports
      # the blocks used by EKS module 20.8.5 (e.g., < 4.0.0)
    
    }
  }


}
