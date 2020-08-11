# Static Sites CDN #
This is an AWS CloudFront content delivery network for the static websites
in my portfolio. All the subdomains in my portfolio route to a single
CloudFront distribution and two LambdaEdge functions route requests 
to the correct path in a single S3 Bucket. Website deployments are managed 
by this [custom pipeline](https://github.com/jmartin432/static-sites-pipeline).

# Technologies Used:
* AWS CloudFormation (for building the stack of resources)
* AWS CloudFront (for managing CDN)
* AWS Route53 (for managing DNS records)
* AWS S3 (for hosting static websites and deploying Lambda functions)
* AWS EdgeLambda (for routing CDN requests)
* AWS IAM (Identity Access Management, for managing roles and access policies)
* AWS CloudWatch (for logging)
* AWS Custom Resources (for publishing Lambda versions)
* Python3.8
* YAML
* Mocha/Chai (for testing)
