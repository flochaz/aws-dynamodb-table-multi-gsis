/**
 * E2E Test Table with multi GSIs class
 *
 * @group e2e
 */

import { AttributeType, BillingMode } from '@aws-cdk/aws-dynamodb';
import { App, Stack } from '@aws-cdk/core';
import { SdkProvider } from 'aws-cdk/lib/api/aws-auth';
import { CloudFormationDeployments } from 'aws-cdk/lib/api/cloudformation-deployments';
import { Table } from '../lib';

const integTestApp = new App();
const stack = new Stack(integTestApp, 'E2ETestDDBTableMultiGSIs');

describe('Adding multi GSIs', () => {
  it('standard table can be deploy succcessfully', async () => {
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

    let stackArtifact = integTestApp.synth().getStackByName(stack.stackName);

    const sdkProvider = await SdkProvider.withAwsCliCompatibleDefaults({
      profile: process.env.AWS_PROFILE,
    });
    const cloudFormation = new CloudFormationDeployments({ sdkProvider });

    // GIVEN
    // And existing stack
    await cloudFormation.deployStack({
      stack: stackArtifact,
    });

    // WHEN
    // Adding 2 GSIs
    testTable.addGlobalSecondaryIndex({
      indexName: 'global3',
      partitionKey: { name: 'global4', type: AttributeType.STRING },
    });

    testTable.addGlobalSecondaryIndex({
      indexName: 'global4',
      partitionKey: { name: 'global4', type: AttributeType.STRING },
    });

    stackArtifact = integTestApp.synth().getStackByName(stack.stackName);

    // THEN
    // it deploys properly
    await cloudFormation.deployStack({
      stack: stackArtifact,
    });

    await cloudFormation.destroyStack({
      stack: stackArtifact,
    });

  }, 3000000);
});
