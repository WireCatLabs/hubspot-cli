// GENERATED. DO NOT EDIT.
// Source: spec/hubspot/, checked against provenance.json
// Run: pnpm generate

import { int64, integer } from "@wirecat/cli-base/codegen/runtime"
import * as v from "valibot"
import type * as T from "./types.js"

export const AssociatedId: v.GenericSchema<unknown, T.AssociatedId> = v.looseObject({
  id: v.string(),
  type: v.string(),
})

export const AssociationSpec: v.GenericSchema<unknown, T.AssociationSpec> = v.looseObject({
  associationCategory: v.picklist(["HUBSPOT_DEFINED", "INTEGRATOR_DEFINED", "USER_DEFINED", "WORK"]),
  associationTypeId: integer(),
})

export const BatchInputSimplePublicObjectBatchInput: v.GenericSchema<
  unknown,
  T.BatchInputSimplePublicObjectBatchInput
> = v.looseObject({
  inputs: v.array(v.lazy(() => SimplePublicObjectBatchInput)),
})

export const BatchInputSimplePublicObjectBatchInputForCreate: v.GenericSchema<
  unknown,
  T.BatchInputSimplePublicObjectBatchInputForCreate
> = v.looseObject({
  inputs: v.array(v.lazy(() => SimplePublicObjectBatchInputForCreate)),
})

export const BatchInputSimplePublicObjectBatchInputUpsert: v.GenericSchema<
  unknown,
  T.BatchInputSimplePublicObjectBatchInputUpsert
> = v.looseObject({
  inputs: v.array(v.lazy(() => SimplePublicObjectBatchInputUpsert)),
})

export const BatchInputSimplePublicObjectId: v.GenericSchema<unknown, T.BatchInputSimplePublicObjectId> = v.looseObject(
  {
    inputs: v.array(v.lazy(() => SimplePublicObjectId)),
  },
)

export const BatchReadInputSimplePublicObjectId: v.GenericSchema<unknown, T.BatchReadInputSimplePublicObjectId> =
  v.looseObject({
    idProperty: v.optional(v.string()),
    inputs: v.array(v.lazy(() => SimplePublicObjectId)),
    properties: v.array(v.string()),
    propertiesWithHistory: v.array(v.string()),
  })

export const BatchResponsePublicDefaultAssociation: v.GenericSchema<unknown, T.BatchResponsePublicDefaultAssociation> =
  v.looseObject({
    completedAt: v.string(),
    errors: v.optional(v.array(v.lazy(() => StandardError))),
    links: v.optional(v.record(v.string(), v.string())),
    numErrors: v.optional(integer()),
    requestedAt: v.optional(v.string()),
    results: v.array(v.lazy(() => PublicDefaultAssociation)),
    startedAt: v.string(),
    status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
  })

export const BatchResponseSimplePublicObject: v.GenericSchema<unknown, T.BatchResponseSimplePublicObject> =
  v.looseObject({
    completedAt: v.string(),
    links: v.optional(v.record(v.string(), v.string())),
    requestedAt: v.optional(v.string()),
    results: v.array(v.lazy(() => SimplePublicObject)),
    startedAt: v.string(),
    status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
  })

export const BatchResponseSimplePublicObjectWithErrors: v.GenericSchema<
  unknown,
  T.BatchResponseSimplePublicObjectWithErrors
> = v.looseObject({
  completedAt: v.string(),
  errors: v.optional(v.array(v.lazy(() => StandardError))),
  links: v.optional(v.record(v.string(), v.string())),
  numErrors: v.optional(integer()),
  requestedAt: v.optional(v.string()),
  results: v.array(v.lazy(() => SimplePublicObject)),
  startedAt: v.string(),
  status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
})

export const BatchResponseSimplePublicUpsertObject: v.GenericSchema<unknown, T.BatchResponseSimplePublicUpsertObject> =
  v.looseObject({
    completedAt: v.string(),
    links: v.optional(v.record(v.string(), v.string())),
    requestedAt: v.optional(v.string()),
    results: v.array(v.lazy(() => SimplePublicUpsertObject)),
    startedAt: v.string(),
    status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
  })

export const BatchResponseSimplePublicUpsertObjectWithErrors: v.GenericSchema<
  unknown,
  T.BatchResponseSimplePublicUpsertObjectWithErrors
> = v.looseObject({
  completedAt: v.string(),
  errors: v.optional(v.array(v.lazy(() => StandardError))),
  links: v.optional(v.record(v.string(), v.string())),
  numErrors: v.optional(integer()),
  requestedAt: v.optional(v.string()),
  results: v.array(v.lazy(() => SimplePublicUpsertObject)),
  startedAt: v.string(),
  status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
})

export const CollectionResponseAssociatedId: v.GenericSchema<unknown, T.CollectionResponseAssociatedId> = v.looseObject(
  {
    paging: v.optional(v.lazy(() => Paging)),
    results: v.array(v.lazy(() => AssociatedId)),
  },
)

export const CollectionResponseSimplePublicObjectWithAssociationsForwardPaging: v.GenericSchema<
  unknown,
  T.CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
> = v.looseObject({
  paging: v.optional(v.lazy(() => ForwardPaging)),
  results: v.array(v.lazy(() => SimplePublicObjectWithAssociations)),
})

export const CollectionResponseWithTotalSimplePublicObject: v.GenericSchema<
  unknown,
  T.CollectionResponseWithTotalSimplePublicObject
> = v.looseObject({
  paging: v.optional(v.lazy(() => Paging)),
  results: v.array(v.lazy(() => SimplePublicObject)),
  total: integer(),
})

export const ApiError: v.GenericSchema<unknown, T.ApiError> = v.looseObject({
  category: v.string(),
  context: v.optional(v.record(v.string(), v.array(v.string()))),
  correlationId: v.string(),
  errors: v.optional(v.array(v.lazy(() => ErrorDetail))),
  links: v.optional(v.record(v.string(), v.string())),
  message: v.string(),
  subCategory: v.optional(v.string()),
})

export const ErrorDetail: v.GenericSchema<unknown, T.ErrorDetail> = v.looseObject({
  code: v.optional(v.string()),
  context: v.optional(v.record(v.string(), v.array(v.string()))),
  in: v.optional(v.string()),
  message: v.string(),
  subCategory: v.optional(v.string()),
})

export const Filter: v.GenericSchema<unknown, T.Filter> = v.looseObject({
  highValue: v.optional(v.string()),
  operator: v.picklist([
    "BETWEEN",
    "CONTAINS_TOKEN",
    "EQ",
    "GT",
    "GTE",
    "HAS_PROPERTY",
    "IN",
    "LT",
    "LTE",
    "NEQ",
    "NOT_CONTAINS_TOKEN",
    "NOT_HAS_PROPERTY",
    "NOT_IN",
  ]),
  propertyName: v.string(),
  value: v.optional(v.string()),
  values: v.optional(v.array(v.string())),
})

export const FilterGroup: v.GenericSchema<unknown, T.FilterGroup> = v.looseObject({
  filters: v.array(v.lazy(() => Filter)),
})

export const ForwardPaging: v.GenericSchema<unknown, T.ForwardPaging> = v.looseObject({
  next: v.optional(v.lazy(() => NextPage)),
})

export const LabelsBetweenObjectPair: v.GenericSchema<unknown, T.LabelsBetweenObjectPair> = v.looseObject({
  fromObjectId: v.string(),
  fromObjectTypeId: v.string(),
  labels: v.array(v.string()),
  toObjectId: v.string(),
  toObjectTypeId: v.string(),
})

export const NextPage: v.GenericSchema<unknown, T.NextPage> = v.looseObject({
  after: v.string(),
  link: v.optional(v.string()),
})

export const Paging: v.GenericSchema<unknown, T.Paging> = v.looseObject({
  next: v.optional(v.lazy(() => NextPage)),
  prev: v.optional(v.lazy(() => PreviousPage)),
})

export const PreviousPage: v.GenericSchema<unknown, T.PreviousPage> = v.looseObject({
  before: v.string(),
  link: v.optional(v.string()),
})

export const PublicAssociationsForObject: v.GenericSchema<unknown, T.PublicAssociationsForObject> = v.looseObject({
  to: v.lazy(() => PublicObjectId),
  types: v.array(v.lazy(() => AssociationSpec)),
})

export const PublicDefaultAssociation: v.GenericSchema<unknown, T.PublicDefaultAssociation> = v.looseObject({
  associationSpec: v.lazy(() => AssociationSpec),
  from: v.lazy(() => PublicObjectId),
  to: v.lazy(() => PublicObjectId),
})

export const PublicGdprDeleteInput: v.GenericSchema<unknown, T.PublicGdprDeleteInput> = v.looseObject({
  idProperty: v.optional(v.string()),
  objectId: v.string(),
})

export const PublicMergeInput: v.GenericSchema<unknown, T.PublicMergeInput> = v.looseObject({
  objectIdToMerge: v.string(),
  primaryObjectId: v.string(),
})

export const PublicObjectId: v.GenericSchema<unknown, T.PublicObjectId> = v.looseObject({
  id: v.string(),
})

export const PublicObjectSearchRequest: v.GenericSchema<unknown, T.PublicObjectSearchRequest> = v.looseObject({
  after: v.string(),
  filterGroups: v.array(v.lazy(() => FilterGroup)),
  limit: integer(),
  properties: v.array(v.string()),
  query: v.optional(v.string()),
  sorts: v.array(v.string()),
})

export const PublicObjectWarning: v.GenericSchema<unknown, T.PublicObjectWarning> = v.looseObject({
  category: v.string(),
  context: v.record(v.string(), v.string()),
  message: v.string(),
})

export const SimplePublicObject: v.GenericSchema<unknown, T.SimplePublicObject> = v.looseObject({
  archived: v.boolean(),
  archivedAt: v.optional(v.string()),
  createdAt: v.string(),
  id: v.string(),
  objectWriteTraceId: v.optional(v.string()),
  properties: v.record(v.string(), v.string()),
  propertiesWithHistory: v.optional(v.record(v.string(), v.array(v.lazy(() => ValueWithTimestamp)))),
  updatedAt: v.string(),
  url: v.optional(v.string()),
  warnings: v.optional(v.array(v.lazy(() => PublicObjectWarning))),
})

export const SimplePublicObjectBatchInput: v.GenericSchema<unknown, T.SimplePublicObjectBatchInput> = v.looseObject({
  id: v.string(),
  idProperty: v.optional(v.string()),
  objectWriteTraceId: v.optional(v.string()),
  properties: v.record(v.string(), v.string()),
})

export const SimplePublicObjectBatchInputForCreate: v.GenericSchema<unknown, T.SimplePublicObjectBatchInputForCreate> =
  v.looseObject({
    associations: v.array(v.lazy(() => PublicAssociationsForObject)),
    objectWriteTraceId: v.optional(v.string()),
    properties: v.record(v.string(), v.string()),
  })

export const SimplePublicObjectBatchInputUpsert: v.GenericSchema<unknown, T.SimplePublicObjectBatchInputUpsert> =
  v.looseObject({
    id: v.string(),
    idProperty: v.optional(v.string()),
    objectWriteTraceId: v.optional(v.string()),
    properties: v.record(v.string(), v.string()),
  })

export const SimplePublicObjectId: v.GenericSchema<unknown, T.SimplePublicObjectId> = v.looseObject({
  id: v.string(),
})

export const SimplePublicObjectInput: v.GenericSchema<unknown, T.SimplePublicObjectInput> = v.looseObject({
  properties: v.record(v.string(), v.string()),
})

export const SimplePublicObjectInputForCreate: v.GenericSchema<unknown, T.SimplePublicObjectInputForCreate> =
  v.looseObject({
    associations: v.array(v.lazy(() => PublicAssociationsForObject)),
    properties: v.record(v.string(), v.string()),
  })

export const SimplePublicObjectWithAssociations: v.GenericSchema<unknown, T.SimplePublicObjectWithAssociations> =
  v.looseObject({
    archived: v.boolean(),
    archivedAt: v.optional(v.string()),
    associations: v.optional(
      v.record(
        v.string(),
        v.lazy(() => CollectionResponseAssociatedId),
      ),
    ),
    createdAt: v.string(),
    id: v.string(),
    objectWriteTraceId: v.optional(v.string()),
    properties: v.record(v.string(), v.string()),
    propertiesWithHistory: v.optional(v.record(v.string(), v.array(v.lazy(() => ValueWithTimestamp)))),
    updatedAt: v.string(),
    url: v.optional(v.string()),
    warnings: v.optional(v.array(v.lazy(() => PublicObjectWarning))),
  })

export const SimplePublicUpsertObject: v.GenericSchema<unknown, T.SimplePublicUpsertObject> = v.looseObject({
  archived: v.boolean(),
  archivedAt: v.optional(v.string()),
  createdAt: v.string(),
  id: v.string(),
  new: v.boolean(),
  objectWriteTraceId: v.optional(v.string()),
  properties: v.record(v.string(), v.string()),
  propertiesWithHistory: v.optional(v.record(v.string(), v.array(v.lazy(() => ValueWithTimestamp)))),
  updatedAt: v.string(),
  url: v.optional(v.string()),
  warnings: v.optional(v.array(v.lazy(() => PublicObjectWarning))),
})

export const StandardError: v.GenericSchema<unknown, T.StandardError> = v.looseObject({
  category: v.string(),
  context: v.record(v.string(), v.array(v.string())),
  errors: v.array(v.lazy(() => ErrorDetail)),
  id: v.optional(v.string()),
  links: v.record(v.string(), v.string()),
  message: v.string(),
  status: v.string(),
  subCategory: v.optional(v.looseObject({})),
})

export const ValueWithTimestamp: v.GenericSchema<unknown, T.ValueWithTimestamp> = v.looseObject({
  sourceId: v.optional(v.string()),
  sourceLabel: v.optional(v.string()),
  sourceType: v.string(),
  timestamp: v.string(),
  updatedByUserId: v.optional(integer()),
  value: v.string(),
})

export const CollectionResponsePublicOwnerForwardPaging: v.GenericSchema<
  unknown,
  T.CollectionResponsePublicOwnerForwardPaging
> = v.looseObject({
  paging: v.optional(v.lazy(() => ForwardPaging)),
  results: v.array(v.lazy(() => PublicOwner)),
})

export const PublicOwner: v.GenericSchema<unknown, T.PublicOwner> = v.looseObject({
  archived: v.boolean(),
  createdAt: v.string(),
  email: v.optional(v.string()),
  firstName: v.optional(v.string()),
  id: v.string(),
  lastName: v.optional(v.string()),
  teams: v.optional(v.array(v.lazy(() => PublicTeam))),
  type: v.picklist(["PERSON", "QUEUE"]),
  updatedAt: v.string(),
  userId: v.optional(integer()),
  userIdIncludingInactive: v.optional(integer()),
})

export const PublicTeam: v.GenericSchema<unknown, T.PublicTeam> = v.looseObject({
  id: v.string(),
  name: v.string(),
  primary: v.boolean(),
})

export const CollectionResponsePipelineNoPaging: v.GenericSchema<unknown, T.CollectionResponsePipelineNoPaging> =
  v.looseObject({
    results: v.array(v.lazy(() => Pipeline)),
  })

export const CollectionResponsePipelineStageNoPaging: v.GenericSchema<
  unknown,
  T.CollectionResponsePipelineStageNoPaging
> = v.looseObject({
  results: v.array(v.lazy(() => PipelineStage)),
})

export const CollectionResponsePublicAuditInfoNoPaging: v.GenericSchema<
  unknown,
  T.CollectionResponsePublicAuditInfoNoPaging
> = v.looseObject({
  results: v.array(v.lazy(() => PublicAuditInfo)),
})

export const Pipeline: v.GenericSchema<unknown, T.Pipeline> = v.looseObject({
  archived: v.boolean(),
  archivedAt: v.optional(v.string()),
  createdAt: v.string(),
  displayOrder: integer(),
  id: v.string(),
  label: v.string(),
  stages: v.array(v.lazy(() => PipelineStage)),
  updatedAt: v.string(),
})

export const PipelineInput: v.GenericSchema<unknown, T.PipelineInput> = v.looseObject({
  displayOrder: integer(),
  label: v.string(),
  pipelineId: v.optional(v.string()),
  stages: v.array(v.lazy(() => PipelineStageInput)),
})

export const PipelinePatchInput: v.GenericSchema<unknown, T.PipelinePatchInput> = v.looseObject({
  archived: v.optional(v.boolean()),
  displayOrder: v.optional(integer()),
  label: v.optional(v.string()),
})

export const PipelineReplaceInput: v.GenericSchema<unknown, T.PipelineReplaceInput> = v.looseObject({
  displayOrder: integer(),
  label: v.string(),
  stages: v.array(v.lazy(() => PipelineStageInput)),
})

export const PipelineStage: v.GenericSchema<unknown, T.PipelineStage> = v.looseObject({
  archived: v.boolean(),
  archivedAt: v.optional(v.string()),
  createdAt: v.string(),
  displayOrder: integer(),
  id: v.string(),
  label: v.string(),
  metadata: v.record(v.string(), v.string()),
  updatedAt: v.string(),
  writePermissions: v.picklist(["CRM_PERMISSIONS_ENFORCEMENT", "INTERNAL_ONLY", "READ_ONLY"]),
})

export const PipelineStageInput: v.GenericSchema<unknown, T.PipelineStageInput> = v.looseObject({
  displayOrder: integer(),
  label: v.string(),
  metadata: v.record(v.string(), v.string()),
  stageId: v.optional(v.string()),
})

export const PipelineStagePatchInput: v.GenericSchema<unknown, T.PipelineStagePatchInput> = v.looseObject({
  archived: v.optional(v.boolean()),
  displayOrder: v.optional(integer()),
  label: v.optional(v.string()),
  metadata: v.record(v.string(), v.string()),
})

export const PipelineStageReplaceInput: v.GenericSchema<unknown, T.PipelineStageReplaceInput> = v.looseObject({
  displayOrder: integer(),
  label: v.string(),
  metadata: v.record(v.string(), v.string()),
})

export const PublicAuditInfo: v.GenericSchema<unknown, T.PublicAuditInfo> = v.looseObject({
  action: v.string(),
  fromUserId: v.optional(integer()),
  identifier: v.string(),
  message: v.optional(v.string()),
  portalId: integer(),
  rawObject: v.optional(v.looseObject({})),
  timestamp: v.optional(v.string()),
})

export const BatchInputPropertyCreate: v.GenericSchema<unknown, T.BatchInputPropertyCreate> = v.looseObject({
  inputs: v.array(v.lazy(() => PropertyCreate)),
})

export const BatchInputPropertyName: v.GenericSchema<unknown, T.BatchInputPropertyName> = v.looseObject({
  inputs: v.array(v.lazy(() => PropertyName)),
})

export const BatchReadInputPropertyName: v.GenericSchema<unknown, T.BatchReadInputPropertyName> = v.looseObject({
  archived: v.boolean(),
  dataSensitivity: v.picklist(["highly_sensitive", "non_sensitive", "sensitive"]),
  inputs: v.array(v.lazy(() => PropertyName)),
})

export const BatchResponseProperty: v.GenericSchema<unknown, T.BatchResponseProperty> = v.looseObject({
  completedAt: v.string(),
  links: v.optional(v.record(v.string(), v.string())),
  requestedAt: v.optional(v.string()),
  results: v.array(v.lazy(() => Property)),
  startedAt: v.string(),
  status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
})

export const BatchResponsePropertyWithErrors: v.GenericSchema<unknown, T.BatchResponsePropertyWithErrors> =
  v.looseObject({
    completedAt: v.string(),
    errors: v.optional(v.array(v.lazy(() => StandardError))),
    links: v.optional(v.record(v.string(), v.string())),
    numErrors: v.optional(integer()),
    requestedAt: v.optional(v.string()),
    results: v.array(v.lazy(() => Property)),
    startedAt: v.string(),
    status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
  })

export const CollectionResponsePropertyGroupNoPaging: v.GenericSchema<
  unknown,
  T.CollectionResponsePropertyGroupNoPaging
> = v.looseObject({
  results: v.array(v.lazy(() => PropertyGroup)),
})

export const CollectionResponsePropertyNoPaging: v.GenericSchema<unknown, T.CollectionResponsePropertyNoPaging> =
  v.looseObject({
    results: v.array(v.lazy(() => Property)),
  })

export const Option: v.GenericSchema<unknown, T.Option> = v.looseObject({
  description: v.optional(v.string()),
  displayOrder: v.optional(integer()),
  hidden: v.boolean(),
  label: v.string(),
  value: v.string(),
})

export const OptionInput: v.GenericSchema<unknown, T.OptionInput> = v.looseObject({
  description: v.optional(v.string()),
  displayOrder: integer(),
  hidden: v.boolean(),
  label: v.string(),
  value: v.string(),
})

export const Property: v.GenericSchema<unknown, T.Property> = v.looseObject({
  archived: v.optional(v.boolean()),
  archivedAt: v.optional(v.string()),
  calculated: v.optional(v.boolean()),
  calculationFormula: v.optional(v.string()),
  createdAt: v.optional(v.string()),
  createdUserId: v.optional(v.string()),
  currencyPropertyName: v.optional(v.string()),
  dataSensitivity: v.optional(v.picklist(["highly_sensitive", "non_sensitive", "sensitive"])),
  dateDisplayHint: v.optional(v.picklist(["absolute", "absolute_with_relative", "time_since", "time_until"])),
  description: v.string(),
  displayOrder: v.optional(integer()),
  externalOptions: v.optional(v.boolean()),
  fieldType: v.string(),
  formField: v.optional(v.boolean()),
  groupName: v.string(),
  hasUniqueValue: v.optional(v.boolean()),
  hidden: v.optional(v.boolean()),
  hubspotDefined: v.optional(v.boolean()),
  label: v.string(),
  modificationMetadata: v.optional(v.lazy(() => PropertyModificationMetadata)),
  name: v.string(),
  numberDisplayHint: v.optional(
    v.picklist(["currency", "duration", "formatted", "percentage", "probability", "unformatted"]),
  ),
  options: v.array(v.lazy(() => Option)),
  referencedObjectType: v.optional(v.string()),
  sensitiveDataCategories: v.optional(v.array(v.string())),
  showCurrencySymbol: v.optional(v.boolean()),
  textDisplayHint: v.optional(
    v.picklist([
      "domain_name",
      "email",
      "ip_address",
      "multi_line",
      "phone_number",
      "physical_address",
      "postal_code",
      "unformatted_single_line",
    ]),
  ),
  type: v.string(),
  updatedAt: v.optional(v.string()),
  updatedUserId: v.optional(v.string()),
})

export const PropertyCreate: v.GenericSchema<unknown, T.PropertyCreate> = v.looseObject({
  calculationFormula: v.optional(v.string()),
  currencyPropertyName: v.optional(v.string()),
  dataSensitivity: v.optional(v.picklist(["highly_sensitive", "non_sensitive", "sensitive"])),
  description: v.optional(v.string()),
  displayOrder: v.optional(integer()),
  externalOptions: v.optional(v.boolean()),
  fieldType: v.picklist([
    "booleancheckbox",
    "calculation_equation",
    "checkbox",
    "date",
    "file",
    "html",
    "number",
    "phonenumber",
    "radio",
    "select",
    "text",
    "textarea",
  ]),
  formField: v.optional(v.boolean()),
  groupName: v.string(),
  hasUniqueValue: v.optional(v.boolean()),
  hidden: v.optional(v.boolean()),
  label: v.string(),
  name: v.string(),
  numberDisplayHint: v.optional(
    v.picklist(["currency", "duration", "formatted", "percentage", "probability", "unformatted"]),
  ),
  options: v.optional(v.array(v.lazy(() => OptionInput))),
  referencedObjectType: v.optional(v.string()),
  showCurrencySymbol: v.optional(v.boolean()),
  textDisplayHint: v.optional(
    v.picklist([
      "domain_name",
      "email",
      "ip_address",
      "multi_line",
      "phone_number",
      "physical_address",
      "postal_code",
      "unformatted_single_line",
    ]),
  ),
  type: v.picklist(["bool", "date", "datetime", "enumeration", "number", "phone_number", "string"]),
})

export const PropertyGroup: v.GenericSchema<unknown, T.PropertyGroup> = v.looseObject({
  archived: v.boolean(),
  displayOrder: v.optional(integer()),
  label: v.string(),
  name: v.string(),
})

export const PropertyGroupCreate: v.GenericSchema<unknown, T.PropertyGroupCreate> = v.looseObject({
  displayOrder: v.optional(integer()),
  label: v.string(),
  name: v.string(),
})

export const PropertyGroupUpdate: v.GenericSchema<unknown, T.PropertyGroupUpdate> = v.looseObject({
  displayOrder: v.optional(integer()),
  label: v.optional(v.string()),
})

export const PropertyModificationMetadata: v.GenericSchema<unknown, T.PropertyModificationMetadata> = v.looseObject({
  archivable: v.boolean(),
  readOnlyDefinition: v.boolean(),
  readOnlyOptions: v.optional(v.boolean()),
  readOnlyValue: v.boolean(),
})

export const PropertyName: v.GenericSchema<unknown, T.PropertyName> = v.looseObject({
  name: v.string(),
})

export const PropertyUpdate: v.GenericSchema<unknown, T.PropertyUpdate> = v.looseObject({
  calculationFormula: v.optional(v.string()),
  currencyPropertyName: v.optional(v.string()),
  description: v.optional(v.string()),
  displayOrder: v.optional(integer()),
  fieldType: v.optional(
    v.picklist([
      "booleancheckbox",
      "calculation_equation",
      "checkbox",
      "date",
      "file",
      "html",
      "number",
      "phonenumber",
      "radio",
      "select",
      "text",
      "textarea",
    ]),
  ),
  formField: v.optional(v.boolean()),
  groupName: v.optional(v.string()),
  hidden: v.optional(v.boolean()),
  label: v.optional(v.string()),
  numberDisplayHint: v.optional(
    v.picklist(["currency", "duration", "formatted", "percentage", "probability", "unformatted"]),
  ),
  options: v.optional(v.array(v.lazy(() => OptionInput))),
  showCurrencySymbol: v.optional(v.boolean()),
  textDisplayHint: v.optional(
    v.picklist([
      "domain_name",
      "email",
      "ip_address",
      "multi_line",
      "phone_number",
      "physical_address",
      "postal_code",
      "unformatted_single_line",
    ]),
  ),
  type: v.optional(v.picklist(["bool", "date", "datetime", "enumeration", "number", "phone_number", "string"])),
})

export const AssociationSpecWithLabel: v.GenericSchema<unknown, T.AssociationSpecWithLabel> = v.looseObject({
  category: v.picklist(["HUBSPOT_DEFINED", "INTEGRATOR_DEFINED", "USER_DEFINED", "WORK"]),
  fromObjectTypeId: v.optional(v.string()),
  label: v.optional(v.string()),
  toObjectTypeId: v.optional(v.string()),
  typeId: integer(),
})

export const BatchInputPublicAssociationMultiArchive: v.GenericSchema<
  unknown,
  T.BatchInputPublicAssociationMultiArchive
> = v.looseObject({
  inputs: v.array(v.lazy(() => PublicAssociationMultiArchive)),
})

export const BatchInputPublicAssociationMultiPost: v.GenericSchema<unknown, T.BatchInputPublicAssociationMultiPost> =
  v.looseObject({
    inputs: v.array(v.lazy(() => PublicAssociationMultiPost)),
  })

export const BatchInputPublicDefaultAssociationMultiPost: v.GenericSchema<
  unknown,
  T.BatchInputPublicDefaultAssociationMultiPost
> = v.looseObject({
  inputs: v.array(v.lazy(() => PublicDefaultAssociationMultiPost)),
})

export const BatchInputPublicFetchAssociationsBatchRequest: v.GenericSchema<
  unknown,
  T.BatchInputPublicFetchAssociationsBatchRequest
> = v.looseObject({
  inputs: v.array(v.lazy(() => PublicFetchAssociationsBatchRequest)),
})

export const BatchResponse: v.GenericSchema<unknown, T.BatchResponse> = v.looseObject({
  completedAt: v.string(),
  errors: v.optional(v.array(v.lazy(() => StandardError))),
  links: v.optional(v.record(v.string(), v.string())),
  numErrors: v.optional(integer()),
  requestedAt: v.optional(v.string()),
  results: v.array(v.looseObject({})),
  startedAt: v.string(),
  status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
})

export const BatchResponseLabelsBetweenObjectPair: v.GenericSchema<unknown, T.BatchResponseLabelsBetweenObjectPair> =
  v.looseObject({
    completedAt: v.string(),
    links: v.optional(v.record(v.string(), v.string())),
    requestedAt: v.optional(v.string()),
    results: v.array(v.lazy(() => LabelsBetweenObjectPair)),
    startedAt: v.string(),
    status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
  })

export const BatchResponseLabelsBetweenObjectPairWithErrors: v.GenericSchema<
  unknown,
  T.BatchResponseLabelsBetweenObjectPairWithErrors
> = v.looseObject({
  completedAt: v.string(),
  errors: v.optional(v.array(v.lazy(() => StandardError))),
  links: v.optional(v.record(v.string(), v.string())),
  numErrors: v.optional(integer()),
  requestedAt: v.optional(v.string()),
  results: v.array(v.lazy(() => LabelsBetweenObjectPair)),
  startedAt: v.string(),
  status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
})

export const BatchResponsePublicAssociationMultiWithLabel: v.GenericSchema<
  unknown,
  T.BatchResponsePublicAssociationMultiWithLabel
> = v.looseObject({
  completedAt: v.string(),
  links: v.optional(v.record(v.string(), v.string())),
  requestedAt: v.optional(v.string()),
  results: v.array(v.lazy(() => PublicAssociationMultiWithLabel)),
  startedAt: v.string(),
  status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
})

export const BatchResponsePublicAssociationMultiWithLabelWithErrors: v.GenericSchema<
  unknown,
  T.BatchResponsePublicAssociationMultiWithLabelWithErrors
> = v.looseObject({
  completedAt: v.string(),
  errors: v.optional(v.array(v.lazy(() => StandardError))),
  links: v.optional(v.record(v.string(), v.string())),
  numErrors: v.optional(integer()),
  requestedAt: v.optional(v.string()),
  results: v.array(v.lazy(() => PublicAssociationMultiWithLabel)),
  startedAt: v.string(),
  status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
})

export const AssociationsBatchResponsePublicDefaultAssociation: v.GenericSchema<
  unknown,
  T.AssociationsBatchResponsePublicDefaultAssociation
> = v.looseObject({
  completedAt: v.string(),
  errors: v.optional(v.array(v.lazy(() => StandardError))),
  links: v.optional(v.record(v.string(), v.string())),
  numErrors: v.optional(integer()),
  requestedAt: v.optional(v.string()),
  results: v.array(v.lazy(() => PublicDefaultAssociation1)),
  startedAt: v.string(),
  status: v.picklist(["CANCELED", "COMPLETE", "PENDING", "PROCESSING"]),
})

export const CollectionResponseMultiAssociatedObjectWithLabelForwardPaging: v.GenericSchema<
  unknown,
  T.CollectionResponseMultiAssociatedObjectWithLabelForwardPaging
> = v.looseObject({
  paging: v.optional(v.lazy(() => ForwardPaging)),
  results: v.array(v.lazy(() => MultiAssociatedObjectWithLabel)),
})

export const DateTime: v.GenericSchema<unknown, T.DateTime> = v.looseObject({
  dateOnly: v.boolean(),
  timeZoneShift: integer(),
  value: int64(),
})

export const MultiAssociatedObjectWithLabel: v.GenericSchema<unknown, T.MultiAssociatedObjectWithLabel> = v.looseObject(
  {
    associationTypes: v.array(v.lazy(() => AssociationSpecWithLabel)),
    toObjectId: v.string(),
  },
)

export const Paging1: v.GenericSchema<unknown, T.Paging1> = v.looseObject({
  next: v.optional(v.lazy(() => NextPage)),
  prev: v.optional(v.lazy(() => PreviousPage)),
})

export const PublicAssociationMultiArchive: v.GenericSchema<unknown, T.PublicAssociationMultiArchive> = v.looseObject({
  from: v.lazy(() => PublicObjectId),
  to: v.array(v.lazy(() => PublicObjectId)),
})

export const PublicAssociationMultiPost: v.GenericSchema<unknown, T.PublicAssociationMultiPost> = v.looseObject({
  from: v.lazy(() => PublicObjectId),
  to: v.lazy(() => PublicObjectId),
  types: v.array(v.lazy(() => AssociationSpec)),
})

export const PublicAssociationMultiWithLabel: v.GenericSchema<unknown, T.PublicAssociationMultiWithLabel> =
  v.looseObject({
    from: v.lazy(() => PublicObjectId),
    paging: v.optional(v.lazy(() => Paging1)),
    to: v.array(v.lazy(() => MultiAssociatedObjectWithLabel)),
  })

export const PublicDefaultAssociationMultiPost: v.GenericSchema<unknown, T.PublicDefaultAssociationMultiPost> =
  v.looseObject({
    from: v.lazy(() => PublicObjectId),
    to: v.lazy(() => PublicObjectId),
  })

export const PublicDefaultAssociation1: v.GenericSchema<unknown, T.PublicDefaultAssociation1> = v.looseObject({
  associationSpec: v.lazy(() => AssociationSpec),
  from: v.lazy(() => PublicObjectId),
  to: v.lazy(() => PublicObjectId),
})

export const PublicFetchAssociationsBatchRequest: v.GenericSchema<unknown, T.PublicFetchAssociationsBatchRequest> =
  v.looseObject({
    after: v.optional(v.string()),
    id: v.string(),
  })

export const ReportCreationResponse: v.GenericSchema<unknown, T.ReportCreationResponse> = v.looseObject({
  enqueueTime: v.lazy(() => DateTime),
  userEmail: v.string(),
  userId: integer(),
})

export const ApiUsage: v.GenericSchema<unknown, T.ApiUsage> = v.looseObject({
  collectedAt: v.string(),
  currentUsage: integer(),
  fetchStatus: v.picklist(["CACHED", "FAILURE", "NOTFOUND", "SUCCESS", "TIMEOUT"]),
  name: v.string(),
  resetsAt: v.optional(v.string()),
  usageLimit: integer(),
})

export const CollectionResponseApiUsageNoPaging: v.GenericSchema<unknown, T.CollectionResponseApiUsageNoPaging> =
  v.looseObject({
    results: v.array(v.lazy(() => ApiUsage)),
  })

export const PortalInformationResponse: v.GenericSchema<unknown, T.PortalInformationResponse> = v.looseObject({
  accountType: v.picklist(["APP_DEVELOPER", "DEVELOPER_TEST", "SANDBOX", "STANDARD"]),
  additionalCurrencies: v.array(v.string()),
  companyCurrency: v.string(),
  dataHostingLocation: v.string(),
  portalId: integer(),
  timeZone: v.string(),
  uiDomain: v.string(),
  utcOffset: v.string(),
  utcOffsetMilliseconds: int64(),
})

export const PutCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdRequest: v.GenericSchema<
  unknown,
  T.PutCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdRequest
> = v.array(v.lazy(() => AssociationSpec))

export const schemas = {
  AssociatedId,
  AssociationSpec,
  BatchInputSimplePublicObjectBatchInput,
  BatchInputSimplePublicObjectBatchInputForCreate,
  BatchInputSimplePublicObjectBatchInputUpsert,
  BatchInputSimplePublicObjectId,
  BatchReadInputSimplePublicObjectId,
  BatchResponsePublicDefaultAssociation,
  BatchResponseSimplePublicObject,
  BatchResponseSimplePublicObjectWithErrors,
  BatchResponseSimplePublicUpsertObject,
  BatchResponseSimplePublicUpsertObjectWithErrors,
  CollectionResponseAssociatedId,
  CollectionResponseSimplePublicObjectWithAssociationsForwardPaging,
  CollectionResponseWithTotalSimplePublicObject,
  ApiError,
  ErrorDetail,
  Filter,
  FilterGroup,
  ForwardPaging,
  LabelsBetweenObjectPair,
  NextPage,
  Paging,
  PreviousPage,
  PublicAssociationsForObject,
  PublicDefaultAssociation,
  PublicGdprDeleteInput,
  PublicMergeInput,
  PublicObjectId,
  PublicObjectSearchRequest,
  PublicObjectWarning,
  SimplePublicObject,
  SimplePublicObjectBatchInput,
  SimplePublicObjectBatchInputForCreate,
  SimplePublicObjectBatchInputUpsert,
  SimplePublicObjectId,
  SimplePublicObjectInput,
  SimplePublicObjectInputForCreate,
  SimplePublicObjectWithAssociations,
  SimplePublicUpsertObject,
  StandardError,
  ValueWithTimestamp,
  CollectionResponsePublicOwnerForwardPaging,
  PublicOwner,
  PublicTeam,
  CollectionResponsePipelineNoPaging,
  CollectionResponsePipelineStageNoPaging,
  CollectionResponsePublicAuditInfoNoPaging,
  Pipeline,
  PipelineInput,
  PipelinePatchInput,
  PipelineReplaceInput,
  PipelineStage,
  PipelineStageInput,
  PipelineStagePatchInput,
  PipelineStageReplaceInput,
  PublicAuditInfo,
  BatchInputPropertyCreate,
  BatchInputPropertyName,
  BatchReadInputPropertyName,
  BatchResponseProperty,
  BatchResponsePropertyWithErrors,
  CollectionResponsePropertyGroupNoPaging,
  CollectionResponsePropertyNoPaging,
  Option,
  OptionInput,
  Property,
  PropertyCreate,
  PropertyGroup,
  PropertyGroupCreate,
  PropertyGroupUpdate,
  PropertyModificationMetadata,
  PropertyName,
  PropertyUpdate,
  AssociationSpecWithLabel,
  BatchInputPublicAssociationMultiArchive,
  BatchInputPublicAssociationMultiPost,
  BatchInputPublicDefaultAssociationMultiPost,
  BatchInputPublicFetchAssociationsBatchRequest,
  BatchResponse,
  BatchResponseLabelsBetweenObjectPair,
  BatchResponseLabelsBetweenObjectPairWithErrors,
  BatchResponsePublicAssociationMultiWithLabel,
  BatchResponsePublicAssociationMultiWithLabelWithErrors,
  AssociationsBatchResponsePublicDefaultAssociation,
  CollectionResponseMultiAssociatedObjectWithLabelForwardPaging,
  DateTime,
  MultiAssociatedObjectWithLabel,
  Paging1,
  PublicAssociationMultiArchive,
  PublicAssociationMultiPost,
  PublicAssociationMultiWithLabel,
  PublicDefaultAssociationMultiPost,
  PublicDefaultAssociation1,
  PublicFetchAssociationsBatchRequest,
  ReportCreationResponse,
  ApiUsage,
  CollectionResponseApiUsageNoPaging,
  PortalInformationResponse,
  PutCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdRequest,
} as const
