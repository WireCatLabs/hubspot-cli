// GENERATED. DO NOT EDIT.
// Source: spec/hubspot/, checked against provenance.json
// Run: pnpm generate

import type {
  ApiServer,
  ManifestOperation,
  SecurityRequirement,
  SecurityScheme,
} from "@wirecat/cli-base/codegen/runtime"

export const operations: readonly ManifestOperation[] = [
  {
    id: "get-/crm/objects/2026-03/contacts_getPage",
    command: "contacts-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/contacts",
    },
    effect: "read",
    summary: "Retrieve contacts",
    description: "Retrieve all contacts, using query parameters to specify the information that gets returned.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 10,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseSimplePublicObjectWithAssociationsForwardPaging",
    },
  },
  {
    id: "post-/crm/objects/2026-03/contacts_create",
    command: "contacts-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/contacts",
    },
    effect: "write",
    summary: "Create a contact",
    description:
      "Create a single contact. Include a `properties` object to define [property values](https://developers.hubspot.com/docs/guides/api/crm/properties) for the contact, along with an `associations` array to define [associations](https://developers.hubspot.com/docs/guides/api/crm/associations/associations-v4) with other CRM records.",
    tags: ["Basic"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/contacts/batch/archive_archive",
    command: "contacts-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/contacts/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of contacts",
    description:
      "Archive a batch of contacts by ID. Archived contacts can be restored within 90 days of deletion. Learn more about the [data impacted by contact deletions](https://knowledge.hubspot.com/privacy-and-consent/understand-restorable-and-permanent-contact-deletions) and how to [restore archived records](https://knowledge.hubspot.com/records/restore-deleted-records).",
    tags: ["Batch"],
    permissions: [
      {
        key: "people.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectId",
    },
  },
  {
    id: "post-/crm/objects/2026-03/contacts/batch/create_create",
    command: "contacts-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/contacts/batch/create",
    },
    effect: "write",
    summary: "Create a batch of contacts",
    description:
      "Create a batch of contacts. The `inputs` array can contain a `properties` object to define property values for each record, along with an `associations` array to define [associations](https://developers.hubspot.com/docs/guides/api/crm/associations/associations-v4) with other CRM records.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/contacts/batch/read_read",
    command: "contacts-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/contacts/batch/read",
    },
    effect: "read",
    summary: "Retrieve a batch of contacts",
    description: "Retrieve a batch of contacts by ID (`contactId`) or unique property value (`idProperty`). ",
    tags: ["Batch"],
    parameters: [
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputSimplePublicObjectId",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/contacts/batch/update_update",
    command: "contacts-batch-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/contacts/batch/update",
    },
    effect: "write",
    summary: "Update a batch of contacts",
    description:
      "Update a batch of contacts by ID (`contactId`) or unique property value (`idProperty`). Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInput",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/contacts/batch/upsert_upsert",
    command: "contacts-batch-upsert",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/contacts/batch/upsert",
    },
    effect: "write",
    summary: "Create or update a batch of contacts",
    description:
      "Upsert a batch of contacts. The `inputs` array can contain a `properties` object to define property values for each record.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputUpsert",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicUpsertObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/contacts/gdpr-delete_purge",
    command: "contacts-gdpr-delete",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/contacts/gdpr-delete",
    },
    effect: "destructive",
    summary: "Permanently delete a contact (GDPR-compliant)",
    description:
      "Permanently delete a contact and all associated content to follow GDPR. Use optional property `idProperty` set to `email` to identify contact by email address. If email address is not found, the email address will be added to a blocklist and prevent it from being used in the future. Learn more about [permanently deleting contacts](https://knowledge.hubspot.com/privacy-and-consent/how-do-i-perform-a-gdpr-delete-in-hubspot).",
    tags: ["Advanced"],
    permissions: [
      {
        key: "people.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicGdprDeleteInput",
    },
  },
  {
    id: "post-/crm/objects/2026-03/contacts/merge_merge",
    command: "contacts-merge",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/contacts/merge",
    },
    effect: "destructive",
    summary: "Merge two contacts",
    description:
      "Merge two contact records. Learn more about [merging records](https://knowledge.hubspot.com/records/merge-records). ",
    tags: ["Advanced"],
    permissions: [
      {
        key: "people.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicMergeInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/contacts/search_doSearch",
    command: "contacts-search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/contacts/search",
    },
    effect: "read",
    summary: "Search for contacts",
    description:
      "Search for contacts by filtering on properties, searching through associations, and sorting results. Learn more about [CRM search](https://developers.hubspot.com/docs/guides/api/crm/search#make-a-search-request).",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/contacts/{contactId}_getById",
    command: "contacts-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/contacts/{contactId}",
    },
    effect: "read",
    summary: "Retrieve a contact",
    description:
      "Retrieve a contact by its ID (`contactId`) or by a unique property (`idProperty`). You can specify what is returned using the `properties` query parameter.",
    tags: ["Basic"],
    parameters: [
      {
        name: "contactId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SimplePublicObjectWithAssociations",
    },
  },
  {
    id: "patch-/crm/objects/2026-03/contacts/{contactId}_update",
    command: "contacts-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/objects/2026-03/contacts/{contactId}",
    },
    effect: "write",
    summary: "Update a contact",
    description:
      "Update an existing contact, identified by ID or email/unique property value. To identify a contact by ID, include the ID in the request URL path. To identify a contact by their email or other unique property, include the email/property value in the request URL path, and add the `idProperty` query parameter (`/crm/v3/objects/contacts/jon@website.com?idProperty=email`). Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Basic"],
    parameters: [
      {
        name: "contactId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/contacts/{contactId}_archive",
    command: "contacts-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/contacts/{contactId}",
    },
    effect: "destructive",
    summary: "Archive a contact",
    description:
      "Delete a contact by ID. Deleted contacts can be restored within 90 days of deletion. Learn more about the [data impacted by contact deletions](https://knowledge.hubspot.com/privacy-and-consent/understand-restorable-and-permanent-contact-deletions) and how to [restore archived records](https://knowledge.hubspot.com/records/restore-deleted-records).",
    tags: ["Basic"],
    permissions: [
      {
        key: "people.delete",
      },
    ],
    parameters: [
      {
        name: "contactId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
    ],
  },
  {
    id: "put-/crm/objects/2026-03/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId}_/crm/objects/2026-03/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId}",
    command: "associations-default-replace",
    binding: {
      kind: "http",
      method: "PUT",
      path: "/crm/objects/2026-03/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId}",
    },
    effect: "write",
    summary: "",
    description: "",
    tags: ["Batch"],
    parameters: [
      {
        name: "fromObjectId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "fromObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "BatchResponsePublicDefaultAssociation",
    },
  },
  {
    id: "put-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}_/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}",
    command: "associations-replace",
    binding: {
      kind: "http",
      method: "PUT",
      path: "/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}",
    },
    effect: "write",
    summary: "",
    description: "",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema:
        "PutCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdCrmObjects202603ObjectTypeObjectIdAssociationsToObjectTypeToObjectIdRequest",
    },
    response: {
      confidence: "contract",
      schema: "LabelsBetweenObjectPair",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}_/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}",
    command: "associations-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}",
    },
    effect: "destructive",
    summary: "",
    description: "",
    tags: ["Basic"],
    permissions: [
      {
        key: "associations.delete",
      },
    ],
    parameters: [
      {
        name: "objectId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
  },
  {
    id: "get-/crm/objects/2026-03/companies_getPage",
    command: "companies-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/companies",
    },
    effect: "read",
    summary: "Retrieve companies",
    description: "Retrieve all companies, using query parameters to control the information that gets returned.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 10,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseSimplePublicObjectWithAssociationsForwardPaging",
    },
  },
  {
    id: "post-/crm/objects/2026-03/companies_create",
    command: "companies-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/companies",
    },
    effect: "write",
    summary: "Create a company",
    description:
      "Create a single company. Include a `properties` object to define [property values](https://developers.hubspot.com/docs/guides/api/crm/properties) for the company, along with an `associations` array to define [associations](https://developers.hubspot.com/docs/guides/api/crm/associations/associations-v4) with other CRM records.",
    tags: ["Basic"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/companies/batch/archive_archive",
    command: "companies-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/companies/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of companies",
    description:
      "Delete a batch of companies by ID. Deleted companies can be restored within 90 days of deletion. Learn more about [restoring records](https://knowledge.hubspot.com/records/restore-deleted-records).",
    tags: ["Batch"],
    permissions: [
      {
        key: "organizations.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectId",
    },
  },
  {
    id: "post-/crm/objects/2026-03/companies/batch/create_create",
    command: "companies-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/companies/batch/create",
    },
    effect: "write",
    summary: "Create a batch of companies",
    description:
      "Create a batch of companies. The `inputs` array can contain a `properties` object to define property values for each company, along with an `associations` array to define [associations](https://developers.hubspot.com/docs/guides/api/crm/associations/associations-v4) with other CRM records.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/companies/batch/read_read",
    command: "companies-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/companies/batch/read",
    },
    effect: "read",
    summary: "Retrieve a batch of companies",
    description:
      "Retrieve a batch of companies by ID (`companyId`) or by a unique property (`idProperty`). You can specify what is returned using the `properties` query parameter.",
    tags: ["Batch"],
    parameters: [
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputSimplePublicObjectId",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/companies/batch/update_update",
    command: "companies-batch-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/companies/batch/update",
    },
    effect: "write",
    summary: "Update a batch of companies",
    description: "Update a batch of companies by ID.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInput",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/companies/batch/upsert_upsert",
    command: "companies-batch-upsert",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/companies/batch/upsert",
    },
    effect: "write",
    summary: "Create or update a batch of companies by unique property values",
    description:
      "Create or update companies identified by a unique property value as specified by the `idProperty` query parameter. `idProperty` query param refers to a property whose values are unique for the object.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputUpsert",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicUpsertObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/companies/merge_merge",
    command: "companies-merge",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/companies/merge",
    },
    effect: "destructive",
    summary: "Merge two companies",
    description:
      "Merge two company records. Learn more about [merging records](https://knowledge.hubspot.com/records/merge-records).",
    tags: ["Advanced"],
    permissions: [
      {
        key: "organizations.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicMergeInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/companies/search_doSearch",
    command: "companies-search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/companies/search",
    },
    effect: "read",
    summary: "Search for companies",
    description:
      "Search for companies by filtering on properties, searching through associations, and sorting results. Learn more about [CRM search](https://developers.hubspot.com/docs/guides/api/crm/search#make-a-search-request).",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/companies/{companyId}_getById",
    command: "companies-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/companies/{companyId}",
    },
    effect: "read",
    summary: "Retrieve a company",
    description:
      "Retrieve a company by its ID (`companyId`) or by a unique property (`idProperty`). You can specify what is returned using the `properties` query parameter.",
    tags: ["Basic"],
    parameters: [
      {
        name: "companyId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SimplePublicObjectWithAssociations",
    },
  },
  {
    id: "patch-/crm/objects/2026-03/companies/{companyId}_update",
    command: "companies-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/objects/2026-03/companies/{companyId}",
    },
    effect: "write",
    summary: "Update a company",
    description:
      "Update a company by ID (`companyId`) or unique property value (`idProperty`). Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Basic"],
    parameters: [
      {
        name: "companyId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/companies/{companyId}_archive",
    command: "companies-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/companies/{companyId}",
    },
    effect: "destructive",
    summary: "Archive a company",
    description:
      "Delete a company by ID. Deleted companies can be restored within 90 days of deletion. Learn more about [restoring records](https://knowledge.hubspot.com/records/restore-deleted-records).",
    tags: ["Basic"],
    permissions: [
      {
        key: "organizations.delete",
      },
    ],
    parameters: [
      {
        name: "companyId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
    ],
  },
  {
    id: "get-/crm/objects/2026-03/0-3_getPage",
    command: "deals-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/0-3",
    },
    effect: "read",
    summary: "List",
    description: "Read a page of deals. Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 10,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseSimplePublicObjectWithAssociationsForwardPaging",
    },
  },
  {
    id: "post-/crm/objects/2026-03/0-3_create",
    command: "deals-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/0-3",
    },
    effect: "write",
    summary: "Create",
    description:
      "Create a deal with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard deals is provided.",
    tags: ["Basic"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/0-3/batch/archive_archive",
    command: "deals-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/0-3/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of deals by ID",
    description: "Archive multiple deals using their IDs.",
    tags: ["Batch"],
    permissions: [
      {
        key: "deals.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectId",
    },
  },
  {
    id: "post-/crm/objects/2026-03/0-3/batch/create_create",
    command: "deals-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/0-3/batch/create",
    },
    effect: "write",
    summary: "Create a batch of deals",
    description: "Create multiple deals in a single request.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/0-3/batch/read_read",
    command: "deals-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/0-3/batch/read",
    },
    effect: "read",
    summary: "Read a batch of deals by internal ID, or unique property values",
    description:
      "Retrieve records by record ID or include the `idProperty` parameter to retrieve records by a custom unique value property. ",
    tags: ["Batch"],
    parameters: [
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputSimplePublicObjectId",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/0-3/batch/update_update",
    command: "deals-batch-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/0-3/batch/update",
    },
    effect: "write",
    summary: "Update a batch of deals by internal ID, or unique property values",
    description: "Update multiple deals using their internal IDs or unique property values.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInput",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/0-3/batch/upsert_upsert",
    command: "deals-batch-upsert",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/0-3/batch/upsert",
    },
    effect: "write",
    summary: "Create or update a batch of deals by unique property values",
    description:
      "Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputUpsert",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicUpsertObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/0-3/merge_merge",
    command: "deals-merge",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/0-3/merge",
    },
    effect: "destructive",
    summary: "Merge two deals with same type",
    description: "Combine two deals of the same type into a single deal.",
    tags: ["Basic"],
    permissions: [
      {
        key: "deals.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicMergeInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/0-3/search_doSearch",
    command: "deals-search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/0-3/search",
    },
    effect: "read",
    summary: "Search for deals using various filters and criteria to retrieve specific records.",
    description: "Search for deals using specified criteria and filters.",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/0-3/{dealId}_getById",
    command: "deals-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/0-3/{dealId}",
    },
    effect: "read",
    summary: "Read",
    description:
      "Read an Object identified by `{dealId}`. `{dealId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    parameters: [
      {
        name: "dealId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SimplePublicObjectWithAssociations",
    },
  },
  {
    id: "patch-/crm/objects/2026-03/0-3/{dealId}_update",
    command: "deals-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/objects/2026-03/0-3/{dealId}",
    },
    effect: "write",
    summary: "Update",
    description:
      "Perform a partial update of an Object identified by `{dealId}`or optionally a unique property value as specified by the `idProperty` query param. `{dealId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Basic"],
    parameters: [
      {
        name: "dealId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/0-3/{dealId}_archive",
    command: "deals-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/0-3/{dealId}",
    },
    effect: "destructive",
    summary: "Archive",
    description: "Move an Object identified by `{dealId}` to the recycling bin.",
    tags: ["Basic"],
    permissions: [
      {
        key: "deals.delete",
      },
    ],
    parameters: [
      {
        name: "dealId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
    ],
  },
  {
    id: "get-/crm/objects/2026-03/tickets_getPage",
    command: "tickets-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/tickets",
    },
    effect: "read",
    summary: "List",
    description: "Read a page of tickets. Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 10,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseSimplePublicObjectWithAssociationsForwardPaging",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tickets_create",
    command: "tickets-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tickets",
    },
    effect: "write",
    summary: "Create",
    description:
      "Create a ticket with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard tickets is provided.",
    tags: ["Basic"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tickets/batch/archive_archive",
    command: "tickets-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tickets/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of tickets by ID",
    description:
      "Delete a batch of tickets by ID. Deleted tickets can be restored within 90 days of deletion. Learn more about [restoring records](https://knowledge.hubspot.com/records/restore-deleted-records).",
    tags: ["Batch"],
    permissions: [
      {
        key: "tickets.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectId",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tickets/batch/create_create",
    command: "tickets-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tickets/batch/create",
    },
    effect: "write",
    summary: "Create a batch of tickets",
    description:
      "Create a batch of tickets. The `inputs` array can contain a `properties` object to define property values for the ticket, along with an `associations` array to define [associations](https://developers.hubspot.com/docs/guides/api/crm/associations/associations-v4) with other CRM records.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tickets/batch/read_read",
    command: "tickets-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tickets/batch/read",
    },
    effect: "read",
    summary: "Read a batch of tickets by internal ID, or unique property values",
    description: "Retrieve a batch of tickets by ID (`ticketId`) or unique property value (`idProperty`). ",
    tags: ["Batch"],
    parameters: [
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputSimplePublicObjectId",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tickets/batch/update_update",
    command: "tickets-batch-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tickets/batch/update",
    },
    effect: "write",
    summary: "Update a batch of tickets by internal ID, or unique property values",
    description:
      "Update a batch of tickets by ID (`ticketId`) or unique property value (`idProperty`). Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInput",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tickets/batch/upsert_upsert",
    command: "tickets-batch-upsert",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tickets/batch/upsert",
    },
    effect: "write",
    summary: "Create or update a batch of tickets by unique property values",
    description:
      "Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputUpsert",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicUpsertObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tickets/merge_merge",
    command: "tickets-merge",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tickets/merge",
    },
    effect: "destructive",
    summary: "Merge two tickets",
    description: "Merge two tickets, combining them into one ticket record.",
    tags: ["Advanced"],
    permissions: [
      {
        key: "tickets.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicMergeInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tickets/search_doSearch",
    command: "tickets-search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tickets/search",
    },
    effect: "read",
    summary: "Search for tickets",
    description:
      "Search for tickets by filtering on properties, searching through associations, and sorting results. Learn more about [CRM search](https://developers.hubspot.com/docs/guides/api/crm/search#make-a-search-request).",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/tickets/{ticketId}_getById",
    command: "tickets-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/tickets/{ticketId}",
    },
    effect: "read",
    summary: "Read",
    description:
      "Read an Object identified by `{ticketId}`. `{ticketId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    parameters: [
      {
        name: "ticketId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SimplePublicObjectWithAssociations",
    },
  },
  {
    id: "patch-/crm/objects/2026-03/tickets/{ticketId}_update",
    command: "tickets-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/objects/2026-03/tickets/{ticketId}",
    },
    effect: "write",
    summary: "Update",
    description:
      "Perform a partial update of an Object identified by `{ticketId}`or optionally a unique property value as specified by the `idProperty` query param. `{ticketId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Basic"],
    parameters: [
      {
        name: "ticketId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/tickets/{ticketId}_archive",
    command: "tickets-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/tickets/{ticketId}",
    },
    effect: "destructive",
    summary: "Archive",
    description: "Move an Object identified by `{ticketId}` to the recycling bin.",
    tags: ["Basic"],
    permissions: [
      {
        key: "tickets.delete",
      },
    ],
    parameters: [
      {
        name: "ticketId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
    ],
  },
  {
    id: "get-/crm/objects/2026-03/leads_getPage",
    command: "leads-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/leads",
    },
    effect: "read",
    summary: "List",
    description: "Read a page of leads. Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 10,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseSimplePublicObjectWithAssociationsForwardPaging",
    },
  },
  {
    id: "post-/crm/objects/2026-03/leads_create",
    command: "leads-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/leads",
    },
    effect: "write",
    summary: "Create",
    description:
      "Create a lead with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard leads is provided.",
    tags: ["Basic"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/leads/batch/archive_archive",
    command: "leads-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/leads/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of leads by ID",
    description: "Archive multiple leads by their IDs in a single request, moving them to the recycling bin.",
    tags: ["Batch"],
    permissions: [
      {
        key: "leads.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectId",
    },
  },
  {
    id: "post-/crm/objects/2026-03/leads/batch/create_create",
    command: "leads-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/leads/batch/create",
    },
    effect: "write",
    summary: "Create a batch of leads",
    description:
      "Create multiple lead records in a single request by providing a batch of lead data. This endpoint allows for efficient creation of leads by processing them together, which can be useful for syncing data from other systems or importing large datasets.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/leads/batch/read_read",
    command: "leads-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/leads/batch/read",
    },
    effect: "read",
    summary: "Read a batch of leads by internal ID, or unique property values",
    description:
      "Retrieve records by record ID or include the `idProperty` parameter to retrieve records by a custom unique value property. ",
    tags: ["Batch"],
    parameters: [
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputSimplePublicObjectId",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/leads/batch/update_update",
    command: "leads-batch-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/leads/batch/update",
    },
    effect: "write",
    summary: "Update a batch of leads by internal ID, or unique property values",
    description:
      "Update multiple lead records using their internal IDs or unique property values. This endpoint allows batch processing of updates, where each lead's properties can be modified based on the provided input. Ensure that the properties being updated exist on the lead objects to avoid errors.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInput",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/leads/batch/upsert_upsert",
    command: "leads-batch-upsert",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/leads/batch/upsert",
    },
    effect: "write",
    summary: "Create or update a batch of leads by unique property values",
    description:
      "Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputUpsert",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicUpsertObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/leads/search_doSearch",
    command: "leads-search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/leads/search",
    },
    effect: "read",
    summary: "Search for leads using specified criteria.",
    description:
      "Perform a search for leads based on the provided filter groups, properties, and sorting options. The request allows for pagination and can return up to 200 results per page.",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/leads/{leadsId}_getById",
    command: "leads-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/leads/{leadsId}",
    },
    effect: "read",
    summary: "Read",
    description:
      "Read an Object identified by `{leadsId}`. `{leadsId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    parameters: [
      {
        name: "leadsId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SimplePublicObjectWithAssociations",
    },
  },
  {
    id: "patch-/crm/objects/2026-03/leads/{leadsId}_update",
    command: "leads-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/objects/2026-03/leads/{leadsId}",
    },
    effect: "write",
    summary: "Update",
    description:
      "Perform a partial update of an Object identified by `{leadsId}`or optionally a unique property value as specified by the `idProperty` query param. `{leadsId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Basic"],
    parameters: [
      {
        name: "leadsId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/leads/{leadsId}_archive",
    command: "leads-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/leads/{leadsId}",
    },
    effect: "destructive",
    summary: "Archive",
    description: "Move an Object identified by `{leadsId}` to the recycling bin.",
    tags: ["Basic"],
    permissions: [
      {
        key: "leads.delete",
      },
    ],
    parameters: [
      {
        name: "leadsId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
    ],
  },
  {
    id: "get-/crm/objects/2026-03/notes_getPage",
    command: "notes-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/notes",
    },
    effect: "read",
    summary: "List",
    description: "Read a page of notes. Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 10,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseSimplePublicObjectWithAssociationsForwardPaging",
    },
  },
  {
    id: "post-/crm/objects/2026-03/notes_create",
    command: "notes-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/notes",
    },
    effect: "write",
    summary: "Create",
    description:
      "Create a note with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard notes is provided.",
    tags: ["Basic"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/notes/batch/archive_archive",
    command: "notes-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/notes/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of notes by ID",
    description:
      "Archive multiple notes by their IDs in a single request. This operation moves the specified notes to the recycling bin, making them inaccessible from regular queries.",
    tags: ["Batch"],
    permissions: [
      {
        key: "notes.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectId",
    },
  },
  {
    id: "post-/crm/objects/2026-03/notes/batch/create_create",
    command: "notes-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/notes/batch/create",
    },
    effect: "write",
    summary: "Create a batch of notes",
    description:
      "Create multiple notes in a single request by providing the necessary properties for each note. This operation returns the created notes with their unique identifiers.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/notes/batch/read_read",
    command: "notes-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/notes/batch/read",
    },
    effect: "read",
    summary: "Read a batch of notes by internal ID, or unique property values",
    description:
      "Retrieve records by record ID or include the `idProperty` parameter to retrieve records by a custom unique value property. ",
    tags: ["Batch"],
    parameters: [
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputSimplePublicObjectId",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/notes/batch/update_update",
    command: "notes-batch-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/notes/batch/update",
    },
    effect: "write",
    summary: "Update a batch of notes by internal ID, or unique property values",
    description:
      "Update multiple notes using their internal IDs or unique property values. This operation allows you to modify the properties of several notes in a single request, streamlining the process of managing note data in bulk.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInput",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/notes/batch/upsert_upsert",
    command: "notes-batch-upsert",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/notes/batch/upsert",
    },
    effect: "write",
    summary: "Create or update a batch of notes by unique property values",
    description:
      "Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputUpsert",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicUpsertObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/notes/search_doSearch",
    command: "notes-search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/notes/search",
    },
    effect: "read",
    summary: "Search for notes based on specified criteria.",
    description:
      "Execute a search for notes using filters, sorting options, and other query parameters to refine the results. This endpoint allows for complex queries to locate specific notes within the CRM system.",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/notes/{noteId}_getById",
    command: "notes-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/notes/{noteId}",
    },
    effect: "read",
    summary: "Read",
    description:
      "Read an Object identified by `{noteId}`. `{noteId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    parameters: [
      {
        name: "noteId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SimplePublicObjectWithAssociations",
    },
  },
  {
    id: "patch-/crm/objects/2026-03/notes/{noteId}_update",
    command: "notes-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/objects/2026-03/notes/{noteId}",
    },
    effect: "write",
    summary: "Update",
    description:
      "Perform a partial update of an Object identified by `{noteId}`or optionally a unique property value as specified by the `idProperty` query param. `{noteId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Basic"],
    parameters: [
      {
        name: "noteId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/notes/{noteId}_archive",
    command: "notes-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/notes/{noteId}",
    },
    effect: "destructive",
    summary: "Archive",
    description: "Move an Object identified by `{noteId}` to the recycling bin.",
    tags: ["Basic"],
    permissions: [
      {
        key: "notes.delete",
      },
    ],
    parameters: [
      {
        name: "noteId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
    ],
  },
  {
    id: "get-/crm/objects/2026-03/calls_getPage",
    command: "calls-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/calls",
    },
    effect: "read",
    summary: "List",
    description: "Read a page of calls. Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 10,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseSimplePublicObjectWithAssociationsForwardPaging",
    },
  },
  {
    id: "post-/crm/objects/2026-03/calls_create",
    command: "calls-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/calls",
    },
    effect: "write",
    summary: "Create",
    description:
      "Create a call with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard calls is provided.",
    tags: ["Basic"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/calls/batch/archive_archive",
    command: "calls-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/calls/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of calls by ID",
    description:
      "Archive a batch of calls by ID. Deleted calls can be restored within 90 days of being deleted, but call recordings recording will be permanently deleted. Learn more about [restoring activity records](https://knowledge.hubspot.com/records/restore-deleted-activity-in-a-record).",
    tags: ["Batch"],
    permissions: [
      {
        key: "calls.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectId",
    },
  },
  {
    id: "post-/crm/objects/2026-03/calls/batch/create_create",
    command: "calls-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/calls/batch/create",
    },
    effect: "write",
    summary: "Create a batch of calls",
    description:
      "Create a batch of calls. The `inputs` array can contain a `properties` object to define property values for each record, along with an `associations` array to define [associations](https://developers.hubspot.com/docs/guides/api/crm/associations/associations-v4) with other CRM records.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/calls/batch/read_read",
    command: "calls-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/calls/batch/read",
    },
    effect: "read",
    summary: "Read a batch of calls by internal ID, or unique property values",
    description: "Retrieve a batch of calls by ID.",
    tags: ["Batch"],
    parameters: [
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputSimplePublicObjectId",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/calls/batch/update_update",
    command: "calls-batch-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/calls/batch/update",
    },
    effect: "write",
    summary: "Update a batch of calls by internal ID, or unique property values",
    description: "Update a batch of calls by ID.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInput",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/calls/batch/upsert_upsert",
    command: "calls-batch-upsert",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/calls/batch/upsert",
    },
    effect: "write",
    summary: "Create or update a batch of calls by unique property values",
    description:
      "Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputUpsert",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicUpsertObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/calls/search_doSearch",
    command: "calls-search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/calls/search",
    },
    effect: "read",
    summary: "Search for calls",
    description:
      "Search for calls by filtering on properties, searching through associations, and sorting results. Learn more about [CRM search](https://developers.hubspot.com/docs/guides/api/crm/search#make-a-search-request).",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/calls/{callId}_getById",
    command: "calls-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/calls/{callId}",
    },
    effect: "read",
    summary: "Read",
    description:
      "Read an Object identified by `{callId}`. `{callId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    parameters: [
      {
        name: "callId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SimplePublicObjectWithAssociations",
    },
  },
  {
    id: "patch-/crm/objects/2026-03/calls/{callId}_update",
    command: "calls-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/objects/2026-03/calls/{callId}",
    },
    effect: "write",
    summary: "Update",
    description:
      "Perform a partial update of an Object identified by `{callId}`or optionally a unique property value as specified by the `idProperty` query param. `{callId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Basic"],
    parameters: [
      {
        name: "callId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/calls/{callId}_archive",
    command: "calls-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/calls/{callId}",
    },
    effect: "destructive",
    summary: "Archive",
    description: "Move an Object identified by `{callId}` to the recycling bin.",
    tags: ["Basic"],
    permissions: [
      {
        key: "calls.delete",
      },
    ],
    parameters: [
      {
        name: "callId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
    ],
  },
  {
    id: "get-/crm/objects/2026-03/emails_getPage",
    command: "emails-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/emails",
    },
    effect: "read",
    summary: "List",
    description: "Read a page of emails. Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 10,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseSimplePublicObjectWithAssociationsForwardPaging",
    },
  },
  {
    id: "post-/crm/objects/2026-03/emails_create",
    command: "emails-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/emails",
    },
    effect: "write",
    summary: "Create",
    description:
      "Create a email with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard emails is provided.",
    tags: ["Basic"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/emails/batch/archive_archive",
    command: "emails-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/emails/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of emails by ID",
    description: "Archive a batch of emails identified by their IDs.",
    tags: ["Batch"],
    permissions: [
      {
        key: "emails.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectId",
    },
  },
  {
    id: "post-/crm/objects/2026-03/emails/batch/create_create",
    command: "emails-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/emails/batch/create",
    },
    effect: "write",
    summary: "Create a batch of emails",
    description: "Create a batch of emails with specified properties and return the created objects.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/emails/batch/read_read",
    command: "emails-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/emails/batch/read",
    },
    effect: "read",
    summary: "Read a batch of emails by internal ID, or unique property values",
    description:
      "Retrieve records by record ID or include the `idProperty` parameter to retrieve records by a custom unique value property. ",
    tags: ["Batch"],
    parameters: [
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputSimplePublicObjectId",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/emails/batch/update_update",
    command: "emails-batch-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/emails/batch/update",
    },
    effect: "write",
    summary: "Update a batch of emails by internal ID, or unique property values",
    description: "Update a batch of emails using their internal IDs or unique property values.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInput",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/emails/batch/upsert_upsert",
    command: "emails-batch-upsert",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/emails/batch/upsert",
    },
    effect: "write",
    summary: "Create or update a batch of emails by unique property values",
    description:
      "Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputUpsert",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicUpsertObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/emails/search_doSearch",
    command: "emails-search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/emails/search",
    },
    effect: "read",
    summary: "Search for emails using specified criteria and filters.",
    description: "Perform a search for emails based on the provided query parameters and return matching results.",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/emails/{emailId}_getById",
    command: "emails-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/emails/{emailId}",
    },
    effect: "read",
    summary: "Read",
    description:
      "Read an Object identified by `{emailId}`. `{emailId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    parameters: [
      {
        name: "emailId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SimplePublicObjectWithAssociations",
    },
  },
  {
    id: "patch-/crm/objects/2026-03/emails/{emailId}_update",
    command: "emails-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/objects/2026-03/emails/{emailId}",
    },
    effect: "write",
    summary: "Update",
    description:
      "Perform a partial update of an Object identified by `{emailId}`or optionally a unique property value as specified by the `idProperty` query param. `{emailId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Basic"],
    parameters: [
      {
        name: "emailId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/emails/{emailId}_archive",
    command: "emails-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/emails/{emailId}",
    },
    effect: "destructive",
    summary: "Archive",
    description: "Move an Object identified by `{emailId}` to the recycling bin.",
    tags: ["Basic"],
    permissions: [
      {
        key: "emails.delete",
      },
    ],
    parameters: [
      {
        name: "emailId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
    ],
  },
  {
    id: "get-/crm/objects/2026-03/meetings_getPage",
    command: "meetings-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/meetings",
    },
    effect: "read",
    summary: "List",
    description: "Read a page of meetings. Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 10,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseSimplePublicObjectWithAssociationsForwardPaging",
    },
  },
  {
    id: "post-/crm/objects/2026-03/meetings_create",
    command: "meetings-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/meetings",
    },
    effect: "write",
    summary: "Create",
    description:
      "Create a meeting with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard meetings is provided.",
    tags: ["Basic"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/meetings/batch/archive_archive",
    command: "meetings-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/meetings/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of meetings by ID",
    description: "Delete a batch of meetings by ID.",
    tags: ["Batch"],
    permissions: [
      {
        key: "meetings.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectId",
    },
  },
  {
    id: "post-/crm/objects/2026-03/meetings/batch/create_create",
    command: "meetings-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/meetings/batch/create",
    },
    effect: "write",
    summary: "Create a batch of meetings",
    description:
      "Create a batch of meetings. The `inputs` array can contain a `properties` object to define property values for the record, along with an `associations` array to define relationships with other object records.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/meetings/batch/read_read",
    command: "meetings-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/meetings/batch/read",
    },
    effect: "read",
    summary: "Read a batch of meetings by internal ID, or unique property values",
    description:
      "Retrieve records by record ID or include the `idProperty` parameter to retrieve records by a custom unique value property. ",
    tags: ["Batch"],
    parameters: [
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputSimplePublicObjectId",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/meetings/batch/update_update",
    command: "meetings-batch-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/meetings/batch/update",
    },
    effect: "write",
    summary: "Update a batch of meetings by internal ID, or unique property values",
    description:
      "Update a batch of meetings by ID (`objectId`) or unique property value (`idProperty`). Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInput",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/meetings/batch/upsert_upsert",
    command: "meetings-batch-upsert",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/meetings/batch/upsert",
    },
    effect: "write",
    summary: "Create or update a batch of meetings by unique property values",
    description:
      "Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputUpsert",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicUpsertObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/meetings/search_doSearch",
    command: "meetings-search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/meetings/search",
    },
    effect: "read",
    summary: "Search for meetings",
    description: "Search for meetings by filtering on properties, searching through associations, and sorting results.",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/meetings/{meetingId}_getById",
    command: "meetings-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/meetings/{meetingId}",
    },
    effect: "read",
    summary: "Read",
    description:
      "Read an Object identified by `{meetingId}`. `{meetingId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    parameters: [
      {
        name: "meetingId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SimplePublicObjectWithAssociations",
    },
  },
  {
    id: "patch-/crm/objects/2026-03/meetings/{meetingId}_update",
    command: "meetings-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/objects/2026-03/meetings/{meetingId}",
    },
    effect: "write",
    summary: "Update",
    description:
      "Perform a partial update of an Object identified by `{meetingId}`or optionally a unique property value as specified by the `idProperty` query param. `{meetingId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Basic"],
    parameters: [
      {
        name: "meetingId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/meetings/{meetingId}_archive",
    command: "meetings-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/meetings/{meetingId}",
    },
    effect: "destructive",
    summary: "Archive",
    description: "Move an Object identified by `{meetingId}` to the recycling bin.",
    tags: ["Basic"],
    permissions: [
      {
        key: "meetings.delete",
      },
    ],
    parameters: [
      {
        name: "meetingId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
    ],
  },
  {
    id: "get-/crm/objects/2026-03/tasks_getPage",
    command: "tasks-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/tasks",
    },
    effect: "read",
    summary: "List",
    description: "Read a page of tasks. Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 10,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseSimplePublicObjectWithAssociationsForwardPaging",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tasks_create",
    command: "tasks-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tasks",
    },
    effect: "write",
    summary: "Create",
    description:
      "Create a task with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard tasks is provided.",
    tags: ["Basic"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tasks/batch/archive_archive",
    command: "tasks-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tasks/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of tasks by ID",
    description:
      "Archive a batch of tasks by their IDs, moving them to the recycling bin. This operation requires a list of task IDs to be provided in the request body.",
    tags: ["Batch"],
    permissions: [
      {
        key: "tasks.delete",
      },
    ],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectId",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tasks/batch/create_create",
    command: "tasks-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tasks/batch/create",
    },
    effect: "write",
    summary: "Create a batch of tasks",
    description:
      "Create multiple tasks in a single request by providing a batch of task properties and associations. This endpoint allows for efficient task creation by processing multiple tasks together.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputForCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tasks/batch/read_read",
    command: "tasks-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tasks/batch/read",
    },
    effect: "read",
    summary: "Read a batch of tasks by internal ID, or unique property values",
    description:
      "Retrieve records by record ID or include the `idProperty` parameter to retrieve records by a custom unique value property. ",
    tags: ["Batch"],
    parameters: [
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputSimplePublicObjectId",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tasks/batch/update_update",
    command: "tasks-batch-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tasks/batch/update",
    },
    effect: "write",
    summary: "Update a batch of tasks by internal ID, or unique property values",
    description:
      "Update multiple tasks in a single request using their internal IDs or unique property values. This operation allows you to modify the properties of each task in the batch, ensuring efficient management of task data.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInput",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tasks/batch/upsert_upsert",
    command: "tasks-batch-upsert",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tasks/batch/upsert",
    },
    effect: "write",
    summary: "Create or update a batch of tasks by unique property values",
    description:
      "Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.",
    tags: ["Batch"],
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputSimplePublicObjectBatchInputUpsert",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseSimplePublicUpsertObject",
    },
  },
  {
    id: "post-/crm/objects/2026-03/tasks/search_doSearch",
    command: "tasks-search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/tasks/search",
    },
    effect: "read",
    summary: "Search for tasks using specified criteria.",
    description:
      "Execute a search for tasks based on the provided criteria, including filters, properties, and sorting options. This allows for retrieving tasks that match specific conditions or property values.",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/tasks/{taskId}_getById",
    command: "tasks-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/tasks/{taskId}",
    },
    effect: "read",
    summary: "Read",
    description:
      "Read an Object identified by `{taskId}`. `{taskId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.",
    tags: ["Basic"],
    parameters: [
      {
        name: "taskId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "associations",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
      {
        name: "propertiesWithHistory",
        in: "query",
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description:
          "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "SimplePublicObjectWithAssociations",
    },
  },
  {
    id: "patch-/crm/objects/2026-03/tasks/{taskId}_update",
    command: "tasks-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/objects/2026-03/tasks/{taskId}",
    },
    effect: "write",
    summary: "Update",
    description:
      "Perform a partial update of an Object identified by `{taskId}`or optionally a unique property value as specified by the `idProperty` query param. `{taskId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.",
    tags: ["Basic"],
    parameters: [
      {
        name: "taskId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The name of a property whose values are unique for this object type",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "SimplePublicObjectInput",
    },
    response: {
      confidence: "contract",
      schema: "SimplePublicObject",
    },
  },
  {
    id: "delete-/crm/objects/2026-03/tasks/{taskId}_archive",
    command: "tasks-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/objects/2026-03/tasks/{taskId}",
    },
    effect: "destructive",
    summary: "Archive",
    description: "Move an Object identified by `{taskId}` to the recycling bin.",
    tags: ["Basic"],
    permissions: [
      {
        key: "tasks.delete",
      },
    ],
    parameters: [
      {
        name: "taskId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
    ],
  },
  {
    id: "get-/crm/owners/2026-03_/crm/owners/v3",
    command: "owners-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/owners/2026-03",
    },
    effect: "read",
    summary: "List owners",
    description:
      "Retrieve a paginated list of owners from your HubSpot account. This endpoint allows filtering by email and supports pagination through the 'after' parameter. You can also specify the maximum number of results per page and choose to include archived owners in the response.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "email",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Filter by email address (optional)",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 100,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponsePublicOwnerForwardPaging",
    },
  },
  {
    id: "get-/crm/owners/2026-03/{ownerId}_getById",
    command: "owners-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/owners/2026-03/{ownerId}",
    },
    effect: "read",
    summary: "Retrieve a specific owner by ID",
    description: "Retrieve details of a specific owner using either their 'id' or 'userId'.",
    tags: ["Basic"],
    parameters: [
      {
        name: "ownerId",
        in: "path",
        required: true,
        schema: {
          type: "integer",
          format: "int32",
        },
        description: "The unique identifier of the owner to retrieve.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "idProperty",
        in: "query",
        required: false,
        schema: {
          default: "id",
          type: "string",
          enum: ["id", "userId"],
        },
        description:
          "Specifies which property to use for identifying the owner. Valid values are 'id' or 'userId'. Defaults to 'id'.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "PublicOwner",
    },
  },
  {
    id: "get-/crm/pipelines/2026-03/{objectType}_getAll",
    command: "pipelines-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/pipelines/2026-03/{objectType}",
    },
    effect: "read",
    summary: "Retrieve all pipelines",
    description: "Return all pipelines for the object type specified by `{objectType}`.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponsePipelineNoPaging",
    },
  },
  {
    id: "post-/crm/pipelines/2026-03/{objectType}_create",
    command: "pipelines-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/pipelines/2026-03/{objectType}",
    },
    effect: "write",
    summary: "Create a pipeline",
    description:
      "Create a new pipeline with the provided property values. The entire pipeline object, including its unique ID, will be returned in the response.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PipelineInput",
    },
    response: {
      confidence: "contract",
      schema: "Pipeline",
    },
  },
  {
    id: "get-/crm/pipelines/2026-03/{objectType}/{pipelineId}_getById",
    command: "pipelines-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}",
    },
    effect: "read",
    summary: "Return a pipeline by ID",
    description: "Return a single pipeline object identified by its unique `{pipelineId}`.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "Pipeline",
    },
  },
  {
    id: "put-/crm/pipelines/2026-03/{objectType}/{pipelineId}_replace",
    command: "pipelines-replace",
    binding: {
      kind: "http",
      method: "PUT",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}",
    },
    effect: "destructive",
    summary: "Replace a pipeline",
    description: "Replace all properties of an existing pipeline with the provided values.",
    tags: ["Basic"],
    permissions: [
      {
        key: "pipelines.delete",
      },
    ],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "validateDealStageUsagesBeforeDelete",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
      },
      {
        name: "validateReferencesBeforeDelete",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PipelineReplaceInput",
    },
    response: {
      confidence: "contract",
      schema: "Pipeline",
    },
  },
  {
    id: "patch-/crm/pipelines/2026-03/{objectType}/{pipelineId}_update",
    command: "pipelines-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}",
    },
    effect: "write",
    summary: "Perform a partial update of the pipeline identified by pipelineId.",
    description:
      "Perform a partial update of the pipeline identified by `{pipelineId}`. The updated pipeline will be returned in the response.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "validateDealStageUsagesBeforeDelete",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
      },
      {
        name: "validateReferencesBeforeDelete",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PipelinePatchInput",
    },
    response: {
      confidence: "contract",
      schema: "Pipeline",
    },
  },
  {
    id: "delete-/crm/pipelines/2026-03/{objectType}/{pipelineId}_archive",
    command: "pipelines-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}",
    },
    effect: "destructive",
    summary: "Delete a pipeline",
    description: "Delete a pipeline identified by its unique pipelineId",
    tags: ["Basic"],
    permissions: [
      {
        key: "pipelines.delete",
      },
    ],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "validateDealStageUsagesBeforeDelete",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
      },
      {
        name: "validateReferencesBeforeDelete",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
      },
    ],
  },
  {
    id: "get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/audit_getAudit",
    command: "pipelines-audit-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}/audit",
    },
    effect: "read",
    summary: "Return an audit of all changes to the pipeline",
    description:
      "Return a reverse chronological list of all mutations that have occurred on the pipeline identified by `{pipelineId}`.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponsePublicAuditInfoNoPaging",
    },
  },
  {
    id: "get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages_getAll",
    command: "pipelines-stages-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages",
    },
    effect: "read",
    summary: "Return all stages of a pipeline",
    description: "Return all the stages associated with the pipeline identified by `{pipelineId}`.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponsePipelineStageNoPaging",
    },
  },
  {
    id: "post-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages_create",
    command: "pipelines-stages-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages",
    },
    effect: "write",
    summary: "Create a pipeline stage",
    description: "Create a new stage within the specified pipeline.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PipelineStageInput",
    },
    response: {
      confidence: "contract",
      schema: "PipelineStage",
    },
  },
  {
    id: "get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_getById",
    command: "pipelines-stages-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}",
    },
    effect: "read",
    summary: "Return a pipeline stage by ID",
    description: "Retrieve a specific stage from a pipeline using its ID.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "stageId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "PipelineStage",
    },
  },
  {
    id: "put-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_replace",
    command: "pipelines-stages-replace",
    binding: {
      kind: "http",
      method: "PUT",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}",
    },
    effect: "write",
    summary: "Replace a pipeline stage",
    description:
      "Replace all the properties of an existing pipeline stage with the values provided. The updated stage will be returned in the response.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "stageId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PipelineStageReplaceInput",
    },
    response: {
      confidence: "contract",
      schema: "PipelineStage",
    },
  },
  {
    id: "patch-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_update",
    command: "pipelines-stages-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}",
    },
    effect: "write",
    summary: "Update specific properties of an existing pipeline stage.",
    description: "Perform a partial update on a specific stage of a pipeline.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "stageId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PipelineStagePatchInput",
    },
    response: {
      confidence: "contract",
      schema: "PipelineStage",
    },
  },
  {
    id: "delete-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_archive",
    command: "pipelines-stages-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}",
    },
    effect: "destructive",
    summary: "Delete a pipeline stage",
    description: "Delete a specific stage from a pipeline.",
    tags: ["Basic"],
    permissions: [
      {
        key: "pipelines.delete",
      },
    ],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "stageId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "validateReferencesBeforeDelete",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
      },
    ],
  },
  {
    id: "get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}/audit_getAudit",
    command: "pipelines-stages-audit-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}/audit",
    },
    effect: "read",
    summary: "Retrieve a reverse chronological list of all changes made to a specific pipeline stage.",
    description:
      "Return a reverse chronological list of all mutations that have occurred on the pipeline stage identified by `{stageId}`.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pipelineId",
        in: "path",
        required: true,
        schema: {
          type: "string",
          pattern: ".+",
        },
      },
      {
        name: "stageId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponsePublicAuditInfoNoPaging",
    },
  },
  {
    id: "get-/crm/properties/2026-03/{objectType}_/crm/properties/2025-09/{objectType}",
    command: "properties-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/properties/2026-03/{objectType}",
    },
    effect: "read",
    summary: "Read all properties",
    description: "Read all existing properties for the specified object type and HubSpot account.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "The type of CRM object for which properties are being retrieved, such as 'contacts', 'companies', etc.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "dataSensitivity",
        in: "query",
        required: false,
        schema: {
          default: "non_sensitive",
          type: "string",
          enum: ["highly_sensitive", "non_sensitive", "sensitive"],
        },
        description:
          "Filter properties based on data sensitivity level. Valid values are 'non_sensitive', 'sensitive', and 'highly_sensitive'. Defaults to 'non_sensitive'.",
      },
      {
        name: "locale",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "Specify the locale to retrieve properties in a particular language or regional format.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "A comma-separated list of property names to include in the response.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponsePropertyNoPaging",
    },
  },
  {
    id: "post-/crm/properties/2026-03/{objectType}_/crm/properties/2025-09/{objectType}",
    command: "properties-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/properties/2026-03/{objectType}",
    },
    effect: "write",
    summary: "Create a property",
    description: "Create and return a copy of a new property for the specified object type.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "The type of object for which the property is being created, such as contacts, companies, or deals.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PropertyCreate",
    },
    response: {
      confidence: "contract",
      schema: "Property",
    },
  },
  {
    id: "post-/crm/properties/2026-03/{objectType}/batch/archive_/crm/properties/2025-09/{objectType}/batch/archive",
    command: "properties-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/properties/2026-03/{objectType}/batch/archive",
    },
    effect: "destructive",
    summary: "Archive a batch of properties",
    description:
      "Archive a provided list of properties. This method will return a 204 No Content response on success regardless of the initial state of the property (e.g. active, already archived, non-existent).",
    tags: ["Batch"],
    permissions: [
      {
        key: "fields.delete",
      },
    ],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "The type of object whose properties are to be archived. This is a required parameter and identifies the specific object type within HubSpot.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputPropertyName",
    },
  },
  {
    id: "post-/crm/properties/2026-03/{objectType}/batch/create_/crm/properties/2025-09/{objectType}/batch/create",
    command: "properties-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/properties/2026-03/{objectType}/batch/create",
    },
    effect: "write",
    summary: "Create a batch of properties",
    description: "Create a batch of properties using the same rules as when creating an individual property.",
    tags: ["Batch"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "The type of CRM object for which the properties are being created, such as contacts, companies, or deals.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputPropertyCreate",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseProperty",
    },
  },
  {
    id: "post-/crm/properties/2026-03/{objectType}/batch/read_/crm/properties/2025-09/{objectType}/batch/read",
    command: "properties-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/properties/2026-03/{objectType}/batch/read",
    },
    effect: "read",
    summary: "Read a batch of properties",
    description: "Read a provided list of properties.",
    tags: ["Batch"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "The type of CRM object for which properties are being retrieved. This is a required path parameter.",
      },
      {
        name: "locale",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "A string specifying the locale to use for the response. This can be used to tailor the response to a specific language or region.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchReadInputPropertyName",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseProperty",
    },
  },
  {
    id: "get-/crm/properties/2026-03/{objectType}/groups_/crm/properties/2025-09/{objectType}/groups",
    command: "properties-groups-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/properties/2026-03/{objectType}/groups",
    },
    effect: "read",
    summary: "Read all property groups",
    description: "Read all existing property groups for the specified object type and HubSpot account.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The type of CRM object for which to retrieve property groups, such as 'contacts' or 'deals'.",
      },
      {
        name: "locale",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The language locale to use for property group labels. This can help in displaying labels in the preferred language.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponsePropertyGroupNoPaging",
    },
  },
  {
    id: "post-/crm/properties/2026-03/{objectType}/groups_/crm/properties/2025-09/{objectType}/groups",
    command: "properties-groups-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/properties/2026-03/{objectType}/groups",
    },
    effect: "write",
    summary: "Create a property group",
    description: "Create and return a copy of a new property group.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "The type of object for which the property group is being created, such as contacts, companies, or deals.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PropertyGroupCreate",
    },
    response: {
      confidence: "contract",
      schema: "PropertyGroup",
    },
  },
  {
    id: "get-/crm/properties/2026-03/{objectType}/groups/{groupName}_/crm/properties/2025-09/{objectType}/groups/{groupName}",
    command: "properties-groups-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/properties/2026-03/{objectType}/groups/{groupName}",
    },
    effect: "read",
    summary: "Read a property group",
    description: "Read a property group identified by {groupName}.",
    tags: ["Basic"],
    parameters: [
      {
        name: "groupName",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The name of the property group to retrieve details for.",
      },
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "The type of CRM object for which the property group is being retrieved, such as contacts or deals.",
      },
      {
        name: "locale",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The language locale to use for the response. This can affect the language of the labels and descriptions returned.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "PropertyGroup",
    },
  },
  {
    id: "patch-/crm/properties/2026-03/{objectType}/groups/{groupName}_/crm/properties/2025-09/{objectType}/groups/{groupName}",
    command: "properties-groups-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/properties/2026-03/{objectType}/groups/{groupName}",
    },
    effect: "write",
    summary: "Update a property group",
    description:
      "Perform a partial update of a property group identified by {groupName}. Provided fields will be overwritten.",
    tags: ["Basic"],
    parameters: [
      {
        name: "groupName",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The name of the property group to update.",
      },
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "The type of object for which the property group is being updated, such as contacts, companies, or deals.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PropertyGroupUpdate",
    },
    response: {
      confidence: "contract",
      schema: "PropertyGroup",
    },
  },
  {
    id: "delete-/crm/properties/2026-03/{objectType}/groups/{groupName}_/crm/properties/2025-09/{objectType}/groups/{groupName}",
    command: "properties-groups-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/properties/2026-03/{objectType}/groups/{groupName}",
    },
    effect: "destructive",
    summary: "Archive a property group",
    description: "Move a property group identified by {groupName} to the recycling bin.",
    tags: ["Basic"],
    permissions: [
      {
        key: "fields.delete",
      },
    ],
    parameters: [
      {
        name: "groupName",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The unique name of the property group to be deleted.",
      },
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "The type of object for which the property group is defined, such as contacts, companies, or deals.",
      },
    ],
  },
  {
    id: "get-/crm/properties/2026-03/{objectType}/{propertyName}_/crm/properties/2025-09/{objectType}/{propertyName}",
    command: "properties-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/properties/2026-03/{objectType}/{propertyName}",
    },
    effect: "read",
    summary: "Read a property",
    description: "Read a property identified by {propertyName}.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The type of object the property belongs to, such as 'contacts' or 'deals'.",
      },
      {
        name: "propertyName",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The name of the property to retrieve.",
      },
      {
        name: "archived",
        in: "query",
        required: false,
        schema: {
          default: false,
          type: "boolean",
        },
        description: "Whether to return only results that have been archived.",
      },
      {
        name: "dataSensitivity",
        in: "query",
        required: false,
        schema: {
          default: "non_sensitive",
          type: "string",
          enum: ["highly_sensitive", "non_sensitive", "sensitive"],
        },
        description:
          "The level of data sensitivity to filter properties by. Valid values are 'non_sensitive', 'sensitive', and 'highly_sensitive'. Defaults to 'non_sensitive'.",
      },
      {
        name: "locale",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "The locale to use for property labels and descriptions.",
      },
      {
        name: "properties",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description: "A comma-separated list of property names to include in the response.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "Property",
    },
  },
  {
    id: "patch-/crm/properties/2026-03/{objectType}/{propertyName}_/crm/properties/2025-09/{objectType}/{propertyName}",
    command: "properties-update",
    binding: {
      kind: "http",
      method: "PATCH",
      path: "/crm/properties/2026-03/{objectType}/{propertyName}",
    },
    effect: "write",
    summary: "Update a property",
    description:
      "Perform a partial update of a property identified by { propertyName }. Provided fields will be overwritten.",
    tags: ["Basic"],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description:
          "The type of object for which the property is being updated, such as contacts, companies, or deals.",
      },
      {
        name: "propertyName",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The unique name of the property to update.",
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PropertyUpdate",
    },
    response: {
      confidence: "contract",
      schema: "Property",
    },
  },
  {
    id: "delete-/crm/properties/2026-03/{objectType}/{propertyName}_/crm/properties/2025-09/{objectType}/{propertyName}",
    command: "properties-delete",
    binding: {
      kind: "http",
      method: "DELETE",
      path: "/crm/properties/2026-03/{objectType}/{propertyName}",
    },
    effect: "destructive",
    summary: "Archive a property",
    description: "Move a property identified by {propertyName} to the recycling bin.",
    tags: ["Basic"],
    permissions: [
      {
        key: "fields.delete",
      },
    ],
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The type of CRM object that the property belongs to, such as contacts, companies, or deals.",
      },
      {
        name: "propertyName",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "The unique name of the property to delete.",
      },
    ],
  },
  {
    id: "post-/crm/associations/2026-03/usage/high-usage-report/{userId}_/crm/associations/2025-09/usage/high-usage-report/{userId}",
    command: "associations-usage-high-usage-report-update",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/associations/2026-03/usage/high-usage-report/{userId}",
    },
    effect: "write",
    summary: "Report high usage",
    description: "Requests a report of all objects in the portal which have a high usage of associations",
    tags: ["Basic"],
    parameters: [
      {
        name: "userId",
        in: "path",
        required: true,
        schema: {
          type: "integer",
          format: "int32",
        },
      },
    ],
    response: {
      confidence: "contract",
      schema: "ReportCreationResponse",
    },
  },
  {
    id: "post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/archive_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/archive",
    command: "associations-batch-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/archive",
    },
    effect: "destructive",
    summary: "Remove associations",
    description: "Batch delete associations for objects",
    tags: ["Batch"],
    permissions: [
      {
        key: "associations.delete",
      },
    ],
    parameters: [
      {
        name: "fromObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputPublicAssociationMultiArchive",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponse",
    },
  },
  {
    id: "post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/associate/default_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/associate/default",
    command: "associations-batch-associate-default",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/associate/default",
    },
    effect: "write",
    summary: " Create Default Associations",
    description: "Create the default (most generic) association type between two object types",
    tags: ["Batch"],
    parameters: [
      {
        name: "fromObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputPublicDefaultAssociationMultiPost",
    },
    response: {
      confidence: "contract",
      schema: "AssociationsBatchResponsePublicDefaultAssociation",
    },
  },
  {
    id: "post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/create_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/create",
    command: "associations-batch-create",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/create",
    },
    effect: "write",
    summary: "Associate records (labelled)",
    description: "Batch create associations for objects",
    tags: ["Batch"],
    parameters: [
      {
        name: "fromObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputPublicAssociationMultiPost",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponseLabelsBetweenObjectPair",
    },
  },
  {
    id: "post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/labels/archive_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/labels/archive",
    command: "associations-batch-labels-archive",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/labels/archive",
    },
    effect: "destructive",
    summary: "Delete Specific Labels",
    description:
      "Batch delete specific association labels for objects. Deleting an unlabeled association will also delete all labeled associations between those two objects",
    tags: ["Batch"],
    permissions: [
      {
        key: "associations.delete",
      },
    ],
    parameters: [
      {
        name: "fromObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputPublicAssociationMultiPost",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponse",
    },
  },
  {
    id: "post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/read_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/read",
    command: "associations-batch-read",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/read",
    },
    effect: "read",
    summary: "Retrieve associations",
    description:
      "Batch read associations for objects to specific object type. The 'after' field in a returned paging object  can be added alongside the 'id' to retrieve the next page of associations from that objectId. The 'link' field is deprecated and should be ignored. Note: The 'paging' field will only be present if there are more pages and absent otherwise.",
    tags: ["Batch"],
    parameters: [
      {
        name: "fromObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "BatchInputPublicFetchAssociationsBatchRequest",
    },
    response: {
      confidence: "contract",
      schema: "BatchResponsePublicAssociationMultiWithLabel",
    },
  },
  {
    id: "post-/crm/objects/2026-03/{objectType}/search_/crm/objects/2025-09/{objectType}/search",
    command: "search",
    binding: {
      kind: "http",
      method: "POST",
      path: "/crm/objects/2026-03/{objectType}/search",
    },
    effect: "read",
    summary: "",
    description: "",
    tags: ["Search"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "body",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "body",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    request: {
      required: true,
      confidence: "contract",
      schema: "PublicObjectSearchRequest",
    },
    response: {
      confidence: "contract",
      schema: "CollectionResponseWithTotalSimplePublicObject",
    },
  },
  {
    id: "get-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}_/crm/objects/2025-09/{objectType}/{objectId}/associations/{toObjectType}",
    command: "associations-get",
    binding: {
      kind: "http",
      method: "GET",
      path: "/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}",
    },
    effect: "read",
    summary: "Retrieve all associations by object type",
    description: "Retrieve all associations between a specific record and an object type. Limit 500 per call.",
    tags: ["Basic"],
    pagination: {
      style: "cursor",
      cursor: {
        in: "query",
        name: "after",
      },
      next: "paging.next.after",
      items: "results",
      limit: {
        in: "query",
        name: "limit",
      },
    },
    parameters: [
      {
        name: "objectId",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "objectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "toObjectType",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "after",
        in: "query",
        required: false,
        schema: {
          type: "string",
        },
        description:
          "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: {
          default: 500,
          type: "integer",
          format: "int32",
        },
        description: "The maximum number of results to display per page.",
      },
    ],
    response: {
      confidence: "contract",
      schema: "CollectionResponseMultiAssociatedObjectWithLabelForwardPaging",
    },
  },
  {
    id: "get-/account-info/2026-03/api-usage/daily/private-apps_/account-info/2025-09/api-usage/daily/private-apps",
    command: "account-info-api-usage-daily-private-apps-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/account-info/2026-03/api-usage/daily/private-apps",
    },
    effect: "read",
    summary: "Retrieve private app daily API usage",
    description:
      "Retrieve the daily API usage for private apps in the account, along with information about usage limits.",
    tags: ["Basic"],
    parameters: [],
    response: {
      confidence: "contract",
      schema: "CollectionResponseApiUsageNoPaging",
    },
  },
  {
    id: "get-/account-info/2026-03/details_/account-info/2025-09/details",
    command: "account-info-details-list",
    binding: {
      kind: "http",
      method: "GET",
      path: "/account-info/2026-03/details",
    },
    effect: "read",
    summary: "Retrieve account details",
    description:
      "Retrieve account details such as the account type, time zone, currencies, and data hosting location. ",
    tags: ["Basic"],
    parameters: [],
    response: {
      confidence: "contract",
      schema: "PortalInformationResponse",
    },
  },
]

export const servers: readonly ApiServer[] = [
  {
    url: "https://api.hubapi.com",
  },
]

export const securitySchemes: Readonly<Record<string, SecurityScheme>> = {
  token: {
    type: "http",
    scheme: "bearer",
  },
}

export const security: readonly SecurityRequirement[] = [
  {
    token: [],
  },
]
