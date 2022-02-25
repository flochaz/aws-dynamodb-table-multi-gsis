# @aws-cdk/aws-dynamodb + multi GSIs update capability


This construct is fixing https://github.com/aws/aws-cdk/issues/12246 by simply overriding [@aws-cdk/aws-dynamodb Table addGlobalSecondaryIndex](https://github.com/aws/aws-cdk/blob/master/packages/%40aws-cdk/aws-dynamodb/lib/table.ts#L1231) which will leverage the [@aws-cdk/custom-resource Provider](https://docs.aws.amazon.com/cdk/api/v1/docs/custom-resources-readme.html) to sequentially create Global GSIs.

## Usage

Use `@aws-cdk/aws-dynamodb` as usual except for `Table` that needs to come from `aws-dynamodb-table-multi-gsis` :


```typescript
import { AttributeType, BillingMode } from '@aws-cdk/aws-dynamodb';
import * as cdk from '@aws-cdk/core';

// Import the new version of Table
import { Table } from 'aws-dynamodb-table-multi-gsis';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'integ-dynamodb-table');

const testTable = new Table(stack, 'TestTable', {
  partitionKey: { name: 'id', type: AttributeType.STRING },
  billingMode: BillingMode.PAY_PER_REQUEST,
});

testTable.addGlobalSecondaryIndex({
  indexName: 'global1',
  partitionKey: { name: 'global1', type: AttributeType.STRING },
});

testTable.addGlobalSecondaryIndex({
  indexName: 'global2',
  partitionKey: { name: 'global2', type: AttributeType.STRING },
});
```

## Potential caveat

If the existing table already has 
* 1 GSI, it will delete it and recreate it with new way of managing GSIs ...
* 2 or more GSIs, update will fail because it will try to delete those GSIs and recreate them with the new method but since it's not possible to delete more than one using the old management system the stack update will fail :( => workaround delete those GSIs from your cdk app before changing to new implementation
