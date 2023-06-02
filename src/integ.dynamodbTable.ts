#!/usr/bin/env node
import { AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb';
import { App, Stack } from 'aws-cdk-lib'
import { Table } from './';

const app = new App();

const stack = new Stack(app, 'integ-dynamodb-table');

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
