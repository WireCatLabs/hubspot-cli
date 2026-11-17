// GENERATED. DO NOT EDIT.
// Source: spec/hubspot/, checked against provenance.json
// Run: pnpm generate

import type { SchemaNode } from "@wirecat/cli-base/codegen"

export const definitions: Readonly<Record<string, SchemaNode>> = {
  AssociatedId: {
    description: "Contains the id and type of an association",
    type: "object",
    properties: {
      id: {
        description: "The unique identifier for the associated object.",
        type: "string",
      },
      type: {
        description: "The type of associations.",
        type: "string",
      },
    },
    required: ["id", "type"],
  },
  AssociationSpec: {
    description: "Defines the type, direction, and details of the relationship between two CRM objects.",
    type: "object",
    properties: {
      associationCategory: {
        description:
          'The category of the association, indicating its origin or purpose. Valid values include "HUBSPOT_DEFINED", "USER_DEFINED", "INTEGRATOR_DEFINED", and "WORK".',
        type: "string",
        enum: ["HUBSPOT_DEFINED", "INTEGRATOR_DEFINED", "USER_DEFINED", "WORK"],
      },
      associationTypeId: {
        description: "An integer representing the unique identifier for the type of association.",
        type: "integer",
        format: "int32",
      },
    },
    required: ["associationCategory", "associationTypeId"],
  },
  BatchInputSimplePublicObjectBatchInput: {
    description:
      "Represents a batch input component used to handle multiple simple public objects in a single API request. This component is typically used when performing batch operations to create, update, or delete multiple records simultaneously.",
    type: "object",
    properties: {
      inputs: {
        description:
          "An array of simple public objects to be processed in the batch operation. Each object in the array contains the data necessary for the specific operation being performed.",
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicObjectBatchInput",
        },
      },
    },
    required: ["inputs"],
  },
  BatchInputSimplePublicObjectBatchInputForCreate: {
    description:
      "Represents a batch input for creating multiple simple public objects in a single request. This component is used to streamline the process of adding new objects to a HubSpot account by allowing multiple entries to be created at once.",
    type: "object",
    properties: {
      inputs: {
        description:
          "An array of simple public objects to be created. Each object in the array contains the necessary data for creating a new entry in the system.",
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicObjectBatchInputForCreate",
        },
      },
    },
    required: ["inputs"],
  },
  BatchInputSimplePublicObjectBatchInputUpsert: {
    description:
      "Represents a batch input operation for upserting simple public objects in HubSpot. This component is used to process multiple upsert operations in a single request, improving efficiency and performance.",
    type: "object",
    properties: {
      inputs: {
        description:
          "An array of simple public objects to be upserted. Each object in the array contains the necessary data for creating or updating a record in HubSpot.",
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicObjectBatchInputUpsert",
        },
      },
    },
    required: ["inputs"],
  },
  BatchInputSimplePublicObjectId: {
    description:
      "Represents a batch input payload containing a list of simple public object IDs. This component is used when performing batch operations on multiple objects within HubSpot.",
    type: "object",
    properties: {
      inputs: {
        description: "An array of simple public object IDs to be processed in the batch operation.",
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicObjectId",
        },
      },
    },
    required: ["inputs"],
  },
  BatchReadInputSimplePublicObjectId: {
    description:
      "Specifies the input for reading a batch of CRM objects, including arrays of object IDs, requested property names (with optional history), and an optional unique identifying property.",
    type: "object",
    properties: {
      idProperty: {
        description:
          "When using a custom unique value property to retrieve records, the name of the property. Do not include this parameter if retrieving by record ID.",
        type: "string",
      },
      inputs: {
        description: "An array of SimplePublicObjectId objects, each containing the ID of an object to be read.",
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicObjectId",
        },
      },
      properties: {
        description:
          "An array of the property names to be returned in the response. If a specified property is not present on the requested object(s), it will be ignored.",
        type: "array",
        items: {
          type: "string",
        },
      },
      propertiesWithHistory: {
        description:
          "An array of the property names to be returned along with their history of previous values. If a specified property is not present on the requested object(s), it will be ignored.",
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["inputs", "properties", "propertiesWithHistory"],
  },
  BatchResponsePublicDefaultAssociation: {
    description: "The response returned after performing a batch operation on associations.",
    type: "object",
    properties: {
      completedAt: {
        description: "The timestamp when the batch process was completed, in ISO 8601 format.",
        type: "string",
      },
      errors: {
        description: "An array of StandardError objects detailing any errors that occurred during the batch operation.",
        type: "array",
        items: {
          type: "ref",
          ref: "StandardError",
        },
      },
      links: {
        description:
          "A map of link names to associated URIs, providing additional information or actions related to the batch operation.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      numErrors: {
        description: "The total number of errors that occurred during the operation.",
        type: "integer",
        format: "int32",
      },
      requestedAt: {
        description: "The timestamp when the batch process was initiated, in ISO 8601 format.",
        type: "string",
      },
      results: {
        description: "An array of PublicDefaultAssociation objects representing the results of the batch operation.",
        type: "array",
        items: {
          type: "ref",
          ref: "PublicDefaultAssociation",
        },
      },
      startedAt: {
        description: "The timestamp when the batch process began execution, in ISO 8601 format.",
        type: "string",
      },
      status: {
        description:
          'The status of the batch processing request. Can be: "PENDING", "PROCESSING", "CANCELED", or "COMPLETE".',
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  BatchResponseSimplePublicObject: {
    description: "A public object batch response object",
    type: "object",
    properties: {
      completedAt: {
        description: "The timestamp when the batch processing was completed, in ISO 8601 format.",
        type: "string",
      },
      links: {
        description:
          "A map of link names to associated URIs, providing additional information or actions related to the batch operation.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      requestedAt: {
        description: "The timestamp when the batch request was initially made, in ISO 8601 format.",
        type: "string",
      },
      results: {
        description: "An array of SimplePublicObject items representing the results of the batch operation.",
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicObject",
        },
      },
      startedAt: {
        description: "The timestamp when the batch processing began, in ISO 8601 format.",
        type: "string",
      },
      status: {
        description: 'The status of the batch processing request. The expected value is "COMPLETE".',
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  BatchResponseSimplePublicObjectWithErrors: {
    description:
      "Represents the result of a batch operation on CRM objects, including the processing status, batch results, timestamps, and a list of any errors encountered during the operation.",
    type: "object",
    properties: {
      completedAt: {
        description: "The timestamp when the batch process was completed, in ISO 8601 format.",
        type: "string",
      },
      errors: {
        type: "array",
        items: {
          type: "ref",
          ref: "StandardError",
        },
      },
      links: {
        description: "An object containing relevant links related to the batch request.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      numErrors: {
        description: "The number of errors encountered during the batch process.",
        type: "integer",
        format: "int32",
      },
      requestedAt: {
        description: "The timestamp when the batch process was initiated, in ISO 8601 format.",
        type: "string",
      },
      results: {
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicObject",
        },
      },
      startedAt: {
        description: "The timestamp when the batch process began execution, in ISO 8601 format.",
        type: "string",
      },
      status: {
        description: 'The status of the batch processing request - "PENDING", "PROCESSING", "CANCELLED", or "COMPLETE"',
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  BatchResponseSimplePublicUpsertObject: {
    description:
      "Represents the result of a batch upsert operation, including the operation’s status, timestamps, and a list of successfully created or updated objects.",
    type: "object",
    properties: {
      completedAt: {
        description: "The timestamp when the batch process was completed, in ISO 8601 format.",
        type: "string",
      },
      links: {
        description:
          "A map of link names to associated URIs, providing additional information or actions related to the batch operation.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      requestedAt: {
        description: "The timestamp when the batch process was initiated, in ISO 8601 format.",
        type: "string",
      },
      results: {
        description:
          "An array of SimplePublicUpsertObject items representing the results of the batch upsert operation.",
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicUpsertObject",
        },
      },
      startedAt: {
        description: "The timestamp when the batch process began execution, in ISO 8601 format.",
        type: "string",
      },
      status: {
        description:
          'The status of the batch processing request. Can be: "PENDING", "PROCESSING", "CANCELED", or "COMPLETE".',
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  BatchResponseSimplePublicUpsertObjectWithErrors: {
    description:
      "Represents the response from a batch upsert operation, including the status, timestamps, successfully processed objects, and any errors that occurred during processing.",
    type: "object",
    properties: {
      completedAt: {
        description: "The timestamp when the batch process was completed, in ISO 8601 format.",
        type: "string",
      },
      errors: {
        type: "array",
        items: {
          type: "ref",
          ref: "StandardError",
        },
      },
      links: {
        description: "An object containing relevant links related to the batch request.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      numErrors: {
        description: "The number of errors encountered during the batch process.",
        type: "integer",
        format: "int32",
      },
      requestedAt: {
        description: "The timestamp when the batch process was initiated, in ISO 8601 format.",
        type: "string",
      },
      results: {
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicUpsertObject",
        },
      },
      startedAt: {
        description: "The timestamp when the batch process began execution, in ISO 8601 format.",
        type: "string",
      },
      status: {
        description:
          'The status of the batch processing request. Can be: "PENDING", "PROCESSING", "CANCELLED", or "COMPLETE".',
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  CollectionResponseAssociatedId: {
    description:
      "Represents a collection of associated IDs returned by an API request, including pagination details for navigating through the results.",
    type: "object",
    properties: {
      paging: {
        type: "ref",
        ref: "Paging",
      },
      results: {
        description: "A list of associated IDs retrieved from the API request.",
        type: "array",
        items: {
          type: "ref",
          ref: "AssociatedId",
        },
      },
    },
    required: ["results"],
  },
  CollectionResponseSimplePublicObjectWithAssociationsForwardPaging: {
    description:
      "Represents a paginated collection response that includes simple public objects with their associations. This component is used to handle the results and pagination details when retrieving a list of objects from the API.",
    type: "object",
    properties: {
      paging: {
        type: "ref",
        ref: "ForwardPaging",
      },
      results: {
        description:
          "An array of simple public objects that are included in the current page of the response. Each object may include its associated data.",
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicObjectWithAssociations",
        },
      },
    },
    required: ["results"],
  },
  CollectionResponseWithTotalSimplePublicObject: {
    description:
      "Represents a list of simple objects returned from an API request, along with the total count of objects available.",
    type: "object",
    properties: {
      paging: {
        type: "ref",
        ref: "Paging",
      },
      results: {
        description:
          "An array containing the simple public objects returned in the current page of the response. This property is required.",
        type: "array",
        items: {
          type: "ref",
          ref: "SimplePublicObject",
        },
      },
      total: {
        description: "The number of available results",
        type: "integer",
        format: "int32",
      },
    },
    required: ["results", "total"],
  },
  ApiError: {
    description:
      "Represents an error response returned by the API when an operation fails. This component is used in various endpoints to provide detailed information about the error encountered.",
    type: "object",
    properties: {
      category: {
        description: "The error category",
        type: "string",
      },
      context: {
        description: "Context about the error condition",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      correlationId: {
        description:
          "A unique identifier for the request. Include this value with any error reports or support tickets",
        type: "string",
      },
      errors: {
        description: "further information about the error",
        type: "array",
        items: {
          type: "ref",
          ref: "ErrorDetail",
        },
      },
      links: {
        description:
          "A map of link names to associated URIs containing documentation about the error or recommended remediation steps",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      message: {
        description: "A human readable message describing the error along with remediation steps where appropriate",
        type: "string",
      },
      subCategory: {
        description: "A specific category that contains more specific detail about the error",
        type: "string",
      },
    },
    required: ["category", "correlationId", "message"],
  },
  ErrorDetail: {
    description:
      "Represents detailed information about an error that occurred in the API. This component is used to provide additional context and specifics about errors, typically as part of an error response.",
    type: "object",
    properties: {
      code: {
        description: "The status code associated with the error detail",
        type: "string",
      },
      context: {
        description: "Context about the error condition",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      in: {
        description: "The name of the field or parameter in which the error was found.",
        type: "string",
      },
      message: {
        description: "A human readable message describing the error along with remediation steps where appropriate",
        type: "string",
      },
      subCategory: {
        description: "A specific category that contains more specific detail about the error",
        type: "string",
      },
    },
    required: ["message"],
  },
  Filter: {
    description:
      "Defines a single condition for searching CRM objects, specifying the property to filter on, the operator to use (such as equals, greater than, or contains), and the value(s) to compare against. ",
    type: "object",
    properties: {
      highValue: {
        description: "The upper boundary value when using ranged-based filters.",
        type: "string",
      },
      operator: {
        description: 'The comparison operator used in the filter, such as "EQ" or "GT".',
        type: "string",
        enum: [
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
        ],
      },
      propertyName: {
        description: "The name of the property to apply the filter to.",
        type: "string",
      },
      value: {
        description: "The value to match against the property.",
        type: "string",
      },
      values: {
        description: "The values to match against the property.",
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["operator", "propertyName"],
  },
  FilterGroup: {
    description:
      "Represents a group of filters used to query data within HubSpot. This component is used to define criteria for filtering records in various API endpoints.",
    type: "object",
    properties: {
      filters: {
        description:
          "A list of individual filter criteria that are applied together as a group. Each filter specifies a condition that records must meet to be included in the results.",
        type: "array",
        items: {
          type: "ref",
          ref: "Filter",
        },
      },
    },
    required: ["filters"],
  },
  ForwardPaging: {
    description:
      "Paging information for forward-only pagination. Contains the next page reference when more results are available; omitted or empty on the last page.",
    type: "object",
    properties: {
      next: {
        type: "ref",
        ref: "NextPage",
      },
    },
    required: [],
  },
  LabelsBetweenObjectPair: {
    description: "The relationship descriptors applicable between two object types.",
    type: "object",
    properties: {
      fromObjectId: {
        description: "Source unique ID of the object.",
        type: "string",
      },
      fromObjectTypeId: {
        description: "Source object type.",
        type: "string",
      },
      labels: {
        description:
          "An array of labels that describe the relationship between the two objects. This is a required property.",
        type: "array",
        items: {
          type: "string",
        },
      },
      toObjectId: {
        description: "Target unique ID of the object.",
        type: "string",
      },
      toObjectTypeId: {
        description: "Target object type.",
        type: "string",
      },
    },
    required: ["fromObjectId", "fromObjectTypeId", "labels", "toObjectId", "toObjectTypeId"],
  },
  NextPage: {
    description:
      "Specifies the paging information needed to retrieve the next set of results in a paginated API response",
    type: "object",
    properties: {
      after: {
        description: "A paging cursor token for retrieving subsequent pages.",
        type: "string",
      },
      link: {
        description: "A URL that can be used to retrieve the next page results.",
        type: "string",
      },
    },
    required: ["after"],
  },
  Paging: {
    description:
      "Represents the pagination information for navigating through a list of results in the API. It provides details on how to access the previous or next set of results.",
    type: "object",
    properties: {
      next: {
        type: "ref",
        ref: "NextPage",
      },
      prev: {
        type: "ref",
        ref: "PreviousPage",
      },
    },
    required: [],
  },
  PreviousPage: {
    description:
      "specifies the paging information needed to retrieve the previous set of results in a paginated API response",
    type: "object",
    properties: {
      before: {
        description: "A paging cursor token for retrieving previous pages.",
        type: "string",
      },
      link: {
        description: "A URL that can be used to retrieve the previous pages' results.",
        type: "string",
      },
    },
    required: ["before"],
  },
  PublicAssociationsForObject: {
    description:
      "Represents the associations for a specific object in HubSpot, detailing the types of associations and the related objects involved.",
    type: "object",
    properties: {
      to: {
        type: "ref",
        ref: "PublicObjectId",
      },
      types: {
        description:
          "The types of associations that exist between the object and other entities, indicating the nature of their relationship.",
        type: "array",
        items: {
          type: "ref",
          ref: "AssociationSpec",
        },
      },
    },
    required: ["to", "types"],
  },
  PublicDefaultAssociation: {
    description:
      "The PublicDefaultAssociation component represents the default association configuration between two objects in HubSpot. It is used to define how objects are related to each other within the platform.",
    type: "object",
    properties: {
      associationSpec: {
        type: "ref",
        ref: "AssociationSpec",
      },
      from: {
        type: "ref",
        ref: "PublicObjectId",
      },
      to: {
        type: "ref",
        ref: "PublicObjectId",
      },
    },
    required: ["associationSpec", "from", "to"],
  },
  PublicGdprDeleteInput: {
    description: "An input that contains the information required to process a public GDPR data deletion request.",
    type: "object",
    properties: {
      idProperty: {
        description:
          "The name of a property whose values are unique for this object. An alternative to identifying a contact by ID.",
        type: "string",
      },
      objectId: {
        description: "The ID of the contact to permanently delete.",
        type: "string",
      },
    },
    required: ["objectId"],
  },
  PublicMergeInput: {
    description: "Input data for merging two records.",
    type: "object",
    properties: {
      objectIdToMerge: {
        description: "The object ID of the record that the merge will not set as the current value after the merge.",
        type: "string",
      },
      primaryObjectId: {
        description:
          "The object ID of the record that the merge will generally set as the current value after the merge.",
        type: "string",
      },
    },
    required: ["objectIdToMerge", "primaryObjectId"],
  },
  PublicObjectId: {
    description: "Contains the Id of a Public Object",
    type: "object",
    properties: {
      id: {
        description: "The unique ID of the object.",
        type: "string",
      },
    },
    required: ["id"],
  },
  PublicObjectSearchRequest: {
    description: "Describes a search request",
    type: "object",
    properties: {
      after: {
        description: "A paging cursor token for retrieving subsequent pages.",
        type: "string",
      },
      filterGroups: {
        description: "Up to 6 groups of filters defining additional query criteria.",
        type: "array",
        items: {
          type: "ref",
          ref: "FilterGroup",
        },
      },
      limit: {
        description: "The maximum results to return, up to 200 objects.",
        type: "integer",
        format: "int32",
      },
      properties: {
        description: "A list of property names to include in the response.",
        type: "array",
        items: {
          type: "string",
        },
      },
      query: {
        description: "The search query string, up to 3000 characters.",
        type: "string",
      },
      sorts: {
        description: "Specifies sorting order based on object properties.",
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["after", "filterGroups", "limit", "properties", "sorts"],
  },
  PublicObjectWarning: {
    description:
      "Represents a warning message related to a public object in HubSpot, providing details about the nature and context of the warning.",
    type: "object",
    properties: {
      category: {
        description: "The classification of the warning, indicating the type or nature of the issue.",
        type: "string",
      },
      context: {
        description:
          "Additional information or metadata about the warning, providing context for understanding the issue.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      message: {
        description: "The text of the warning message, providing information about the issue or alert.",
        type: "string",
      },
    },
    required: ["category", "context", "message"],
  },
  SimplePublicObject: {
    description: "A simple public object.",
    type: "object",
    properties: {
      archived: {
        description: "Whether the object is archived.",
        type: "boolean",
      },
      archivedAt: {
        description: "The timestamp when the object was archived, in ISO 8601 format.",
        type: "string",
      },
      createdAt: {
        description: "The timestamp when the object was created, in ISO 8601 format.",
        type: "string",
      },
      id: {
        description: "The unique ID of the object.",
        type: "string",
      },
      objectWriteTraceId: {
        description:
          "An identifier used to trace the write request for the object. Set a unique ID for each write operation; it is returned with any errors so you can identify which request encountered which error.",
        type: "string",
      },
      properties: {
        description: "Key-value pairs representing the properties of the object.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      propertiesWithHistory: {
        description:
          "Key-value pairs representing the properties of the object along with their history, each with a timestamp and source information.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "array",
          items: {
            type: "ref",
            ref: "ValueWithTimestamp",
          },
        },
      },
      updatedAt: {
        description: "The timestamp when the object was last updated, in ISO 8601 format.",
        type: "string",
      },
      url: {
        description: "The URL associated with the object.",
        type: "string",
      },
      warnings: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicObjectWarning",
        },
      },
    },
    required: ["archived", "createdAt", "id", "properties", "updatedAt"],
  },
  SimplePublicObjectBatchInput: {
    description:
      "Contains an array of CRM object records to be processed in a batch operation, each defined by their ID and properties.",
    type: "object",
    properties: {
      id: {
        description:
          "The ID of the contact to update. This can be the object ID, or the unique property value of the `idProperty` property.",
        type: "string",
      },
      idProperty: {
        description: "The name of a unique property, when identifying records by property. ",
        type: "string",
      },
      objectWriteTraceId: {
        description: "A unique identifier for tracing the request.",
        type: "string",
      },
      properties: {
        description: "Key-value pairs representing the properties of the object.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
    },
    required: ["id", "properties"],
  },
  SimplePublicObjectBatchInputForCreate: {
    description: "An input object that contains a collection of objects to be created together in a batch.",
    type: "object",
    properties: {
      associations: {
        description:
          "An array of associations that define the relationships between the objects being created and other existing objects. This property is required.",
        type: "array",
        items: {
          type: "ref",
          ref: "PublicAssociationsForObject",
        },
      },
      objectWriteTraceId: {
        description: "An identifier used for tracing the creation or update request of the object.",
        type: "string",
      },
      properties: {
        description: "Key value pairs representing the properties of the object.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
    },
    required: ["associations", "properties"],
  },
  SimplePublicObjectBatchInputUpsert: {
    description:
      "Represents an object used in batch upsert operations, containing an object’s unique identifier, its properties, and optionally the unique property name and a write trace ID.",
    type: "object",
    properties: {
      id: {
        description: "The unique ID of the object.",
        type: "string",
      },
      idProperty: {
        description: "The name of a property whose values are unique for this object",
        type: "string",
      },
      objectWriteTraceId: {
        description: "An identifier for tracing the creation request.",
        type: "string",
      },
      properties: {
        description: "Key value pairs representing the properties of the object.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
    },
    required: ["id", "properties"],
  },
  SimplePublicObjectId: {
    description: "Contains the Id of a Public Object",
    type: "object",
    properties: {
      id: {
        description: "The unique ID of the object.",
        type: "string",
      },
    },
    required: ["id"],
  },
  SimplePublicObjectInput: {
    description:
      "Represents the input required to update a CRM object, containing an object with property names and their corresponding values.",
    type: "object",
    properties: {
      properties: {
        description: "Key value pairs representing the properties of the object.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
    },
    required: ["properties"],
  },
  SimplePublicObjectInputForCreate: {
    description:
      "Is the input object used to create a new CRM object, containing the properties to be set and optional associations to link the new record with other CRM objects.",
    type: "object",
    properties: {
      associations: {
        description:
          "An array that specifies the relationships between the new public object and existing objects. This is required to establish how the new object is connected within the system.",
        type: "array",
        items: {
          type: "ref",
          ref: "PublicAssociationsForObject",
        },
      },
      properties: {
        description: "Key-value pairs for setting properties for the new object.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
    },
    required: ["associations", "properties"],
  },
  SimplePublicObjectWithAssociations: {
    description:
      "Represents a CRM object along with its properties, timestamps, and a set of associated object IDs grouped by association type.",
    type: "object",
    properties: {
      archived: {
        description: "Whether the object is archived.",
        type: "boolean",
      },
      archivedAt: {
        description: "The timestamp when the object was archived, in ISO 8601 format.",
        type: "string",
      },
      associations: {
        description: "A map of associated object types to their associated IDs.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "ref",
          ref: "CollectionResponseAssociatedId",
        },
      },
      createdAt: {
        description: "The timestamp when the object was created, in ISO 8601 format.",
        type: "string",
      },
      id: {
        description: "The unique ID of the object.",
        type: "string",
      },
      objectWriteTraceId: {
        description: "An identifier used for tracing the creation or update request of the object.",
        type: "string",
      },
      properties: {
        description: "Key value pairs representing the properties of the object.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      propertiesWithHistory: {
        description: "Key-value pairs representing the properties of the object along with their history.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "array",
          items: {
            type: "ref",
            ref: "ValueWithTimestamp",
          },
        },
      },
      updatedAt: {
        description: "The timestamp when the object was last updated, in ISO 8601 format.",
        type: "string",
      },
      url: {
        description: "The URL link to access this object.",
        type: "string",
      },
      warnings: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicObjectWarning",
        },
      },
    },
    required: ["archived", "createdAt", "id", "properties", "updatedAt"],
  },
  SimplePublicUpsertObject: {
    description: "Represents a CRM object that has either been created or updated (upserted)",
    type: "object",
    properties: {
      archived: {
        description: "Whether the object is archived.",
        type: "boolean",
      },
      archivedAt: {
        description: "The timestamp when the object was archived, in ISO 8601 format.",
        type: "string",
      },
      createdAt: {
        description: "The timestamp when the object was created, in ISO 8601 format.",
        type: "string",
      },
      id: {
        description: "The unique ID of the object.",
        type: "string",
      },
      "new": {
        description: "Whether the property is new.",
        type: "boolean",
      },
      objectWriteTraceId: {
        description: "An identifier for tracing the creation request.",
        type: "string",
      },
      properties: {
        description: "Key value pairs representing the properties of the object.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      propertiesWithHistory: {
        description: "Key-value pairs representing the properties of the object along with their history.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "array",
          items: {
            type: "ref",
            ref: "ValueWithTimestamp",
          },
        },
      },
      updatedAt: {
        description: "The timestamp when the object was last updated, in ISO 8601 format.",
        type: "string",
      },
      url: {
        description: "The URL associated with the object.",
        type: "string",
      },
      warnings: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicObjectWarning",
        },
      },
    },
    required: ["archived", "createdAt", "id", "new", "properties", "updatedAt"],
  },
  StandardError: {
    description:
      "Represents a standard error response in the HubSpot API, providing detailed information about an error that occurred during an API request.",
    type: "object",
    properties: {
      category: {
        description: "The main category of the error.",
        type: "string",
      },
      context: {
        description: "Additional context-specific information related to the error.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      errors: {
        description: "The detailed error objects.",
        type: "array",
        items: {
          type: "ref",
          ref: "ErrorDetail",
        },
      },
      id: {
        description: "A unique ID for the error instance.",
        type: "string",
      },
      links: {
        description: "URLs linking to documentation or resources associated with the error.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      message: {
        description: "A human-readable string describing the error and possible remediation steps.",
        type: "string",
      },
      status: {
        description: 'A text status code for the error, typically "error".',
        type: "string",
      },
      subCategory: {
        description: "A more specific error category within each main category.",
        type: "object",
        properties: {},
        required: [],
      },
    },
    required: ["category", "context", "errors", "links", "message", "status"],
  },
  ValueWithTimestamp: {
    description: "Property model that includes timestamp.",
    type: "object",
    properties: {
      sourceId: {
        description: "A string identifier for the specific source of the value.",
        type: "string",
      },
      sourceLabel: {
        description: "A human-readable label.",
        type: "string",
      },
      sourceType: {
        description: "A string indicating the type of source from which the value originated.",
        type: "string",
      },
      timestamp: {
        description: "The timestamp when the property was updated, in ISO 8601 format.",
        type: "string",
      },
      updatedByUserId: {
        description: "The ID of the user who last updated the property.",
        type: "integer",
        format: "int32",
      },
      value: {
        description: "The property value.",
        type: "string",
      },
    },
    required: ["sourceType", "timestamp", "value"],
  },
  CollectionResponsePublicOwnerForwardPaging: {
    type: "object",
    properties: {
      paging: {
        type: "ref",
        ref: "ForwardPaging",
      },
      results: {
        description:
          "An array of PublicOwner objects, each representing an individual owner with their specific details.",
        type: "array",
        items: {
          type: "ref",
          ref: "PublicOwner",
        },
      },
    },
    required: ["results"],
  },
  PublicOwner: {
    type: "object",
    properties: {
      archived: {
        description: "Indicates whether the owner is archived.",
        type: "boolean",
      },
      createdAt: {
        description: "The date and time when the owner was created.",
        type: "string",
      },
      email: {
        description: "The email address of the owner.",
        type: "string",
      },
      firstName: {
        description: "The first name of the owner.",
        type: "string",
      },
      id: {
        description: "The unique identifier of the owner.",
        type: "string",
      },
      lastName: {
        description: "The last name of the owner.",
        type: "string",
      },
      teams: {
        description:
          "An array of teams associated with the owner, where each team is represented by a PublicTeam object.",
        type: "array",
        items: {
          type: "ref",
          ref: "PublicTeam",
        },
      },
      type: {
        description: "The type of the owner, which can be either PERSON or QUEUE.",
        type: "string",
        enum: ["PERSON", "QUEUE"],
      },
      updatedAt: {
        description: "The date and time when the owner was last updated.",
        type: "string",
      },
      userId: {
        description: "The user ID of the owner.",
        type: "integer",
        format: "int32",
      },
      userIdIncludingInactive: {
        description: "The user ID of the owner, including inactive users.",
        type: "integer",
        format: "int32",
      },
    },
    required: ["archived", "createdAt", "id", "type", "updatedAt"],
  },
  PublicTeam: {
    type: "object",
    properties: {
      id: {
        description: "The unique identifier for the team, represented as a string.",
        type: "string",
      },
      name: {
        description: "The name of the team, represented as a string.",
        type: "string",
      },
      primary: {
        description: "A boolean indicating whether this team is the primary team.",
        type: "boolean",
      },
    },
    required: ["id", "name", "primary"],
  },
  CollectionResponsePipelineNoPaging: {
    type: "object",
    properties: {
      results: {
        type: "array",
        items: {
          type: "ref",
          ref: "Pipeline",
        },
      },
    },
    required: ["results"],
  },
  CollectionResponsePipelineStageNoPaging: {
    type: "object",
    properties: {
      results: {
        type: "array",
        items: {
          type: "ref",
          ref: "PipelineStage",
        },
      },
    },
    required: ["results"],
  },
  CollectionResponsePublicAuditInfoNoPaging: {
    type: "object",
    properties: {
      results: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicAuditInfo",
        },
      },
    },
    required: ["results"],
  },
  Pipeline: {
    type: "object",
    properties: {
      archived: {
        description: "Whether the pipeline is archived.",
        type: "boolean",
      },
      archivedAt: {
        description:
          "The date the pipeline was archived. `archivedAt` will only be present if the pipeline is archived.",
        type: "string",
      },
      createdAt: {
        description: "The date the pipeline was created. The default pipelines will have createdAt = 0.",
        type: "string",
      },
      displayOrder: {
        description:
          "The order for displaying this pipeline. If two pipelines have a matching `displayOrder`, they will be sorted alphabetically by label.",
        type: "integer",
        format: "int32",
      },
      id: {
        description: "A unique identifier generated by HubSpot that can be used to retrieve and update the pipeline.",
        type: "string",
      },
      label: {
        description: "A unique label used to organize pipelines in HubSpot's UI",
        type: "string",
      },
      stages: {
        description:
          "The stages associated with the pipeline. They can be retrieved and updated via the pipeline stages endpoints.",
        type: "array",
        items: {
          type: "ref",
          ref: "PipelineStage",
        },
      },
      updatedAt: {
        description: "The date the pipeline was last updated.",
        type: "string",
      },
    },
    required: ["archived", "createdAt", "displayOrder", "id", "label", "stages", "updatedAt"],
  },
  PipelineInput: {
    type: "object",
    properties: {
      displayOrder: {
        description:
          "The order for displaying this pipeline. If two pipelines have a matching `displayOrder`, they will be sorted alphabetically by label.",
        type: "integer",
        format: "int32",
      },
      label: {
        description: "A unique label used to organize pipelines in HubSpot's UI",
        type: "string",
      },
      pipelineId: {
        type: "string",
      },
      stages: {
        description: "Pipeline stage inputs used to create the new or replacement pipeline.",
        type: "array",
        items: {
          type: "ref",
          ref: "PipelineStageInput",
        },
      },
    },
    required: ["displayOrder", "label", "stages"],
  },
  PipelinePatchInput: {
    type: "object",
    properties: {
      archived: {
        description:
          "Whether the pipeline is archived. This property should only be provided when restoring an archived pipeline. If it's provided in any other call, the request will fail and a `400 Bad Request` will be returned.",
        type: "boolean",
      },
      displayOrder: {
        description:
          "The order for displaying this pipeline. If two pipelines have a matching `displayOrder`, they will be sorted alphabetically by label.",
        type: "integer",
        format: "int32",
      },
      label: {
        description: "A unique label used to organize pipelines in HubSpot's UI",
        type: "string",
      },
    },
    required: [],
  },
  PipelineReplaceInput: {
    type: "object",
    properties: {
      displayOrder: {
        description:
          "The order for displaying this pipeline stage. If two pipeline stages have a matching `displayOrder`, they will be sorted alphabetically by label.",
        type: "integer",
        format: "int32",
      },
      label: {
        description:
          "A label used to organize pipeline stages in HubSpot's UI. Each pipeline stage's label must be unique within that pipeline.",
        type: "string",
      },
      stages: {
        description:
          "The stages associated with the pipeline. They can be retrieved and updated via the pipeline stages endpoints.",
        type: "array",
        items: {
          type: "ref",
          ref: "PipelineStageInput",
        },
      },
    },
    required: ["displayOrder", "label", "stages"],
  },
  PipelineStage: {
    type: "object",
    properties: {
      archived: {
        description: "Whether the pipeline is archived.",
        type: "boolean",
      },
      archivedAt: {
        description:
          "The date the pipeline was archived. `archivedAt` will only be present if the pipeline is archived.",
        type: "string",
      },
      createdAt: {
        description:
          "The date the pipeline stage was created. The stages on default pipelines will have createdAt = 0.",
        type: "string",
      },
      displayOrder: {
        description:
          "The order for displaying this pipeline stage. If two pipeline stages have a matching `displayOrder`, they will be sorted alphabetically by label.",
        type: "integer",
        format: "int32",
      },
      id: {
        description:
          "A unique identifier generated by HubSpot that can be used to retrieve and update the pipeline stage.",
        type: "string",
      },
      label: {
        description:
          "A label used to organize pipeline stages in HubSpot's UI. Each pipeline stage's label must be unique within that pipeline.",
        type: "string",
      },
      metadata: {
        description:
          'A JSON object containing properties that are not present on all object pipelines.\n\nFor `deals` pipelines, the `probability` field is required (`{ "probability": 0.5 }`), and represents the likelihood a deal will close. Possible values are between 0.0 and 1.0 in increments of 0.1.\n\nFor `tickets` pipelines, the `ticketState` field is optional (`{ "ticketState": "OPEN" }`), and represents whether the ticket remains open or has been closed by a member of your Support team. Possible values are `OPEN` or `CLOSED`.',
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      updatedAt: {
        description: "The date the pipeline stage was last updated.",
        type: "string",
      },
      writePermissions: {
        description:
          "Defines the level of write access for the pipeline stage, with possible values being CRM_PERMISSIONS_ENFORCEMENT, READ_ONLY, or INTERNAL_ONLY.",
        type: "string",
        enum: ["CRM_PERMISSIONS_ENFORCEMENT", "INTERNAL_ONLY", "READ_ONLY"],
      },
    },
    required: ["archived", "createdAt", "displayOrder", "id", "label", "metadata", "updatedAt", "writePermissions"],
  },
  PipelineStageInput: {
    type: "object",
    properties: {
      displayOrder: {
        description:
          "The order for displaying this pipeline stage. If two pipeline stages have a matching `displayOrder`, they will be sorted alphabetically by label.",
        type: "integer",
        format: "int32",
      },
      label: {
        description:
          "A label used to organize pipeline stages in HubSpot's UI. Each pipeline stage's label must be unique within that pipeline.",
        type: "string",
      },
      metadata: {
        description:
          'A JSON object containing properties that are not present on all object pipelines.\n\nFor `deals` pipelines, the `probability` field is required (`{ "probability": 0.5 }`), and represents the likelihood a deal will close. Possible values are between 0.0 and 1.0 in increments of 0.1.\n\nFor `tickets` pipelines, the `ticketState` field is optional (`{ "ticketState": "OPEN" }`), and represents whether the ticket remains open or has been closed by a member of your Support team. Possible values are `OPEN` or `CLOSED`.',
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      stageId: {
        type: "string",
      },
    },
    required: ["displayOrder", "label", "metadata"],
  },
  PipelineStagePatchInput: {
    type: "object",
    properties: {
      archived: {
        description: "Whether the pipeline is archived.",
        type: "boolean",
      },
      displayOrder: {
        description:
          "The order for displaying this pipeline stage. If two pipeline stages have a matching `displayOrder`, they will be sorted alphabetically by label.",
        type: "integer",
        format: "int32",
      },
      label: {
        description:
          "A label used to organize pipeline stages in HubSpot's UI. Each pipeline stage's label must be unique within that pipeline.",
        type: "string",
      },
      metadata: {
        description:
          'A JSON object containing properties that are not present on all object pipelines.\n\nFor `deals` pipelines, the `probability` field is required (`{ "probability": 0.5 }`), and represents the likelihood a deal will close. Possible values are between 0.0 and 1.0 in increments of 0.1.\n\nFor `tickets` pipelines, the `ticketState` field is optional (`{ "ticketState": "OPEN" }`), and represents whether the ticket remains open or has been closed by a member of your Support team. Possible values are `OPEN` or `CLOSED`.',
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
    },
    required: ["metadata"],
  },
  PipelineStageReplaceInput: {
    type: "object",
    properties: {
      displayOrder: {
        description:
          "The order for displaying this pipeline stage. If two pipeline stages have a matching `displayOrder`, they will be sorted alphabetically by label.",
        type: "integer",
        format: "int32",
      },
      label: {
        description:
          "A label used to organize pipeline stages in HubSpot's UI. Each pipeline stage's label must be unique within that pipeline.",
        type: "string",
      },
      metadata: {
        description:
          'A JSON object containing properties that are not present on all object pipelines.\n\nFor `deals` pipelines, the `probability` field is required (`{ "probability": 0.5 }`), and represents the likelihood a deal will close. Possible values are between 0.0 and 1.0 in increments of 0.1.\n\nFor `tickets` pipelines, the `ticketState` field is optional (`{ "ticketState": "OPEN" }`), and represents whether the ticket remains open or has been closed by a member of your Support team. Possible values are `OPEN` or `CLOSED`.',
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
    },
    required: ["displayOrder", "label", "metadata"],
  },
  PublicAuditInfo: {
    type: "object",
    properties: {
      action: {
        description: "The action performed that triggered the audit event.",
        type: "string",
      },
      fromUserId: {
        description: "The ID of the user who initiated the audit event.",
        type: "integer",
        format: "int32",
      },
      identifier: {
        description: "A unique string identifier for the audit event.",
        type: "string",
      },
      message: {
        description: "A descriptive message related to the audit event.",
        type: "string",
      },
      portalId: {
        description: "The unique identifier for the HubSpot portal where the audit event occurred.",
        type: "integer",
        format: "int32",
      },
      rawObject: {
        description: "An object containing the raw data associated with the audit event.",
        type: "object",
        properties: {},
        required: [],
      },
      timestamp: {
        description: "The date and time when the audit event took place.",
        type: "string",
      },
    },
    required: ["action", "identifier", "portalId"],
  },
  BatchInputPropertyCreate: {
    type: "object",
    properties: {
      inputs: {
        description:
          "An array of PropertyCreate objects, each representing a property to be created. This field is required.",
        type: "array",
        items: {
          type: "ref",
          ref: "PropertyCreate",
        },
      },
    },
    required: ["inputs"],
  },
  BatchInputPropertyName: {
    type: "object",
    properties: {
      inputs: {
        description:
          "An array of property names to be processed in the batch operation. Each item in the array is a reference to a PropertyName object.",
        type: "array",
        items: {
          type: "ref",
          ref: "PropertyName",
        },
      },
    },
    required: ["inputs"],
  },
  BatchReadInputPropertyName: {
    type: "object",
    properties: {
      archived: {
        description: "Specifies whether the property is archived.",
        type: "boolean",
      },
      dataSensitivity: {
        description:
          "Indicates the sensitivity level of the data, such as 'non_sensitive', 'sensitive', or 'highly_sensitive'.",
        type: "string",
        enum: ["highly_sensitive", "non_sensitive", "sensitive"],
      },
      inputs: {
        description:
          "An array of property names to be included in the batch read operation. Each item in the array is a reference to a PropertyName object.",
        type: "array",
        items: {
          type: "ref",
          ref: "PropertyName",
        },
      },
    },
    required: ["archived", "dataSensitivity", "inputs"],
  },
  BatchResponseProperty: {
    type: "object",
    properties: {
      completedAt: {
        description: "The timestamp indicating when the batch operation was completed.",
        type: "string",
      },
      links: {
        description: "A collection of URLs linking to documentation or resources related to the batch operation.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      requestedAt: {
        description: "The timestamp indicating when the batch operation was requested.",
        type: "string",
      },
      results: {
        description: "An array of Property objects representing the results of the batch operation.",
        type: "array",
        items: {
          type: "ref",
          ref: "Property",
        },
      },
      startedAt: {
        description: "The timestamp indicating when the batch operation began processing.",
        type: "string",
      },
      status: {
        description:
          "The current status of the batch operation, with possible values being CANCELED, COMPLETE, PENDING, or PROCESSING.",
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  BatchResponsePropertyWithErrors: {
    type: "object",
    properties: {
      completedAt: {
        description: "The date and time when the batch operation was completed, in ISO 8601 format.",
        type: "string",
      },
      errors: {
        description:
          "An array of errors encountered during the batch operation, each represented by a StandardError object.",
        type: "array",
        items: {
          type: "ref",
          ref: "StandardError",
        },
      },
      links: {
        description:
          "A map of link names to their associated URIs, providing additional information or actions related to the batch operation.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      numErrors: {
        description: "The number of errors encountered during the batch operation.",
        type: "integer",
        format: "int32",
      },
      requestedAt: {
        description: "The date and time when the batch operation was requested, in ISO 8601 format.",
        type: "string",
      },
      results: {
        description: "An array of properties that were processed in the batch operation.",
        type: "array",
        items: {
          type: "ref",
          ref: "Property",
        },
      },
      startedAt: {
        description: "The date and time when the batch operation started, in ISO 8601 format.",
        type: "string",
      },
      status: {
        description:
          "The current status of the batch operation. Valid values include 'PENDING', 'PROCESSING', 'CANCELED', and 'COMPLETE'.",
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  CollectionResponsePropertyGroupNoPaging: {
    type: "object",
    properties: {
      results: {
        description: "An array of property groups, where each group is represented by a PropertyGroup object.",
        type: "array",
        items: {
          type: "ref",
          ref: "PropertyGroup",
        },
      },
    },
    required: ["results"],
  },
  CollectionResponsePropertyNoPaging: {
    type: "object",
    properties: {
      results: {
        description:
          "An array of Property objects, each representing a specific property associated with the object type. This array contains the details of each property such as name, label, type, and other metadata.",
        type: "array",
        items: {
          type: "ref",
          ref: "Property",
        },
      },
    },
    required: ["results"],
  },
  Option: {
    description: "A HubSpot property option",
    type: "object",
    properties: {
      description: {
        description: "A description of the option.",
        type: "string",
      },
      displayOrder: {
        description:
          "Options are displayed in order starting with the lowest positive integer value. Values of -1 will cause the option to be displayed after any positive values.",
        type: "integer",
        format: "int32",
      },
      hidden: {
        description: "Hidden options will not be displayed in HubSpot.",
        type: "boolean",
      },
      label: {
        description: "A human-readable option label that will be shown in HubSpot.",
        type: "string",
      },
      value: {
        description:
          "The internal value of the option, which must be used when setting the property value through the API.",
        type: "string",
      },
    },
    required: ["hidden", "label", "value"],
  },
  OptionInput: {
    type: "object",
    properties: {
      description: {
        description: "A description of the option.",
        type: "string",
      },
      displayOrder: {
        description:
          "Options are shown in order starting with the lowest positive integer value. Values of -1 will cause the option to be displayed after any positive values.",
        type: "integer",
        format: "int32",
      },
      hidden: {
        description: "Hidden options won't be shown in HubSpot.",
        type: "boolean",
      },
      label: {
        description: "A human-readable option label that will be shown in HubSpot.",
        type: "string",
      },
      value: {
        description:
          "The internal value of the option, which must be used when setting the property value through the API.",
        type: "string",
      },
    },
    required: ["displayOrder", "hidden", "label", "value"],
  },
  Property: {
    description: "A HubSpot property",
    type: "object",
    properties: {
      archived: {
        description: "Whether or not the property is archived.",
        type: "boolean",
      },
      archivedAt: {
        description: "When the property was archived.",
        type: "string",
      },
      calculated: {
        description:
          "For default properties, true indicates that the property is calculated by a HubSpot process. It has no effect for custom properties.",
        type: "boolean",
      },
      calculationFormula: {
        description: "Represents a formula that is used to compute a calculated property.",
        type: "string",
      },
      createdAt: {
        description: "The timestamp when the property was created, in ISO 8601 format.",
        type: "string",
      },
      createdUserId: {
        description:
          "The internal user ID of the user who created the property in HubSpot. This field may not exist if the property was created outside of HubSpot.",
        type: "string",
      },
      currencyPropertyName: {
        description: "The name of the currency property associated with this property, if applicable.",
        type: "string",
      },
      dataSensitivity: {
        description:
          "The sensitivity level of the data. Valid values include 'non_sensitive', 'sensitive', and 'highly_sensitive'.",
        type: "string",
        enum: ["highly_sensitive", "non_sensitive", "sensitive"],
      },
      dateDisplayHint: {
        description:
          "Indicates how date values should be displayed, with options such as 'absolute', 'absolute_with_relative', 'time_since', or 'time_until'.",
        type: "string",
        enum: ["absolute", "absolute_with_relative", "time_since", "time_until"],
      },
      description: {
        description: "A description of the property that will be shown as help text in HubSpot.",
        type: "string",
      },
      displayOrder: {
        description: "Properties are shown in order, starting with the lowest positive integer value.",
        type: "integer",
        format: "int32",
      },
      externalOptions: {
        description:
          "For default properties, true indicates that the options are stored externally to the property settings.",
        type: "boolean",
      },
      fieldType: {
        description: "Controls how the property appears in HubSpot.",
        type: "string",
      },
      formField: {
        description: "Whether or not the property can be used in a HubSpot form.",
        type: "boolean",
      },
      groupName: {
        description: "The name of the property group the property belongs to.",
        type: "string",
      },
      hasUniqueValue: {
        description: "Whether or not the property's value must be unique. Once set, this can't be changed.",
        type: "boolean",
      },
      hidden: {
        description:
          "Whether or not the property will be hidden from the HubSpot UI. It's recommended this be set to false for custom properties.",
        type: "boolean",
      },
      hubspotDefined: {
        description: "This will be true for default object properties built into HubSpot.",
        type: "boolean",
      },
      label: {
        description: "A human-readable property label that will be shown in HubSpot.",
        type: "string",
      },
      modificationMetadata: {
        type: "ref",
        ref: "PropertyModificationMetadata",
      },
      name: {
        description: "The internal property name, which must be used when referencing the property via the API.",
        type: "string",
      },
      numberDisplayHint: {
        description:
          "A hint for displaying number properties. Valid values include 'unformatted', 'formatted', 'currency', 'percentage', 'duration', and 'probability'.",
        type: "string",
        enum: ["currency", "duration", "formatted", "percentage", "probability", "unformatted"],
      },
      options: {
        description:
          "A list of valid options for the property. This field is required for enumerated properties, but will be empty for other property types.",
        type: "array",
        items: {
          type: "ref",
          ref: "Option",
        },
      },
      referencedObjectType: {
        description: "If this property is related to other object(s), they'll be listed here.",
        type: "string",
      },
      sensitiveDataCategories: {
        description: "An array of categories indicating the sensitivity of the data contained in the property.",
        type: "array",
        items: {
          type: "string",
        },
      },
      showCurrencySymbol: {
        description: "Whether or not the property will display the currency symbol set in the account settings.",
        type: "boolean",
      },
      textDisplayHint: {
        description:
          "A hint for displaying text properties. Valid values include 'unformatted_single_line', 'multi_line', 'email', 'phone_number', 'domain_name', 'ip_address', 'physical_address', and 'postal_code'.",
        type: "string",
        enum: [
          "domain_name",
          "email",
          "ip_address",
          "multi_line",
          "phone_number",
          "physical_address",
          "postal_code",
          "unformatted_single_line",
        ],
      },
      type: {
        description: "The property data type.",
        type: "string",
      },
      updatedAt: {
        description: "The timestamp when the property was last updated, in ISO 8601 format.",
        type: "string",
      },
      updatedUserId: {
        description:
          "The internal user ID of the user who updated the property in HubSpot. This field may not exist if the property was updated outside of HubSpot.",
        type: "string",
      },
    },
    required: ["description", "fieldType", "groupName", "label", "name", "options", "type"],
  },
  PropertyCreate: {
    type: "object",
    properties: {
      calculationFormula: {
        description: "Represents a formula that is used to compute a calculated property.",
        type: "string",
      },
      currencyPropertyName: {
        description: "A string representing the name of the currency property.",
        type: "string",
      },
      dataSensitivity: {
        description:
          "Indicates the sensitivity level of the property, with options: highly_sensitive, non_sensitive, or sensitive.",
        type: "string",
        enum: ["highly_sensitive", "non_sensitive", "sensitive"],
      },
      description: {
        description: "A description of the property that will be shown as help text in HubSpot.",
        type: "string",
      },
      displayOrder: {
        description:
          "Properties are displayed in order starting with the lowest positive integer value. Values of -1 will cause the property to be displayed after any positive values.",
        type: "integer",
        format: "int32",
      },
      externalOptions: {
        description:
          "Applicable only for 'enumeration' type properties.  Should be set to true in conjunction with a 'referencedObjectType' of 'OWNER'.  Otherwise false.",
        type: "boolean",
      },
      fieldType: {
        description: "Controls how the property appears in HubSpot.",
        type: "string",
        enum: [
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
        ],
      },
      formField: {
        description: "Whether or not the property can be used in a HubSpot form.",
        type: "boolean",
      },
      groupName: {
        description: "The name of the property group the property belongs to.",
        type: "string",
      },
      hasUniqueValue: {
        description: "Whether or not the property's value must be unique. Once set, this can't be changed.",
        type: "boolean",
      },
      hidden: {
        description: "If true, the property won't be visible and can't be used in HubSpot.",
        type: "boolean",
      },
      label: {
        description: "A human-readable property label that will be shown in HubSpot.",
        type: "string",
      },
      name: {
        description: "The internal property name, which must be used when referencing the property via the API.",
        type: "string",
      },
      numberDisplayHint: {
        description:
          "A string providing a hint on how to display numbers. Valid values include 'unformatted', 'formatted', 'currency', 'percentage', 'duration', 'probability'.",
        type: "string",
        enum: ["currency", "duration", "formatted", "percentage", "probability", "unformatted"],
      },
      options: {
        description: "A list of valid options for the property. This field is required for enumerated properties.",
        type: "array",
        items: {
          type: "ref",
          ref: "OptionInput",
        },
      },
      referencedObjectType: {
        description:
          "Should be set to 'OWNER' when 'externalOptions' is true, which causes the property to dynamically pull option values from the current HubSpot users.",
        type: "string",
      },
      showCurrencySymbol: {
        description: "A boolean indicating whether to show the currency symbol for currency fields.",
        type: "boolean",
      },
      textDisplayHint: {
        description:
          "A string providing a hint on how to display text. Valid values include 'unformatted_single_line', 'multi_line', 'email', 'phone_number', 'domain_name', 'ip_address', 'physical_address', 'postal_code'.",
        type: "string",
        enum: [
          "domain_name",
          "email",
          "ip_address",
          "multi_line",
          "phone_number",
          "physical_address",
          "postal_code",
          "unformatted_single_line",
        ],
      },
      type: {
        description: "The data type of the property.",
        type: "string",
        enum: ["bool", "date", "datetime", "enumeration", "number", "phone_number", "string"],
      },
    },
    required: ["fieldType", "groupName", "label", "name", "type"],
  },
  PropertyGroup: {
    type: "object",
    properties: {
      archived: {
        description: "Indicates whether the property group is archived.",
        type: "boolean",
      },
      displayOrder: {
        description:
          "Property groups are displayed in order starting with the lowest positive integer value. Values of -1 will cause the property group to be displayed after any positive values.",
        type: "integer",
        format: "int32",
      },
      label: {
        description: "A human-readable label that will be shown in HubSpot.",
        type: "string",
      },
      name: {
        description:
          "The internal property group name, which must be used when referencing the property group via the API.",
        type: "string",
      },
    },
    required: ["archived", "label", "name"],
  },
  PropertyGroupCreate: {
    type: "object",
    properties: {
      displayOrder: {
        description:
          "Property groups are displayed in order starting with the lowest positive integer value. Values of -1 will cause the property group to be displayed after any positive values.",
        type: "integer",
        format: "int32",
      },
      label: {
        description: "A human-readable label that will be shown in HubSpot.",
        type: "string",
      },
      name: {
        description:
          "The internal property group name, which must be used when referencing the property group via the API.",
        type: "string",
      },
    },
    required: ["label", "name"],
  },
  PropertyGroupUpdate: {
    type: "object",
    properties: {
      displayOrder: {
        description:
          "Property groups are displayed in order starting with the lowest positive integer value. Values of -1 will cause the property group to be displayed after any positive values.",
        type: "integer",
        format: "int32",
      },
      label: {
        description: "A human-readable label that will be shown in HubSpot.",
        type: "string",
      },
    },
    required: [],
  },
  PropertyModificationMetadata: {
    type: "object",
    properties: {
      archivable: {
        description: "Specifies whether the property can be archived.",
        type: "boolean",
      },
      readOnlyDefinition: {
        description: "Indicates whether the property's definition is read-only and cannot be modified.",
        type: "boolean",
      },
      readOnlyOptions: {
        description: "Indicates whether the property's options are read-only and cannot be modified.",
        type: "boolean",
      },
      readOnlyValue: {
        description: "Indicates whether the property's value is read-only and cannot be modified.",
        type: "boolean",
      },
    },
    required: ["archivable", "readOnlyDefinition", "readOnlyValue"],
  },
  PropertyName: {
    type: "object",
    properties: {
      name: {
        description: "The name of the property to read or modify.",
        type: "string",
      },
    },
    required: ["name"],
  },
  PropertyUpdate: {
    type: "object",
    properties: {
      calculationFormula: {
        description: "Represents a formula that is used to compute a calculated property.",
        type: "string",
      },
      currencyPropertyName: {
        description:
          "A string specifying the name of the property that holds the currency information, applicable when showCurrencySymbol is true.",
        type: "string",
      },
      description: {
        description: "A description of the property that will be shown as help text in HubSpot.",
        type: "string",
      },
      displayOrder: {
        description:
          "Properties are displayed in order starting with the lowest positive integer value. Values of -1 will cause the Property to be displayed after any positive values.",
        type: "integer",
        format: "int32",
      },
      fieldType: {
        description: "Controls how the property appears in HubSpot.",
        type: "string",
        enum: [
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
        ],
      },
      formField: {
        description: "Whether or not the property can be used in a HubSpot form.",
        type: "boolean",
      },
      groupName: {
        description: "The name of the property group the property belongs to.",
        type: "string",
      },
      hidden: {
        description: "If true, the property won't be visible and can't be used in HubSpot.",
        type: "boolean",
      },
      label: {
        description: "A human-readable property label that will be shown in HubSpot.",
        type: "string",
      },
      numberDisplayHint: {
        description:
          "A string providing a hint for displaying number values. Valid values include 'unformatted', 'formatted', 'currency', 'percentage', 'duration', and 'probability'.",
        type: "string",
        enum: ["currency", "duration", "formatted", "percentage", "probability", "unformatted"],
      },
      options: {
        description: "A list of valid options for the property.",
        type: "array",
        items: {
          type: "ref",
          ref: "OptionInput",
        },
      },
      showCurrencySymbol: {
        description:
          "A boolean indicating whether to display a currency symbol for number fields formatted as currency.",
        type: "boolean",
      },
      textDisplayHint: {
        description:
          "A string providing a hint for displaying text values. Valid values include 'unformatted_single_line', 'multi_line', 'email', 'phone_number', 'domain_name', 'ip_address', 'physical_address', and 'postal_code'.",
        type: "string",
        enum: [
          "domain_name",
          "email",
          "ip_address",
          "multi_line",
          "phone_number",
          "physical_address",
          "postal_code",
          "unformatted_single_line",
        ],
      },
      type: {
        description: "The data type of the property.",
        type: "string",
        enum: ["bool", "date", "datetime", "enumeration", "number", "phone_number", "string"],
      },
    },
    required: [],
  },
  AssociationSpecWithLabel: {
    description: "Defines the type, direction, and details of the relationship between two CRM objects.",
    type: "object",
    properties: {
      category: {
        description: "The category of the association, such as HUBSPOT_DEFINED, USER_DEFINED, or INTEGRATOR_DEFINED.",
        type: "string",
        enum: ["HUBSPOT_DEFINED", "INTEGRATOR_DEFINED", "USER_DEFINED", "WORK"],
      },
      fromObjectTypeId: {
        type: "string",
      },
      label: {
        description: "A label describing the association between two objects.",
        type: "string",
      },
      toObjectTypeId: {
        type: "string",
      },
      typeId: {
        description: "The unique identifier for the type of association.",
        type: "integer",
        format: "int32",
      },
    },
    required: ["category", "typeId"],
  },
  BatchInputPublicAssociationMultiArchive: {
    type: "object",
    properties: {
      inputs: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicAssociationMultiArchive",
        },
      },
    },
    required: ["inputs"],
  },
  BatchInputPublicAssociationMultiPost: {
    type: "object",
    properties: {
      inputs: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicAssociationMultiPost",
        },
      },
    },
    required: ["inputs"],
  },
  BatchInputPublicDefaultAssociationMultiPost: {
    type: "object",
    properties: {
      inputs: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicDefaultAssociationMultiPost",
        },
      },
    },
    required: ["inputs"],
  },
  BatchInputPublicFetchAssociationsBatchRequest: {
    type: "object",
    properties: {
      inputs: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicFetchAssociationsBatchRequest",
        },
      },
    },
    required: ["inputs"],
  },
  BatchResponse: {
    type: "object",
    properties: {
      completedAt: {
        type: "string",
      },
      errors: {
        type: "array",
        items: {
          type: "ref",
          ref: "StandardError",
        },
      },
      links: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      numErrors: {
        type: "integer",
        format: "int32",
      },
      requestedAt: {
        type: "string",
      },
      results: {
        type: "array",
        items: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      startedAt: {
        type: "string",
      },
      status: {
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  BatchResponseLabelsBetweenObjectPair: {
    type: "object",
    properties: {
      completedAt: {
        description: "The timestamp when the batch processing was completed, in ISO 8601 format.",
        type: "string",
      },
      links: {
        description: "An object containing relevant links related to the batch request.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      requestedAt: {
        description: "The timestamp when the batch request was initially made, in ISO 8601 format.",
        type: "string",
      },
      results: {
        type: "array",
        items: {
          type: "ref",
          ref: "LabelsBetweenObjectPair",
        },
      },
      startedAt: {
        description: "The timestamp when the batch processing began, in ISO 8601 format.",
        type: "string",
      },
      status: {
        description: 'The status of the batch processing request: "PENDING", "PROCESSING", "CANCELLED", or "COMPLETE".',
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  BatchResponseLabelsBetweenObjectPairWithErrors: {
    type: "object",
    properties: {
      completedAt: {
        type: "string",
      },
      errors: {
        type: "array",
        items: {
          type: "ref",
          ref: "StandardError",
        },
      },
      links: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      numErrors: {
        type: "integer",
        format: "int32",
      },
      requestedAt: {
        type: "string",
      },
      results: {
        type: "array",
        items: {
          type: "ref",
          ref: "LabelsBetweenObjectPair",
        },
      },
      startedAt: {
        type: "string",
      },
      status: {
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  BatchResponsePublicAssociationMultiWithLabel: {
    type: "object",
    properties: {
      completedAt: {
        description: "The timestamp when the batch processing was completed, in ISO 8601 format.",
        type: "string",
      },
      links: {
        description: "An object containing relevant links related to the batch request.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      requestedAt: {
        description: "The timestamp when the batch request was initially made, in ISO 8601 format.",
        type: "string",
      },
      results: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicAssociationMultiWithLabel",
        },
      },
      startedAt: {
        description: "The timestamp when the batch processing began, in ISO 8601 format.",
        type: "string",
      },
      status: {
        description: 'The status of the batch processing request: "PENDING", "PROCESSING", "CANCELED", or "COMPLETE".',
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  BatchResponsePublicAssociationMultiWithLabelWithErrors: {
    type: "object",
    properties: {
      completedAt: {
        type: "string",
      },
      errors: {
        type: "array",
        items: {
          type: "ref",
          ref: "StandardError",
        },
      },
      links: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      numErrors: {
        type: "integer",
        format: "int32",
      },
      requestedAt: {
        type: "string",
      },
      results: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicAssociationMultiWithLabel",
        },
      },
      startedAt: {
        type: "string",
      },
      status: {
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  AssociationsBatchResponsePublicDefaultAssociation: {
    description: "The response returned after performing a batch operation on associations.",
    type: "object",
    properties: {
      completedAt: {
        description: "The timestamp when the batch process was completed, in ISO 8601 format.",
        type: "string",
      },
      errors: {
        description: "An array of StandardError objects detailing any errors that occurred during the batch operation.",
        type: "array",
        items: {
          type: "ref",
          ref: "StandardError",
        },
      },
      links: {
        description: "An object containing relevant links related to the batch request.",
        type: "object",
        properties: {},
        required: [],
        additionalProperties: {
          type: "string",
        },
      },
      numErrors: {
        description: "The number of errors encountered during the batch processing.",
        type: "integer",
        format: "int32",
      },
      requestedAt: {
        description: "The timestamp when the batch process was initiated, in ISO 8601 format.",
        type: "string",
      },
      results: {
        description: "An array of PublicDefaultAssociation objects representing the results of the batch operation.",
        type: "array",
        items: {
          type: "ref",
          ref: "PublicDefaultAssociation_1",
        },
      },
      startedAt: {
        description: "The timestamp when the batch process began execution, in ISO 8601 format.",
        type: "string",
      },
      status: {
        description: 'The status of the batch processing request: "PENDING", "PROCESSING", "CANCELLED", or "COMPLETE".',
        type: "string",
        enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
      },
    },
    required: ["completedAt", "results", "startedAt", "status"],
  },
  CollectionResponseMultiAssociatedObjectWithLabelForwardPaging: {
    description:
      "Represents a paginated collection of objects that are associated with multiple labels, including the results and pagination details. This component is used when retrieving associated objects with specific labels in a forward-paging manner.",
    type: "object",
    properties: {
      paging: {
        type: "ref",
        ref: "ForwardPaging",
      },
      results: {
        description:
          "The list of objects that are associated with multiple labels, returned as part of the collection.",
        type: "array",
        items: {
          type: "ref",
          ref: "MultiAssociatedObjectWithLabel",
        },
      },
    },
    required: ["results"],
  },
  DateTime: {
    type: "object",
    properties: {
      dateOnly: {
        description: "Indicates whether the DateTime value represents only a date without a time component.",
        type: "boolean",
      },
      timeZoneShift: {
        description: "The integer value representing the shift in minutes from UTC for the DateTime value.",
        type: "integer",
        format: "int32",
      },
      value: {
        description: "The integer value representing a specific point in time.",
        type: "integer",
        format: "int64",
      },
    },
    required: ["dateOnly", "timeZoneShift", "value"],
  },
  MultiAssociatedObjectWithLabel: {
    description: "Represents an object that is associated with multiple other objects, with optional context.",
    type: "object",
    properties: {
      associationTypes: {
        description:
          "An array of association types that define the relationships between this object and other objects. This property is required.",
        type: "array",
        items: {
          type: "ref",
          ref: "AssociationSpecWithLabel",
        },
      },
      toObjectId: {
        description: "The unique identifier for the target object in the association.",
        type: "string",
      },
    },
    required: ["associationTypes", "toObjectId"],
  },
  Paging1: {
    description:
      "Represents the pagination information for navigating through a list of results in the API. It provides details on how to access the previous or next set of results.",
    type: "object",
    properties: {
      next: {
        type: "ref",
        ref: "NextPage",
      },
      prev: {
        type: "ref",
        ref: "PreviousPage",
      },
    },
    required: [],
  },
  PublicAssociationMultiArchive: {
    type: "object",
    properties: {
      from: {
        type: "ref",
        ref: "PublicObjectId",
      },
      to: {
        type: "array",
        items: {
          type: "ref",
          ref: "PublicObjectId",
        },
      },
    },
    required: ["from", "to"],
  },
  PublicAssociationMultiPost: {
    type: "object",
    properties: {
      from: {
        type: "ref",
        ref: "PublicObjectId",
      },
      to: {
        type: "ref",
        ref: "PublicObjectId",
      },
      types: {
        type: "array",
        items: {
          type: "ref",
          ref: "AssociationSpec",
        },
      },
    },
    required: ["from", "to", "types"],
  },
  PublicAssociationMultiWithLabel: {
    type: "object",
    properties: {
      from: {
        type: "ref",
        ref: "PublicObjectId",
      },
      paging: {
        type: "ref",
        ref: "Paging_1",
      },
      to: {
        type: "array",
        items: {
          type: "ref",
          ref: "MultiAssociatedObjectWithLabel",
        },
      },
    },
    required: ["from", "to"],
  },
  PublicDefaultAssociationMultiPost: {
    type: "object",
    properties: {
      from: {
        type: "ref",
        ref: "PublicObjectId",
      },
      to: {
        type: "ref",
        ref: "PublicObjectId",
      },
    },
    required: ["from", "to"],
  },
  PublicDefaultAssociation1: {
    description:
      "The PublicDefaultAssociation component represents the default association configuration between two objects in HubSpot. It is used to define how objects are related to each other within the platform.",
    type: "object",
    properties: {
      associationSpec: {
        type: "ref",
        ref: "AssociationSpec",
      },
      from: {
        type: "ref",
        ref: "PublicObjectId",
      },
      to: {
        type: "ref",
        ref: "PublicObjectId",
      },
    },
    required: ["associationSpec", "from", "to"],
  },
  PublicFetchAssociationsBatchRequest: {
    type: "object",
    properties: {
      after: {
        description: "A paging cursor token used to retrieve the next set of results in a paginated response.",
        type: "string",
      },
      id: {
        description: "The unique identifier for the object whose associations are being fetched.",
        type: "string",
      },
    },
    required: ["id"],
  },
  ReportCreationResponse: {
    type: "object",
    properties: {
      enqueueTime: {
        type: "ref",
        ref: "DateTime",
      },
      userEmail: {
        description: "Email of the user",
        type: "string",
      },
      userId: {
        description: "ID of the user",
        type: "integer",
        format: "int32",
      },
    },
    required: ["enqueueTime", "userEmail", "userId"],
  },
  ApiUsage: {
    type: "object",
    properties: {
      collectedAt: {
        description: "Indicates when the cache was last updated.",
        type: "string",
      },
      currentUsage: {
        description: "How many API calls an account has made for the current day.",
        type: "integer",
        format: "int32",
      },
      fetchStatus: {
        description: "Status of fetching the information, including if the data came from the cache.",
        type: "string",
        enum: ["CACHED", "FAILURE", "NOTFOUND", "SUCCESS", "TIMEOUT"],
      },
      name: {
        description: "Name of the limit type.",
        type: "string",
      },
      resetsAt: {
        description: "Time that the limit will reset.",
        type: "string",
      },
      usageLimit: {
        description: "Limits by which a single integration can consume the HubSpot public APIs.",
        type: "integer",
        format: "int32",
      },
    },
    required: ["collectedAt", "currentUsage", "fetchStatus", "name", "usageLimit"],
  },
  CollectionResponseApiUsageNoPaging: {
    type: "object",
    properties: {
      results: {
        type: "array",
        items: {
          type: "ref",
          ref: "ApiUsage",
        },
      },
    },
    required: ["results"],
  },
  PortalInformationResponse: {
    type: "object",
    properties: {
      accountType: {
        description: "The type of account, such as APP_DEVELOPER, DEVELOPER_TEST, SANDBOX, or STANDARD.",
        type: "string",
        enum: ["APP_DEVELOPER", "DEVELOPER_TEST", "SANDBOX", "STANDARD"],
      },
      additionalCurrencies: {
        type: "array",
        items: {
          type: "string",
        },
      },
      companyCurrency: {
        description: "The primary currency used by the company.",
        type: "string",
      },
      dataHostingLocation: {
        description: "The location where the account's data is hosted.",
        type: "string",
      },
      portalId: {
        description: "The unique identifier for the HubSpot account.",
        type: "integer",
        format: "int32",
      },
      timeZone: {
        description: "The time zone in which the account operates.",
        type: "string",
      },
      uiDomain: {
        description: "The domain used for accessing the HubSpot user interface.",
        type: "string",
      },
      utcOffset: {
        description: "The time zone offset from UTC in hours and minutes.",
        type: "string",
      },
      utcOffsetMilliseconds: {
        description: "The time zone offset from UTC in milliseconds.",
        type: "integer",
        format: "int64",
      },
    },
    required: [
      "accountType",
      "additionalCurrencies",
      "companyCurrency",
      "dataHostingLocation",
      "portalId",
      "timeZone",
      "uiDomain",
      "utcOffset",
      "utcOffsetMilliseconds",
    ],
  },
  PutCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdRequest:
    {
      type: "array",
      items: {
        type: "ref",
        ref: "AssociationSpec",
      },
    },
}
