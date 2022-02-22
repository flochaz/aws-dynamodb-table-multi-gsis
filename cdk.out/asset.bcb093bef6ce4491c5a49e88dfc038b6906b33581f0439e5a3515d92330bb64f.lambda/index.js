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
  handler: () => handler,
  isCompleteHandler: () => isCompleteHandler,
  onEventHandler: () => onEventHandler
});
var import_aws_sdk = require("aws-sdk");
async function handler(event) {
  if (event.Data) {
    return isCompleteHandler(event);
  } else {
    return onEventHandler(event);
  }
}
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
  await dynamodb.updateTable({
    TableName: tableName,
    AttributeDefinitions: capitalizedAttributeDefinition
  }).promise();
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
  return event.RequestType === "Create" || event.RequestType === "Update" ? { PhysicalResourceId: `${indexName}`, data: { fwdToIsComplete: true } } : {};
}
async function isCompleteHandler(event) {
  var _a, _b;
  console.log("Event: %j", event);
  const dynamodb = new import_aws_sdk.DynamoDB();
  const data = await dynamodb.describeTable({
    TableName: event.ResourceProperties.TableName
  }).promise();
  console.log("Describe table: %j", data);
  const tableActive = ((_a = data.Table) == null ? void 0 : _a.TableStatus) === "ACTIVE";
  const indexes = ((_b = data.Table) == null ? void 0 : _b.GlobalSecondaryIndexes) ?? [];
  const index = indexes.find((r) => r.IndexName === event.ResourceProperties.IndexName);
  const indexActive = (index == null ? void 0 : index.IndexStatus) === "ACTIVE";
  const skipIndextionCompletedWait = event.ResourceProperties.SkipIndextionCompletedWait === "true";
  switch (event.RequestType) {
    case "Create":
    case "Update":
      return { IsComplete: tableActive && (indexActive || skipIndextionCompletedWait) };
    case "Delete":
      return { IsComplete: tableActive && index === void 0 };
  }
}
module.exports = __toCommonJS(dynamoDBUpdateTable_lambda_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler,
  isCompleteHandler,
  onEventHandler
});
