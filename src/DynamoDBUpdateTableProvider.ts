import * as iam from 'aws-cdk-lib/aws-iam'
import * as cdk from 'aws-cdk-lib'
import * as cr from 'aws-cdk-lib/custom-resources';

import { DynamoDBUpdateTableFunction } from './DynamoDBUpdateTableFunction';
import { Construct } from 'constructs';

// export interface DynamoDBUpdateTableProviderProps {}

/**
 * A Custom Resource provider capable of creating AWS Accounts
 */
export class DynamoDBUpdateTableProvider extends cdk.NestedStack {
  /**
   * Creates a stack-singleton resource provider nested stack.
   */
  public static getOrCreate(scope: Construct) {
    const stack = cdk.Stack.of(scope);
    const uid = '@aws-cdk-lib/aws-dynamodb.GSIsUpdateProvider';
    return (stack.node.tryFindChild(uid) as DynamoDBUpdateTableProvider) || new DynamoDBUpdateTableProvider(stack, uid);
  }

  /**
   * The custom resource provider.
   */
  public readonly provider: cr.Provider;

  constructor(scope: Construct, id: string) {
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
