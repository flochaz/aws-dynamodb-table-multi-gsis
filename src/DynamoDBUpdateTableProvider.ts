import * as iam from '@aws-cdk/aws-iam';
import * as core from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

import { DynamoDBUpdateTableFunction } from './dynamoDBUpdateTable-function';
// export interface DynamoDBUpdateTableProviderProps {}

/**
 * A Custom Resource provider capable of creating AWS Accounts
 */
export class DynamoDBUpdateTableProvider extends core.NestedStack {
  /**
   * Creates a stack-singleton resource provider nested stack.
   */
  public static getOrCreate(scope: core.Construct) {
    const stack = core.Stack.of(scope);
    const uid = '@aws-cdk/aws-dynamodb.GSIsUpdateProvider';
    return (stack.node.tryFindChild(uid) as DynamoDBUpdateTableProvider) || new DynamoDBUpdateTableProvider(stack, uid);
  }

  /**
   * The custom resource provider.
   */
  public readonly provider: cr.Provider;

  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    const onEvent = new DynamoDBUpdateTableFunction(this, 'DynamoDBTableUpdate', {
      role: new iam.Role(this, 'id', {
        roleName: 'id',
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
          iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'),
        ],
      }),
    });


    this.provider = new cr.Provider(this, 'DynamoDBUpdateTableProvider', {
      onEventHandler: onEvent,
      isCompleteHandler: onEvent,
    });
  }
}
