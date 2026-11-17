<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# HubSpot API: Basic

## `hubspot api account-info-api-usage-daily-private-apps-list`

- What: Retrieve private app daily API usage
- Call: `GET /account-info/2026-03/api-usage/daily/private-apps`, effect: read

## `hubspot api account-info-details-list`

- What: Retrieve account details
- Call: `GET /account-info/2026-03/details`, effect: read

## `hubspot api associations-get [options]`

- What: Retrieve all associations by object type
- Call: `GET /crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--object-id <value>` | yes | objectId |
| `--object-type <value>` | yes | objectType |
| `--to-object-type <value>` | yes | toObjectType |
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api calls-get [options]`

- What: Read
- Call: `GET /crm/objects/2026-03/calls/{callId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--call-id <value>` | yes | callId |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | no | The name of a property whose values are unique for this object type |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

## `hubspot api calls-list [options]`

- What: List
- Call: `GET /crm/objects/2026-03/calls`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api companies-get [options]`

- What: Retrieve a company
- Call: `GET /crm/objects/2026-03/companies/{companyId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--company-id <value>` | yes | companyId |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | no | The name of a property whose values are unique for this object type |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

## `hubspot api companies-list [options]`

- What: Retrieve companies
- Call: `GET /crm/objects/2026-03/companies`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api contacts-get [options]`

- What: Retrieve a contact
- Call: `GET /crm/objects/2026-03/contacts/{contactId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--contact-id <value>` | yes | contactId |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | no | The name of a property whose values are unique for this object type |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

## `hubspot api contacts-list [options]`

- What: Retrieve contacts
- Call: `GET /crm/objects/2026-03/contacts`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api deals-get [options]`

- What: Read
- Call: `GET /crm/objects/2026-03/0-3/{dealId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--deal-id <value>` | yes | dealId |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | no | The name of a property whose values are unique for this object type |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

## `hubspot api deals-list [options]`

- What: List
- Call: `GET /crm/objects/2026-03/0-3`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api emails-get [options]`

- What: Read
- Call: `GET /crm/objects/2026-03/emails/{emailId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--email-id <value>` | yes | emailId |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | no | The name of a property whose values are unique for this object type |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

## `hubspot api emails-list [options]`

- What: List
- Call: `GET /crm/objects/2026-03/emails`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api leads-get [options]`

- What: Read
- Call: `GET /crm/objects/2026-03/leads/{leadsId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--leads-id <value>` | yes | leadsId |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | no | The name of a property whose values are unique for this object type |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

## `hubspot api leads-list [options]`

- What: List
- Call: `GET /crm/objects/2026-03/leads`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api meetings-get [options]`

- What: Read
- Call: `GET /crm/objects/2026-03/meetings/{meetingId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--meeting-id <value>` | yes | meetingId |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | no | The name of a property whose values are unique for this object type |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

## `hubspot api meetings-list [options]`

- What: List
- Call: `GET /crm/objects/2026-03/meetings`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api notes-get [options]`

- What: Read
- Call: `GET /crm/objects/2026-03/notes/{noteId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--note-id <value>` | yes | noteId |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | no | The name of a property whose values are unique for this object type |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

## `hubspot api notes-list [options]`

- What: List
- Call: `GET /crm/objects/2026-03/notes`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api owners-get [options]`

- What: Retrieve a specific owner by ID
- Call: `GET /crm/owners/2026-03/{ownerId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--owner-id <value>` | yes | The unique identifier of the owner to retrieve. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--id-property <value>` | no | Specifies which property to use for identifying the owner. Valid values are 'id' or 'userId'. Defaults to 'id'. |

## `hubspot api owners-list [options]`

- What: List owners
- Call: `GET /crm/owners/2026-03`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--email <value>` | no | Filter by email address (optional) |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api pipelines-audit-list [options]`

- What: Return an audit of all changes to the pipeline
- Call: `GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/audit`, effect: read

| Flag | Required | What |
|---|---|---|
| `--object-type <value>` | yes | objectType |
| `--pipeline-id <value>` | yes | pipelineId |

## `hubspot api pipelines-get [options]`

- What: Return a pipeline by ID
- Call: `GET /crm/pipelines/2026-03/{objectType}/{pipelineId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--object-type <value>` | yes | objectType |
| `--pipeline-id <value>` | yes | pipelineId |

## `hubspot api pipelines-list [options]`

- What: Retrieve all pipelines
- Call: `GET /crm/pipelines/2026-03/{objectType}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--object-type <value>` | yes | objectType |

## `hubspot api pipelines-stages-audit-list [options]`

- What: Retrieve a reverse chronological list of all changes made to a specific pipeline stage.
- Call: `GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}/audit`, effect: read

| Flag | Required | What |
|---|---|---|
| `--object-type <value>` | yes | objectType |
| `--pipeline-id <value>` | yes | pipelineId |
| `--stage-id <value>` | yes | stageId |

## `hubspot api pipelines-stages-get [options]`

- What: Return a pipeline stage by ID
- Call: `GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--object-type <value>` | yes | objectType |
| `--pipeline-id <value>` | yes | pipelineId |
| `--stage-id <value>` | yes | stageId |

## `hubspot api pipelines-stages-list [options]`

- What: Return all stages of a pipeline
- Call: `GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages`, effect: read

| Flag | Required | What |
|---|---|---|
| `--object-type <value>` | yes | objectType |
| `--pipeline-id <value>` | yes | pipelineId |

## `hubspot api properties-get [options]`

- What: Read a property
- Call: `GET /crm/properties/2026-03/{objectType}/{propertyName}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--object-type <value>` | yes | The type of object the property belongs to, such as 'contacts' or 'deals'. |
| `--property-name <value>` | yes | The name of the property to retrieve. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--data-sensitivity <value>` | no | The level of data sensitivity to filter properties by. Valid values are 'non\_sensitive', 'sensitive', and 'highly\_sensitive'. Defaults to 'non\_sensitive'. |
| `--locale <value>` | no | The locale to use for property labels and descriptions. |
| `--properties <value>` | no | A comma-separated list of property names to include in the response. |

## `hubspot api properties-groups-get [options]`

- What: Read a property group
- Call: `GET /crm/properties/2026-03/{objectType}/groups/{groupName}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--group-name <value>` | yes | The name of the property group to retrieve details for. |
| `--object-type <value>` | yes | The type of CRM object for which the property group is being retrieved, such as contacts or deals. |
| `--locale <value>` | no | The language locale to use for the response. This can affect the language of the labels and descriptions returned. |

## `hubspot api properties-groups-list [options]`

- What: Read all property groups
- Call: `GET /crm/properties/2026-03/{objectType}/groups`, effect: read

| Flag | Required | What |
|---|---|---|
| `--object-type <value>` | yes | The type of CRM object for which to retrieve property groups, such as 'contacts' or 'deals'. |
| `--locale <value>` | no | The language locale to use for property group labels. This can help in displaying labels in the preferred language. |

## `hubspot api properties-list [options]`

- What: Read all properties
- Call: `GET /crm/properties/2026-03/{objectType}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--object-type <value>` | yes | The type of CRM object for which properties are being retrieved, such as 'contacts', 'companies', etc. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--data-sensitivity <value>` | no | Filter properties based on data sensitivity level. Valid values are 'non\_sensitive', 'sensitive', and 'highly\_sensitive'. Defaults to 'non\_sensitive'. |
| `--locale <value>` | no | Specify the locale to retrieve properties in a particular language or regional format. |
| `--properties <value>` | no | A comma-separated list of property names to include in the response. |

## `hubspot api tasks-get [options]`

- What: Read
- Call: `GET /crm/objects/2026-03/tasks/{taskId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--task-id <value>` | yes | taskId |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | no | The name of a property whose values are unique for this object type |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

## `hubspot api tasks-list [options]`

- What: List
- Call: `GET /crm/objects/2026-03/tasks`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | no | read every page, as the API pages it |

## `hubspot api tickets-get [options]`

- What: Read
- Call: `GET /crm/objects/2026-03/tickets/{ticketId}`, effect: read

| Flag | Required | What |
|---|---|---|
| `--ticket-id <value>` | yes | ticketId |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | no | The name of a property whose values are unique for this object type |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

## `hubspot api tickets-list [options]`

- What: List
- Call: `GET /crm/objects/2026-03/tickets`, effect: read
- Pages: cursor: send `after` (query), read the next one from `paging.next.after`; items in `results`; page size in `limit` (query)

| Flag | Required | What |
|---|---|---|
| `--after <value>` | no | The paging cursor token of the last successfully read resource will be returned as the \`paging.next.after\` JSON property of a paged response containing more results. |
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--associations <value>` | no | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | no | The maximum number of results to display per page. |
| `--properties <value>` | no | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | no | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | no | read every page, as the API pages it |
