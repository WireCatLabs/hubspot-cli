<!-- Generated from the API manifest and the command tree by pnpm generate. Do not edit. -->

# HubSpot API: Batch

## `hubspot api associations-batch-read [options]`

- What: Retrieve associations
- Call: `POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/read`, effect: read
- Body: `BatchInputPublicFetchAssociationsBatchRequest`, required

| Flag | Required | What |
|---|---|---|
| `--from-object-type <value>` | yes | fromObjectType |
| `--to-object-type <value>` | yes | toObjectType |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api calls-batch-read [options]`

- What: Read a batch of calls by internal ID, or unique property values
- Call: `POST /crm/objects/2026-03/calls/batch/read`, effect: read
- Body: `BatchReadInputSimplePublicObjectId`, required

| Flag | Required | What |
|---|---|---|
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api companies-batch-read [options]`

- What: Retrieve a batch of companies
- Call: `POST /crm/objects/2026-03/companies/batch/read`, effect: read
- Body: `BatchReadInputSimplePublicObjectId`, required

| Flag | Required | What |
|---|---|---|
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api contacts-batch-read [options]`

- What: Retrieve a batch of contacts
- Call: `POST /crm/objects/2026-03/contacts/batch/read`, effect: read
- Body: `BatchReadInputSimplePublicObjectId`, required

| Flag | Required | What |
|---|---|---|
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api deals-batch-read [options]`

- What: Read a batch of deals by internal ID, or unique property values
- Call: `POST /crm/objects/2026-03/0-3/batch/read`, effect: read
- Body: `BatchReadInputSimplePublicObjectId`, required

| Flag | Required | What |
|---|---|---|
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api emails-batch-read [options]`

- What: Read a batch of emails by internal ID, or unique property values
- Call: `POST /crm/objects/2026-03/emails/batch/read`, effect: read
- Body: `BatchReadInputSimplePublicObjectId`, required

| Flag | Required | What |
|---|---|---|
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api leads-batch-read [options]`

- What: Read a batch of leads by internal ID, or unique property values
- Call: `POST /crm/objects/2026-03/leads/batch/read`, effect: read
- Body: `BatchReadInputSimplePublicObjectId`, required

| Flag | Required | What |
|---|---|---|
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api meetings-batch-read [options]`

- What: Read a batch of meetings by internal ID, or unique property values
- Call: `POST /crm/objects/2026-03/meetings/batch/read`, effect: read
- Body: `BatchReadInputSimplePublicObjectId`, required

| Flag | Required | What |
|---|---|---|
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api notes-batch-read [options]`

- What: Read a batch of notes by internal ID, or unique property values
- Call: `POST /crm/objects/2026-03/notes/batch/read`, effect: read
- Body: `BatchReadInputSimplePublicObjectId`, required

| Flag | Required | What |
|---|---|---|
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api properties-batch-read [options]`

- What: Read a batch of properties
- Call: `POST /crm/properties/2026-03/{objectType}/batch/read`, effect: read
- Body: `BatchReadInputPropertyName`, required

| Flag | Required | What |
|---|---|---|
| `--object-type <value>` | yes | The type of CRM object for which properties are being retrieved. This is a required path parameter. |
| `--locale <value>` | no | A string specifying the locale to use for the response. This can be used to tailor the response to a specific language or region. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api tasks-batch-read [options]`

- What: Read a batch of tasks by internal ID, or unique property values
- Call: `POST /crm/objects/2026-03/tasks/batch/read`, effect: read
- Body: `BatchReadInputSimplePublicObjectId`, required

| Flag | Required | What |
|---|---|---|
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |

## `hubspot api tickets-batch-read [options]`

- What: Read a batch of tickets by internal ID, or unique property values
- Call: `POST /crm/objects/2026-03/tickets/batch/read`, effect: read
- Body: `BatchReadInputSimplePublicObjectId`, required

| Flag | Required | What |
|---|---|---|
| `--archived <value>` | no | Whether to return only results that have been archived. |
| `--body <json>` | no | the request body as JSON; - reads it from stdin |
| `--body-file <path>` | no | the request body from a JSON file; - is stdin |
