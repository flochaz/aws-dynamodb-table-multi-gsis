/* eslint-disable no-console */
import type {
  IsCompleteResponse,
  IsCompleteRequest,
} from 'aws-cdk-lib/custom-resources/lib/provider-framework/types';
import { DynamoDB } from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies

export async function handler(event: any): Promise<any> {
  if (event.data) {
    return isCompleteHandler(event);
  } else {
    return onEventHandler(event);
  }
}

export async function onEventHandler(event: any): Promise<any> {
  console.log('Event: %j', event);

  const dynamodb = new DynamoDB();

  const tableName = event.ResourceProperties.TableName;
  const capitalizedAttributeDefinitions = event.ResourceProperties.AttributeDefinitions;
  const capitalizedKeySchema = event.ResourceProperties.KeySchema;
  const indexName = event.ResourceProperties.IndexName;
  const capitalizedProjection = event.ResourceProperties.Projection;
  let updateTableAction: 'Create' | 'Update' | 'Delete';
  updateTableAction = event.RequestType;
  const params: DynamoDB.UpdateTableInput = {
    TableName: tableName,
    AttributeDefinitions: capitalizedAttributeDefinitions,
    GlobalSecondaryIndexUpdates: [
      {
        [updateTableAction]: {
          IndexName: indexName,
          KeySchema: updateTableAction != 'Delete' ? capitalizedKeySchema : undefined,
          Projection: updateTableAction != 'Delete' ? capitalizedProjection : undefined,
        },
      },
    ],
  };
  console.log(`Updating table ${tableName} with params ${JSON.stringify(params)}`);
  const data = await dynamodb
    .updateTable(params)
    .promise();
  console.log('Update table: %j', data);

  return { PhysicalResourceId: `${indexName}`, data: { fwdToIsComplete: true } };
}

export async function isCompleteHandler(event: IsCompleteRequest): Promise<IsCompleteResponse> {
  console.log('Event: %j', event);

  const dynamodb = new DynamoDB();

  const data = await dynamodb
    .describeTable({
      TableName: event.ResourceProperties.TableName,
    })
    .promise();
  console.log('Describe table: %j', data);

  const tableActive = data.Table?.TableStatus === 'ACTIVE';
  const indexes = data.Table?.GlobalSecondaryIndexes ?? [];
  const index = indexes.find((r) => r.IndexName === event.ResourceProperties.IndexName);
  const indexActive = index?.IndexStatus === 'ACTIVE';
  const skipIndextionCompletedWait = event.ResourceProperties.SkipIndextionCompletedWait === 'true';

  switch (event.RequestType) {
    case 'Create':
    case 'Update':
      // Complete when index is reported as ACTIVE
      return { IsComplete: tableActive && (indexActive || skipIndextionCompletedWait) };
    case 'Delete':
      // Complete when index is gone
      return { IsComplete: tableActive && index === undefined };
  }
}
