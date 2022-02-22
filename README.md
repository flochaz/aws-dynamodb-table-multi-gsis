# @aws-cdk/aws-dynamodb + multi GSIs update capability


This construct is fixing https://github.com/aws/aws-cdk/issues/12246 by simply overriding [@aws-cdk/aws-dynamodb Table addGlobalSecondaryIndex](https://github.com/aws/aws-cdk/blob/master/packages/%40aws-cdk/aws-dynamodb/lib/table.ts#L1231) which will leverage the [@aws-cdk/custom-resource Provider](https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html) to sequentially create Global GSIs.