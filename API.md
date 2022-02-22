# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Table <a name="Table" id="aws-dynamodb-multi-gsis.Table"></a>

#### Initializers <a name="Initializers" id="aws-dynamodb-multi-gsis.Table.Initializer"></a>

```typescript
import { Table } from 'aws-dynamodb-multi-gsis'

new Table(scope: Construct, id: string, props: TableProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-dynamodb-multi-gsis.Table.Initializer.parameter.scope">scope</a></code> | <code>@aws-cdk/core.Construct</code> | *No description.* |
| <code><a href="#aws-dynamodb-multi-gsis.Table.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-dynamodb-multi-gsis.Table.Initializer.parameter.props">props</a></code> | <code>@aws-cdk/aws-dynamodb.TableProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws-dynamodb-multi-gsis.Table.Initializer.parameter.scope"></a>

- *Type:* @aws-cdk/core.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="aws-dynamodb-multi-gsis.Table.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.Initializer.parameter.props"></a>

- *Type:* @aws-cdk/aws-dynamodb.TableProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-dynamodb-multi-gsis.Table.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.addGlobalSecondaryIndex">addGlobalSecondaryIndex</a></code> | Add a global secondary index of table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.addLocalSecondaryIndex">addLocalSecondaryIndex</a></code> | Add a local secondary index of table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.autoScaleGlobalSecondaryIndexReadCapacity">autoScaleGlobalSecondaryIndexReadCapacity</a></code> | Enable read capacity scaling for the given GSI. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.autoScaleGlobalSecondaryIndexWriteCapacity">autoScaleGlobalSecondaryIndexWriteCapacity</a></code> | Enable write capacity scaling for the given GSI. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.autoScaleReadCapacity">autoScaleReadCapacity</a></code> | Enable read capacity scaling for this table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.autoScaleWriteCapacity">autoScaleWriteCapacity</a></code> | Enable write capacity scaling for this table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.grant">grant</a></code> | Adds an IAM policy statement associated with this table to an IAM principal's policy. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.grantFullAccess">grantFullAccess</a></code> | Permits all DynamoDB operations ("dynamodb:*") to an IAM principal. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.grantReadData">grantReadData</a></code> | Permits an IAM principal all data read operations from this table: BatchGetItem, GetRecords, GetShardIterator, Query, GetItem, Scan. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.grantReadWriteData">grantReadWriteData</a></code> | Permits an IAM principal to all data read/write operations to this table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.grantStream">grantStream</a></code> | Adds an IAM policy statement associated with this table's stream to an IAM principal's policy. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.grantStreamRead">grantStreamRead</a></code> | Permits an IAM principal all stream data read operations for this table's stream: DescribeStream, GetRecords, GetShardIterator, ListStreams. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.grantTableListStreams">grantTableListStreams</a></code> | Permits an IAM Principal to list streams attached to current dynamodb table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.grantWriteData">grantWriteData</a></code> | Permits an IAM principal all data write operations to this table: BatchWriteItem, PutItem, UpdateItem, DeleteItem. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.metric">metric</a></code> | Return the given named metric for this Table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.metricConditionalCheckFailedRequests">metricConditionalCheckFailedRequests</a></code> | Metric for the conditional check failed requests this table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.metricConsumedReadCapacityUnits">metricConsumedReadCapacityUnits</a></code> | Metric for the consumed read capacity units this table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.metricConsumedWriteCapacityUnits">metricConsumedWriteCapacityUnits</a></code> | Metric for the consumed write capacity units this table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.metricSuccessfulRequestLatency">metricSuccessfulRequestLatency</a></code> | Metric for the successful request latency this table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.metricSystemErrors">metricSystemErrors</a></code> | Metric for the system errors this table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.metricSystemErrorsForOperations">metricSystemErrorsForOperations</a></code> | Metric for the system errors this table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.metricThrottledRequests">metricThrottledRequests</a></code> | How many requests are throttled on this table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.metricThrottledRequestsForOperation">metricThrottledRequestsForOperation</a></code> | How many requests are throttled on this table, for the given operation. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.metricUserErrors">metricUserErrors</a></code> | Metric for the user errors. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.schema">schema</a></code> | Get schema attributes of table or index. |

---

##### `toString` <a name="toString" id="aws-dynamodb-multi-gsis.Table.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="aws-dynamodb-multi-gsis.Table.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops being managed by CloudFormation, either because you've removed it from the CDK application or because you've made a change that requires the resource to be replaced.  The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="aws-dynamodb-multi-gsis.Table.applyRemovalPolicy.parameter.policy"></a>

- *Type:* @aws-cdk/core.RemovalPolicy

---

##### `addGlobalSecondaryIndex` <a name="addGlobalSecondaryIndex" id="aws-dynamodb-multi-gsis.Table.addGlobalSecondaryIndex"></a>

```typescript
public addGlobalSecondaryIndex(props: GlobalSecondaryIndexProps): void
```

Add a global secondary index of table.

###### `props`<sup>Required</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.addGlobalSecondaryIndex.parameter.props"></a>

- *Type:* @aws-cdk/aws-dynamodb.GlobalSecondaryIndexProps

the property of global secondary index.

---

##### `addLocalSecondaryIndex` <a name="addLocalSecondaryIndex" id="aws-dynamodb-multi-gsis.Table.addLocalSecondaryIndex"></a>

```typescript
public addLocalSecondaryIndex(props: LocalSecondaryIndexProps): void
```

Add a local secondary index of table.

###### `props`<sup>Required</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.addLocalSecondaryIndex.parameter.props"></a>

- *Type:* @aws-cdk/aws-dynamodb.LocalSecondaryIndexProps

the property of local secondary index.

---

##### `autoScaleGlobalSecondaryIndexReadCapacity` <a name="autoScaleGlobalSecondaryIndexReadCapacity" id="aws-dynamodb-multi-gsis.Table.autoScaleGlobalSecondaryIndexReadCapacity"></a>

```typescript
public autoScaleGlobalSecondaryIndexReadCapacity(indexName: string, props: EnableScalingProps): IScalableTableAttribute
```

Enable read capacity scaling for the given GSI.

###### `indexName`<sup>Required</sup> <a name="indexName" id="aws-dynamodb-multi-gsis.Table.autoScaleGlobalSecondaryIndexReadCapacity.parameter.indexName"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.autoScaleGlobalSecondaryIndexReadCapacity.parameter.props"></a>

- *Type:* @aws-cdk/aws-dynamodb.EnableScalingProps

---

##### `autoScaleGlobalSecondaryIndexWriteCapacity` <a name="autoScaleGlobalSecondaryIndexWriteCapacity" id="aws-dynamodb-multi-gsis.Table.autoScaleGlobalSecondaryIndexWriteCapacity"></a>

```typescript
public autoScaleGlobalSecondaryIndexWriteCapacity(indexName: string, props: EnableScalingProps): IScalableTableAttribute
```

Enable write capacity scaling for the given GSI.

###### `indexName`<sup>Required</sup> <a name="indexName" id="aws-dynamodb-multi-gsis.Table.autoScaleGlobalSecondaryIndexWriteCapacity.parameter.indexName"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.autoScaleGlobalSecondaryIndexWriteCapacity.parameter.props"></a>

- *Type:* @aws-cdk/aws-dynamodb.EnableScalingProps

---

##### `autoScaleReadCapacity` <a name="autoScaleReadCapacity" id="aws-dynamodb-multi-gsis.Table.autoScaleReadCapacity"></a>

```typescript
public autoScaleReadCapacity(props: EnableScalingProps): IScalableTableAttribute
```

Enable read capacity scaling for this table.

###### `props`<sup>Required</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.autoScaleReadCapacity.parameter.props"></a>

- *Type:* @aws-cdk/aws-dynamodb.EnableScalingProps

---

##### `autoScaleWriteCapacity` <a name="autoScaleWriteCapacity" id="aws-dynamodb-multi-gsis.Table.autoScaleWriteCapacity"></a>

```typescript
public autoScaleWriteCapacity(props: EnableScalingProps): IScalableTableAttribute
```

Enable write capacity scaling for this table.

###### `props`<sup>Required</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.autoScaleWriteCapacity.parameter.props"></a>

- *Type:* @aws-cdk/aws-dynamodb.EnableScalingProps

---

##### `grant` <a name="grant" id="aws-dynamodb-multi-gsis.Table.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: string): Grant
```

Adds an IAM policy statement associated with this table to an IAM principal's policy.

If `encryptionKey` is present, appropriate grants to the key needs to be added separately using the `table.encryptionKey.grant*` methods.

###### `grantee`<sup>Required</sup> <a name="grantee" id="aws-dynamodb-multi-gsis.Table.grant.parameter.grantee"></a>

- *Type:* @aws-cdk/aws-iam.IGrantable

The principal (no-op if undefined).

---

###### `actions`<sup>Required</sup> <a name="actions" id="aws-dynamodb-multi-gsis.Table.grant.parameter.actions"></a>

- *Type:* string

The set of actions to allow (i.e. "dynamodb:PutItem", "dynamodb:GetItem", ...).

---

##### `grantFullAccess` <a name="grantFullAccess" id="aws-dynamodb-multi-gsis.Table.grantFullAccess"></a>

```typescript
public grantFullAccess(grantee: IGrantable): Grant
```

Permits all DynamoDB operations ("dynamodb:*") to an IAM principal.

Appropriate grants will also be added to the customer-managed KMS key if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="aws-dynamodb-multi-gsis.Table.grantFullAccess.parameter.grantee"></a>

- *Type:* @aws-cdk/aws-iam.IGrantable

The principal to grant access to.

---

##### `grantReadData` <a name="grantReadData" id="aws-dynamodb-multi-gsis.Table.grantReadData"></a>

```typescript
public grantReadData(grantee: IGrantable): Grant
```

Permits an IAM principal all data read operations from this table: BatchGetItem, GetRecords, GetShardIterator, Query, GetItem, Scan.

Appropriate grants will also be added to the customer-managed KMS key if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="aws-dynamodb-multi-gsis.Table.grantReadData.parameter.grantee"></a>

- *Type:* @aws-cdk/aws-iam.IGrantable

The principal to grant access to.

---

##### `grantReadWriteData` <a name="grantReadWriteData" id="aws-dynamodb-multi-gsis.Table.grantReadWriteData"></a>

```typescript
public grantReadWriteData(grantee: IGrantable): Grant
```

Permits an IAM principal to all data read/write operations to this table.

BatchGetItem, GetRecords, GetShardIterator, Query, GetItem, Scan, BatchWriteItem, PutItem, UpdateItem, DeleteItem  Appropriate grants will also be added to the customer-managed KMS key if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="aws-dynamodb-multi-gsis.Table.grantReadWriteData.parameter.grantee"></a>

- *Type:* @aws-cdk/aws-iam.IGrantable

The principal to grant access to.

---

##### `grantStream` <a name="grantStream" id="aws-dynamodb-multi-gsis.Table.grantStream"></a>

```typescript
public grantStream(grantee: IGrantable, actions: string): Grant
```

Adds an IAM policy statement associated with this table's stream to an IAM principal's policy.

If `encryptionKey` is present, appropriate grants to the key needs to be added separately using the `table.encryptionKey.grant*` methods.

###### `grantee`<sup>Required</sup> <a name="grantee" id="aws-dynamodb-multi-gsis.Table.grantStream.parameter.grantee"></a>

- *Type:* @aws-cdk/aws-iam.IGrantable

The principal (no-op if undefined).

---

###### `actions`<sup>Required</sup> <a name="actions" id="aws-dynamodb-multi-gsis.Table.grantStream.parameter.actions"></a>

- *Type:* string

The set of actions to allow (i.e. "dynamodb:DescribeStream", "dynamodb:GetRecords", ...).

---

##### `grantStreamRead` <a name="grantStreamRead" id="aws-dynamodb-multi-gsis.Table.grantStreamRead"></a>

```typescript
public grantStreamRead(grantee: IGrantable): Grant
```

Permits an IAM principal all stream data read operations for this table's stream: DescribeStream, GetRecords, GetShardIterator, ListStreams.

Appropriate grants will also be added to the customer-managed KMS key if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="aws-dynamodb-multi-gsis.Table.grantStreamRead.parameter.grantee"></a>

- *Type:* @aws-cdk/aws-iam.IGrantable

The principal to grant access to.

---

##### `grantTableListStreams` <a name="grantTableListStreams" id="aws-dynamodb-multi-gsis.Table.grantTableListStreams"></a>

```typescript
public grantTableListStreams(grantee: IGrantable): Grant
```

Permits an IAM Principal to list streams attached to current dynamodb table.

###### `grantee`<sup>Required</sup> <a name="grantee" id="aws-dynamodb-multi-gsis.Table.grantTableListStreams.parameter.grantee"></a>

- *Type:* @aws-cdk/aws-iam.IGrantable

The principal (no-op if undefined).

---

##### `grantWriteData` <a name="grantWriteData" id="aws-dynamodb-multi-gsis.Table.grantWriteData"></a>

```typescript
public grantWriteData(grantee: IGrantable): Grant
```

Permits an IAM principal all data write operations to this table: BatchWriteItem, PutItem, UpdateItem, DeleteItem.

Appropriate grants will also be added to the customer-managed KMS key if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="aws-dynamodb-multi-gsis.Table.grantWriteData.parameter.grantee"></a>

- *Type:* @aws-cdk/aws-iam.IGrantable

The principal to grant access to.

---

##### `metric` <a name="metric" id="aws-dynamodb-multi-gsis.Table.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Table.

By default, the metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `metricName`<sup>Required</sup> <a name="metricName" id="aws-dynamodb-multi-gsis.Table.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.metric.parameter.props"></a>

- *Type:* @aws-cdk/aws-cloudwatch.MetricOptions

---

##### `metricConditionalCheckFailedRequests` <a name="metricConditionalCheckFailedRequests" id="aws-dynamodb-multi-gsis.Table.metricConditionalCheckFailedRequests"></a>

```typescript
public metricConditionalCheckFailedRequests(props?: MetricOptions): Metric
```

Metric for the conditional check failed requests this table.

By default, the metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.metricConditionalCheckFailedRequests.parameter.props"></a>

- *Type:* @aws-cdk/aws-cloudwatch.MetricOptions

---

##### `metricConsumedReadCapacityUnits` <a name="metricConsumedReadCapacityUnits" id="aws-dynamodb-multi-gsis.Table.metricConsumedReadCapacityUnits"></a>

```typescript
public metricConsumedReadCapacityUnits(props?: MetricOptions): Metric
```

Metric for the consumed read capacity units this table.

By default, the metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.metricConsumedReadCapacityUnits.parameter.props"></a>

- *Type:* @aws-cdk/aws-cloudwatch.MetricOptions

---

##### `metricConsumedWriteCapacityUnits` <a name="metricConsumedWriteCapacityUnits" id="aws-dynamodb-multi-gsis.Table.metricConsumedWriteCapacityUnits"></a>

```typescript
public metricConsumedWriteCapacityUnits(props?: MetricOptions): Metric
```

Metric for the consumed write capacity units this table.

By default, the metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.metricConsumedWriteCapacityUnits.parameter.props"></a>

- *Type:* @aws-cdk/aws-cloudwatch.MetricOptions

---

##### `metricSuccessfulRequestLatency` <a name="metricSuccessfulRequestLatency" id="aws-dynamodb-multi-gsis.Table.metricSuccessfulRequestLatency"></a>

```typescript
public metricSuccessfulRequestLatency(props?: MetricOptions): Metric
```

Metric for the successful request latency this table.

By default, the metric will be calculated as an average over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.metricSuccessfulRequestLatency.parameter.props"></a>

- *Type:* @aws-cdk/aws-cloudwatch.MetricOptions

---

##### ~~`metricSystemErrors`~~ <a name="metricSystemErrors" id="aws-dynamodb-multi-gsis.Table.metricSystemErrors"></a>

```typescript
public metricSystemErrors(props?: MetricOptions): Metric
```

Metric for the system errors this table.

###### `props`<sup>Optional</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.metricSystemErrors.parameter.props"></a>

- *Type:* @aws-cdk/aws-cloudwatch.MetricOptions

---

##### `metricSystemErrorsForOperations` <a name="metricSystemErrorsForOperations" id="aws-dynamodb-multi-gsis.Table.metricSystemErrorsForOperations"></a>

```typescript
public metricSystemErrorsForOperations(props?: SystemErrorsForOperationsMetricOptions): IMetric
```

Metric for the system errors this table.

This will sum errors across all possible operations. Note that by default, each individual metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.metricSystemErrorsForOperations.parameter.props"></a>

- *Type:* @aws-cdk/aws-dynamodb.SystemErrorsForOperationsMetricOptions

---

##### ~~`metricThrottledRequests`~~ <a name="metricThrottledRequests" id="aws-dynamodb-multi-gsis.Table.metricThrottledRequests"></a>

```typescript
public metricThrottledRequests(props?: MetricOptions): Metric
```

How many requests are throttled on this table.

Default: sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.metricThrottledRequests.parameter.props"></a>

- *Type:* @aws-cdk/aws-cloudwatch.MetricOptions

---

##### `metricThrottledRequestsForOperation` <a name="metricThrottledRequestsForOperation" id="aws-dynamodb-multi-gsis.Table.metricThrottledRequestsForOperation"></a>

```typescript
public metricThrottledRequestsForOperation(operation: string, props?: MetricOptions): Metric
```

How many requests are throttled on this table, for the given operation.

Default: sum over 5 minutes

###### `operation`<sup>Required</sup> <a name="operation" id="aws-dynamodb-multi-gsis.Table.metricThrottledRequestsForOperation.parameter.operation"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.metricThrottledRequestsForOperation.parameter.props"></a>

- *Type:* @aws-cdk/aws-cloudwatch.MetricOptions

---

##### `metricUserErrors` <a name="metricUserErrors" id="aws-dynamodb-multi-gsis.Table.metricUserErrors"></a>

```typescript
public metricUserErrors(props?: MetricOptions): Metric
```

Metric for the user errors.

Note that this metric reports user errors across all the tables in the account and region the table resides in.  By default, the metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="aws-dynamodb-multi-gsis.Table.metricUserErrors.parameter.props"></a>

- *Type:* @aws-cdk/aws-cloudwatch.MetricOptions

---

##### `schema` <a name="schema" id="aws-dynamodb-multi-gsis.Table.schema"></a>

```typescript
public schema(indexName?: string): SchemaOptions
```

Get schema attributes of table or index.

###### `indexName`<sup>Optional</sup> <a name="indexName" id="aws-dynamodb-multi-gsis.Table.schema.parameter.indexName"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-dynamodb-multi-gsis.Table.isConstruct">isConstruct</a></code> | Return whether the given object is a Construct. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.fromTableArn">fromTableArn</a></code> | Creates a Table construct that represents an external table via table arn. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.fromTableAttributes">fromTableAttributes</a></code> | Creates a Table construct that represents an external table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.fromTableName">fromTableName</a></code> | Creates a Table construct that represents an external table via table name. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.grantListStreams">grantListStreams</a></code> | Permits an IAM Principal to list all DynamoDB Streams. |

---

##### `isConstruct` <a name="isConstruct" id="aws-dynamodb-multi-gsis.Table.isConstruct"></a>

```typescript
import { Table } from 'aws-dynamodb-multi-gsis'

Table.isConstruct(x: any)
```

Return whether the given object is a Construct.

###### `x`<sup>Required</sup> <a name="x" id="aws-dynamodb-multi-gsis.Table.isConstruct.parameter.x"></a>

- *Type:* any

---

##### `isResource` <a name="isResource" id="aws-dynamodb-multi-gsis.Table.isResource"></a>

```typescript
import { Table } from 'aws-dynamodb-multi-gsis'

Table.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="aws-dynamodb-multi-gsis.Table.isResource.parameter.construct"></a>

- *Type:* @aws-cdk/core.IConstruct

---

##### `fromTableArn` <a name="fromTableArn" id="aws-dynamodb-multi-gsis.Table.fromTableArn"></a>

```typescript
import { Table } from 'aws-dynamodb-multi-gsis'

Table.fromTableArn(scope: Construct, id: string, tableArn: string)
```

Creates a Table construct that represents an external table via table arn.

###### `scope`<sup>Required</sup> <a name="scope" id="aws-dynamodb-multi-gsis.Table.fromTableArn.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="aws-dynamodb-multi-gsis.Table.fromTableArn.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `tableArn`<sup>Required</sup> <a name="tableArn" id="aws-dynamodb-multi-gsis.Table.fromTableArn.parameter.tableArn"></a>

- *Type:* string

The table's ARN.

---

##### `fromTableAttributes` <a name="fromTableAttributes" id="aws-dynamodb-multi-gsis.Table.fromTableAttributes"></a>

```typescript
import { Table } from 'aws-dynamodb-multi-gsis'

Table.fromTableAttributes(scope: Construct, id: string, attrs: TableAttributes)
```

Creates a Table construct that represents an external table.

###### `scope`<sup>Required</sup> <a name="scope" id="aws-dynamodb-multi-gsis.Table.fromTableAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="aws-dynamodb-multi-gsis.Table.fromTableAttributes.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="aws-dynamodb-multi-gsis.Table.fromTableAttributes.parameter.attrs"></a>

- *Type:* @aws-cdk/aws-dynamodb.TableAttributes

A `TableAttributes` object.

---

##### `fromTableName` <a name="fromTableName" id="aws-dynamodb-multi-gsis.Table.fromTableName"></a>

```typescript
import { Table } from 'aws-dynamodb-multi-gsis'

Table.fromTableName(scope: Construct, id: string, tableName: string)
```

Creates a Table construct that represents an external table via table name.

###### `scope`<sup>Required</sup> <a name="scope" id="aws-dynamodb-multi-gsis.Table.fromTableName.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="aws-dynamodb-multi-gsis.Table.fromTableName.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="aws-dynamodb-multi-gsis.Table.fromTableName.parameter.tableName"></a>

- *Type:* string

The table's name.

---

##### ~~`grantListStreams`~~ <a name="grantListStreams" id="aws-dynamodb-multi-gsis.Table.grantListStreams"></a>

```typescript
import { Table } from 'aws-dynamodb-multi-gsis'

Table.grantListStreams(grantee: IGrantable)
```

Permits an IAM Principal to list all DynamoDB Streams.

###### `grantee`<sup>Required</sup> <a name="grantee" id="aws-dynamodb-multi-gsis.Table.grantListStreams.parameter.grantee"></a>

- *Type:* @aws-cdk/aws-iam.IGrantable

The principal (no-op if undefined).

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-dynamodb-multi-gsis.Table.property.node">node</a></code> | <code>@aws-cdk/core.ConstructNode</code> | The construct tree node associated with this construct. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.property.env">env</a></code> | <code>@aws-cdk/core.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.property.stack">stack</a></code> | <code>@aws-cdk/core.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.property.tableArn">tableArn</a></code> | <code>string</code> | Arn of the dynamodb table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.property.tableName">tableName</a></code> | <code>string</code> | Table name of the dynamodb table. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.property.encryptionKey">encryptionKey</a></code> | <code>@aws-cdk/aws-kms.IKey</code> | KMS encryption key, if this table uses a customer-managed encryption key. |
| <code><a href="#aws-dynamodb-multi-gsis.Table.property.tableStreamArn">tableStreamArn</a></code> | <code>string</code> | ARN of the table's stream, if there is one. |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-dynamodb-multi-gsis.Table.property.node"></a>

```typescript
public readonly node: ConstructNode;
```

- *Type:* @aws-cdk/core.ConstructNode

The construct tree node associated with this construct.

---

##### `env`<sup>Required</sup> <a name="env" id="aws-dynamodb-multi-gsis.Table.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* @aws-cdk/core.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK (generally, those created by creating new class instances like Role, Bucket, etc.), this is always the same as the environment of the stack they belong to; however, for imported resources (those obtained from static methods like fromRoleArn, fromBucketName, etc.), that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="aws-dynamodb-multi-gsis.Table.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* @aws-cdk/core.Stack

The stack in which this resource is defined.

---

##### `tableArn`<sup>Required</sup> <a name="tableArn" id="aws-dynamodb-multi-gsis.Table.property.tableArn"></a>

```typescript
public readonly tableArn: string;
```

- *Type:* string

Arn of the dynamodb table.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="aws-dynamodb-multi-gsis.Table.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

Table name of the dynamodb table.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="aws-dynamodb-multi-gsis.Table.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* @aws-cdk/aws-kms.IKey

KMS encryption key, if this table uses a customer-managed encryption key.

---

##### `tableStreamArn`<sup>Optional</sup> <a name="tableStreamArn" id="aws-dynamodb-multi-gsis.Table.property.tableStreamArn"></a>

```typescript
public readonly tableStreamArn: string;
```

- *Type:* string

ARN of the table's stream, if there is one.

---





