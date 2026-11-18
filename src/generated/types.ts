// GENERATED. DO NOT EDIT.
// Source: spec/hubspot/, checked against provenance.json
// Run: pnpm generate

/** Contains the id and type of an association */
export type AssociatedId = {
  /** The unique identifier for the associated object. */
  id: string
  /** The type of associations. */
  type: string
}

/** Defines the type, direction, and details of the relationship between two CRM objects. */
export type AssociationSpec = {
  /** The category of the association, indicating its origin or purpose. Valid values include "HUBSPOT_DEFINED", "USER_DEFINED", "INTEGRATOR_DEFINED", and "WORK". */
  associationCategory: "HUBSPOT_DEFINED" | "INTEGRATOR_DEFINED" | "USER_DEFINED" | "WORK"
  /** An integer representing the unique identifier for the type of association. */
  associationTypeId: number
}

/** Represents a batch input component used to handle multiple simple public objects in a single API request. This component is typically used when performing batch operations to create, update, or delete multiple records simultaneously. */
export type BatchInputSimplePublicObjectBatchInput = {
  /** An array of simple public objects to be processed in the batch operation. Each object in the array contains the data necessary for the specific operation being performed. */
  inputs: Array<SimplePublicObjectBatchInput>
}

/** Represents a batch input for creating multiple simple public objects in a single request. This component is used to streamline the process of adding new objects to a HubSpot account by allowing multiple entries to be created at once. */
export type BatchInputSimplePublicObjectBatchInputForCreate = {
  /** An array of simple public objects to be created. Each object in the array contains the necessary data for creating a new entry in the system. */
  inputs: Array<SimplePublicObjectBatchInputForCreate>
}

/** Represents a batch input operation for upserting simple public objects in HubSpot. This component is used to process multiple upsert operations in a single request, improving efficiency and performance. */
export type BatchInputSimplePublicObjectBatchInputUpsert = {
  /** An array of simple public objects to be upserted. Each object in the array contains the necessary data for creating or updating a record in HubSpot. */
  inputs: Array<SimplePublicObjectBatchInputUpsert>
}

/** Represents a batch input payload containing a list of simple public object IDs. This component is used when performing batch operations on multiple objects within HubSpot. */
export type BatchInputSimplePublicObjectId = {
  /** An array of simple public object IDs to be processed in the batch operation. */
  inputs: Array<SimplePublicObjectId>
}

/** Specifies the input for reading a batch of CRM objects, including arrays of object IDs, requested property names (with optional history), and an optional unique identifying property. */
export type BatchReadInputSimplePublicObjectId = {
  /** When using a custom unique value property to retrieve records, the name of the property. Do not include this parameter if retrieving by record ID. */
  idProperty?: string
  /** An array of SimplePublicObjectId objects, each containing the ID of an object to be read. */
  inputs: Array<SimplePublicObjectId>
  /** An array of the property names to be returned in the response. If a specified property is not present on the requested object(s), it will be ignored. */
  properties: Array<string>
  /** An array of the property names to be returned along with their history of previous values. If a specified property is not present on the requested object(s), it will be ignored. */
  propertiesWithHistory: Array<string>
}

/** The response returned after performing a batch operation on associations. */
export type BatchResponsePublicDefaultAssociation = {
  /** The timestamp when the batch process was completed, in ISO 8601 format. */
  completedAt: string
  /** An array of StandardError objects detailing any errors that occurred during the batch operation. */
  errors?: Array<StandardError>
  /** A map of link names to associated URIs, providing additional information or actions related to the batch operation. */
  links?: { [key: string]: string }
  /** The total number of errors that occurred during the operation. */
  numErrors?: number
  /** The timestamp when the batch process was initiated, in ISO 8601 format. */
  requestedAt?: string
  /** An array of PublicDefaultAssociation objects representing the results of the batch operation. */
  results: Array<PublicDefaultAssociation>
  /** The timestamp when the batch process began execution, in ISO 8601 format. */
  startedAt: string
  /** The status of the batch processing request. Can be: "PENDING", "PROCESSING", "CANCELED", or "COMPLETE". */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

/** A public object batch response object */
export type BatchResponseSimplePublicObject = {
  /** The timestamp when the batch processing was completed, in ISO 8601 format. */
  completedAt: string
  /** A map of link names to associated URIs, providing additional information or actions related to the batch operation. */
  links?: { [key: string]: string }
  /** The timestamp when the batch request was initially made, in ISO 8601 format. */
  requestedAt?: string
  /** An array of SimplePublicObject items representing the results of the batch operation. */
  results: Array<SimplePublicObject>
  /** The timestamp when the batch processing began, in ISO 8601 format. */
  startedAt: string
  /** The status of the batch processing request. The expected value is "COMPLETE". */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

/** Represents the result of a batch operation on CRM objects, including the processing status, batch results, timestamps, and a list of any errors encountered during the operation. */
export type BatchResponseSimplePublicObjectWithErrors = {
  /** The timestamp when the batch process was completed, in ISO 8601 format. */
  completedAt: string
  errors?: Array<StandardError>
  /** An object containing relevant links related to the batch request. */
  links?: { [key: string]: string }
  /** The number of errors encountered during the batch process. */
  numErrors?: number
  /** The timestamp when the batch process was initiated, in ISO 8601 format. */
  requestedAt?: string
  results: Array<SimplePublicObject>
  /** The timestamp when the batch process began execution, in ISO 8601 format. */
  startedAt: string
  /** The status of the batch processing request - "PENDING", "PROCESSING", "CANCELLED", or "COMPLETE" */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

/** Represents the result of a batch upsert operation, including the operation’s status, timestamps, and a list of successfully created or updated objects. */
export type BatchResponseSimplePublicUpsertObject = {
  /** The timestamp when the batch process was completed, in ISO 8601 format. */
  completedAt: string
  /** A map of link names to associated URIs, providing additional information or actions related to the batch operation. */
  links?: { [key: string]: string }
  /** The timestamp when the batch process was initiated, in ISO 8601 format. */
  requestedAt?: string
  /** An array of SimplePublicUpsertObject items representing the results of the batch upsert operation. */
  results: Array<SimplePublicUpsertObject>
  /** The timestamp when the batch process began execution, in ISO 8601 format. */
  startedAt: string
  /** The status of the batch processing request. Can be: "PENDING", "PROCESSING", "CANCELED", or "COMPLETE". */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

/** Represents the response from a batch upsert operation, including the status, timestamps, successfully processed objects, and any errors that occurred during processing. */
export type BatchResponseSimplePublicUpsertObjectWithErrors = {
  /** The timestamp when the batch process was completed, in ISO 8601 format. */
  completedAt: string
  errors?: Array<StandardError>
  /** An object containing relevant links related to the batch request. */
  links?: { [key: string]: string }
  /** The number of errors encountered during the batch process. */
  numErrors?: number
  /** The timestamp when the batch process was initiated, in ISO 8601 format. */
  requestedAt?: string
  results: Array<SimplePublicUpsertObject>
  /** The timestamp when the batch process began execution, in ISO 8601 format. */
  startedAt: string
  /** The status of the batch processing request. Can be: "PENDING", "PROCESSING", "CANCELLED", or "COMPLETE". */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

/** Represents a collection of associated IDs returned by an API request, including pagination details for navigating through the results. */
export type CollectionResponseAssociatedId = {
  paging?: Paging
  /** A list of associated IDs retrieved from the API request. */
  results: Array<AssociatedId>
}

/** Represents a paginated collection response that includes simple public objects with their associations. This component is used to handle the results and pagination details when retrieving a list of objects from the API. */
export type CollectionResponseSimplePublicObjectWithAssociationsForwardPaging = {
  paging?: ForwardPaging
  /** An array of simple public objects that are included in the current page of the response. Each object may include its associated data. */
  results: Array<SimplePublicObjectWithAssociations>
}

/** Represents a list of simple objects returned from an API request, along with the total count of objects available. */
export type CollectionResponseWithTotalSimplePublicObject = {
  paging?: Paging
  /** An array containing the simple public objects returned in the current page of the response. This property is required. */
  results: Array<SimplePublicObject>
  /** The number of available results */
  total: number
}

/** Represents an error response returned by the API when an operation fails. This component is used in various endpoints to provide detailed information about the error encountered. */
export type ApiError = {
  /** The error category */
  category: string
  /** Context about the error condition */
  context?: { [key: string]: Array<string> }
  /** A unique identifier for the request. Include this value with any error reports or support tickets */
  correlationId: string
  /** further information about the error */
  errors?: Array<ErrorDetail>
  /** A map of link names to associated URIs containing documentation about the error or recommended remediation steps */
  links?: { [key: string]: string }
  /** A human readable message describing the error along with remediation steps where appropriate */
  message: string
  /** A specific category that contains more specific detail about the error */
  subCategory?: string
}

/** Represents detailed information about an error that occurred in the API. This component is used to provide additional context and specifics about errors, typically as part of an error response. */
export type ErrorDetail = {
  /** The status code associated with the error detail */
  code?: string
  /** Context about the error condition */
  context?: { [key: string]: Array<string> }
  /** The name of the field or parameter in which the error was found. */
  in?: string
  /** A human readable message describing the error along with remediation steps where appropriate */
  message: string
  /** A specific category that contains more specific detail about the error */
  subCategory?: string
}

/** Defines a single condition for searching CRM objects, specifying the property to filter on, the operator to use (such as equals, greater than, or contains), and the value(s) to compare against. */
export type Filter = {
  /** The upper boundary value when using ranged-based filters. */
  highValue?: string
  /** The comparison operator used in the filter, such as "EQ" or "GT". */
  operator:
    | "BETWEEN"
    | "CONTAINS_TOKEN"
    | "EQ"
    | "GT"
    | "GTE"
    | "HAS_PROPERTY"
    | "IN"
    | "LT"
    | "LTE"
    | "NEQ"
    | "NOT_CONTAINS_TOKEN"
    | "NOT_HAS_PROPERTY"
    | "NOT_IN"
  /** The name of the property to apply the filter to. */
  propertyName: string
  /** The value to match against the property. */
  value?: string
  /** The values to match against the property. */
  values?: Array<string>
}

/** Represents a group of filters used to query data within HubSpot. This component is used to define criteria for filtering records in various API endpoints. */
export type FilterGroup = {
  /** A list of individual filter criteria that are applied together as a group. Each filter specifies a condition that records must meet to be included in the results. */
  filters: Array<Filter>
}

/** Paging information for forward-only pagination. Contains the next page reference when more results are available; omitted or empty on the last page. */
export type ForwardPaging = {
  next?: NextPage
}

/** The relationship descriptors applicable between two object types. */
export type LabelsBetweenObjectPair = {
  /** Source unique ID of the object. */
  fromObjectId: string
  /** Source object type. */
  fromObjectTypeId: string
  /** An array of labels that describe the relationship between the two objects. This is a required property. */
  labels: Array<string>
  /** Target unique ID of the object. */
  toObjectId: string
  /** Target object type. */
  toObjectTypeId: string
}

/** Specifies the paging information needed to retrieve the next set of results in a paginated API response */
export type NextPage = {
  /** A paging cursor token for retrieving subsequent pages. */
  after: string
  /** A URL that can be used to retrieve the next page results. */
  link?: string
}

/** Represents the pagination information for navigating through a list of results in the API. It provides details on how to access the previous or next set of results. */
export type Paging = {
  next?: NextPage
  prev?: PreviousPage
}

/** specifies the paging information needed to retrieve the previous set of results in a paginated API response */
export type PreviousPage = {
  /** A paging cursor token for retrieving previous pages. */
  before: string
  /** A URL that can be used to retrieve the previous pages' results. */
  link?: string
}

/** Represents the associations for a specific object in HubSpot, detailing the types of associations and the related objects involved. */
export type PublicAssociationsForObject = {
  to: PublicObjectId
  /** The types of associations that exist between the object and other entities, indicating the nature of their relationship. */
  types: Array<AssociationSpec>
}

/** The PublicDefaultAssociation component represents the default association configuration between two objects in HubSpot. It is used to define how objects are related to each other within the platform. */
export type PublicDefaultAssociation = {
  associationSpec: AssociationSpec
  from: PublicObjectId
  to: PublicObjectId
}

/** An input that contains the information required to process a public GDPR data deletion request. */
export type PublicGdprDeleteInput = {
  /** The name of a property whose values are unique for this object. An alternative to identifying a contact by ID. */
  idProperty?: string
  /** The ID of the contact to permanently delete. */
  objectId: string
}

/** Input data for merging two records. */
export type PublicMergeInput = {
  /** The object ID of the record that the merge will not set as the current value after the merge. */
  objectIdToMerge: string
  /** The object ID of the record that the merge will generally set as the current value after the merge. */
  primaryObjectId: string
}

/** Contains the Id of a Public Object */
export type PublicObjectId = {
  /** The unique ID of the object. */
  id: string
}

/** Describes a search request */
export type PublicObjectSearchRequest = {
  /** A paging cursor token for retrieving subsequent pages. */
  after?: string
  /** Up to 6 groups of filters defining additional query criteria. */
  filterGroups: Array<FilterGroup>
  /** The maximum results to return, up to 200 objects. */
  limit: number
  /** A list of property names to include in the response. */
  properties: Array<string>
  /** The search query string, up to 3000 characters. */
  query?: string
  /** Specifies sorting order based on object properties. */
  sorts: Array<{
    propertyName: string
    direction?: "ASCENDING" | "DESCENDING"
  }>
}

/** Represents a warning message related to a public object in HubSpot, providing details about the nature and context of the warning. */
export type PublicObjectWarning = {
  /** The classification of the warning, indicating the type or nature of the issue. */
  category: string
  /** Additional information or metadata about the warning, providing context for understanding the issue. */
  context: { [key: string]: string }
  /** The text of the warning message, providing information about the issue or alert. */
  message: string
}

/** A simple public object. */
export type SimplePublicObject = {
  /** Whether the object is archived. */
  archived: boolean
  /** The timestamp when the object was archived, in ISO 8601 format. */
  archivedAt?: string
  /** The timestamp when the object was created, in ISO 8601 format. */
  createdAt: string
  /** The unique ID of the object. */
  id: string
  /** An identifier used to trace the write request for the object. Set a unique ID for each write operation; it is returned with any errors so you can identify which request encountered which error. */
  objectWriteTraceId?: string
  /** Key-value pairs representing the properties of the object. */
  properties: { [key: string]: string }
  /** Key-value pairs representing the properties of the object along with their history, each with a timestamp and source information. */
  propertiesWithHistory?: { [key: string]: Array<ValueWithTimestamp> }
  /** The timestamp when the object was last updated, in ISO 8601 format. */
  updatedAt: string
  /** The URL associated with the object. */
  url?: string
  warnings?: Array<PublicObjectWarning>
}

/** Contains an array of CRM object records to be processed in a batch operation, each defined by their ID and properties. */
export type SimplePublicObjectBatchInput = {
  /** The ID of the contact to update. This can be the object ID, or the unique property value of the `idProperty` property. */
  id: string
  /** The name of a unique property, when identifying records by property. */
  idProperty?: string
  /** A unique identifier for tracing the request. */
  objectWriteTraceId?: string
  /** Key-value pairs representing the properties of the object. */
  properties: { [key: string]: string }
}

/** An input object that contains a collection of objects to be created together in a batch. */
export type SimplePublicObjectBatchInputForCreate = {
  /** An array of associations that define the relationships between the objects being created and other existing objects. This property is required. */
  associations: Array<PublicAssociationsForObject>
  /** An identifier used for tracing the creation or update request of the object. */
  objectWriteTraceId?: string
  /** Key value pairs representing the properties of the object. */
  properties: { [key: string]: string }
}

/** Represents an object used in batch upsert operations, containing an object’s unique identifier, its properties, and optionally the unique property name and a write trace ID. */
export type SimplePublicObjectBatchInputUpsert = {
  /** The unique ID of the object. */
  id: string
  /** The name of a property whose values are unique for this object */
  idProperty?: string
  /** An identifier for tracing the creation request. */
  objectWriteTraceId?: string
  /** Key value pairs representing the properties of the object. */
  properties: { [key: string]: string }
}

/** Contains the Id of a Public Object */
export type SimplePublicObjectId = {
  /** The unique ID of the object. */
  id: string
}

/** Represents the input required to update a CRM object, containing an object with property names and their corresponding values. */
export type SimplePublicObjectInput = {
  /** Key value pairs representing the properties of the object. */
  properties: { [key: string]: string }
}

/** Is the input object used to create a new CRM object, containing the properties to be set and optional associations to link the new record with other CRM objects. */
export type SimplePublicObjectInputForCreate = {
  /** An array that specifies the relationships between the new public object and existing objects. This is required to establish how the new object is connected within the system. */
  associations: Array<PublicAssociationsForObject>
  /** Key-value pairs for setting properties for the new object. */
  properties: { [key: string]: string }
}

/** Represents a CRM object along with its properties, timestamps, and a set of associated object IDs grouped by association type. */
export type SimplePublicObjectWithAssociations = {
  /** Whether the object is archived. */
  archived: boolean
  /** The timestamp when the object was archived, in ISO 8601 format. */
  archivedAt?: string
  /** A map of associated object types to their associated IDs. */
  associations?: { [key: string]: CollectionResponseAssociatedId }
  /** The timestamp when the object was created, in ISO 8601 format. */
  createdAt: string
  /** The unique ID of the object. */
  id: string
  /** An identifier used for tracing the creation or update request of the object. */
  objectWriteTraceId?: string
  /** Key value pairs representing the properties of the object. */
  properties: { [key: string]: string }
  /** Key-value pairs representing the properties of the object along with their history. */
  propertiesWithHistory?: { [key: string]: Array<ValueWithTimestamp> }
  /** The timestamp when the object was last updated, in ISO 8601 format. */
  updatedAt: string
  /** The URL link to access this object. */
  url?: string
  warnings?: Array<PublicObjectWarning>
}

/** Represents a CRM object that has either been created or updated (upserted) */
export type SimplePublicUpsertObject = {
  /** Whether the object is archived. */
  archived: boolean
  /** The timestamp when the object was archived, in ISO 8601 format. */
  archivedAt?: string
  /** The timestamp when the object was created, in ISO 8601 format. */
  createdAt: string
  /** The unique ID of the object. */
  id: string
  /** Whether the property is new. */
  new: boolean
  /** An identifier for tracing the creation request. */
  objectWriteTraceId?: string
  /** Key value pairs representing the properties of the object. */
  properties: { [key: string]: string }
  /** Key-value pairs representing the properties of the object along with their history. */
  propertiesWithHistory?: { [key: string]: Array<ValueWithTimestamp> }
  /** The timestamp when the object was last updated, in ISO 8601 format. */
  updatedAt: string
  /** The URL associated with the object. */
  url?: string
  warnings?: Array<PublicObjectWarning>
}

/** Represents a standard error response in the HubSpot API, providing detailed information about an error that occurred during an API request. */
export type StandardError = {
  /** The main category of the error. */
  category: string
  /** Additional context-specific information related to the error. */
  context: { [key: string]: Array<string> }
  /** The detailed error objects. */
  errors: Array<ErrorDetail>
  /** A unique ID for the error instance. */
  id?: string
  /** URLs linking to documentation or resources associated with the error. */
  links: { [key: string]: string }
  /** A human-readable string describing the error and possible remediation steps. */
  message: string
  /** A text status code for the error, typically "error". */
  status: string
  /** A more specific error category within each main category. */
  subCategory?: Record<string, unknown>
}

/** Property model that includes timestamp. */
export type ValueWithTimestamp = {
  /** A string identifier for the specific source of the value. */
  sourceId?: string
  /** A human-readable label. */
  sourceLabel?: string
  /** A string indicating the type of source from which the value originated. */
  sourceType: string
  /** The timestamp when the property was updated, in ISO 8601 format. */
  timestamp: string
  /** The ID of the user who last updated the property. */
  updatedByUserId?: number
  /** The property value. */
  value: string
}

export type CollectionResponsePublicOwnerForwardPaging = {
  paging?: ForwardPaging
  /** An array of PublicOwner objects, each representing an individual owner with their specific details. */
  results: Array<PublicOwner>
}

export type PublicOwner = {
  /** Indicates whether the owner is archived. */
  archived: boolean
  /** The date and time when the owner was created. */
  createdAt: string
  /** The email address of the owner. */
  email?: string
  /** The first name of the owner. */
  firstName?: string
  /** The unique identifier of the owner. */
  id: string
  /** The last name of the owner. */
  lastName?: string
  /** An array of teams associated with the owner, where each team is represented by a PublicTeam object. */
  teams?: Array<PublicTeam>
  /** The type of the owner, which can be either PERSON or QUEUE. */
  type: "PERSON" | "QUEUE"
  /** The date and time when the owner was last updated. */
  updatedAt: string
  /** The user ID of the owner. */
  userId?: number
  /** The user ID of the owner, including inactive users. */
  userIdIncludingInactive?: number
}

export type PublicTeam = {
  /** The unique identifier for the team, represented as a string. */
  id: string
  /** The name of the team, represented as a string. */
  name: string
  /** A boolean indicating whether this team is the primary team. */
  primary: boolean
}

export type CollectionResponsePipelineNoPaging = {
  results: Array<Pipeline>
}

export type CollectionResponsePipelineStageNoPaging = {
  results: Array<PipelineStage>
}

export type CollectionResponsePublicAuditInfoNoPaging = {
  results: Array<PublicAuditInfo>
}

export type Pipeline = {
  /** Whether the pipeline is archived. */
  archived: boolean
  /** The date the pipeline was archived. `archivedAt` will only be present if the pipeline is archived. */
  archivedAt?: string
  /** The date the pipeline was created. The default pipelines will have createdAt = 0. */
  createdAt: string
  /** The order for displaying this pipeline. If two pipelines have a matching `displayOrder`, they will be sorted alphabetically by label. */
  displayOrder: number
  /** A unique identifier generated by HubSpot that can be used to retrieve and update the pipeline. */
  id: string
  /** A unique label used to organize pipelines in HubSpot's UI */
  label: string
  /** The stages associated with the pipeline. They can be retrieved and updated via the pipeline stages endpoints. */
  stages: Array<PipelineStage>
  /** The date the pipeline was last updated. */
  updatedAt: string
}

export type PipelineInput = {
  /** The order for displaying this pipeline. If two pipelines have a matching `displayOrder`, they will be sorted alphabetically by label. */
  displayOrder: number
  /** A unique label used to organize pipelines in HubSpot's UI */
  label: string
  pipelineId?: string
  /** Pipeline stage inputs used to create the new or replacement pipeline. */
  stages: Array<PipelineStageInput>
}

export type PipelinePatchInput = {
  /** Whether the pipeline is archived. This property should only be provided when restoring an archived pipeline. If it's provided in any other call, the request will fail and a `400 Bad Request` will be returned. */
  archived?: boolean
  /** The order for displaying this pipeline. If two pipelines have a matching `displayOrder`, they will be sorted alphabetically by label. */
  displayOrder?: number
  /** A unique label used to organize pipelines in HubSpot's UI */
  label?: string
}

export type PipelineReplaceInput = {
  /** The order for displaying this pipeline stage. If two pipeline stages have a matching `displayOrder`, they will be sorted alphabetically by label. */
  displayOrder: number
  /** A label used to organize pipeline stages in HubSpot's UI. Each pipeline stage's label must be unique within that pipeline. */
  label: string
  /** The stages associated with the pipeline. They can be retrieved and updated via the pipeline stages endpoints. */
  stages: Array<PipelineStageInput>
}

export type PipelineStage = {
  /** Whether the pipeline is archived. */
  archived: boolean
  /** The date the pipeline was archived. `archivedAt` will only be present if the pipeline is archived. */
  archivedAt?: string
  /** The date the pipeline stage was created. The stages on default pipelines will have createdAt = 0. */
  createdAt: string
  /** The order for displaying this pipeline stage. If two pipeline stages have a matching `displayOrder`, they will be sorted alphabetically by label. */
  displayOrder: number
  /** A unique identifier generated by HubSpot that can be used to retrieve and update the pipeline stage. */
  id: string
  /** A label used to organize pipeline stages in HubSpot's UI. Each pipeline stage's label must be unique within that pipeline. */
  label: string
  /** A JSON object containing properties that are not present on all object pipelines. For `deals` pipelines, the `probability` field is required (`{ "probability": 0.5 }`), and represents the likelihood a deal will close. Possible values are between 0.0 and 1.0 in increments of 0.1. For `tickets` pipelines, the `ticketState` field is optional (`{ "ticketState": "OPEN" }`), and represents whether the ticket remains open or has been closed by a member of your Support team. Possible values are `OPEN` or `CLOSED`. */
  metadata: { [key: string]: string }
  /** The date the pipeline stage was last updated. */
  updatedAt: string
  /** Defines the level of write access for the pipeline stage, with possible values being CRM_PERMISSIONS_ENFORCEMENT, READ_ONLY, or INTERNAL_ONLY. */
  writePermissions: "CRM_PERMISSIONS_ENFORCEMENT" | "INTERNAL_ONLY" | "READ_ONLY"
}

export type PipelineStageInput = {
  /** The order for displaying this pipeline stage. If two pipeline stages have a matching `displayOrder`, they will be sorted alphabetically by label. */
  displayOrder: number
  /** A label used to organize pipeline stages in HubSpot's UI. Each pipeline stage's label must be unique within that pipeline. */
  label: string
  /** A JSON object containing properties that are not present on all object pipelines. For `deals` pipelines, the `probability` field is required (`{ "probability": 0.5 }`), and represents the likelihood a deal will close. Possible values are between 0.0 and 1.0 in increments of 0.1. For `tickets` pipelines, the `ticketState` field is optional (`{ "ticketState": "OPEN" }`), and represents whether the ticket remains open or has been closed by a member of your Support team. Possible values are `OPEN` or `CLOSED`. */
  metadata: { [key: string]: string }
  stageId?: string
}

export type PipelineStagePatchInput = {
  /** Whether the pipeline is archived. */
  archived?: boolean
  /** The order for displaying this pipeline stage. If two pipeline stages have a matching `displayOrder`, they will be sorted alphabetically by label. */
  displayOrder?: number
  /** A label used to organize pipeline stages in HubSpot's UI. Each pipeline stage's label must be unique within that pipeline. */
  label?: string
  /** A JSON object containing properties that are not present on all object pipelines. For `deals` pipelines, the `probability` field is required (`{ "probability": 0.5 }`), and represents the likelihood a deal will close. Possible values are between 0.0 and 1.0 in increments of 0.1. For `tickets` pipelines, the `ticketState` field is optional (`{ "ticketState": "OPEN" }`), and represents whether the ticket remains open or has been closed by a member of your Support team. Possible values are `OPEN` or `CLOSED`. */
  metadata: { [key: string]: string }
}

export type PipelineStageReplaceInput = {
  /** The order for displaying this pipeline stage. If two pipeline stages have a matching `displayOrder`, they will be sorted alphabetically by label. */
  displayOrder: number
  /** A label used to organize pipeline stages in HubSpot's UI. Each pipeline stage's label must be unique within that pipeline. */
  label: string
  /** A JSON object containing properties that are not present on all object pipelines. For `deals` pipelines, the `probability` field is required (`{ "probability": 0.5 }`), and represents the likelihood a deal will close. Possible values are between 0.0 and 1.0 in increments of 0.1. For `tickets` pipelines, the `ticketState` field is optional (`{ "ticketState": "OPEN" }`), and represents whether the ticket remains open or has been closed by a member of your Support team. Possible values are `OPEN` or `CLOSED`. */
  metadata: { [key: string]: string }
}

export type PublicAuditInfo = {
  /** The action performed that triggered the audit event. */
  action: string
  /** The ID of the user who initiated the audit event. */
  fromUserId?: number
  /** A unique string identifier for the audit event. */
  identifier: string
  /** A descriptive message related to the audit event. */
  message?: string
  /** The unique identifier for the HubSpot portal where the audit event occurred. */
  portalId: number
  /** An object containing the raw data associated with the audit event. */
  rawObject?: Record<string, unknown>
  /** The date and time when the audit event took place. */
  timestamp?: string
}

export type BatchInputPropertyCreate = {
  /** An array of PropertyCreate objects, each representing a property to be created. This field is required. */
  inputs: Array<PropertyCreate>
}

export type BatchInputPropertyName = {
  /** An array of property names to be processed in the batch operation. Each item in the array is a reference to a PropertyName object. */
  inputs: Array<PropertyName>
}

export type BatchReadInputPropertyName = {
  /** Specifies whether the property is archived. */
  archived: boolean
  /** Indicates the sensitivity level of the data, such as 'non_sensitive', 'sensitive', or 'highly_sensitive'. */
  dataSensitivity: "highly_sensitive" | "non_sensitive" | "sensitive"
  /** An array of property names to be included in the batch read operation. Each item in the array is a reference to a PropertyName object. */
  inputs: Array<PropertyName>
}

export type BatchResponseProperty = {
  /** The timestamp indicating when the batch operation was completed. */
  completedAt: string
  /** A collection of URLs linking to documentation or resources related to the batch operation. */
  links?: { [key: string]: string }
  /** The timestamp indicating when the batch operation was requested. */
  requestedAt?: string
  /** An array of Property objects representing the results of the batch operation. */
  results: Array<Property>
  /** The timestamp indicating when the batch operation began processing. */
  startedAt: string
  /** The current status of the batch operation, with possible values being CANCELED, COMPLETE, PENDING, or PROCESSING. */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

export type BatchResponsePropertyWithErrors = {
  /** The date and time when the batch operation was completed, in ISO 8601 format. */
  completedAt: string
  /** An array of errors encountered during the batch operation, each represented by a StandardError object. */
  errors?: Array<StandardError>
  /** A map of link names to their associated URIs, providing additional information or actions related to the batch operation. */
  links?: { [key: string]: string }
  /** The number of errors encountered during the batch operation. */
  numErrors?: number
  /** The date and time when the batch operation was requested, in ISO 8601 format. */
  requestedAt?: string
  /** An array of properties that were processed in the batch operation. */
  results: Array<Property>
  /** The date and time when the batch operation started, in ISO 8601 format. */
  startedAt: string
  /** The current status of the batch operation. Valid values include 'PENDING', 'PROCESSING', 'CANCELED', and 'COMPLETE'. */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

export type CollectionResponsePropertyGroupNoPaging = {
  /** An array of property groups, where each group is represented by a PropertyGroup object. */
  results: Array<PropertyGroup>
}

export type CollectionResponsePropertyNoPaging = {
  /** An array of Property objects, each representing a specific property associated with the object type. This array contains the details of each property such as name, label, type, and other metadata. */
  results: Array<Property>
}

/** A HubSpot property option */
export type Option = {
  /** A description of the option. */
  description?: string
  /** Options are displayed in order starting with the lowest positive integer value. Values of -1 will cause the option to be displayed after any positive values. */
  displayOrder?: number
  /** Hidden options will not be displayed in HubSpot. */
  hidden: boolean
  /** A human-readable option label that will be shown in HubSpot. */
  label: string
  /** The internal value of the option, which must be used when setting the property value through the API. */
  value: string
}

export type OptionInput = {
  /** A description of the option. */
  description?: string
  /** Options are shown in order starting with the lowest positive integer value. Values of -1 will cause the option to be displayed after any positive values. */
  displayOrder: number
  /** Hidden options won't be shown in HubSpot. */
  hidden: boolean
  /** A human-readable option label that will be shown in HubSpot. */
  label: string
  /** The internal value of the option, which must be used when setting the property value through the API. */
  value: string
}

/** A HubSpot property */
export type Property = {
  /** Whether or not the property is archived. */
  archived?: boolean
  /** When the property was archived. */
  archivedAt?: string
  /** For default properties, true indicates that the property is calculated by a HubSpot process. It has no effect for custom properties. */
  calculated?: boolean
  /** Represents a formula that is used to compute a calculated property. */
  calculationFormula?: string
  /** The timestamp when the property was created, in ISO 8601 format. */
  createdAt?: string
  /** The internal user ID of the user who created the property in HubSpot. This field may not exist if the property was created outside of HubSpot. */
  createdUserId?: string
  /** The name of the currency property associated with this property, if applicable. */
  currencyPropertyName?: string
  /** The sensitivity level of the data. Valid values include 'non_sensitive', 'sensitive', and 'highly_sensitive'. */
  dataSensitivity?: "highly_sensitive" | "non_sensitive" | "sensitive"
  /** Indicates how date values should be displayed, with options such as 'absolute', 'absolute_with_relative', 'time_since', or 'time_until'. */
  dateDisplayHint?: "absolute" | "absolute_with_relative" | "time_since" | "time_until"
  /** A description of the property that will be shown as help text in HubSpot. */
  description: string
  /** Properties are shown in order, starting with the lowest positive integer value. */
  displayOrder?: number
  /** For default properties, true indicates that the options are stored externally to the property settings. */
  externalOptions?: boolean
  /** Controls how the property appears in HubSpot. */
  fieldType: string
  /** Whether or not the property can be used in a HubSpot form. */
  formField?: boolean
  /** The name of the property group the property belongs to. */
  groupName: string
  /** Whether or not the property's value must be unique. Once set, this can't be changed. */
  hasUniqueValue?: boolean
  /** Whether or not the property will be hidden from the HubSpot UI. It's recommended this be set to false for custom properties. */
  hidden?: boolean
  /** This will be true for default object properties built into HubSpot. */
  hubspotDefined?: boolean
  /** A human-readable property label that will be shown in HubSpot. */
  label: string
  modificationMetadata?: PropertyModificationMetadata
  /** The internal property name, which must be used when referencing the property via the API. */
  name: string
  /** A hint for displaying number properties. Valid values include 'unformatted', 'formatted', 'currency', 'percentage', 'duration', and 'probability'. */
  numberDisplayHint?: "currency" | "duration" | "formatted" | "percentage" | "probability" | "unformatted"
  /** A list of valid options for the property. This field is required for enumerated properties, but will be empty for other property types. */
  options: Array<Option>
  /** If this property is related to other object(s), they'll be listed here. */
  referencedObjectType?: string
  /** An array of categories indicating the sensitivity of the data contained in the property. */
  sensitiveDataCategories?: Array<string>
  /** Whether or not the property will display the currency symbol set in the account settings. */
  showCurrencySymbol?: boolean
  /** A hint for displaying text properties. Valid values include 'unformatted_single_line', 'multi_line', 'email', 'phone_number', 'domain_name', 'ip_address', 'physical_address', and 'postal_code'. */
  textDisplayHint?:
    | "domain_name"
    | "email"
    | "ip_address"
    | "multi_line"
    | "phone_number"
    | "physical_address"
    | "postal_code"
    | "unformatted_single_line"
  /** The property data type. */
  type: string
  /** The timestamp when the property was last updated, in ISO 8601 format. */
  updatedAt?: string
  /** The internal user ID of the user who updated the property in HubSpot. This field may not exist if the property was updated outside of HubSpot. */
  updatedUserId?: string
}

export type PropertyCreate = {
  /** Represents a formula that is used to compute a calculated property. */
  calculationFormula?: string
  /** A string representing the name of the currency property. */
  currencyPropertyName?: string
  /** Indicates the sensitivity level of the property, with options: highly_sensitive, non_sensitive, or sensitive. */
  dataSensitivity?: "highly_sensitive" | "non_sensitive" | "sensitive"
  /** A description of the property that will be shown as help text in HubSpot. */
  description?: string
  /** Properties are displayed in order starting with the lowest positive integer value. Values of -1 will cause the property to be displayed after any positive values. */
  displayOrder?: number
  /** Applicable only for 'enumeration' type properties. Should be set to true in conjunction with a 'referencedObjectType' of 'OWNER'. Otherwise false. */
  externalOptions?: boolean
  /** Controls how the property appears in HubSpot. */
  fieldType:
    | "booleancheckbox"
    | "calculation_equation"
    | "checkbox"
    | "date"
    | "file"
    | "html"
    | "number"
    | "phonenumber"
    | "radio"
    | "select"
    | "text"
    | "textarea"
  /** Whether or not the property can be used in a HubSpot form. */
  formField?: boolean
  /** The name of the property group the property belongs to. */
  groupName: string
  /** Whether or not the property's value must be unique. Once set, this can't be changed. */
  hasUniqueValue?: boolean
  /** If true, the property won't be visible and can't be used in HubSpot. */
  hidden?: boolean
  /** A human-readable property label that will be shown in HubSpot. */
  label: string
  /** The internal property name, which must be used when referencing the property via the API. */
  name: string
  /** A string providing a hint on how to display numbers. Valid values include 'unformatted', 'formatted', 'currency', 'percentage', 'duration', 'probability'. */
  numberDisplayHint?: "currency" | "duration" | "formatted" | "percentage" | "probability" | "unformatted"
  /** A list of valid options for the property. This field is required for enumerated properties. */
  options?: Array<OptionInput>
  /** Should be set to 'OWNER' when 'externalOptions' is true, which causes the property to dynamically pull option values from the current HubSpot users. */
  referencedObjectType?: string
  /** A boolean indicating whether to show the currency symbol for currency fields. */
  showCurrencySymbol?: boolean
  /** A string providing a hint on how to display text. Valid values include 'unformatted_single_line', 'multi_line', 'email', 'phone_number', 'domain_name', 'ip_address', 'physical_address', 'postal_code'. */
  textDisplayHint?:
    | "domain_name"
    | "email"
    | "ip_address"
    | "multi_line"
    | "phone_number"
    | "physical_address"
    | "postal_code"
    | "unformatted_single_line"
  /** The data type of the property. */
  type: "bool" | "date" | "datetime" | "enumeration" | "number" | "phone_number" | "string"
}

export type PropertyGroup = {
  /** Indicates whether the property group is archived. */
  archived: boolean
  /** Property groups are displayed in order starting with the lowest positive integer value. Values of -1 will cause the property group to be displayed after any positive values. */
  displayOrder?: number
  /** A human-readable label that will be shown in HubSpot. */
  label: string
  /** The internal property group name, which must be used when referencing the property group via the API. */
  name: string
}

export type PropertyGroupCreate = {
  /** Property groups are displayed in order starting with the lowest positive integer value. Values of -1 will cause the property group to be displayed after any positive values. */
  displayOrder?: number
  /** A human-readable label that will be shown in HubSpot. */
  label: string
  /** The internal property group name, which must be used when referencing the property group via the API. */
  name: string
}

export type PropertyGroupUpdate = {
  /** Property groups are displayed in order starting with the lowest positive integer value. Values of -1 will cause the property group to be displayed after any positive values. */
  displayOrder?: number
  /** A human-readable label that will be shown in HubSpot. */
  label?: string
}

export type PropertyModificationMetadata = {
  /** Specifies whether the property can be archived. */
  archivable: boolean
  /** Indicates whether the property's definition is read-only and cannot be modified. */
  readOnlyDefinition: boolean
  /** Indicates whether the property's options are read-only and cannot be modified. */
  readOnlyOptions?: boolean
  /** Indicates whether the property's value is read-only and cannot be modified. */
  readOnlyValue: boolean
}

export type PropertyName = {
  /** The name of the property to read or modify. */
  name: string
}

export type PropertyUpdate = {
  /** Represents a formula that is used to compute a calculated property. */
  calculationFormula?: string
  /** A string specifying the name of the property that holds the currency information, applicable when showCurrencySymbol is true. */
  currencyPropertyName?: string
  /** A description of the property that will be shown as help text in HubSpot. */
  description?: string
  /** Properties are displayed in order starting with the lowest positive integer value. Values of -1 will cause the Property to be displayed after any positive values. */
  displayOrder?: number
  /** Controls how the property appears in HubSpot. */
  fieldType?:
    | "booleancheckbox"
    | "calculation_equation"
    | "checkbox"
    | "date"
    | "file"
    | "html"
    | "number"
    | "phonenumber"
    | "radio"
    | "select"
    | "text"
    | "textarea"
  /** Whether or not the property can be used in a HubSpot form. */
  formField?: boolean
  /** The name of the property group the property belongs to. */
  groupName?: string
  /** If true, the property won't be visible and can't be used in HubSpot. */
  hidden?: boolean
  /** A human-readable property label that will be shown in HubSpot. */
  label?: string
  /** A string providing a hint for displaying number values. Valid values include 'unformatted', 'formatted', 'currency', 'percentage', 'duration', and 'probability'. */
  numberDisplayHint?: "currency" | "duration" | "formatted" | "percentage" | "probability" | "unformatted"
  /** A list of valid options for the property. */
  options?: Array<OptionInput>
  /** A boolean indicating whether to display a currency symbol for number fields formatted as currency. */
  showCurrencySymbol?: boolean
  /** A string providing a hint for displaying text values. Valid values include 'unformatted_single_line', 'multi_line', 'email', 'phone_number', 'domain_name', 'ip_address', 'physical_address', and 'postal_code'. */
  textDisplayHint?:
    | "domain_name"
    | "email"
    | "ip_address"
    | "multi_line"
    | "phone_number"
    | "physical_address"
    | "postal_code"
    | "unformatted_single_line"
  /** The data type of the property. */
  type?: "bool" | "date" | "datetime" | "enumeration" | "number" | "phone_number" | "string"
}

/** Defines the type, direction, and details of the relationship between two CRM objects. */
export type AssociationSpecWithLabel = {
  /** The category of the association, such as HUBSPOT_DEFINED, USER_DEFINED, or INTEGRATOR_DEFINED. */
  category: "HUBSPOT_DEFINED" | "INTEGRATOR_DEFINED" | "USER_DEFINED" | "WORK"
  fromObjectTypeId?: string
  /** A label describing the association between two objects. */
  label?: string
  toObjectTypeId?: string
  /** The unique identifier for the type of association. */
  typeId: number
}

export type BatchInputPublicAssociationMultiArchive = {
  inputs: Array<PublicAssociationMultiArchive>
}

export type BatchInputPublicAssociationMultiPost = {
  inputs: Array<PublicAssociationMultiPost>
}

export type BatchInputPublicDefaultAssociationMultiPost = {
  inputs: Array<PublicDefaultAssociationMultiPost>
}

export type BatchInputPublicFetchAssociationsBatchRequest = {
  inputs: Array<PublicFetchAssociationsBatchRequest>
}

export type BatchResponse = {
  completedAt: string
  errors?: Array<StandardError>
  links?: { [key: string]: string }
  numErrors?: number
  requestedAt?: string
  results: Array<Record<string, unknown>>
  startedAt: string
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

export type BatchResponseLabelsBetweenObjectPair = {
  /** The timestamp when the batch processing was completed, in ISO 8601 format. */
  completedAt: string
  /** An object containing relevant links related to the batch request. */
  links?: { [key: string]: string }
  /** The timestamp when the batch request was initially made, in ISO 8601 format. */
  requestedAt?: string
  results: Array<LabelsBetweenObjectPair>
  /** The timestamp when the batch processing began, in ISO 8601 format. */
  startedAt: string
  /** The status of the batch processing request: "PENDING", "PROCESSING", "CANCELLED", or "COMPLETE". */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

export type BatchResponseLabelsBetweenObjectPairWithErrors = {
  completedAt: string
  errors?: Array<StandardError>
  links?: { [key: string]: string }
  numErrors?: number
  requestedAt?: string
  results: Array<LabelsBetweenObjectPair>
  startedAt: string
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

export type BatchResponsePublicAssociationMultiWithLabel = {
  /** The timestamp when the batch processing was completed, in ISO 8601 format. */
  completedAt: string
  /** An object containing relevant links related to the batch request. */
  links?: { [key: string]: string }
  /** The timestamp when the batch request was initially made, in ISO 8601 format. */
  requestedAt?: string
  results: Array<PublicAssociationMultiWithLabel>
  /** The timestamp when the batch processing began, in ISO 8601 format. */
  startedAt: string
  /** The status of the batch processing request: "PENDING", "PROCESSING", "CANCELED", or "COMPLETE". */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

export type BatchResponsePublicAssociationMultiWithLabelWithErrors = {
  completedAt: string
  errors?: Array<StandardError>
  links?: { [key: string]: string }
  numErrors?: number
  requestedAt?: string
  results: Array<PublicAssociationMultiWithLabel>
  startedAt: string
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

/** The response returned after performing a batch operation on associations. */
export type AssociationsBatchResponsePublicDefaultAssociation = {
  /** The timestamp when the batch process was completed, in ISO 8601 format. */
  completedAt: string
  /** An array of StandardError objects detailing any errors that occurred during the batch operation. */
  errors?: Array<StandardError>
  /** An object containing relevant links related to the batch request. */
  links?: { [key: string]: string }
  /** The number of errors encountered during the batch processing. */
  numErrors?: number
  /** The timestamp when the batch process was initiated, in ISO 8601 format. */
  requestedAt?: string
  /** An array of PublicDefaultAssociation objects representing the results of the batch operation. */
  results: Array<PublicDefaultAssociation1>
  /** The timestamp when the batch process began execution, in ISO 8601 format. */
  startedAt: string
  /** The status of the batch processing request: "PENDING", "PROCESSING", "CANCELLED", or "COMPLETE". */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING"
}

/** Represents a paginated collection of objects that are associated with multiple labels, including the results and pagination details. This component is used when retrieving associated objects with specific labels in a forward-paging manner. */
export type CollectionResponseMultiAssociatedObjectWithLabelForwardPaging = {
  paging?: ForwardPaging
  /** The list of objects that are associated with multiple labels, returned as part of the collection. */
  results: Array<MultiAssociatedObjectWithLabel>
}

export type DateTime = {
  /** Indicates whether the DateTime value represents only a date without a time component. */
  dateOnly: boolean
  /** The integer value representing the shift in minutes from UTC for the DateTime value. */
  timeZoneShift: number
  /** The integer value representing a specific point in time. */
  value: string
}

/** Represents an object that is associated with multiple other objects, with optional context. */
export type MultiAssociatedObjectWithLabel = {
  /** An array of association types that define the relationships between this object and other objects. This property is required. */
  associationTypes: Array<AssociationSpecWithLabel>
  /** The unique identifier for the target object in the association. */
  toObjectId: string
}

/** Represents the pagination information for navigating through a list of results in the API. It provides details on how to access the previous or next set of results. */
export type Paging1 = {
  next?: NextPage
  prev?: PreviousPage
}

export type PublicAssociationMultiArchive = {
  from: PublicObjectId
  to: Array<PublicObjectId>
}

export type PublicAssociationMultiPost = {
  from: PublicObjectId
  to: PublicObjectId
  types: Array<AssociationSpec>
}

export type PublicAssociationMultiWithLabel = {
  from: PublicObjectId
  paging?: Paging1
  to: Array<MultiAssociatedObjectWithLabel>
}

export type PublicDefaultAssociationMultiPost = {
  from: PublicObjectId
  to: PublicObjectId
}

/** The PublicDefaultAssociation component represents the default association configuration between two objects in HubSpot. It is used to define how objects are related to each other within the platform. */
export type PublicDefaultAssociation1 = {
  associationSpec: AssociationSpec
  from: PublicObjectId
  to: PublicObjectId
}

export type PublicFetchAssociationsBatchRequest = {
  /** A paging cursor token used to retrieve the next set of results in a paginated response. */
  after?: string
  /** The unique identifier for the object whose associations are being fetched. */
  id: string
}

export type ReportCreationResponse = {
  enqueueTime: DateTime
  /** Email of the user */
  userEmail: string
  /** ID of the user */
  userId: number
}

export type ApiUsage = {
  /** Indicates when the cache was last updated. */
  collectedAt: string
  /** How many API calls an account has made for the current day. */
  currentUsage: number
  /** Status of fetching the information, including if the data came from the cache. */
  fetchStatus: "CACHED" | "FAILURE" | "NOTFOUND" | "SUCCESS" | "TIMEOUT"
  /** Name of the limit type. */
  name: string
  /** Time that the limit will reset. */
  resetsAt?: string
  /** Limits by which a single integration can consume the HubSpot public APIs. */
  usageLimit: number
}

export type CollectionResponseApiUsageNoPaging = {
  results: Array<ApiUsage>
}

export type PortalInformationResponse = {
  /** The type of account, such as APP_DEVELOPER, DEVELOPER_TEST, SANDBOX, or STANDARD. */
  accountType: "APP_DEVELOPER" | "DEVELOPER_TEST" | "SANDBOX" | "STANDARD"
  additionalCurrencies: Array<string>
  /** The primary currency used by the company. */
  companyCurrency: string
  /** The location where the account's data is hosted. */
  dataHostingLocation: string
  /** The unique identifier for the HubSpot account. */
  portalId: number
  /** The time zone in which the account operates. */
  timeZone: string
  /** The domain used for accessing the HubSpot user interface. */
  uiDomain: string
  /** The time zone offset from UTC in hours and minutes. */
  utcOffset: string
  /** The time zone offset from UTC in milliseconds. */
  utcOffsetMilliseconds: string
}

export type PutCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdRequest =
  Array<AssociationSpec>

/** What each operation answers, by its id. */
export interface Responses {
  "get-/crm/objects/2026-03/contacts_getPage": CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
  "post-/crm/objects/2026-03/contacts_create": SimplePublicObject
  "post-/crm/objects/2026-03/contacts/batch/archive_archive": unknown
  "post-/crm/objects/2026-03/contacts/batch/create_create": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/contacts/batch/read_read": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/contacts/batch/update_update": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/contacts/batch/upsert_upsert": BatchResponseSimplePublicUpsertObject
  "post-/crm/objects/2026-03/contacts/gdpr-delete_purge": unknown
  "post-/crm/objects/2026-03/contacts/merge_merge": SimplePublicObject
  "post-/crm/objects/2026-03/contacts/search_doSearch": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/contacts/{contactId}_getById": SimplePublicObjectWithAssociations
  "patch-/crm/objects/2026-03/contacts/{contactId}_update": SimplePublicObject
  "delete-/crm/objects/2026-03/contacts/{contactId}_archive": unknown
  "put-/crm/objects/2026-03/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId}_/crm/objects/2026-03/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId}": BatchResponsePublicDefaultAssociation
  "put-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}_/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}": LabelsBetweenObjectPair
  "delete-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}_/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}": unknown
  "get-/crm/objects/2026-03/companies_getPage": CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
  "post-/crm/objects/2026-03/companies_create": SimplePublicObject
  "post-/crm/objects/2026-03/companies/batch/archive_archive": unknown
  "post-/crm/objects/2026-03/companies/batch/create_create": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/companies/batch/read_read": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/companies/batch/update_update": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/companies/batch/upsert_upsert": BatchResponseSimplePublicUpsertObject
  "post-/crm/objects/2026-03/companies/merge_merge": SimplePublicObject
  "post-/crm/objects/2026-03/companies/search_doSearch": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/companies/{companyId}_getById": SimplePublicObjectWithAssociations
  "patch-/crm/objects/2026-03/companies/{companyId}_update": SimplePublicObject
  "delete-/crm/objects/2026-03/companies/{companyId}_archive": unknown
  "get-/crm/objects/2026-03/0-3_getPage": CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
  "post-/crm/objects/2026-03/0-3_create": SimplePublicObject
  "post-/crm/objects/2026-03/0-3/batch/archive_archive": unknown
  "post-/crm/objects/2026-03/0-3/batch/create_create": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/0-3/batch/read_read": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/0-3/batch/update_update": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/0-3/batch/upsert_upsert": BatchResponseSimplePublicUpsertObject
  "post-/crm/objects/2026-03/0-3/merge_merge": SimplePublicObject
  "post-/crm/objects/2026-03/0-3/search_doSearch": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/0-3/{dealId}_getById": SimplePublicObjectWithAssociations
  "patch-/crm/objects/2026-03/0-3/{dealId}_update": SimplePublicObject
  "delete-/crm/objects/2026-03/0-3/{dealId}_archive": unknown
  "get-/crm/objects/2026-03/tickets_getPage": CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
  "post-/crm/objects/2026-03/tickets_create": SimplePublicObject
  "post-/crm/objects/2026-03/tickets/batch/archive_archive": unknown
  "post-/crm/objects/2026-03/tickets/batch/create_create": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/tickets/batch/read_read": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/tickets/batch/update_update": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/tickets/batch/upsert_upsert": BatchResponseSimplePublicUpsertObject
  "post-/crm/objects/2026-03/tickets/merge_merge": SimplePublicObject
  "post-/crm/objects/2026-03/tickets/search_doSearch": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/tickets/{ticketId}_getById": SimplePublicObjectWithAssociations
  "patch-/crm/objects/2026-03/tickets/{ticketId}_update": SimplePublicObject
  "delete-/crm/objects/2026-03/tickets/{ticketId}_archive": unknown
  "get-/crm/objects/2026-03/leads_getPage": CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
  "post-/crm/objects/2026-03/leads_create": SimplePublicObject
  "post-/crm/objects/2026-03/leads/batch/archive_archive": unknown
  "post-/crm/objects/2026-03/leads/batch/create_create": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/leads/batch/read_read": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/leads/batch/update_update": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/leads/batch/upsert_upsert": BatchResponseSimplePublicUpsertObject
  "post-/crm/objects/2026-03/leads/search_doSearch": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/leads/{leadsId}_getById": SimplePublicObjectWithAssociations
  "patch-/crm/objects/2026-03/leads/{leadsId}_update": SimplePublicObject
  "delete-/crm/objects/2026-03/leads/{leadsId}_archive": unknown
  "get-/crm/objects/2026-03/notes_getPage": CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
  "post-/crm/objects/2026-03/notes_create": SimplePublicObject
  "post-/crm/objects/2026-03/notes/batch/archive_archive": unknown
  "post-/crm/objects/2026-03/notes/batch/create_create": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/notes/batch/read_read": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/notes/batch/update_update": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/notes/batch/upsert_upsert": BatchResponseSimplePublicUpsertObject
  "post-/crm/objects/2026-03/notes/search_doSearch": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/notes/{noteId}_getById": SimplePublicObjectWithAssociations
  "patch-/crm/objects/2026-03/notes/{noteId}_update": SimplePublicObject
  "delete-/crm/objects/2026-03/notes/{noteId}_archive": unknown
  "get-/crm/objects/2026-03/calls_getPage": CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
  "post-/crm/objects/2026-03/calls_create": SimplePublicObject
  "post-/crm/objects/2026-03/calls/batch/archive_archive": unknown
  "post-/crm/objects/2026-03/calls/batch/create_create": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/calls/batch/read_read": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/calls/batch/update_update": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/calls/batch/upsert_upsert": BatchResponseSimplePublicUpsertObject
  "post-/crm/objects/2026-03/calls/search_doSearch": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/calls/{callId}_getById": SimplePublicObjectWithAssociations
  "patch-/crm/objects/2026-03/calls/{callId}_update": SimplePublicObject
  "delete-/crm/objects/2026-03/calls/{callId}_archive": unknown
  "get-/crm/objects/2026-03/emails_getPage": CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
  "post-/crm/objects/2026-03/emails_create": SimplePublicObject
  "post-/crm/objects/2026-03/emails/batch/archive_archive": unknown
  "post-/crm/objects/2026-03/emails/batch/create_create": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/emails/batch/read_read": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/emails/batch/update_update": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/emails/batch/upsert_upsert": BatchResponseSimplePublicUpsertObject
  "post-/crm/objects/2026-03/emails/search_doSearch": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/emails/{emailId}_getById": SimplePublicObjectWithAssociations
  "patch-/crm/objects/2026-03/emails/{emailId}_update": SimplePublicObject
  "delete-/crm/objects/2026-03/emails/{emailId}_archive": unknown
  "get-/crm/objects/2026-03/meetings_getPage": CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
  "post-/crm/objects/2026-03/meetings_create": SimplePublicObject
  "post-/crm/objects/2026-03/meetings/batch/archive_archive": unknown
  "post-/crm/objects/2026-03/meetings/batch/create_create": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/meetings/batch/read_read": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/meetings/batch/update_update": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/meetings/batch/upsert_upsert": BatchResponseSimplePublicUpsertObject
  "post-/crm/objects/2026-03/meetings/search_doSearch": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/meetings/{meetingId}_getById": SimplePublicObjectWithAssociations
  "patch-/crm/objects/2026-03/meetings/{meetingId}_update": SimplePublicObject
  "delete-/crm/objects/2026-03/meetings/{meetingId}_archive": unknown
  "get-/crm/objects/2026-03/tasks_getPage": CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
  "post-/crm/objects/2026-03/tasks_create": SimplePublicObject
  "post-/crm/objects/2026-03/tasks/batch/archive_archive": unknown
  "post-/crm/objects/2026-03/tasks/batch/create_create": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/tasks/batch/read_read": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/tasks/batch/update_update": BatchResponseSimplePublicObject
  "post-/crm/objects/2026-03/tasks/batch/upsert_upsert": BatchResponseSimplePublicUpsertObject
  "post-/crm/objects/2026-03/tasks/search_doSearch": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/tasks/{taskId}_getById": SimplePublicObjectWithAssociations
  "patch-/crm/objects/2026-03/tasks/{taskId}_update": SimplePublicObject
  "delete-/crm/objects/2026-03/tasks/{taskId}_archive": unknown
  "get-/crm/owners/2026-03_/crm/owners/v3": CollectionResponsePublicOwnerForwardPaging
  "get-/crm/owners/2026-03/{ownerId}_getById": PublicOwner
  "get-/crm/pipelines/2026-03/{objectType}_getAll": CollectionResponsePipelineNoPaging
  "post-/crm/pipelines/2026-03/{objectType}_create": Pipeline
  "get-/crm/pipelines/2026-03/{objectType}/{pipelineId}_getById": Pipeline
  "put-/crm/pipelines/2026-03/{objectType}/{pipelineId}_replace": Pipeline
  "patch-/crm/pipelines/2026-03/{objectType}/{pipelineId}_update": Pipeline
  "delete-/crm/pipelines/2026-03/{objectType}/{pipelineId}_archive": unknown
  "get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/audit_getAudit": CollectionResponsePublicAuditInfoNoPaging
  "get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages_getAll": CollectionResponsePipelineStageNoPaging
  "post-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages_create": PipelineStage
  "get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_getById": PipelineStage
  "put-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_replace": PipelineStage
  "patch-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_update": PipelineStage
  "delete-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_archive": unknown
  "get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}/audit_getAudit": CollectionResponsePublicAuditInfoNoPaging
  "get-/crm/properties/2026-03/{objectType}_/crm/properties/2025-09/{objectType}": CollectionResponsePropertyNoPaging
  "post-/crm/properties/2026-03/{objectType}_/crm/properties/2025-09/{objectType}": Property
  "post-/crm/properties/2026-03/{objectType}/batch/archive_/crm/properties/2025-09/{objectType}/batch/archive": unknown
  "post-/crm/properties/2026-03/{objectType}/batch/create_/crm/properties/2025-09/{objectType}/batch/create": BatchResponseProperty
  "post-/crm/properties/2026-03/{objectType}/batch/read_/crm/properties/2025-09/{objectType}/batch/read": BatchResponseProperty
  "get-/crm/properties/2026-03/{objectType}/groups_/crm/properties/2025-09/{objectType}/groups": CollectionResponsePropertyGroupNoPaging
  "post-/crm/properties/2026-03/{objectType}/groups_/crm/properties/2025-09/{objectType}/groups": PropertyGroup
  "get-/crm/properties/2026-03/{objectType}/groups/{groupName}_/crm/properties/2025-09/{objectType}/groups/{groupName}": PropertyGroup
  "patch-/crm/properties/2026-03/{objectType}/groups/{groupName}_/crm/properties/2025-09/{objectType}/groups/{groupName}": PropertyGroup
  "delete-/crm/properties/2026-03/{objectType}/groups/{groupName}_/crm/properties/2025-09/{objectType}/groups/{groupName}": unknown
  "get-/crm/properties/2026-03/{objectType}/{propertyName}_/crm/properties/2025-09/{objectType}/{propertyName}": Property
  "patch-/crm/properties/2026-03/{objectType}/{propertyName}_/crm/properties/2025-09/{objectType}/{propertyName}": Property
  "delete-/crm/properties/2026-03/{objectType}/{propertyName}_/crm/properties/2025-09/{objectType}/{propertyName}": unknown
  "post-/crm/associations/2026-03/usage/high-usage-report/{userId}_/crm/associations/2025-09/usage/high-usage-report/{userId}": ReportCreationResponse
  "post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/archive_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/archive": BatchResponse
  "post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/associate/default_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/associate/default": AssociationsBatchResponsePublicDefaultAssociation
  "post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/create_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/create": BatchResponseLabelsBetweenObjectPair
  "post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/labels/archive_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/labels/archive": BatchResponse
  "post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/read_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/read": BatchResponsePublicAssociationMultiWithLabel
  "post-/crm/objects/2026-03/{objectType}/search_/crm/objects/2025-09/{objectType}/search": CollectionResponseWithTotalSimplePublicObject
  "get-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}_/crm/objects/2025-09/{objectType}/{objectId}/associations/{toObjectType}": CollectionResponseMultiAssociatedObjectWithLabelForwardPaging
  "get-/account-info/2026-03/api-usage/daily/private-apps_/account-info/2025-09/api-usage/daily/private-apps": CollectionResponseApiUsageNoPaging
  "get-/account-info/2026-03/details_/account-info/2025-09/details": PortalInformationResponse
}
