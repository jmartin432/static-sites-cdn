

## Static Sites CDN ##
This is AWS CloudFront Distribution Network for the statics sites in 
my portfolio. All the subdomains in my portfolio route to a single
CloudFront Distribution and 2 LambdaEdge Functions route the request 
to the correct path in a single S3 Bucket.

The CloudFormation Template creates the following resources:
* S3 Bucket for deploying Lambdas
* S3 Bucket for static site resources
* Cloud Front Origin Access Identity granting access to the S3 Bucket
* A Bucket Read Policy for the CDN
* A Lambda Execution Role granting access to CLoudWatch logs and S3 Bucket
* CloudFront Distribution
* Two Lambda Edge Functions for altering CloudFront Requests
* Versions for each of the Lambda functions
* DNS Records for subdomains

Unit Tests are done with in Mocha/Chai
