var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/dynamoDBUpdateTable.lambda.ts
var dynamoDBUpdateTable_lambda_exports = {};
__export(dynamoDBUpdateTable_lambda_exports, {
  onEventHandler: () => onEventHandler
});
var import_aws_sdk = require("aws-sdk");
async function onEventHandler(event) {
  console.log("Event: %j", event);
  const dynamodb = new import_aws_sdk.DynamoDB();
  const tableName = event.ResourceProperties.TableName;
  const capitalizedAttributeDefinition = event.ResourceProperties.AttributeDefinition;
  const capitalizedKeySchema = event.ResourceProperties.KeySchema;
  const indexName = event.ResourceProperties.IndexName;
  const capitalizedProjection = event.ResourceProperties.Projection;
  let updateTableAction;
  updateTableAction = event.RequestType;
  const data = await dynamodb.updateTable({
    TableName: tableName,
    AttributeDefinitions: capitalizedAttributeDefinition,
    GlobalSecondaryIndexUpdates: [
      {
        [updateTableAction]: {
          IndexName: indexName,
          KeySchema: updateTableAction != "Delete" ? capitalizedKeySchema : void 0,
          Projection: updateTableAction != "Delete" ? capitalizedProjection : void 0
        }
      }
    ]
  }).promise();
  console.log("Update table: %j", data);
  return event.RequestType === "Create" || event.RequestType === "Update" ? { PhysicalResourceId: `${indexName}` } : {};
}
module.exports = __toCommonJS(dynamoDBUpdateTable_lambda_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  onEventHandler
});
