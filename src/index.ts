import { CustomResource } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { DynamoDBUpdateTableProvider } from './DynamoDBUpdateTableProvider';

const HASH_KEY_TYPE = 'HASH';
const RANGE_KEY_TYPE = 'RANGE';

/**
 * Just a convenient way to keep track of both attributes
 */
interface ScalableAttributePair {
  scalableReadAttribute?: dynamodb.IScalableTableAttribute;
  scalableWriteAttribute?: dynamodb.IScalableTableAttribute;
}

export class Table extends dynamodb.Table {
  private readonly _attributeDefinitions = new Array<dynamodb.CfnTable.AttributeDefinitionProperty>();
  private readonly globalSecondaryIndexesBuilders = new Array<CustomResource>();
  private readonly globalSecondaryIndexesBuilderProvider: DynamoDBUpdateTableProvider;

  private readonly _globalSecondaryIndexSchemas = new Map<string, dynamodb.SchemaOptions>();
  private readonly _nonKeyAttributes = new Set<string>();
  private readonly _indexScaling = new Map<string, ScalableAttributePair>();
  private readonly _billingMode: dynamodb.BillingMode;

  protected get hasIndex() {
    return this.globalSecondaryIndexesBuilders.length > 0;
  }

  constructor(scope: Construct, id: string, props: dynamodb.TableProps) {
    super(scope, id, props);

    // Keep original billing mode logic
    if (props.replicationRegions) {
      this._billingMode = props.billingMode ?? dynamodb.BillingMode.PAY_PER_REQUEST;
    } else {
      this._billingMode = props.billingMode ?? dynamodb.BillingMode.PROVISIONED;
    }

    this.globalSecondaryIndexesBuilderProvider = DynamoDBUpdateTableProvider.getOrCreate(scope);
  }

  /**
   * Validate non-key attributes by checking limits within secondary index, which may vary in future.
   *
   * @param _nonKeyAttributes a list of non-key attribute names
   */
  private _validateNonKeyAttributes(_nonKeyAttributes: string[]) {
    if (this._nonKeyAttributes.size + _nonKeyAttributes.length > 100) {
      // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html#limits-secondary-indexes
      throw new RangeError('a maximum number of _nonKeyAttributes across all of secondary indexes is 100');
    }

    // store all non-key attributes
    _nonKeyAttributes.forEach((att) => this._nonKeyAttributes.add(att));
  }
  private _buildIndexProjection(props: dynamodb.SecondaryIndexProps): dynamodb.CfnTable.ProjectionProperty {
    if (props.projectionType === dynamodb.ProjectionType.INCLUDE && !props.nonKeyAttributes) {
      // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-projectionobject.html
      throw new Error(
        `non-key attributes should be specified when using ${dynamodb.ProjectionType.INCLUDE} projection type`,
      );
    }

    if (props.projectionType !== dynamodb.ProjectionType.INCLUDE && props.nonKeyAttributes) {
      // this combination causes validation exception, status code 400, while trying to create CFN stack
      throw new Error(
        `non-key attributes should not be specified when not using ${dynamodb.ProjectionType.INCLUDE} projection type`,
      );
    }

    if (props.nonKeyAttributes) {
      this._validateNonKeyAttributes(props.nonKeyAttributes);
    }

    return {
      projectionType: props.projectionType ?? dynamodb.ProjectionType.ALL,
      nonKeyAttributes: props.nonKeyAttributes ?? undefined,
    };
  }

  /**
   * Register the key attribute of table or secondary index to assemble attribute definitions of TableResourceProps.
   *
   * @param attribute the key attribute of table or secondary index
   */
  private _registerAttribute(attribute: dynamodb.Attribute) {
    const { name, type } = attribute;
    const existingDef = this._attributeDefinitions.find((def) => def.attributeName === name);
    if (existingDef && existingDef.attributeType !== type) {
      throw new Error(
        `Unable to specify ${name} as ${type} because it was already defined as ${existingDef.attributeType}`,
      );
    }
    if (!existingDef) {
      this._attributeDefinitions.push({
        attributeName: name,
        attributeType: type,
      });
    }
  }
  /**
   * Validate index name to check if a duplicate name already exists.
   *
   * @param indexName a name of global secondary index
   */
  private _validateIndexName(indexName: string) {
    if (this._globalSecondaryIndexSchemas.has(indexName)) {
      // a duplicate index name causes validation exception, status code 400, while trying to create CFN stack
      throw new Error(`a duplicate index name, ${indexName}, is not allowed`);
    }
  }

  private _buildIndexKeySchema(
    partitionKey: dynamodb.Attribute,
    sortKey?: dynamodb.Attribute,
  ): dynamodb.CfnTable.KeySchemaProperty[] {
    this._registerAttribute(partitionKey);
    const indexKeySchema: dynamodb.CfnTable.KeySchemaProperty[] = [
      { attributeName: partitionKey.name, keyType: HASH_KEY_TYPE },
    ];

    if (sortKey) {
      this._registerAttribute(sortKey);
      indexKeySchema.push({ attributeName: sortKey.name, keyType: RANGE_KEY_TYPE });
    }

    return indexKeySchema;
  }

  /**
   * Validate read and write capacity are not specified for on-demand tables (billing mode PAY_PER_REQUEST).
   *
   * @param props read and write capacity properties
   */
  private _validateProvisioning(props: { readCapacity?: number; writeCapacity?: number }): void {
    if (this._billingMode === dynamodb.BillingMode.PAY_PER_REQUEST) {
      if (props.readCapacity !== undefined || props.writeCapacity !== undefined) {
        throw new Error('you cannot provision read and write capacity for a table with PAY_PER_REQUEST billing mode');
      }
    }
  }

  private sdkBasedAddGlobalSecondaryIndex(
    globalSecondaryIndex: dynamodb.CfnTable.LocalSecondaryIndexProperty | dynamodb.CfnTable.GlobalSecondaryIndexProperty,
  ): CustomResource {
    // capitalize object keys
    const capitalizedAttributeDefinitions = this._attributeDefinitions.map((def) => {
      return {
        AttributeName: def.attributeName,
        AttributeType: def.attributeType,
      };
    });

    const capitalizedKeySchema = (globalSecondaryIndex.keySchema as dynamodb.CfnTable.KeySchemaProperty[]).map(
      (key) => {
        return {
          AttributeName: key.attributeName,
          KeyType: key.keyType,
        };
      },
    );

    const capitalizedProjection = {
      ProjectionType: (globalSecondaryIndex.projection as dynamodb.CfnTable.ProjectionProperty).projectionType,
    };
    return new CustomResource(this, `${globalSecondaryIndex.indexName}`, {
      serviceToken: this.globalSecondaryIndexesBuilderProvider.provider.serviceToken,
      resourceType: 'Custom::DynamoDBGlobalSecondaryIndex',
      properties: {
        TableName: this.tableName,
        AttributeDefinitions: capitalizedAttributeDefinitions,
        IndexName: globalSecondaryIndex.indexName,
        KeySchema: capitalizedKeySchema,
        Projection: capitalizedProjection,
      },
    });
  }

  /**
   * Add a global secondary index of table.
   *
   * @param props the property of global secondary index
   */
  public addGlobalSecondaryIndex(props: dynamodb.GlobalSecondaryIndexProps) {
    this._validateProvisioning(props);
    this._validateIndexName(props.indexName);

    // build key schema and projection for index
    const gsiKeySchema = this._buildIndexKeySchema(props.partitionKey, props.sortKey);
    const gsiProjection = this._buildIndexProjection(props);

    const builder = this.sdkBasedAddGlobalSecondaryIndex({
      indexName: props.indexName,
      keySchema: gsiKeySchema,
      projection: gsiProjection,
      provisionedThroughput:
        this._billingMode === dynamodb.BillingMode.PAY_PER_REQUEST
          ? undefined
          : {
            readCapacityUnits: props.readCapacity || 5,
            writeCapacityUnits: props.writeCapacity || 5,
          },
    });
    if (this.globalSecondaryIndexesBuilders.length !== 0) {
      builder.node.addDependency(this.globalSecondaryIndexesBuilders[this.globalSecondaryIndexesBuilders.length - 1]);
    }

    this.globalSecondaryIndexesBuilders.push(builder);

    this._globalSecondaryIndexSchemas.set(props.indexName, {
      partitionKey: props.partitionKey,
      sortKey: props.sortKey,
    });

    this._indexScaling.set(props.indexName, {});
  }
}
