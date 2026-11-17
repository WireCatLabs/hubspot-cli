<!-- Generated from the command tree by pnpm generate. Do not edit. -->

# Commands

Every command, option and exit code, generated from the program itself. For the same list as JSON, run
`hubspot commands --json`.

**The first word is the profile**, a name you choose: `hubspot personal config show`. `WCHUBSPOT_PROFILE`
does the same for a whole shell session. No profile is assumed: a command that uses an account stops without one and
lists the profiles on this computer.

## Options for every command

| Option | What it does |
|---|---|
| `-V, --version` | output the version number. |
| `-v, --verbose` | more detail in what is shown: -v ids, -vv everything we know. Default: `0`. |
| `--json` | machine-readable output: one JSON value on stdout; --json=id,text keeps only those fields. |
| `--jsonl` | machine-readable output: one JSON object per line, for streaming and jq. |
| `--quiet` | diagnostics off; a failure is still said. |
| `--trace` | the connection's own log lines on stderr — never content. |
| `--debug` | on a failure, its whole record — cause and stack — in place of the short line. |
| `--timeout <duration>` | give up on the whole command after this — 30s, 2m, 500ms. |
| `--offline` | answer from what was recorded and never connect; fails if nothing was. |
| `--no-input` | never prompt or open interactive login; piped input remains available. |
| `--max-input-bytes <bytes>` | maximum buffered input bytes (default: 16777216). |
| `--max-output-bytes <bytes>` | maximum machine output bytes (default: 4194304; 0 disables). |
| `--brief` | found items as reference, title, time, author and excerpt only. |
| `--full` | found items with their whole text and every provider field. |
| `--compact` | one line per item for an agent: reference first, text last, paging and next steps as # lines. |
| `--dry-run` | preview parsed arguments and permissions before running the action. |
| `--yes` | go ahead without the question an ask level puts before a write. |
| `--record` | keep this run even where the config says record false; record_input false leaves the typed words out. |
| `--no-record` | do not keep this run, even if it fails. |

## `hubspot commands`

every command by section; --json prints its contract, one path per call

### `hubspot commands info`

one command contract, or all schemas, error reasons and explicit overrides

```sh
hubspot commands info [path]
```

| Argument | | What it is |
|---|---|---|
| `path` | optional | one command path; without one, export schemas, error reasons and explicit overrides. |

**Example:** `hubspot commands info commands`

## `hubspot session`

keep this profile's Example Comments token in the OS keyring

### `hubspot session start`

sign this profile in: the Example Comments API token is asked hidden or read from stdin, never taken as an argument, checked against the service, and only then kept in the keyring, or in a private file

**Changes something on this computer only.**

```sh
hubspot session start [options]
```

| Option | What it does |
|---|---|
| `--credential-storage <storage>` | where the token is kept: keyring, which falls back to a private file by itself, or file. Default: `keyring`. |

**Example:** `hubspot personal session start`, `hubspot personal session start --credential-storage file`

### `hubspot session status`

show where this profile's token comes from: WCHUBSPOT_TOKEN, the keyring or a file, never the token; --check asks Example Comments whose token it is

```sh
hubspot session status [options]
```

| Option | What it does |
|---|---|
| `--check` | ask Example Comments whether the token still works, and whose it is. |

**Example:** `hubspot personal session status`, `hubspot personal session status --check --json`

### `hubspot session end`

forget this profile's token on this computer; the token itself stays valid in Example Comments

**Changes something on this computer only.**

```sh
hubspot session end
```

**Example:** `hubspot personal session end`

### `hubspot session list`

list the profiles on this computer and whether each has a token; picks none

```sh
hubspot session list
```

**Example:** `hubspot session list`, `hubspot session list --json`

## `hubspot api`

the raw Example Comments API, one command per operation of its OpenAPI document

### `hubspot api list`

list every Example Comments API operation this CLI offers, without calling Example Comments

```sh
hubspot api list [query]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

**Example:** `hubspot personal api list`, `hubspot personal api list effect:destructive --json=command,path`

### `hubspot api show`

show one operation's parameters and request schema, without calling Example Comments

```sh
hubspot api show <operation>
```

| Argument | | What it is |
|---|---|---|
| `operation` | required | the operation, as api list prints it. |

**Example:** `hubspot personal api show contacts-list --json`

### `hubspot api contacts-list`

Retrieve contacts — read (GET /crm/objects/2026-03/contacts)

```sh
hubspot api contacts-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api contacts-list`

### `hubspot api contacts-create`

Create a contact — write (POST /crm/objects/2026-03/contacts)

**Changes something in the service.**

```sh
hubspot api contacts-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api contacts-create`

### `hubspot api contacts-batch-archive`

Archive a batch of contacts — destructive (POST /crm/objects/2026-03/contacts/batch/archive)

**Changes something in the service.**

```sh
hubspot api contacts-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api contacts-batch-archive`

### `hubspot api contacts-batch-create`

Create a batch of contacts — write (POST /crm/objects/2026-03/contacts/batch/create)

**Changes something in the service.**

```sh
hubspot api contacts-batch-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api contacts-batch-create`

### `hubspot api contacts-batch-read`

Retrieve a batch of contacts — write (POST /crm/objects/2026-03/contacts/batch/read)

**Changes something in the service.**

```sh
hubspot api contacts-batch-read [options]
```

| Option | What it does |
|---|---|
| `--archived <value>` | Whether to return only results that have been archived. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api contacts-batch-read`

### `hubspot api contacts-batch-update`

Update a batch of contacts — write (POST /crm/objects/2026-03/contacts/batch/update)

**Changes something in the service.**

```sh
hubspot api contacts-batch-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api contacts-batch-update`

### `hubspot api contacts-batch-upsert`

Create or update a batch of contacts — write (POST /crm/objects/2026-03/contacts/batch/upsert)

**Changes something in the service.**

```sh
hubspot api contacts-batch-upsert [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api contacts-batch-upsert`

### `hubspot api contacts-gdpr-delete`

Permanently delete a contact (GDPR-compliant) — destructive (POST /crm/objects/2026-03/contacts/gdpr-delete)

**Changes something in the service.**

```sh
hubspot api contacts-gdpr-delete [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api contacts-gdpr-delete`

### `hubspot api contacts-merge`

Merge two contacts — destructive (POST /crm/objects/2026-03/contacts/merge)

**Changes something in the service.**

```sh
hubspot api contacts-merge [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api contacts-merge`

### `hubspot api contacts-search`

Search for contacts — read (POST /crm/objects/2026-03/contacts/search)

```sh
hubspot api contacts-search [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api contacts-search`

### `hubspot api contacts-get`

Retrieve a contact — read (GET /crm/objects/2026-03/contacts/{contactId})

```sh
hubspot api contacts-get [options]
```

| Option | What it does |
|---|---|
| `--contact-id <value>` | contactId. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

**Example:** `hubspot personal api contacts-get --contact-id <value>`

### `hubspot api contacts-update`

Update a contact — write (PATCH /crm/objects/2026-03/contacts/{contactId})

**Changes something in the service.**

```sh
hubspot api contacts-update [options]
```

| Option | What it does |
|---|---|
| `--contact-id <value>` | contactId. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api contacts-update --contact-id <value>`

### `hubspot api contacts-delete`

Archive a contact — destructive (DELETE /crm/objects/2026-03/contacts/{contactId})

**Changes something in the service.**

```sh
hubspot api contacts-delete [options]
```

| Option | What it does |
|---|---|
| `--contact-id <value>` | contactId. |

**Example:** `hubspot personal api contacts-delete --contact-id <value>`

### `hubspot api associations-default-replace`

— write (PUT /crm/objects/2026-03/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId})

**Changes something in the service.**

```sh
hubspot api associations-default-replace [options]
```

| Option | What it does |
|---|---|
| `--from-object-id <value>` | fromObjectId. |
| `--from-object-type <value>` | fromObjectType. |
| `--to-object-id <value>` | toObjectId. |
| `--to-object-type <value>` | toObjectType. |

**Example:** `hubspot personal api associations-default-replace --from-object-id <value> --from-object-type <value> --to-object-id <value> --to-object-type <value>`

### `hubspot api associations-replace`

— write (PUT /crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId})

**Changes something in the service.**

```sh
hubspot api associations-replace [options]
```

| Option | What it does |
|---|---|
| `--object-id <value>` | objectId. |
| `--object-type <value>` | objectType. |
| `--to-object-id <value>` | toObjectId. |
| `--to-object-type <value>` | toObjectType. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api associations-replace --object-id <value> --object-type <value> --to-object-id <value> --to-object-type <value>`

### `hubspot api associations-delete`

— destructive (DELETE /crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId})

**Changes something in the service.**

```sh
hubspot api associations-delete [options]
```

| Option | What it does |
|---|---|
| `--object-id <value>` | objectId. |
| `--object-type <value>` | objectType. |
| `--to-object-id <value>` | toObjectId. |
| `--to-object-type <value>` | toObjectType. |

**Example:** `hubspot personal api associations-delete --object-id <value> --object-type <value> --to-object-id <value> --to-object-type <value>`

### `hubspot api companies-list`

Retrieve companies — read (GET /crm/objects/2026-03/companies)

```sh
hubspot api companies-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api companies-list`

### `hubspot api companies-create`

Create a company — write (POST /crm/objects/2026-03/companies)

**Changes something in the service.**

```sh
hubspot api companies-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api companies-create`

### `hubspot api companies-batch-archive`

Archive a batch of companies — destructive (POST /crm/objects/2026-03/companies/batch/archive)

**Changes something in the service.**

```sh
hubspot api companies-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api companies-batch-archive`

### `hubspot api companies-batch-create`

Create a batch of companies — write (POST /crm/objects/2026-03/companies/batch/create)

**Changes something in the service.**

```sh
hubspot api companies-batch-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api companies-batch-create`

### `hubspot api companies-batch-read`

Retrieve a batch of companies — write (POST /crm/objects/2026-03/companies/batch/read)

**Changes something in the service.**

```sh
hubspot api companies-batch-read [options]
```

| Option | What it does |
|---|---|
| `--archived <value>` | Whether to return only results that have been archived. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api companies-batch-read`

### `hubspot api companies-batch-update`

Update a batch of companies — write (POST /crm/objects/2026-03/companies/batch/update)

**Changes something in the service.**

```sh
hubspot api companies-batch-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api companies-batch-update`

### `hubspot api companies-batch-upsert`

Create or update a batch of companies by unique property values — write (POST /crm/objects/2026-03/companies/batch/upsert)

**Changes something in the service.**

```sh
hubspot api companies-batch-upsert [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api companies-batch-upsert`

### `hubspot api companies-merge`

Merge two companies — destructive (POST /crm/objects/2026-03/companies/merge)

**Changes something in the service.**

```sh
hubspot api companies-merge [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api companies-merge`

### `hubspot api companies-search`

Search for companies — read (POST /crm/objects/2026-03/companies/search)

```sh
hubspot api companies-search [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api companies-search`

### `hubspot api companies-get`

Retrieve a company — read (GET /crm/objects/2026-03/companies/{companyId})

```sh
hubspot api companies-get [options]
```

| Option | What it does |
|---|---|
| `--company-id <value>` | companyId. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

**Example:** `hubspot personal api companies-get --company-id <value>`

### `hubspot api companies-update`

Update a company — write (PATCH /crm/objects/2026-03/companies/{companyId})

**Changes something in the service.**

```sh
hubspot api companies-update [options]
```

| Option | What it does |
|---|---|
| `--company-id <value>` | companyId. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api companies-update --company-id <value>`

### `hubspot api companies-delete`

Archive a company — destructive (DELETE /crm/objects/2026-03/companies/{companyId})

**Changes something in the service.**

```sh
hubspot api companies-delete [options]
```

| Option | What it does |
|---|---|
| `--company-id <value>` | companyId. |

**Example:** `hubspot personal api companies-delete --company-id <value>`

### `hubspot api deals-list`

List — read (GET /crm/objects/2026-03/0-3)

```sh
hubspot api deals-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api deals-list`

### `hubspot api deals-create`

Create — write (POST /crm/objects/2026-03/0-3)

**Changes something in the service.**

```sh
hubspot api deals-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api deals-create`

### `hubspot api deals-batch-archive`

Archive a batch of deals by ID — destructive (POST /crm/objects/2026-03/0-3/batch/archive)

**Changes something in the service.**

```sh
hubspot api deals-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api deals-batch-archive`

### `hubspot api deals-batch-create`

Create a batch of deals — write (POST /crm/objects/2026-03/0-3/batch/create)

**Changes something in the service.**

```sh
hubspot api deals-batch-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api deals-batch-create`

### `hubspot api deals-batch-read`

Read a batch of deals by internal ID, or unique property values — write (POST /crm/objects/2026-03/0-3/batch/read)

**Changes something in the service.**

```sh
hubspot api deals-batch-read [options]
```

| Option | What it does |
|---|---|
| `--archived <value>` | Whether to return only results that have been archived. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api deals-batch-read`

### `hubspot api deals-batch-update`

Update a batch of deals by internal ID, or unique property values — write (POST /crm/objects/2026-03/0-3/batch/update)

**Changes something in the service.**

```sh
hubspot api deals-batch-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api deals-batch-update`

### `hubspot api deals-batch-upsert`

Create or update a batch of deals by unique property values — write (POST /crm/objects/2026-03/0-3/batch/upsert)

**Changes something in the service.**

```sh
hubspot api deals-batch-upsert [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api deals-batch-upsert`

### `hubspot api deals-merge`

Merge two deals with same type — destructive (POST /crm/objects/2026-03/0-3/merge)

**Changes something in the service.**

```sh
hubspot api deals-merge [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api deals-merge`

### `hubspot api deals-search`

Search for deals using various filters and criteria to retrieve specific records. — read (POST /crm/objects/2026-03/0-3/search)

```sh
hubspot api deals-search [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api deals-search`

### `hubspot api deals-get`

Read — read (GET /crm/objects/2026-03/0-3/{dealId})

```sh
hubspot api deals-get [options]
```

| Option | What it does |
|---|---|
| `--deal-id <value>` | dealId. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

**Example:** `hubspot personal api deals-get --deal-id <value>`

### `hubspot api deals-update`

Update — write (PATCH /crm/objects/2026-03/0-3/{dealId})

**Changes something in the service.**

```sh
hubspot api deals-update [options]
```

| Option | What it does |
|---|---|
| `--deal-id <value>` | dealId. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api deals-update --deal-id <value>`

### `hubspot api deals-delete`

Archive — destructive (DELETE /crm/objects/2026-03/0-3/{dealId})

**Changes something in the service.**

```sh
hubspot api deals-delete [options]
```

| Option | What it does |
|---|---|
| `--deal-id <value>` | dealId. |

**Example:** `hubspot personal api deals-delete --deal-id <value>`

### `hubspot api tickets-list`

List — read (GET /crm/objects/2026-03/tickets)

```sh
hubspot api tickets-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api tickets-list`

### `hubspot api tickets-create`

Create — write (POST /crm/objects/2026-03/tickets)

**Changes something in the service.**

```sh
hubspot api tickets-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tickets-create`

### `hubspot api tickets-batch-archive`

Archive a batch of tickets by ID — destructive (POST /crm/objects/2026-03/tickets/batch/archive)

**Changes something in the service.**

```sh
hubspot api tickets-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tickets-batch-archive`

### `hubspot api tickets-batch-create`

Create a batch of tickets — write (POST /crm/objects/2026-03/tickets/batch/create)

**Changes something in the service.**

```sh
hubspot api tickets-batch-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tickets-batch-create`

### `hubspot api tickets-batch-read`

Read a batch of tickets by internal ID, or unique property values — write (POST /crm/objects/2026-03/tickets/batch/read)

**Changes something in the service.**

```sh
hubspot api tickets-batch-read [options]
```

| Option | What it does |
|---|---|
| `--archived <value>` | Whether to return only results that have been archived. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tickets-batch-read`

### `hubspot api tickets-batch-update`

Update a batch of tickets by internal ID, or unique property values — write (POST /crm/objects/2026-03/tickets/batch/update)

**Changes something in the service.**

```sh
hubspot api tickets-batch-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tickets-batch-update`

### `hubspot api tickets-batch-upsert`

Create or update a batch of tickets by unique property values — write (POST /crm/objects/2026-03/tickets/batch/upsert)

**Changes something in the service.**

```sh
hubspot api tickets-batch-upsert [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tickets-batch-upsert`

### `hubspot api tickets-merge`

Merge two tickets — destructive (POST /crm/objects/2026-03/tickets/merge)

**Changes something in the service.**

```sh
hubspot api tickets-merge [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tickets-merge`

### `hubspot api tickets-search`

Search for tickets — read (POST /crm/objects/2026-03/tickets/search)

```sh
hubspot api tickets-search [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api tickets-search`

### `hubspot api tickets-get`

Read — read (GET /crm/objects/2026-03/tickets/{ticketId})

```sh
hubspot api tickets-get [options]
```

| Option | What it does |
|---|---|
| `--ticket-id <value>` | ticketId. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

**Example:** `hubspot personal api tickets-get --ticket-id <value>`

### `hubspot api tickets-update`

Update — write (PATCH /crm/objects/2026-03/tickets/{ticketId})

**Changes something in the service.**

```sh
hubspot api tickets-update [options]
```

| Option | What it does |
|---|---|
| `--ticket-id <value>` | ticketId. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tickets-update --ticket-id <value>`

### `hubspot api tickets-delete`

Archive — destructive (DELETE /crm/objects/2026-03/tickets/{ticketId})

**Changes something in the service.**

```sh
hubspot api tickets-delete [options]
```

| Option | What it does |
|---|---|
| `--ticket-id <value>` | ticketId. |

**Example:** `hubspot personal api tickets-delete --ticket-id <value>`

### `hubspot api leads-list`

List — read (GET /crm/objects/2026-03/leads)

```sh
hubspot api leads-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api leads-list`

### `hubspot api leads-create`

Create — write (POST /crm/objects/2026-03/leads)

**Changes something in the service.**

```sh
hubspot api leads-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api leads-create`

### `hubspot api leads-batch-archive`

Archive a batch of leads by ID — destructive (POST /crm/objects/2026-03/leads/batch/archive)

**Changes something in the service.**

```sh
hubspot api leads-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api leads-batch-archive`

### `hubspot api leads-batch-create`

Create a batch of leads — write (POST /crm/objects/2026-03/leads/batch/create)

**Changes something in the service.**

```sh
hubspot api leads-batch-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api leads-batch-create`

### `hubspot api leads-batch-read`

Read a batch of leads by internal ID, or unique property values — write (POST /crm/objects/2026-03/leads/batch/read)

**Changes something in the service.**

```sh
hubspot api leads-batch-read [options]
```

| Option | What it does |
|---|---|
| `--archived <value>` | Whether to return only results that have been archived. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api leads-batch-read`

### `hubspot api leads-batch-update`

Update a batch of leads by internal ID, or unique property values — write (POST /crm/objects/2026-03/leads/batch/update)

**Changes something in the service.**

```sh
hubspot api leads-batch-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api leads-batch-update`

### `hubspot api leads-batch-upsert`

Create or update a batch of leads by unique property values — write (POST /crm/objects/2026-03/leads/batch/upsert)

**Changes something in the service.**

```sh
hubspot api leads-batch-upsert [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api leads-batch-upsert`

### `hubspot api leads-search`

Search for leads using specified criteria. — read (POST /crm/objects/2026-03/leads/search)

```sh
hubspot api leads-search [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api leads-search`

### `hubspot api leads-get`

Read — read (GET /crm/objects/2026-03/leads/{leadsId})

```sh
hubspot api leads-get [options]
```

| Option | What it does |
|---|---|
| `--leads-id <value>` | leadsId. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

**Example:** `hubspot personal api leads-get --leads-id <value>`

### `hubspot api leads-update`

Update — write (PATCH /crm/objects/2026-03/leads/{leadsId})

**Changes something in the service.**

```sh
hubspot api leads-update [options]
```

| Option | What it does |
|---|---|
| `--leads-id <value>` | leadsId. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api leads-update --leads-id <value>`

### `hubspot api leads-delete`

Archive — destructive (DELETE /crm/objects/2026-03/leads/{leadsId})

**Changes something in the service.**

```sh
hubspot api leads-delete [options]
```

| Option | What it does |
|---|---|
| `--leads-id <value>` | leadsId. |

**Example:** `hubspot personal api leads-delete --leads-id <value>`

### `hubspot api notes-list`

List — read (GET /crm/objects/2026-03/notes)

```sh
hubspot api notes-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api notes-list`

### `hubspot api notes-create`

Create — write (POST /crm/objects/2026-03/notes)

**Changes something in the service.**

```sh
hubspot api notes-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api notes-create`

### `hubspot api notes-batch-archive`

Archive a batch of notes by ID — destructive (POST /crm/objects/2026-03/notes/batch/archive)

**Changes something in the service.**

```sh
hubspot api notes-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api notes-batch-archive`

### `hubspot api notes-batch-create`

Create a batch of notes — write (POST /crm/objects/2026-03/notes/batch/create)

**Changes something in the service.**

```sh
hubspot api notes-batch-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api notes-batch-create`

### `hubspot api notes-batch-read`

Read a batch of notes by internal ID, or unique property values — write (POST /crm/objects/2026-03/notes/batch/read)

**Changes something in the service.**

```sh
hubspot api notes-batch-read [options]
```

| Option | What it does |
|---|---|
| `--archived <value>` | Whether to return only results that have been archived. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api notes-batch-read`

### `hubspot api notes-batch-update`

Update a batch of notes by internal ID, or unique property values — write (POST /crm/objects/2026-03/notes/batch/update)

**Changes something in the service.**

```sh
hubspot api notes-batch-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api notes-batch-update`

### `hubspot api notes-batch-upsert`

Create or update a batch of notes by unique property values — write (POST /crm/objects/2026-03/notes/batch/upsert)

**Changes something in the service.**

```sh
hubspot api notes-batch-upsert [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api notes-batch-upsert`

### `hubspot api notes-search`

Search for notes based on specified criteria. — read (POST /crm/objects/2026-03/notes/search)

```sh
hubspot api notes-search [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api notes-search`

### `hubspot api notes-get`

Read — read (GET /crm/objects/2026-03/notes/{noteId})

```sh
hubspot api notes-get [options]
```

| Option | What it does |
|---|---|
| `--note-id <value>` | noteId. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

**Example:** `hubspot personal api notes-get --note-id <value>`

### `hubspot api notes-update`

Update — write (PATCH /crm/objects/2026-03/notes/{noteId})

**Changes something in the service.**

```sh
hubspot api notes-update [options]
```

| Option | What it does |
|---|---|
| `--note-id <value>` | noteId. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api notes-update --note-id <value>`

### `hubspot api notes-delete`

Archive — destructive (DELETE /crm/objects/2026-03/notes/{noteId})

**Changes something in the service.**

```sh
hubspot api notes-delete [options]
```

| Option | What it does |
|---|---|
| `--note-id <value>` | noteId. |

**Example:** `hubspot personal api notes-delete --note-id <value>`

### `hubspot api calls-list`

List — read (GET /crm/objects/2026-03/calls)

```sh
hubspot api calls-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api calls-list`

### `hubspot api calls-create`

Create — write (POST /crm/objects/2026-03/calls)

**Changes something in the service.**

```sh
hubspot api calls-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api calls-create`

### `hubspot api calls-batch-archive`

Archive a batch of calls by ID — destructive (POST /crm/objects/2026-03/calls/batch/archive)

**Changes something in the service.**

```sh
hubspot api calls-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api calls-batch-archive`

### `hubspot api calls-batch-create`

Create a batch of calls — write (POST /crm/objects/2026-03/calls/batch/create)

**Changes something in the service.**

```sh
hubspot api calls-batch-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api calls-batch-create`

### `hubspot api calls-batch-read`

Read a batch of calls by internal ID, or unique property values — write (POST /crm/objects/2026-03/calls/batch/read)

**Changes something in the service.**

```sh
hubspot api calls-batch-read [options]
```

| Option | What it does |
|---|---|
| `--archived <value>` | Whether to return only results that have been archived. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api calls-batch-read`

### `hubspot api calls-batch-update`

Update a batch of calls by internal ID, or unique property values — write (POST /crm/objects/2026-03/calls/batch/update)

**Changes something in the service.**

```sh
hubspot api calls-batch-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api calls-batch-update`

### `hubspot api calls-batch-upsert`

Create or update a batch of calls by unique property values — write (POST /crm/objects/2026-03/calls/batch/upsert)

**Changes something in the service.**

```sh
hubspot api calls-batch-upsert [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api calls-batch-upsert`

### `hubspot api calls-search`

Search for calls — read (POST /crm/objects/2026-03/calls/search)

```sh
hubspot api calls-search [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api calls-search`

### `hubspot api calls-get`

Read — read (GET /crm/objects/2026-03/calls/{callId})

```sh
hubspot api calls-get [options]
```

| Option | What it does |
|---|---|
| `--call-id <value>` | callId. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

**Example:** `hubspot personal api calls-get --call-id <value>`

### `hubspot api calls-update`

Update — write (PATCH /crm/objects/2026-03/calls/{callId})

**Changes something in the service.**

```sh
hubspot api calls-update [options]
```

| Option | What it does |
|---|---|
| `--call-id <value>` | callId. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api calls-update --call-id <value>`

### `hubspot api calls-delete`

Archive — destructive (DELETE /crm/objects/2026-03/calls/{callId})

**Changes something in the service.**

```sh
hubspot api calls-delete [options]
```

| Option | What it does |
|---|---|
| `--call-id <value>` | callId. |

**Example:** `hubspot personal api calls-delete --call-id <value>`

### `hubspot api emails-list`

List — read (GET /crm/objects/2026-03/emails)

```sh
hubspot api emails-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api emails-list`

### `hubspot api emails-create`

Create — write (POST /crm/objects/2026-03/emails)

**Changes something in the service.**

```sh
hubspot api emails-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api emails-create`

### `hubspot api emails-batch-archive`

Archive a batch of emails by ID — destructive (POST /crm/objects/2026-03/emails/batch/archive)

**Changes something in the service.**

```sh
hubspot api emails-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api emails-batch-archive`

### `hubspot api emails-batch-create`

Create a batch of emails — write (POST /crm/objects/2026-03/emails/batch/create)

**Changes something in the service.**

```sh
hubspot api emails-batch-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api emails-batch-create`

### `hubspot api emails-batch-read`

Read a batch of emails by internal ID, or unique property values — write (POST /crm/objects/2026-03/emails/batch/read)

**Changes something in the service.**

```sh
hubspot api emails-batch-read [options]
```

| Option | What it does |
|---|---|
| `--archived <value>` | Whether to return only results that have been archived. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api emails-batch-read`

### `hubspot api emails-batch-update`

Update a batch of emails by internal ID, or unique property values — write (POST /crm/objects/2026-03/emails/batch/update)

**Changes something in the service.**

```sh
hubspot api emails-batch-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api emails-batch-update`

### `hubspot api emails-batch-upsert`

Create or update a batch of emails by unique property values — write (POST /crm/objects/2026-03/emails/batch/upsert)

**Changes something in the service.**

```sh
hubspot api emails-batch-upsert [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api emails-batch-upsert`

### `hubspot api emails-search`

Search for emails using specified criteria and filters. — read (POST /crm/objects/2026-03/emails/search)

```sh
hubspot api emails-search [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api emails-search`

### `hubspot api emails-get`

Read — read (GET /crm/objects/2026-03/emails/{emailId})

```sh
hubspot api emails-get [options]
```

| Option | What it does |
|---|---|
| `--email-id <value>` | emailId. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

**Example:** `hubspot personal api emails-get --email-id <value>`

### `hubspot api emails-update`

Update — write (PATCH /crm/objects/2026-03/emails/{emailId})

**Changes something in the service.**

```sh
hubspot api emails-update [options]
```

| Option | What it does |
|---|---|
| `--email-id <value>` | emailId. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api emails-update --email-id <value>`

### `hubspot api emails-delete`

Archive — destructive (DELETE /crm/objects/2026-03/emails/{emailId})

**Changes something in the service.**

```sh
hubspot api emails-delete [options]
```

| Option | What it does |
|---|---|
| `--email-id <value>` | emailId. |

**Example:** `hubspot personal api emails-delete --email-id <value>`

### `hubspot api meetings-list`

List — read (GET /crm/objects/2026-03/meetings)

```sh
hubspot api meetings-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api meetings-list`

### `hubspot api meetings-create`

Create — write (POST /crm/objects/2026-03/meetings)

**Changes something in the service.**

```sh
hubspot api meetings-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api meetings-create`

### `hubspot api meetings-batch-archive`

Archive a batch of meetings by ID — destructive (POST /crm/objects/2026-03/meetings/batch/archive)

**Changes something in the service.**

```sh
hubspot api meetings-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api meetings-batch-archive`

### `hubspot api meetings-batch-create`

Create a batch of meetings — write (POST /crm/objects/2026-03/meetings/batch/create)

**Changes something in the service.**

```sh
hubspot api meetings-batch-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api meetings-batch-create`

### `hubspot api meetings-batch-read`

Read a batch of meetings by internal ID, or unique property values — write (POST /crm/objects/2026-03/meetings/batch/read)

**Changes something in the service.**

```sh
hubspot api meetings-batch-read [options]
```

| Option | What it does |
|---|---|
| `--archived <value>` | Whether to return only results that have been archived. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api meetings-batch-read`

### `hubspot api meetings-batch-update`

Update a batch of meetings by internal ID, or unique property values — write (POST /crm/objects/2026-03/meetings/batch/update)

**Changes something in the service.**

```sh
hubspot api meetings-batch-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api meetings-batch-update`

### `hubspot api meetings-batch-upsert`

Create or update a batch of meetings by unique property values — write (POST /crm/objects/2026-03/meetings/batch/upsert)

**Changes something in the service.**

```sh
hubspot api meetings-batch-upsert [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api meetings-batch-upsert`

### `hubspot api meetings-search`

Search for meetings — read (POST /crm/objects/2026-03/meetings/search)

```sh
hubspot api meetings-search [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api meetings-search`

### `hubspot api meetings-get`

Read — read (GET /crm/objects/2026-03/meetings/{meetingId})

```sh
hubspot api meetings-get [options]
```

| Option | What it does |
|---|---|
| `--meeting-id <value>` | meetingId. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

**Example:** `hubspot personal api meetings-get --meeting-id <value>`

### `hubspot api meetings-update`

Update — write (PATCH /crm/objects/2026-03/meetings/{meetingId})

**Changes something in the service.**

```sh
hubspot api meetings-update [options]
```

| Option | What it does |
|---|---|
| `--meeting-id <value>` | meetingId. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api meetings-update --meeting-id <value>`

### `hubspot api meetings-delete`

Archive — destructive (DELETE /crm/objects/2026-03/meetings/{meetingId})

**Changes something in the service.**

```sh
hubspot api meetings-delete [options]
```

| Option | What it does |
|---|---|
| `--meeting-id <value>` | meetingId. |

**Example:** `hubspot personal api meetings-delete --meeting-id <value>`

### `hubspot api tasks-list`

List — read (GET /crm/objects/2026-03/tasks)

```sh
hubspot api tasks-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api tasks-list`

### `hubspot api tasks-create`

Create — write (POST /crm/objects/2026-03/tasks)

**Changes something in the service.**

```sh
hubspot api tasks-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tasks-create`

### `hubspot api tasks-batch-archive`

Archive a batch of tasks by ID — destructive (POST /crm/objects/2026-03/tasks/batch/archive)

**Changes something in the service.**

```sh
hubspot api tasks-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tasks-batch-archive`

### `hubspot api tasks-batch-create`

Create a batch of tasks — write (POST /crm/objects/2026-03/tasks/batch/create)

**Changes something in the service.**

```sh
hubspot api tasks-batch-create [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tasks-batch-create`

### `hubspot api tasks-batch-read`

Read a batch of tasks by internal ID, or unique property values — write (POST /crm/objects/2026-03/tasks/batch/read)

**Changes something in the service.**

```sh
hubspot api tasks-batch-read [options]
```

| Option | What it does |
|---|---|
| `--archived <value>` | Whether to return only results that have been archived. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tasks-batch-read`

### `hubspot api tasks-batch-update`

Update a batch of tasks by internal ID, or unique property values — write (POST /crm/objects/2026-03/tasks/batch/update)

**Changes something in the service.**

```sh
hubspot api tasks-batch-update [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tasks-batch-update`

### `hubspot api tasks-batch-upsert`

Create or update a batch of tasks by unique property values — write (POST /crm/objects/2026-03/tasks/batch/upsert)

**Changes something in the service.**

```sh
hubspot api tasks-batch-upsert [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tasks-batch-upsert`

### `hubspot api tasks-search`

Search for tasks using specified criteria. — read (POST /crm/objects/2026-03/tasks/search)

```sh
hubspot api tasks-search [options]
```

| Option | What it does |
|---|---|
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api tasks-search`

### `hubspot api tasks-get`

Read — read (GET /crm/objects/2026-03/tasks/{taskId})

```sh
hubspot api tasks-get [options]
```

| Option | What it does |
|---|---|
| `--task-id <value>` | taskId. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--associations <value>` | A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--properties <value>` | A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. |
| `--properties-with-history <value>` | A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. |

**Example:** `hubspot personal api tasks-get --task-id <value>`

### `hubspot api tasks-update`

Update — write (PATCH /crm/objects/2026-03/tasks/{taskId})

**Changes something in the service.**

```sh
hubspot api tasks-update [options]
```

| Option | What it does |
|---|---|
| `--task-id <value>` | taskId. |
| `--id-property <value>` | The name of a property whose values are unique for this object type. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api tasks-update --task-id <value>`

### `hubspot api tasks-delete`

Archive — destructive (DELETE /crm/objects/2026-03/tasks/{taskId})

**Changes something in the service.**

```sh
hubspot api tasks-delete [options]
```

| Option | What it does |
|---|---|
| `--task-id <value>` | taskId. |

**Example:** `hubspot personal api tasks-delete --task-id <value>`

### `hubspot api owners-list`

List owners — read (GET /crm/owners/2026-03)

```sh
hubspot api owners-list [options]
```

| Option | What it does |
|---|---|
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--email <value>` | Filter by email address (optional). |
| `--limit <value>` | The maximum number of results to display per page. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api owners-list`

### `hubspot api owners-get`

Retrieve a specific owner by ID — read (GET /crm/owners/2026-03/{ownerId})

```sh
hubspot api owners-get [options]
```

| Option | What it does |
|---|---|
| `--owner-id <value>` | The unique identifier of the owner to retrieve. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--id-property <value>` | Specifies which property to use for identifying the owner. Valid values are 'id' or 'userId'. Defaults to 'id'. |

**Example:** `hubspot personal api owners-get --owner-id <value>`

### `hubspot api pipelines-list`

Retrieve all pipelines — read (GET /crm/pipelines/2026-03/{objectType})

```sh
hubspot api pipelines-list [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |

**Example:** `hubspot personal api pipelines-list --object-type <value>`

### `hubspot api pipelines-create`

Create a pipeline — write (POST /crm/pipelines/2026-03/{objectType})

**Changes something in the service.**

```sh
hubspot api pipelines-create [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api pipelines-create --object-type <value>`

### `hubspot api pipelines-get`

Return a pipeline by ID — read (GET /crm/pipelines/2026-03/{objectType}/{pipelineId})

```sh
hubspot api pipelines-get [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |

**Example:** `hubspot personal api pipelines-get --object-type <value> --pipeline-id <value>`

### `hubspot api pipelines-replace`

Replace a pipeline — write (PUT /crm/pipelines/2026-03/{objectType}/{pipelineId})

**Changes something in the service.**

```sh
hubspot api pipelines-replace [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |
| `--validate-deal-stage-usages-before-delete <value>` | validateDealStageUsagesBeforeDelete. |
| `--validate-references-before-delete <value>` | validateReferencesBeforeDelete. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api pipelines-replace --object-type <value> --pipeline-id <value>`

### `hubspot api pipelines-update`

Perform a partial update of the pipeline identified by pipelineId. — write (PATCH /crm/pipelines/2026-03/{objectType}/{pipelineId})

**Changes something in the service.**

```sh
hubspot api pipelines-update [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |
| `--validate-deal-stage-usages-before-delete <value>` | validateDealStageUsagesBeforeDelete. |
| `--validate-references-before-delete <value>` | validateReferencesBeforeDelete. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api pipelines-update --object-type <value> --pipeline-id <value>`

### `hubspot api pipelines-delete`

Delete a pipeline — destructive (DELETE /crm/pipelines/2026-03/{objectType}/{pipelineId})

**Changes something in the service.**

```sh
hubspot api pipelines-delete [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |
| `--validate-deal-stage-usages-before-delete <value>` | validateDealStageUsagesBeforeDelete. |
| `--validate-references-before-delete <value>` | validateReferencesBeforeDelete. |

**Example:** `hubspot personal api pipelines-delete --object-type <value> --pipeline-id <value>`

### `hubspot api pipelines-audit-list`

Return an audit of all changes to the pipeline — read (GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/audit)

```sh
hubspot api pipelines-audit-list [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |

**Example:** `hubspot personal api pipelines-audit-list --object-type <value> --pipeline-id <value>`

### `hubspot api pipelines-stages-list`

Return all stages of a pipeline — read (GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages)

```sh
hubspot api pipelines-stages-list [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |

**Example:** `hubspot personal api pipelines-stages-list --object-type <value> --pipeline-id <value>`

### `hubspot api pipelines-stages-create`

Create a pipeline stage — write (POST /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages)

**Changes something in the service.**

```sh
hubspot api pipelines-stages-create [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api pipelines-stages-create --object-type <value> --pipeline-id <value>`

### `hubspot api pipelines-stages-get`

Return a pipeline stage by ID — read (GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId})

```sh
hubspot api pipelines-stages-get [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |
| `--stage-id <value>` | stageId. |

**Example:** `hubspot personal api pipelines-stages-get --object-type <value> --pipeline-id <value> --stage-id <value>`

### `hubspot api pipelines-stages-replace`

Replace a pipeline stage — write (PUT /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId})

**Changes something in the service.**

```sh
hubspot api pipelines-stages-replace [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |
| `--stage-id <value>` | stageId. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api pipelines-stages-replace --object-type <value> --pipeline-id <value> --stage-id <value>`

### `hubspot api pipelines-stages-update`

Update specific properties of an existing pipeline stage. — write (PATCH /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId})

**Changes something in the service.**

```sh
hubspot api pipelines-stages-update [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |
| `--stage-id <value>` | stageId. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api pipelines-stages-update --object-type <value> --pipeline-id <value> --stage-id <value>`

### `hubspot api pipelines-stages-delete`

Delete a pipeline stage — destructive (DELETE /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId})

**Changes something in the service.**

```sh
hubspot api pipelines-stages-delete [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |
| `--stage-id <value>` | stageId. |
| `--validate-references-before-delete <value>` | validateReferencesBeforeDelete. |

**Example:** `hubspot personal api pipelines-stages-delete --object-type <value> --pipeline-id <value> --stage-id <value>`

### `hubspot api pipelines-stages-audit-list`

Retrieve a reverse chronological list of all changes made to a specific pipeline stage. — read (GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}/audit)

```sh
hubspot api pipelines-stages-audit-list [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--pipeline-id <value>` | pipelineId. |
| `--stage-id <value>` | stageId. |

**Example:** `hubspot personal api pipelines-stages-audit-list --object-type <value> --pipeline-id <value> --stage-id <value>`

### `hubspot api properties-list`

Read all properties — read (GET /crm/properties/2026-03/{objectType})

```sh
hubspot api properties-list [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | The type of CRM object for which properties are being retrieved, such as 'contacts', 'companies', etc. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--data-sensitivity <value>` | Filter properties based on data sensitivity level. Valid values are 'non_sensitive', 'sensitive', and 'highly_sensitive'. Defaults to 'non_sensitive'. |
| `--locale <value>` | Specify the locale to retrieve properties in a particular language or regional format. |
| `--properties <value>` | A comma-separated list of property names to include in the response. |

**Example:** `hubspot personal api properties-list --object-type <value>`

### `hubspot api properties-create`

Create a property — write (POST /crm/properties/2026-03/{objectType})

**Changes something in the service.**

```sh
hubspot api properties-create [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | The type of object for which the property is being created, such as contacts, companies, or deals. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api properties-create --object-type <value>`

### `hubspot api properties-batch-archive`

Archive a batch of properties — destructive (POST /crm/properties/2026-03/{objectType}/batch/archive)

**Changes something in the service.**

```sh
hubspot api properties-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | The type of object whose properties are to be archived. This is a required parameter and identifies the specific object type within HubSpot. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api properties-batch-archive --object-type <value>`

### `hubspot api properties-batch-create`

Create a batch of properties — write (POST /crm/properties/2026-03/{objectType}/batch/create)

**Changes something in the service.**

```sh
hubspot api properties-batch-create [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | The type of CRM object for which the properties are being created, such as contacts, companies, or deals. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api properties-batch-create --object-type <value>`

### `hubspot api properties-batch-read`

Read a batch of properties — write (POST /crm/properties/2026-03/{objectType}/batch/read)

**Changes something in the service.**

```sh
hubspot api properties-batch-read [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | The type of CRM object for which properties are being retrieved. This is a required path parameter. |
| `--locale <value>` | A string specifying the locale to use for the response. This can be used to tailor the response to a specific language or region. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api properties-batch-read --object-type <value>`

### `hubspot api properties-groups-list`

Read all property groups — read (GET /crm/properties/2026-03/{objectType}/groups)

```sh
hubspot api properties-groups-list [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | The type of CRM object for which to retrieve property groups, such as 'contacts' or 'deals'. |
| `--locale <value>` | The language locale to use for property group labels. This can help in displaying labels in the preferred language. |

**Example:** `hubspot personal api properties-groups-list --object-type <value>`

### `hubspot api properties-groups-create`

Create a property group — write (POST /crm/properties/2026-03/{objectType}/groups)

**Changes something in the service.**

```sh
hubspot api properties-groups-create [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | The type of object for which the property group is being created, such as contacts, companies, or deals. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api properties-groups-create --object-type <value>`

### `hubspot api properties-groups-get`

Read a property group — read (GET /crm/properties/2026-03/{objectType}/groups/{groupName})

```sh
hubspot api properties-groups-get [options]
```

| Option | What it does |
|---|---|
| `--group-name <value>` | The name of the property group to retrieve details for. |
| `--object-type <value>` | The type of CRM object for which the property group is being retrieved, such as contacts or deals. |
| `--locale <value>` | The language locale to use for the response. This can affect the language of the labels and descriptions returned. |

**Example:** `hubspot personal api properties-groups-get --group-name <value> --object-type <value>`

### `hubspot api properties-groups-update`

Update a property group — write (PATCH /crm/properties/2026-03/{objectType}/groups/{groupName})

**Changes something in the service.**

```sh
hubspot api properties-groups-update [options]
```

| Option | What it does |
|---|---|
| `--group-name <value>` | The name of the property group to update. |
| `--object-type <value>` | The type of object for which the property group is being updated, such as contacts, companies, or deals. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api properties-groups-update --group-name <value> --object-type <value>`

### `hubspot api properties-groups-delete`

Archive a property group — destructive (DELETE /crm/properties/2026-03/{objectType}/groups/{groupName})

**Changes something in the service.**

```sh
hubspot api properties-groups-delete [options]
```

| Option | What it does |
|---|---|
| `--group-name <value>` | The unique name of the property group to be deleted. |
| `--object-type <value>` | The type of object for which the property group is defined, such as contacts, companies, or deals. |

**Example:** `hubspot personal api properties-groups-delete --group-name <value> --object-type <value>`

### `hubspot api properties-get`

Read a property — read (GET /crm/properties/2026-03/{objectType}/{propertyName})

```sh
hubspot api properties-get [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | The type of object the property belongs to, such as 'contacts' or 'deals'. |
| `--property-name <value>` | The name of the property to retrieve. |
| `--archived <value>` | Whether to return only results that have been archived. |
| `--data-sensitivity <value>` | The level of data sensitivity to filter properties by. Valid values are 'non_sensitive', 'sensitive', and 'highly_sensitive'. Defaults to 'non_sensitive'. |
| `--locale <value>` | The locale to use for property labels and descriptions. |
| `--properties <value>` | A comma-separated list of property names to include in the response. |

**Example:** `hubspot personal api properties-get --object-type <value> --property-name <value>`

### `hubspot api properties-update`

Update a property — write (PATCH /crm/properties/2026-03/{objectType}/{propertyName})

**Changes something in the service.**

```sh
hubspot api properties-update [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | The type of object for which the property is being updated, such as contacts, companies, or deals. |
| `--property-name <value>` | The unique name of the property to update. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api properties-update --object-type <value> --property-name <value>`

### `hubspot api properties-delete`

Archive a property — destructive (DELETE /crm/properties/2026-03/{objectType}/{propertyName})

**Changes something in the service.**

```sh
hubspot api properties-delete [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | The type of CRM object that the property belongs to, such as contacts, companies, or deals. |
| `--property-name <value>` | The unique name of the property to delete. |

**Example:** `hubspot personal api properties-delete --object-type <value> --property-name <value>`

### `hubspot api associations-usage-high-usage-report-update`

Report high usage — write (POST /crm/associations/2026-03/usage/high-usage-report/{userId})

**Changes something in the service.**

```sh
hubspot api associations-usage-high-usage-report-update [options]
```

| Option | What it does |
|---|---|
| `--user-id <value>` | userId. |

**Example:** `hubspot personal api associations-usage-high-usage-report-update --user-id <value>`

### `hubspot api associations-batch-archive`

Remove associations — destructive (POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/archive)

**Changes something in the service.**

```sh
hubspot api associations-batch-archive [options]
```

| Option | What it does |
|---|---|
| `--from-object-type <value>` | fromObjectType. |
| `--to-object-type <value>` | toObjectType. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api associations-batch-archive --from-object-type <value> --to-object-type <value>`

### `hubspot api associations-batch-associate-default`

Create Default Associations — write (POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/associate/default)

**Changes something in the service.**

```sh
hubspot api associations-batch-associate-default [options]
```

| Option | What it does |
|---|---|
| `--from-object-type <value>` | fromObjectType. |
| `--to-object-type <value>` | toObjectType. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api associations-batch-associate-default --from-object-type <value> --to-object-type <value>`

### `hubspot api associations-batch-create`

Associate records (labelled) — write (POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/create)

**Changes something in the service.**

```sh
hubspot api associations-batch-create [options]
```

| Option | What it does |
|---|---|
| `--from-object-type <value>` | fromObjectType. |
| `--to-object-type <value>` | toObjectType. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api associations-batch-create --from-object-type <value> --to-object-type <value>`

### `hubspot api associations-batch-labels-archive`

Delete Specific Labels — destructive (POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/labels/archive)

**Changes something in the service.**

```sh
hubspot api associations-batch-labels-archive [options]
```

| Option | What it does |
|---|---|
| `--from-object-type <value>` | fromObjectType. |
| `--to-object-type <value>` | toObjectType. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api associations-batch-labels-archive --from-object-type <value> --to-object-type <value>`

### `hubspot api associations-batch-read`

Retrieve associations — write (POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/read)

**Changes something in the service.**

```sh
hubspot api associations-batch-read [options]
```

| Option | What it does |
|---|---|
| `--from-object-type <value>` | fromObjectType. |
| `--to-object-type <value>` | toObjectType. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |

**Example:** `hubspot personal api associations-batch-read --from-object-type <value> --to-object-type <value>`

### `hubspot api search`

— read (POST /crm/objects/2026-03/{objectType}/search)

```sh
hubspot api search [options]
```

| Option | What it does |
|---|---|
| `--object-type <value>` | objectType. |
| `--body <json>` | the request body as JSON; - reads it from stdin. |
| `--body-file <path>` | the request body from a JSON file; - is stdin. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api search --object-type <value>`

### `hubspot api associations-get`

Retrieve all associations by object type — read (GET /crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType})

```sh
hubspot api associations-get [options]
```

| Option | What it does |
|---|---|
| `--object-id <value>` | objectId. |
| `--object-type <value>` | objectType. |
| `--to-object-type <value>` | toObjectType. |
| `--after <value>` | The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. |
| `--limit <value>` | The maximum number of results to display per page. |
| `--all` | read every page, as the API pages it. |

**Example:** `hubspot personal api associations-get --object-id <value> --object-type <value> --to-object-type <value>`

### `hubspot api account-info-api-usage-daily-private-apps-list`

Retrieve private app daily API usage — read (GET /account-info/2026-03/api-usage/daily/private-apps)

```sh
hubspot api account-info-api-usage-daily-private-apps-list
```

**Example:** `hubspot personal api account-info-api-usage-daily-private-apps-list`

### `hubspot api account-info-details-list`

Retrieve account details — read (GET /account-info/2026-03/details)

```sh
hubspot api account-info-details-list
```

**Example:** `hubspot personal api account-info-details-list`

## `hubspot comments`

read and write comments in Example Comments, the sample service

### `hubspot comments list`

list the comments in Example Comments, newest first

```sh
hubspot comments list [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--limit <n>` | how many to show. |
| `--page <n>` | which page, starting at 1. |
| `--all` | every row, no paging. |

**Returns:** comment — id, text, author, created_at; every field: hubspot commands info comments list

**Example:** `hubspot personal comments list`, `hubspot personal comments list author:u2 --json=id,text`

### `hubspot comments show`

show one comment in Example Comments

```sh
hubspot comments show <id>
```

| Argument | | What it is |
|---|---|---|
| `id` | required | the comment's id, as list prints it. |

**Returns:** comment — id, text, author, created_at; every field: hubspot commands info comments show

**Example:** `hubspot personal comments show c1`, `hubspot personal comments show c1 --json`

### `hubspot comments create`

post a comment in Example Comments

**Changes something in the service.**

```sh
hubspot comments create [options]
```

| Option | What it does |
|---|---|
| `--text <text>` | the comment's text. |

**Example:** `hubspot personal comments create --text "Looks good to me"`, `hubspot personal comments create --text "Looks good to me" --dry-run`

### `hubspot comments update`

change the text of your comment in Example Comments

**Changes something in the service.**

```sh
hubspot comments update <id> [options]
```

| Argument | | What it is |
|---|---|---|
| `id` | required | the comment's id, as list prints it. |

| Option | What it does |
|---|---|
| `--text <text>` | the new text. |

**Example:** `hubspot personal comments update c1 --text "Looks good now"`

## `hubspot doctor`

the state this installation is in, without connecting unless --online

```sh
hubspot doctor [options]
```

| Option | What it does |
|---|---|
| `--online` | also connect once and read the account; sends nothing. |

**Example:** `hubspot doctor`, `hubspot doctor --json`

### `hubspot doctor reports`

problem reports

#### `hubspot doctor reports show`

what a problem report holds; writes nothing

```sh
hubspot doctor reports show
```

**Example:** `hubspot doctor reports show`

#### `hubspot doctor reports create`

write a problem report to a file, and say where to send it

**Changes something on this computer only.**

```sh
hubspot doctor reports create [options]
```

| Option | What it does |
|---|---|
| `--run <id>` | the run the report is about; the newest failed one if not given. |
| `--output <file>` | where to write it; a new file in this directory if not given. |

**Example:** `hubspot doctor reports create --output ./problem-report.json`

## `hubspot skill`

the instructions an agent is given for this tool

### `hubspot skill show`

print SKILL.md — `hubspot skill install` puts it where Claude Code, Codex, Gemini CLI and OpenClaw look for it, and where Hermes does on request; --for prints the copy already there

```sh
hubspot skill show [name] [options]
```

| Argument | | What it is |
|---|---|---|
| `name` | optional | a part of this skill, or a skill shipped for a task: api-search, api-batch, api-basic, api-advanced, api. |

| Option | What it does |
|---|---|
| `--for <agents>` | print the copy installed for these agents instead of this version's. One of: `claude`, `agents`. |

**Example:** `hubspot skill show`

### `hubspot skill install`

write SKILL.md to \~/.claude/skills/hubspot-cli/ (Claude Code) and \~/.agents/skills/hubspot-cli/ (Codex, Gemini CLI, OpenClaw); --for hermes also has Hermes read \~/.agents/skills, which changes Hermes's own settings, so all leaves it out

**Changes something on this computer only.**

```sh
hubspot skill install [options]
```

| Option | What it does |
|---|---|
| `--for <agents>` | which agents to install for. One of: `claude`, `agents`, `hermes`, `all`. Default: `all`. |

**Example:** `hubspot skill install --for agents`

### `hubspot skill status`

for each place `hubspot skill install` writes to, and for the copy Hermes reads: the path, the version installed there, and whether it is current, stale, missing or unversioned

```sh
hubspot skill status
```

**Example:** `hubspot skill status`, `hubspot skill status --json`

## `hubspot mcp`

serve this profile to an agent over MCP and set it up — `claude mcp add hubspot -- hubspot <profile> mcp serve`

### `hubspot mcp serve`

serve this profile to an agent over MCP, on stdin and stdout — `claude mcp add hubspot -- hubspot <profile> mcp serve`; `hubspot mcp serve --profiles a,b` or `--profiles all` serves those profiles from one server and each tool asks which

**Changes something in the service.**

```sh
hubspot mcp serve [options]
```

| Option | What it does |
|---|---|
| `--permission <key=level>` | make a permission stricter for this server only, like comments.create=deny; it never loosens the profile; repeat for more keys. |
| `--profiles <names\|all>` | serve several profiles from one server instead of one: names, comma-separated, or all for every profile. |
| `--http` | serve over HTTP on 127.0.0.1 for ChatGPT and Claude in the browser, behind your tunnel; the profile's permissions decide. |
| `--port <port>` | the local port for --http (default 8765). |
| `--public-url <url>` | the tunnel's https address the browser apps use, e.g. https://<name>.ts.net or https://<name>.ts.net/tg. |

**Example:** `hubspot personal mcp serve`, `hubspot mcp serve --profiles work,personal`, `hubspot personal mcp serve --http --public-url https://laptop.example.ts.net`

### `hubspot mcp revoke`

forget every login `mcp serve --http` gave a browser app, of this profile or of the server `--profiles` names; each app must log in again

**Changes something on this computer only.**

```sh
hubspot mcp revoke [options]
```

| Option | What it does |
|---|---|
| `--profiles <names\|all>` | serve several profiles from one server instead of one: names, comma-separated, or all for every profile. |

**Example:** `hubspot personal mcp revoke`, `hubspot mcp revoke --profiles all`

### `hubspot mcp server`

start, stop and check `mcp serve --http` in the background; status shows the login code for a browser app

#### `hubspot mcp server start`

start `mcp serve --http` apart from this shell and answer once it listens, with its login code

**Changes something on this computer only.**

```sh
hubspot mcp server start [options]
```

| Option | What it does |
|---|---|
| `--port <port>` | the local port (default 8765). |
| `--public-url <url>` | the tunnel's https address the browser apps use, e.g. https://<name>.ts.net or https://<name>.ts.net/tg. |
| `--permission <key=level>` | make a permission stricter for this server only; repeat for more keys. |
| `--profiles <names\|all>` | the server of several profiles that `mcp serve --profiles` serves: names, comma-separated, or all. |

**Example:** `hubspot personal mcp server start --public-url https://laptop.example.ts.net`

#### `hubspot mcp server stop`

stop `mcp serve --http` — only one that `mcp server start` started

**Changes something on this computer only.**

```sh
hubspot mcp server stop [options]
```

| Option | What it does |
|---|---|
| `--profiles <names\|all>` | the server of several profiles that `mcp serve --profiles` serves: names, comma-separated, or all. |

**Example:** `hubspot personal mcp server stop`

#### `hubspot mcp server status`

whether `mcp serve --http` runs, on which port and address, the login code for a new browser app, and the apps logged in

```sh
hubspot mcp server status [options]
```

| Option | What it does |
|---|---|
| `--profiles <names\|all>` | the server of several profiles that `mcp serve --profiles` serves: names, comma-separated, or all. |

**Example:** `hubspot personal mcp server status --json`

### `hubspot mcp config`

print the mcpServers entry for Claude Desktop, Cursor and others, with full paths; writes nothing

```sh
hubspot mcp config [options]
```

| Option | What it does |
|---|---|
| `--permission <key=level>` | make a permission stricter for this server only, like comments.create=deny; it never loosens the profile; repeat for more keys. |
| `--profiles <names\|all>` | serve several profiles from one server instead of one: names, comma-separated, or all for every profile. |

**Example:** `hubspot personal mcp config`, `hubspot mcp config --profiles all`

### `hubspot mcp add`

add this profile's local MCP server to Codex or Claude Code

**Changes something on this computer only.**

```sh
hubspot mcp add <client> [options]
```

| Argument | | What it is |
|---|---|---|
| `client` | required | codex or claude-code. |

| Option | What it does |
|---|---|
| `--allow-writes` | acknowledge that this profile offers writing tools. |
| `--permission <key=level>` | make a permission stricter for this server only, like comments.create=deny; it never loosens the profile; repeat for more keys. |

**Example:** `hubspot personal mcp add codex --allow-writes`

### `hubspot mcp check`

check this profile's local MCP handshake and tool list

```sh
hubspot mcp check [options]
```

| Option | What it does |
|---|---|
| `--permission <key=level>` | make a permission stricter for this server only, like comments.create=deny; it never loosens the profile; repeat for more keys. |

**Example:** `hubspot personal mcp check`

## `hubspot upgrade`

upgrade hubspot with the package manager that installed it; --check only looks

**Changes something on this computer only.**

```sh
hubspot upgrade [options]
```

| Option | What it does |
|---|---|
| `--check` | say whether a newer version exists, and install nothing. |

**Example:** `hubspot upgrade --check`

## `hubspot config`

the settings in force, and where each one came from

### `hubspot config show`

the profile, the profiles that exist, and each setting with where it came from

```sh
hubspot config show
```

**Example:** `hubspot personal config show`

### `hubspot config set`

save a setting to the configuration file

**Changes something on this computer only.**

```sh
hubspot config set <setting> <value> [options]
```

| Argument | | What it is |
|---|---|---|
| `setting` | required | one of: limit, timeout_ms, color, record, record_input, keep_runs_for_days, keep_successful_runs_for_days, keep_store_runs_for_days, runs_size_limit_mb, permissions, requests_per_minute, search_reranker, embedding_provider, embedding_model, embedding_base_url, embedding_dims, models, update_check, skill_hint, search_stemmers.cyrillic, search_stemmers.latin, owner_languages, crm.<provider>:<account>.links, crm.<provider>:<account>.company-types, crm.<provider>:<account>.scope, crm.<provider>:<account>.unassigned, crm.<provider>:<account>.self, crm.<provider>:<account>.stage-tasks, crm.<provider>:<account>.activities. |
| `value` | required | a number, true or false; for a group tg:work,max:Alice,email:me@x. |

| Option | What it does |
|---|---|
| `--defaults` | change what every profile gets, rather than this profile. |

**Example:** `hubspot personal config set limit 20`

### `hubspot config unset`

remove a setting from the configuration file

**Changes something on this computer only.**

```sh
hubspot config unset <setting> [options]
```

| Argument | | What it is |
|---|---|---|
| `setting` | required | one of: limit, timeout_ms, color, record, record_input, keep_runs_for_days, keep_successful_runs_for_days, keep_store_runs_for_days, runs_size_limit_mb, permissions, requests_per_minute, search_reranker, embedding_provider, embedding_model, embedding_base_url, embedding_dims, models, update_check, skill_hint, search_stemmers.cyrillic, search_stemmers.latin, owner_languages, crm.<provider>:<account>.links, crm.<provider>:<account>.company-types, crm.<provider>:<account>.scope, crm.<provider>:<account>.unassigned, crm.<provider>:<account>.self, crm.<provider>:<account>.stage-tasks, crm.<provider>:<account>.activities. |

| Option | What it does |
|---|---|
| `--defaults` | change what every profile gets, rather than this profile. |

**Example:** `hubspot personal config unset limit`

### `hubspot config migrate`

write each setting the file lacks at its default, keeping yours

**Changes something on this computer only.**

```sh
hubspot config migrate
```

**Example:** `hubspot config migrate`

### `hubspot config repair`

fix broken JSON syntax in the settings file — comments, a missing or extra comma, unquoted keys, single quotes, missing closing brackets at the end — keeping every value, with a backup beside it; refuses anything with more than one reading and changes nothing then

**Changes something on this computer only.**

```sh
hubspot config repair [options]
```

| Option | What it does |
|---|---|
| `--dry-run` | say what it would fix, and change nothing. |

**Example:** `hubspot config repair`, `hubspot config repair --dry-run`

## `hubspot runs`

recorded runs — what this tool did, and when

### `hubspot runs list`

recorded runs, newest first

```sh
hubspot runs list [query] [options]
```

| Argument | | What it is |
|---|---|---|
| `query` | optional | field:value terms that narrow the list — the fields are below. |

| Option | What it does |
|---|---|
| `--limit <n>` | how many to show. |
| `--page <n>` | which page, starting at 1. |

**Returns:** run — run_id, command, started_at, status, cli_version, profile, completed_at, requests, and 23 more; every field: hubspot commands info runs list

**Example:** `hubspot personal runs list --limit 10`

### `hubspot runs show`

one run: what it was, how it ended, and every event it logged

```sh
hubspot runs show <run-id> [options]
```

| Argument | | What it is |
|---|---|---|
| `run-id` | required | an id from `hubspot runs list`. |

| Option | What it does |
|---|---|
| `--problems` | only failed responses, warnings and crashes. |

**Returns:** run details — run_id, command, started_at, status, cli_version, directory, event_count, events, and 22 more; every field: hubspot commands info runs show

**Example:** `hubspot personal runs show run-101`

### `hubspot runs path`

the directory holding one run

```sh
hubspot runs path <run-id>
```

| Argument | | What it is |
|---|---|---|
| `run-id` | required | an id from `hubspot runs list`. |

**Returns:** run location — path; every field: hubspot commands info runs path

**Example:** `hubspot personal runs path run-101`

## Exit codes

Branch on the code, not on the text: the text can change, the code does not.

| Code | When |
|---|---|
| `0` | it worked |
| `2` | `validation_error` |
| `3` | `configuration_error` |
| `4` | `authentication_error` |
| `5` | `permission_error` |
| `6` | `not_found` |
| `7` | `confirmation_required` |
| `8` | `rate_limited` |
| `9` | `timeout` |
| `10` | `network_error` |
| `11` | `provider_error` |
| `12` | `provider_unavailable` |
| `13` | `invalid_response` |
| `14` | `outcome_unknown` |
| `15` | `conflict` |
| `130` | `cancelled` |
| `1` | anything else |
