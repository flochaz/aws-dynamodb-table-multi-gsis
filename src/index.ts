import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { ScalableTableAttribute } from '@aws-cdk/aws-dynamodb/lib/scalable-table-attribute';
import * as core from '@aws-cdk/core';

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html#limits-secondary-indexes
const MAX_LOCAL_SECONDARY_INDEX_COUNT = 5;

const HASH_KEY_TYPE = 'HASH';
const RANGE_KEY_TYPE = 'RANGE';

/**
 * Just a convenient way to keep track of both attributes
 */
interface ScalableAttributePair {
  scalableReadAttribute?: ScalableTableAttribute;
  scalableWriteAttribute?: ScalableTableAttribute;
}

export class Table extends dynamodb.Table {
  private readonly _attributeDefinitions = new Array<dynamodb.CfnTable.AttributeDefinitionProperty>();
  private readonly _globalSecondaryIndexes = new Array<dynamodb.CfnTable.GlobalSecondaryIndexProperty>();
  private readonly _localSecondaryIndexes = new Array<dynamodb.CfnTable.LocalSecondaryIndexProperty>();

  private readonly _secondaryIndexSchemas = new Map<string, dynamodb.SchemaOptions>();
  private readonly _nonKeyAttributes = new Set<string>();
  private readonly _tablePartitionKey: dynamodb.Attribute;
  private readonly _indexScaling = new Map<string, ScalableAttributePair>();
  private readonly _billingMode: dynamodb.BillingMode;

  constructor(scope: core.Construct, id: string, props: dynamodb.TableProps) {
    super(scope, id, props);
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
   * @param indexName a name of global or local secondary index
   */
  private _validateIndexName(indexName: string) {
    if (this._secondaryIndexSchemas.has(indexName)) {
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
   * Add a local secondary index of table.
   *
   * @param props the property of local secondary index
   */
  public addLocalSecondaryIndex(props: dynamodb.LocalSecondaryIndexProps) {
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html#limits-secondary-indexes
    if (this._localSecondaryIndexes.length >= MAX_LOCAL_SECONDARY_INDEX_COUNT) {
      throw new RangeError(`a maximum number of local secondary index per table is ${MAX_LOCAL_SECONDARY_INDEX_COUNT}`);
    }

    this._validateIndexName(props.indexName);

    // build key schema and projection for index
    const lsiKeySchema = this._buildIndexKeySchema(this._tablePartitionKey, props.sortKey);
    const lsiProjection = this._buildIndexProjection(props);

    this._localSecondaryIndexes.push({
      indexName: props.indexName,
      keySchema: lsiKeySchema,
      projection: lsiProjection,
    });

    this._secondaryIndexSchemas.set(props.indexName, {
      partitionKey: this._tablePartitionKey,
      sortKey: props.sortKey,
    });
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

    this._globalSecondaryIndexes.push({
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

    this._secondaryIndexSchemas.set(props.indexName, {
      partitionKey: props.partitionKey,
      sortKey: props.sortKey,
    });

    this._indexScaling.set(props.indexName, {});
  }

  /**
   * Add a local secondary index of table.
   *
   * @param props the property of local secondary index
   */
  public _addLocalSecondaryIndex(props: dynamodb.LocalSecondaryIndexProps) {
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html#limits-secondary-indexes
    if (this._localSecondaryIndexes.length >= MAX_LOCAL_SECONDARY_INDEX_COUNT) {
      throw new RangeError(`a maximum number of local secondary index per table is ${MAX_LOCAL_SECONDARY_INDEX_COUNT}`);
    }

    this._validateIndexName(props.indexName);

    // build key schema and projection for index
    const lsiKeySchema = this._buildIndexKeySchema(this._tablePartitionKey, props.sortKey);
    const lsiProjection = this._buildIndexProjection(props);

    this._localSecondaryIndexes.push({
      indexName: props.indexName,
      keySchema: lsiKeySchema,
      projection: lsiProjection,
    });

    this._secondaryIndexSchemas.set(props.indexName, {
      partitionKey: this._tablePartitionKey,
      sortKey: props.sortKey,
    });
  }
}
