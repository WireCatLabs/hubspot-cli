<!--
GENERATED. DO NOT EDIT.
Source: spec/hubspot/, checked against provenance.json
Run: pnpm generate
-->

# API coverage

157 operations from openapi 1.

| Operation | Call | Command | Effect | Request source | Status | Summary |
|---|---|---|---|---|---|---|
| `get-/crm/objects/2026-03/contacts_getPage` | `GET /crm/objects/2026-03/contacts` | `hubspot <profile> api contacts-list` | read | — | generated | Retrieve contacts |
| `post-/crm/objects/2026-03/contacts_create` | `POST /crm/objects/2026-03/contacts` | `hubspot <profile> api contacts-create` | write | contract | generated | Create a contact |
| `post-/crm/objects/2026-03/contacts/batch/archive_archive` | `POST /crm/objects/2026-03/contacts/batch/archive` | `hubspot <profile> api contacts-batch-archive` | destructive | contract | generated | Archive a batch of contacts |
| `post-/crm/objects/2026-03/contacts/batch/create_create` | `POST /crm/objects/2026-03/contacts/batch/create` | `hubspot <profile> api contacts-batch-create` | write | contract | generated | Create a batch of contacts |
| `post-/crm/objects/2026-03/contacts/batch/read_read` | `POST /crm/objects/2026-03/contacts/batch/read` | `hubspot <profile> api contacts-batch-read` | write | contract | generated | Retrieve a batch of contacts |
| `post-/crm/objects/2026-03/contacts/batch/update_update` | `POST /crm/objects/2026-03/contacts/batch/update` | `hubspot <profile> api contacts-batch-update` | write | contract | generated | Update a batch of contacts |
| `post-/crm/objects/2026-03/contacts/batch/upsert_upsert` | `POST /crm/objects/2026-03/contacts/batch/upsert` | `hubspot <profile> api contacts-batch-upsert` | write | contract | generated | Create or update a batch of contacts |
| `post-/crm/objects/2026-03/contacts/gdpr-delete_purge` | `POST /crm/objects/2026-03/contacts/gdpr-delete` | `hubspot <profile> api contacts-gdpr-delete` | destructive | contract | generated | Permanently delete a contact (GDPR-compliant) |
| `post-/crm/objects/2026-03/contacts/merge_merge` | `POST /crm/objects/2026-03/contacts/merge` | `hubspot <profile> api contacts-merge` | destructive | contract | generated | Merge two contacts |
| `post-/crm/objects/2026-03/contacts/search_doSearch` | `POST /crm/objects/2026-03/contacts/search` | `hubspot <profile> api contacts-search` | read | contract | generated | Search for contacts |
| `get-/crm/objects/2026-03/contacts/{contactId}_getById` | `GET /crm/objects/2026-03/contacts/{contactId}` | `hubspot <profile> api contacts-get` | read | — | generated | Retrieve a contact |
| `patch-/crm/objects/2026-03/contacts/{contactId}_update` | `PATCH /crm/objects/2026-03/contacts/{contactId}` | `hubspot <profile> api contacts-update` | write | contract | generated | Update a contact |
| `delete-/crm/objects/2026-03/contacts/{contactId}_archive` | `DELETE /crm/objects/2026-03/contacts/{contactId}` | `hubspot <profile> api contacts-delete` | destructive | — | generated | Archive a contact |
| `put-/crm/objects/2026-03/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId}_/crm/objects/2026-03/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId}` | `PUT /crm/objects/2026-03/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId}` | `hubspot <profile> api associations-default-replace` | write | — | generated |  |
| `put-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}_/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}` | `PUT /crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}` | `hubspot <profile> api associations-replace` | write | contract | generated |  |
| `delete-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}_/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}` | `DELETE /crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}` | `hubspot <profile> api associations-delete` | destructive | — | generated |  |
| `get-/crm/objects/2026-03/companies_getPage` | `GET /crm/objects/2026-03/companies` | `hubspot <profile> api companies-list` | read | — | generated | Retrieve companies |
| `post-/crm/objects/2026-03/companies_create` | `POST /crm/objects/2026-03/companies` | `hubspot <profile> api companies-create` | write | contract | generated | Create a company |
| `post-/crm/objects/2026-03/companies/batch/archive_archive` | `POST /crm/objects/2026-03/companies/batch/archive` | `hubspot <profile> api companies-batch-archive` | destructive | contract | generated | Archive a batch of companies |
| `post-/crm/objects/2026-03/companies/batch/create_create` | `POST /crm/objects/2026-03/companies/batch/create` | `hubspot <profile> api companies-batch-create` | write | contract | generated | Create a batch of companies |
| `post-/crm/objects/2026-03/companies/batch/read_read` | `POST /crm/objects/2026-03/companies/batch/read` | `hubspot <profile> api companies-batch-read` | write | contract | generated | Retrieve a batch of companies |
| `post-/crm/objects/2026-03/companies/batch/update_update` | `POST /crm/objects/2026-03/companies/batch/update` | `hubspot <profile> api companies-batch-update` | write | contract | generated | Update a batch of companies |
| `post-/crm/objects/2026-03/companies/batch/upsert_upsert` | `POST /crm/objects/2026-03/companies/batch/upsert` | `hubspot <profile> api companies-batch-upsert` | write | contract | generated | Create or update a batch of companies by unique property values |
| `post-/crm/objects/2026-03/companies/merge_merge` | `POST /crm/objects/2026-03/companies/merge` | `hubspot <profile> api companies-merge` | destructive | contract | generated | Merge two companies |
| `post-/crm/objects/2026-03/companies/search_doSearch` | `POST /crm/objects/2026-03/companies/search` | `hubspot <profile> api companies-search` | read | contract | generated | Search for companies |
| `get-/crm/objects/2026-03/companies/{companyId}_getById` | `GET /crm/objects/2026-03/companies/{companyId}` | `hubspot <profile> api companies-get` | read | — | generated | Retrieve a company |
| `patch-/crm/objects/2026-03/companies/{companyId}_update` | `PATCH /crm/objects/2026-03/companies/{companyId}` | `hubspot <profile> api companies-update` | write | contract | generated | Update a company |
| `delete-/crm/objects/2026-03/companies/{companyId}_archive` | `DELETE /crm/objects/2026-03/companies/{companyId}` | `hubspot <profile> api companies-delete` | destructive | — | generated | Archive a company |
| `get-/crm/objects/2026-03/0-3_getPage` | `GET /crm/objects/2026-03/0-3` | `hubspot <profile> api deals-list` | read | — | generated | List |
| `post-/crm/objects/2026-03/0-3_create` | `POST /crm/objects/2026-03/0-3` | `hubspot <profile> api deals-create` | write | contract | generated | Create |
| `post-/crm/objects/2026-03/0-3/batch/archive_archive` | `POST /crm/objects/2026-03/0-3/batch/archive` | `hubspot <profile> api deals-batch-archive` | destructive | contract | generated | Archive a batch of deals by ID |
| `post-/crm/objects/2026-03/0-3/batch/create_create` | `POST /crm/objects/2026-03/0-3/batch/create` | `hubspot <profile> api deals-batch-create` | write | contract | generated | Create a batch of deals |
| `post-/crm/objects/2026-03/0-3/batch/read_read` | `POST /crm/objects/2026-03/0-3/batch/read` | `hubspot <profile> api deals-batch-read` | write | contract | generated | Read a batch of deals by internal ID, or unique property values |
| `post-/crm/objects/2026-03/0-3/batch/update_update` | `POST /crm/objects/2026-03/0-3/batch/update` | `hubspot <profile> api deals-batch-update` | write | contract | generated | Update a batch of deals by internal ID, or unique property values |
| `post-/crm/objects/2026-03/0-3/batch/upsert_upsert` | `POST /crm/objects/2026-03/0-3/batch/upsert` | `hubspot <profile> api deals-batch-upsert` | write | contract | generated | Create or update a batch of deals by unique property values |
| `post-/crm/objects/2026-03/0-3/merge_merge` | `POST /crm/objects/2026-03/0-3/merge` | `hubspot <profile> api deals-merge` | destructive | contract | generated | Merge two deals with same type |
| `post-/crm/objects/2026-03/0-3/search_doSearch` | `POST /crm/objects/2026-03/0-3/search` | `hubspot <profile> api deals-search` | read | contract | generated | Search for deals using various filters and criteria to retrieve specific records. |
| `get-/crm/objects/2026-03/0-3/{dealId}_getById` | `GET /crm/objects/2026-03/0-3/{dealId}` | `hubspot <profile> api deals-get` | read | — | generated | Read |
| `patch-/crm/objects/2026-03/0-3/{dealId}_update` | `PATCH /crm/objects/2026-03/0-3/{dealId}` | `hubspot <profile> api deals-update` | write | contract | generated | Update |
| `delete-/crm/objects/2026-03/0-3/{dealId}_archive` | `DELETE /crm/objects/2026-03/0-3/{dealId}` | `hubspot <profile> api deals-delete` | destructive | — | generated | Archive |
| `get-/crm/objects/2026-03/tickets_getPage` | `GET /crm/objects/2026-03/tickets` | `hubspot <profile> api tickets-list` | read | — | generated | List |
| `post-/crm/objects/2026-03/tickets_create` | `POST /crm/objects/2026-03/tickets` | `hubspot <profile> api tickets-create` | write | contract | generated | Create |
| `post-/crm/objects/2026-03/tickets/batch/archive_archive` | `POST /crm/objects/2026-03/tickets/batch/archive` | `hubspot <profile> api tickets-batch-archive` | destructive | contract | generated | Archive a batch of tickets by ID |
| `post-/crm/objects/2026-03/tickets/batch/create_create` | `POST /crm/objects/2026-03/tickets/batch/create` | `hubspot <profile> api tickets-batch-create` | write | contract | generated | Create a batch of tickets |
| `post-/crm/objects/2026-03/tickets/batch/read_read` | `POST /crm/objects/2026-03/tickets/batch/read` | `hubspot <profile> api tickets-batch-read` | write | contract | generated | Read a batch of tickets by internal ID, or unique property values |
| `post-/crm/objects/2026-03/tickets/batch/update_update` | `POST /crm/objects/2026-03/tickets/batch/update` | `hubspot <profile> api tickets-batch-update` | write | contract | generated | Update a batch of tickets by internal ID, or unique property values |
| `post-/crm/objects/2026-03/tickets/batch/upsert_upsert` | `POST /crm/objects/2026-03/tickets/batch/upsert` | `hubspot <profile> api tickets-batch-upsert` | write | contract | generated | Create or update a batch of tickets by unique property values |
| `post-/crm/objects/2026-03/tickets/merge_merge` | `POST /crm/objects/2026-03/tickets/merge` | `hubspot <profile> api tickets-merge` | destructive | contract | generated | Merge two tickets |
| `post-/crm/objects/2026-03/tickets/search_doSearch` | `POST /crm/objects/2026-03/tickets/search` | `hubspot <profile> api tickets-search` | read | contract | generated | Search for tickets |
| `get-/crm/objects/2026-03/tickets/{ticketId}_getById` | `GET /crm/objects/2026-03/tickets/{ticketId}` | `hubspot <profile> api tickets-get` | read | — | generated | Read |
| `patch-/crm/objects/2026-03/tickets/{ticketId}_update` | `PATCH /crm/objects/2026-03/tickets/{ticketId}` | `hubspot <profile> api tickets-update` | write | contract | generated | Update |
| `delete-/crm/objects/2026-03/tickets/{ticketId}_archive` | `DELETE /crm/objects/2026-03/tickets/{ticketId}` | `hubspot <profile> api tickets-delete` | destructive | — | generated | Archive |
| `get-/crm/objects/2026-03/leads_getPage` | `GET /crm/objects/2026-03/leads` | `hubspot <profile> api leads-list` | read | — | generated | List |
| `post-/crm/objects/2026-03/leads_create` | `POST /crm/objects/2026-03/leads` | `hubspot <profile> api leads-create` | write | contract | generated | Create |
| `post-/crm/objects/2026-03/leads/batch/archive_archive` | `POST /crm/objects/2026-03/leads/batch/archive` | `hubspot <profile> api leads-batch-archive` | destructive | contract | generated | Archive a batch of leads by ID |
| `post-/crm/objects/2026-03/leads/batch/create_create` | `POST /crm/objects/2026-03/leads/batch/create` | `hubspot <profile> api leads-batch-create` | write | contract | generated | Create a batch of leads |
| `post-/crm/objects/2026-03/leads/batch/read_read` | `POST /crm/objects/2026-03/leads/batch/read` | `hubspot <profile> api leads-batch-read` | write | contract | generated | Read a batch of leads by internal ID, or unique property values |
| `post-/crm/objects/2026-03/leads/batch/update_update` | `POST /crm/objects/2026-03/leads/batch/update` | `hubspot <profile> api leads-batch-update` | write | contract | generated | Update a batch of leads by internal ID, or unique property values |
| `post-/crm/objects/2026-03/leads/batch/upsert_upsert` | `POST /crm/objects/2026-03/leads/batch/upsert` | `hubspot <profile> api leads-batch-upsert` | write | contract | generated | Create or update a batch of leads by unique property values |
| `post-/crm/objects/2026-03/leads/search_doSearch` | `POST /crm/objects/2026-03/leads/search` | `hubspot <profile> api leads-search` | read | contract | generated | Search for leads using specified criteria. |
| `get-/crm/objects/2026-03/leads/{leadsId}_getById` | `GET /crm/objects/2026-03/leads/{leadsId}` | `hubspot <profile> api leads-get` | read | — | generated | Read |
| `patch-/crm/objects/2026-03/leads/{leadsId}_update` | `PATCH /crm/objects/2026-03/leads/{leadsId}` | `hubspot <profile> api leads-update` | write | contract | generated | Update |
| `delete-/crm/objects/2026-03/leads/{leadsId}_archive` | `DELETE /crm/objects/2026-03/leads/{leadsId}` | `hubspot <profile> api leads-delete` | destructive | — | generated | Archive |
| `get-/crm/objects/2026-03/notes_getPage` | `GET /crm/objects/2026-03/notes` | `hubspot <profile> api notes-list` | read | — | generated | List |
| `post-/crm/objects/2026-03/notes_create` | `POST /crm/objects/2026-03/notes` | `hubspot <profile> api notes-create` | write | contract | generated | Create |
| `post-/crm/objects/2026-03/notes/batch/archive_archive` | `POST /crm/objects/2026-03/notes/batch/archive` | `hubspot <profile> api notes-batch-archive` | destructive | contract | generated | Archive a batch of notes by ID |
| `post-/crm/objects/2026-03/notes/batch/create_create` | `POST /crm/objects/2026-03/notes/batch/create` | `hubspot <profile> api notes-batch-create` | write | contract | generated | Create a batch of notes |
| `post-/crm/objects/2026-03/notes/batch/read_read` | `POST /crm/objects/2026-03/notes/batch/read` | `hubspot <profile> api notes-batch-read` | write | contract | generated | Read a batch of notes by internal ID, or unique property values |
| `post-/crm/objects/2026-03/notes/batch/update_update` | `POST /crm/objects/2026-03/notes/batch/update` | `hubspot <profile> api notes-batch-update` | write | contract | generated | Update a batch of notes by internal ID, or unique property values |
| `post-/crm/objects/2026-03/notes/batch/upsert_upsert` | `POST /crm/objects/2026-03/notes/batch/upsert` | `hubspot <profile> api notes-batch-upsert` | write | contract | generated | Create or update a batch of notes by unique property values |
| `post-/crm/objects/2026-03/notes/search_doSearch` | `POST /crm/objects/2026-03/notes/search` | `hubspot <profile> api notes-search` | read | contract | generated | Search for notes based on specified criteria. |
| `get-/crm/objects/2026-03/notes/{noteId}_getById` | `GET /crm/objects/2026-03/notes/{noteId}` | `hubspot <profile> api notes-get` | read | — | generated | Read |
| `patch-/crm/objects/2026-03/notes/{noteId}_update` | `PATCH /crm/objects/2026-03/notes/{noteId}` | `hubspot <profile> api notes-update` | write | contract | generated | Update |
| `delete-/crm/objects/2026-03/notes/{noteId}_archive` | `DELETE /crm/objects/2026-03/notes/{noteId}` | `hubspot <profile> api notes-delete` | destructive | — | generated | Archive |
| `get-/crm/objects/2026-03/calls_getPage` | `GET /crm/objects/2026-03/calls` | `hubspot <profile> api calls-list` | read | — | generated | List |
| `post-/crm/objects/2026-03/calls_create` | `POST /crm/objects/2026-03/calls` | `hubspot <profile> api calls-create` | write | contract | generated | Create |
| `post-/crm/objects/2026-03/calls/batch/archive_archive` | `POST /crm/objects/2026-03/calls/batch/archive` | `hubspot <profile> api calls-batch-archive` | destructive | contract | generated | Archive a batch of calls by ID |
| `post-/crm/objects/2026-03/calls/batch/create_create` | `POST /crm/objects/2026-03/calls/batch/create` | `hubspot <profile> api calls-batch-create` | write | contract | generated | Create a batch of calls |
| `post-/crm/objects/2026-03/calls/batch/read_read` | `POST /crm/objects/2026-03/calls/batch/read` | `hubspot <profile> api calls-batch-read` | write | contract | generated | Read a batch of calls by internal ID, or unique property values |
| `post-/crm/objects/2026-03/calls/batch/update_update` | `POST /crm/objects/2026-03/calls/batch/update` | `hubspot <profile> api calls-batch-update` | write | contract | generated | Update a batch of calls by internal ID, or unique property values |
| `post-/crm/objects/2026-03/calls/batch/upsert_upsert` | `POST /crm/objects/2026-03/calls/batch/upsert` | `hubspot <profile> api calls-batch-upsert` | write | contract | generated | Create or update a batch of calls by unique property values |
| `post-/crm/objects/2026-03/calls/search_doSearch` | `POST /crm/objects/2026-03/calls/search` | `hubspot <profile> api calls-search` | read | contract | generated | Search for calls |
| `get-/crm/objects/2026-03/calls/{callId}_getById` | `GET /crm/objects/2026-03/calls/{callId}` | `hubspot <profile> api calls-get` | read | — | generated | Read |
| `patch-/crm/objects/2026-03/calls/{callId}_update` | `PATCH /crm/objects/2026-03/calls/{callId}` | `hubspot <profile> api calls-update` | write | contract | generated | Update |
| `delete-/crm/objects/2026-03/calls/{callId}_archive` | `DELETE /crm/objects/2026-03/calls/{callId}` | `hubspot <profile> api calls-delete` | destructive | — | generated | Archive |
| `get-/crm/objects/2026-03/emails_getPage` | `GET /crm/objects/2026-03/emails` | `hubspot <profile> api emails-list` | read | — | generated | List |
| `post-/crm/objects/2026-03/emails_create` | `POST /crm/objects/2026-03/emails` | `hubspot <profile> api emails-create` | write | contract | generated | Create |
| `post-/crm/objects/2026-03/emails/batch/archive_archive` | `POST /crm/objects/2026-03/emails/batch/archive` | `hubspot <profile> api emails-batch-archive` | destructive | contract | generated | Archive a batch of emails by ID |
| `post-/crm/objects/2026-03/emails/batch/create_create` | `POST /crm/objects/2026-03/emails/batch/create` | `hubspot <profile> api emails-batch-create` | write | contract | generated | Create a batch of emails |
| `post-/crm/objects/2026-03/emails/batch/read_read` | `POST /crm/objects/2026-03/emails/batch/read` | `hubspot <profile> api emails-batch-read` | write | contract | generated | Read a batch of emails by internal ID, or unique property values |
| `post-/crm/objects/2026-03/emails/batch/update_update` | `POST /crm/objects/2026-03/emails/batch/update` | `hubspot <profile> api emails-batch-update` | write | contract | generated | Update a batch of emails by internal ID, or unique property values |
| `post-/crm/objects/2026-03/emails/batch/upsert_upsert` | `POST /crm/objects/2026-03/emails/batch/upsert` | `hubspot <profile> api emails-batch-upsert` | write | contract | generated | Create or update a batch of emails by unique property values |
| `post-/crm/objects/2026-03/emails/search_doSearch` | `POST /crm/objects/2026-03/emails/search` | `hubspot <profile> api emails-search` | read | contract | generated | Search for emails using specified criteria and filters. |
| `get-/crm/objects/2026-03/emails/{emailId}_getById` | `GET /crm/objects/2026-03/emails/{emailId}` | `hubspot <profile> api emails-get` | read | — | generated | Read |
| `patch-/crm/objects/2026-03/emails/{emailId}_update` | `PATCH /crm/objects/2026-03/emails/{emailId}` | `hubspot <profile> api emails-update` | write | contract | generated | Update |
| `delete-/crm/objects/2026-03/emails/{emailId}_archive` | `DELETE /crm/objects/2026-03/emails/{emailId}` | `hubspot <profile> api emails-delete` | destructive | — | generated | Archive |
| `get-/crm/objects/2026-03/meetings_getPage` | `GET /crm/objects/2026-03/meetings` | `hubspot <profile> api meetings-list` | read | — | generated | List |
| `post-/crm/objects/2026-03/meetings_create` | `POST /crm/objects/2026-03/meetings` | `hubspot <profile> api meetings-create` | write | contract | generated | Create |
| `post-/crm/objects/2026-03/meetings/batch/archive_archive` | `POST /crm/objects/2026-03/meetings/batch/archive` | `hubspot <profile> api meetings-batch-archive` | destructive | contract | generated | Archive a batch of meetings by ID |
| `post-/crm/objects/2026-03/meetings/batch/create_create` | `POST /crm/objects/2026-03/meetings/batch/create` | `hubspot <profile> api meetings-batch-create` | write | contract | generated | Create a batch of meetings |
| `post-/crm/objects/2026-03/meetings/batch/read_read` | `POST /crm/objects/2026-03/meetings/batch/read` | `hubspot <profile> api meetings-batch-read` | write | contract | generated | Read a batch of meetings by internal ID, or unique property values |
| `post-/crm/objects/2026-03/meetings/batch/update_update` | `POST /crm/objects/2026-03/meetings/batch/update` | `hubspot <profile> api meetings-batch-update` | write | contract | generated | Update a batch of meetings by internal ID, or unique property values |
| `post-/crm/objects/2026-03/meetings/batch/upsert_upsert` | `POST /crm/objects/2026-03/meetings/batch/upsert` | `hubspot <profile> api meetings-batch-upsert` | write | contract | generated | Create or update a batch of meetings by unique property values |
| `post-/crm/objects/2026-03/meetings/search_doSearch` | `POST /crm/objects/2026-03/meetings/search` | `hubspot <profile> api meetings-search` | read | contract | generated | Search for meetings |
| `get-/crm/objects/2026-03/meetings/{meetingId}_getById` | `GET /crm/objects/2026-03/meetings/{meetingId}` | `hubspot <profile> api meetings-get` | read | — | generated | Read |
| `patch-/crm/objects/2026-03/meetings/{meetingId}_update` | `PATCH /crm/objects/2026-03/meetings/{meetingId}` | `hubspot <profile> api meetings-update` | write | contract | generated | Update |
| `delete-/crm/objects/2026-03/meetings/{meetingId}_archive` | `DELETE /crm/objects/2026-03/meetings/{meetingId}` | `hubspot <profile> api meetings-delete` | destructive | — | generated | Archive |
| `get-/crm/objects/2026-03/tasks_getPage` | `GET /crm/objects/2026-03/tasks` | `hubspot <profile> api tasks-list` | read | — | generated | List |
| `post-/crm/objects/2026-03/tasks_create` | `POST /crm/objects/2026-03/tasks` | `hubspot <profile> api tasks-create` | write | contract | generated | Create |
| `post-/crm/objects/2026-03/tasks/batch/archive_archive` | `POST /crm/objects/2026-03/tasks/batch/archive` | `hubspot <profile> api tasks-batch-archive` | destructive | contract | generated | Archive a batch of tasks by ID |
| `post-/crm/objects/2026-03/tasks/batch/create_create` | `POST /crm/objects/2026-03/tasks/batch/create` | `hubspot <profile> api tasks-batch-create` | write | contract | generated | Create a batch of tasks |
| `post-/crm/objects/2026-03/tasks/batch/read_read` | `POST /crm/objects/2026-03/tasks/batch/read` | `hubspot <profile> api tasks-batch-read` | write | contract | generated | Read a batch of tasks by internal ID, or unique property values |
| `post-/crm/objects/2026-03/tasks/batch/update_update` | `POST /crm/objects/2026-03/tasks/batch/update` | `hubspot <profile> api tasks-batch-update` | write | contract | generated | Update a batch of tasks by internal ID, or unique property values |
| `post-/crm/objects/2026-03/tasks/batch/upsert_upsert` | `POST /crm/objects/2026-03/tasks/batch/upsert` | `hubspot <profile> api tasks-batch-upsert` | write | contract | generated | Create or update a batch of tasks by unique property values |
| `post-/crm/objects/2026-03/tasks/search_doSearch` | `POST /crm/objects/2026-03/tasks/search` | `hubspot <profile> api tasks-search` | read | contract | generated | Search for tasks using specified criteria. |
| `get-/crm/objects/2026-03/tasks/{taskId}_getById` | `GET /crm/objects/2026-03/tasks/{taskId}` | `hubspot <profile> api tasks-get` | read | — | generated | Read |
| `patch-/crm/objects/2026-03/tasks/{taskId}_update` | `PATCH /crm/objects/2026-03/tasks/{taskId}` | `hubspot <profile> api tasks-update` | write | contract | generated | Update |
| `delete-/crm/objects/2026-03/tasks/{taskId}_archive` | `DELETE /crm/objects/2026-03/tasks/{taskId}` | `hubspot <profile> api tasks-delete` | destructive | — | generated | Archive |
| `get-/crm/owners/2026-03_/crm/owners/v3` | `GET /crm/owners/2026-03` | `hubspot <profile> api owners-list` | read | — | generated | List owners |
| `get-/crm/owners/2026-03/{ownerId}_getById` | `GET /crm/owners/2026-03/{ownerId}` | `hubspot <profile> api owners-get` | read | — | generated | Retrieve a specific owner by ID |
| `get-/crm/pipelines/2026-03/{objectType}_getAll` | `GET /crm/pipelines/2026-03/{objectType}` | `hubspot <profile> api pipelines-list` | read | — | generated | Retrieve all pipelines |
| `post-/crm/pipelines/2026-03/{objectType}_create` | `POST /crm/pipelines/2026-03/{objectType}` | `hubspot <profile> api pipelines-create` | write | contract | generated | Create a pipeline |
| `get-/crm/pipelines/2026-03/{objectType}/{pipelineId}_getById` | `GET /crm/pipelines/2026-03/{objectType}/{pipelineId}` | `hubspot <profile> api pipelines-get` | read | — | generated | Return a pipeline by ID |
| `put-/crm/pipelines/2026-03/{objectType}/{pipelineId}_replace` | `PUT /crm/pipelines/2026-03/{objectType}/{pipelineId}` | `hubspot <profile> api pipelines-replace` | write | contract | generated | Replace a pipeline |
| `patch-/crm/pipelines/2026-03/{objectType}/{pipelineId}_update` | `PATCH /crm/pipelines/2026-03/{objectType}/{pipelineId}` | `hubspot <profile> api pipelines-update` | write | contract | generated | Perform a partial update of the pipeline identified by pipelineId. |
| `delete-/crm/pipelines/2026-03/{objectType}/{pipelineId}_archive` | `DELETE /crm/pipelines/2026-03/{objectType}/{pipelineId}` | `hubspot <profile> api pipelines-delete` | destructive | — | generated | Delete a pipeline |
| `get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/audit_getAudit` | `GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/audit` | `hubspot <profile> api pipelines-audit-list` | read | — | generated | Return an audit of all changes to the pipeline |
| `get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages_getAll` | `GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages` | `hubspot <profile> api pipelines-stages-list` | read | — | generated | Return all stages of a pipeline |
| `post-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages_create` | `POST /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages` | `hubspot <profile> api pipelines-stages-create` | write | contract | generated | Create a pipeline stage |
| `get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_getById` | `GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}` | `hubspot <profile> api pipelines-stages-get` | read | — | generated | Return a pipeline stage by ID |
| `put-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_replace` | `PUT /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}` | `hubspot <profile> api pipelines-stages-replace` | write | contract | generated | Replace a pipeline stage |
| `patch-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_update` | `PATCH /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}` | `hubspot <profile> api pipelines-stages-update` | write | contract | generated | Update specific properties of an existing pipeline stage. |
| `delete-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_archive` | `DELETE /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}` | `hubspot <profile> api pipelines-stages-delete` | destructive | — | generated | Delete a pipeline stage |
| `get-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}/audit_getAudit` | `GET /crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}/audit` | `hubspot <profile> api pipelines-stages-audit-list` | read | — | generated | Retrieve a reverse chronological list of all changes made to a specific pipeline stage. |
| `get-/crm/properties/2026-03/{objectType}_/crm/properties/2025-09/{objectType}` | `GET /crm/properties/2026-03/{objectType}` | `hubspot <profile> api properties-list` | read | — | generated | Read all properties |
| `post-/crm/properties/2026-03/{objectType}_/crm/properties/2025-09/{objectType}` | `POST /crm/properties/2026-03/{objectType}` | `hubspot <profile> api properties-create` | write | contract | generated | Create a property |
| `post-/crm/properties/2026-03/{objectType}/batch/archive_/crm/properties/2025-09/{objectType}/batch/archive` | `POST /crm/properties/2026-03/{objectType}/batch/archive` | `hubspot <profile> api properties-batch-archive` | destructive | contract | generated | Archive a batch of properties |
| `post-/crm/properties/2026-03/{objectType}/batch/create_/crm/properties/2025-09/{objectType}/batch/create` | `POST /crm/properties/2026-03/{objectType}/batch/create` | `hubspot <profile> api properties-batch-create` | write | contract | generated | Create a batch of properties |
| `post-/crm/properties/2026-03/{objectType}/batch/read_/crm/properties/2025-09/{objectType}/batch/read` | `POST /crm/properties/2026-03/{objectType}/batch/read` | `hubspot <profile> api properties-batch-read` | write | contract | generated | Read a batch of properties |
| `get-/crm/properties/2026-03/{objectType}/groups_/crm/properties/2025-09/{objectType}/groups` | `GET /crm/properties/2026-03/{objectType}/groups` | `hubspot <profile> api properties-groups-list` | read | — | generated | Read all property groups |
| `post-/crm/properties/2026-03/{objectType}/groups_/crm/properties/2025-09/{objectType}/groups` | `POST /crm/properties/2026-03/{objectType}/groups` | `hubspot <profile> api properties-groups-create` | write | contract | generated | Create a property group |
| `get-/crm/properties/2026-03/{objectType}/groups/{groupName}_/crm/properties/2025-09/{objectType}/groups/{groupName}` | `GET /crm/properties/2026-03/{objectType}/groups/{groupName}` | `hubspot <profile> api properties-groups-get` | read | — | generated | Read a property group |
| `patch-/crm/properties/2026-03/{objectType}/groups/{groupName}_/crm/properties/2025-09/{objectType}/groups/{groupName}` | `PATCH /crm/properties/2026-03/{objectType}/groups/{groupName}` | `hubspot <profile> api properties-groups-update` | write | contract | generated | Update a property group |
| `delete-/crm/properties/2026-03/{objectType}/groups/{groupName}_/crm/properties/2025-09/{objectType}/groups/{groupName}` | `DELETE /crm/properties/2026-03/{objectType}/groups/{groupName}` | `hubspot <profile> api properties-groups-delete` | destructive | — | generated | Archive a property group |
| `get-/crm/properties/2026-03/{objectType}/{propertyName}_/crm/properties/2025-09/{objectType}/{propertyName}` | `GET /crm/properties/2026-03/{objectType}/{propertyName}` | `hubspot <profile> api properties-get` | read | — | generated | Read a property |
| `patch-/crm/properties/2026-03/{objectType}/{propertyName}_/crm/properties/2025-09/{objectType}/{propertyName}` | `PATCH /crm/properties/2026-03/{objectType}/{propertyName}` | `hubspot <profile> api properties-update` | write | contract | generated | Update a property |
| `delete-/crm/properties/2026-03/{objectType}/{propertyName}_/crm/properties/2025-09/{objectType}/{propertyName}` | `DELETE /crm/properties/2026-03/{objectType}/{propertyName}` | `hubspot <profile> api properties-delete` | destructive | — | generated | Archive a property |
| `post-/crm/associations/2026-03/usage/high-usage-report/{userId}_/crm/associations/2025-09/usage/high-usage-report/{userId}` | `POST /crm/associations/2026-03/usage/high-usage-report/{userId}` | `hubspot <profile> api associations-usage-high-usage-report-update` | write | — | generated | Report high usage |
| `post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/archive_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/archive` | `POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/archive` | `hubspot <profile> api associations-batch-archive` | destructive | contract | generated | Remove associations |
| `post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/associate/default_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/associate/default` | `POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/associate/default` | `hubspot <profile> api associations-batch-associate-default` | write | contract | generated | Create Default Associations |
| `post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/create_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/create` | `POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/create` | `hubspot <profile> api associations-batch-create` | write | contract | generated | Associate records (labelled) |
| `post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/labels/archive_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/labels/archive` | `POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/labels/archive` | `hubspot <profile> api associations-batch-labels-archive` | destructive | contract | generated | Delete Specific Labels |
| `post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/read_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/read` | `POST /crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/read` | `hubspot <profile> api associations-batch-read` | write | contract | generated | Retrieve associations |
| `post-/crm/objects/2026-03/{objectType}/search_/crm/objects/2025-09/{objectType}/search` | `POST /crm/objects/2026-03/{objectType}/search` | `hubspot <profile> api search` | read | contract | generated |  |
| `get-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}_/crm/objects/2025-09/{objectType}/{objectId}/associations/{toObjectType}` | `GET /crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}` | `hubspot <profile> api associations-get` | read | — | generated | Retrieve all associations by object type |
| `get-/account-info/2026-03/api-usage/daily/private-apps_/account-info/2025-09/api-usage/daily/private-apps` | `GET /account-info/2026-03/api-usage/daily/private-apps` | `hubspot <profile> api account-info-api-usage-daily-private-apps-list` | read | — | generated | Retrieve private app daily API usage |
| `get-/account-info/2026-03/details_/account-info/2025-09/details` | `GET /account-info/2026-03/details` | `hubspot <profile> api account-info-details-list` | read | — | generated | Retrieve account details |

## Effects not taken from the HTTP method

| Operation | Effect | Why |
|---|---|---|
| `post-/crm/objects/2026-03/contacts/batch/archive_archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/contacts/gdpr-delete_purge` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/contacts/merge_merge` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/contacts/search_doSearch` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |
| `post-/crm/objects/2026-03/companies/batch/archive_archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/companies/merge_merge` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/companies/search_doSearch` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |
| `post-/crm/objects/2026-03/0-3/batch/archive_archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/0-3/merge_merge` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/0-3/search_doSearch` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |
| `post-/crm/objects/2026-03/tickets/batch/archive_archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/tickets/merge_merge` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/tickets/search_doSearch` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |
| `post-/crm/objects/2026-03/leads/batch/archive_archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/leads/search_doSearch` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |
| `post-/crm/objects/2026-03/notes/batch/archive_archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/notes/search_doSearch` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |
| `post-/crm/objects/2026-03/calls/batch/archive_archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/calls/search_doSearch` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |
| `post-/crm/objects/2026-03/emails/batch/archive_archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/emails/search_doSearch` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |
| `post-/crm/objects/2026-03/meetings/batch/archive_archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/meetings/search_doSearch` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |
| `post-/crm/objects/2026-03/tasks/batch/archive_archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/tasks/search_doSearch` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |
| `post-/crm/properties/2026-03/{objectType}/batch/archive_/crm/properties/2025-09/{objectType}/batch/archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/archive_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/labels/archive_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/labels/archive` | destructive | override: a POST that archives, erases or merges away records |
| `post-/crm/objects/2026-03/{objectType}/search_/crm/objects/2025-09/{objectType}/search` | read | a POST to a …/search or …/query path only reads (readingPosts rule) |

## Pagination

| Operation | Style | Request | Answer | Source |
|---|---|---|---|---|
| `get-/crm/objects/2026-03/contacts_getPage` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/contacts/search_doSearch` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/objects/2026-03/companies_getPage` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/companies/search_doSearch` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/objects/2026-03/0-3_getPage` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/0-3/search_doSearch` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/objects/2026-03/tickets_getPage` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/tickets/search_doSearch` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/objects/2026-03/leads_getPage` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/leads/search_doSearch` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/objects/2026-03/notes_getPage` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/notes/search_doSearch` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/objects/2026-03/calls_getPage` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/calls/search_doSearch` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/objects/2026-03/emails_getPage` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/emails/search_doSearch` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/objects/2026-03/meetings_getPage` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/meetings/search_doSearch` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/objects/2026-03/tasks_getPage` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/tasks/search_doSearch` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/owners/2026-03_/crm/owners/v3` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |
| `post-/crm/objects/2026-03/{objectType}/search_/crm/objects/2025-09/{objectType}/search` | cursor | body `after`, body `limit` | next `paging.next.after`, items `results` | detected |
| `get-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}_/crm/objects/2025-09/{objectType}/{objectId}/associations/{toObjectType}` | cursor | query `after`, query `limit` | next `paging.next.after`, items `results` | detected |

## Sign-in

Not from the source: a private app token or service key goes in Authorization: Bearer; the specs list only OAuth and the retired hapikey

## Permission keys

| Operation | Key | When |
|---|---|---|
| `post-/crm/objects/2026-03/contacts/batch/archive_archive` | `people.delete` | always |
| `post-/crm/objects/2026-03/contacts/gdpr-delete_purge` | `people.delete` | always |
| `post-/crm/objects/2026-03/contacts/merge_merge` | `people.delete` | always |
| `delete-/crm/objects/2026-03/contacts/{contactId}_archive` | `people.delete` | always |
| `delete-/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}_/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}` | `associations.delete` | always |
| `post-/crm/objects/2026-03/companies/batch/archive_archive` | `organizations.delete` | always |
| `post-/crm/objects/2026-03/companies/merge_merge` | `organizations.delete` | always |
| `delete-/crm/objects/2026-03/companies/{companyId}_archive` | `organizations.delete` | always |
| `post-/crm/objects/2026-03/0-3/batch/archive_archive` | `deals.delete` | always |
| `post-/crm/objects/2026-03/0-3/merge_merge` | `deals.delete` | always |
| `delete-/crm/objects/2026-03/0-3/{dealId}_archive` | `deals.delete` | always |
| `post-/crm/objects/2026-03/tickets/batch/archive_archive` | `tickets.delete` | always |
| `post-/crm/objects/2026-03/tickets/merge_merge` | `tickets.delete` | always |
| `delete-/crm/objects/2026-03/tickets/{ticketId}_archive` | `tickets.delete` | always |
| `post-/crm/objects/2026-03/leads/batch/archive_archive` | `leads.delete` | always |
| `delete-/crm/objects/2026-03/leads/{leadsId}_archive` | `leads.delete` | always |
| `post-/crm/objects/2026-03/notes/batch/archive_archive` | `notes.delete` | always |
| `delete-/crm/objects/2026-03/notes/{noteId}_archive` | `notes.delete` | always |
| `post-/crm/objects/2026-03/calls/batch/archive_archive` | `calls.delete` | always |
| `delete-/crm/objects/2026-03/calls/{callId}_archive` | `calls.delete` | always |
| `post-/crm/objects/2026-03/emails/batch/archive_archive` | `emails.delete` | always |
| `delete-/crm/objects/2026-03/emails/{emailId}_archive` | `emails.delete` | always |
| `post-/crm/objects/2026-03/meetings/batch/archive_archive` | `meetings.delete` | always |
| `delete-/crm/objects/2026-03/meetings/{meetingId}_archive` | `meetings.delete` | always |
| `post-/crm/objects/2026-03/tasks/batch/archive_archive` | `tasks.delete` | always |
| `delete-/crm/objects/2026-03/tasks/{taskId}_archive` | `tasks.delete` | always |
| `delete-/crm/pipelines/2026-03/{objectType}/{pipelineId}_archive` | `pipelines.delete` | always |
| `delete-/crm/pipelines/2026-03/{objectType}/{pipelineId}/stages/{stageId}_archive` | `pipelines.delete` | always |
| `post-/crm/properties/2026-03/{objectType}/batch/archive_/crm/properties/2025-09/{objectType}/batch/archive` | `fields.delete` | always |
| `delete-/crm/properties/2026-03/{objectType}/groups/{groupName}_/crm/properties/2025-09/{objectType}/groups/{groupName}` | `fields.delete` | always |
| `delete-/crm/properties/2026-03/{objectType}/{propertyName}_/crm/properties/2025-09/{objectType}/{propertyName}` | `fields.delete` | always |
| `post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/archive_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/archive` | `associations.delete` | always |
| `post-/crm/associations/2026-03/{fromObjectType}/{toObjectType}/batch/labels/archive_/crm/associations/2025-09/{fromObjectType}/{toObjectType}/batch/labels/archive` | `associations.delete` | always |

## Spec corrections

- patched associations /paths/~1crm~1objects~12026-03~1{fromObjectType}~1{fromObjectId}~1associations~1default~1{toObjectType}~1{toObjectId}/put/operationId: the same operation as in each object spec, whose id names the 2026-03 path, not 2025-09
- patched associations /paths/~1crm~1objects~12026-03~1{objectType}~1{objectId}~1associations~1{toObjectType}~1{toObjectId}/put/operationId: the same operation as in each object spec, whose id names the 2026-03 path, not 2025-09
- patched associations /paths/~1crm~1objects~12026-03~1{objectType}~1{objectId}~1associations~1{toObjectType}~1{toObjectId}/delete/operationId: the same operation as in each object spec, whose id names the 2026-03 path, not 2025-09
- merged: schemas/AssociatedId
- merged: schemas/AssociationSpec
- merged: schemas/BatchInputSimplePublicObjectBatchInput
- merged: schemas/BatchInputSimplePublicObjectBatchInputForCreate
- merged: schemas/BatchInputSimplePublicObjectBatchInputUpsert
- merged: schemas/BatchInputSimplePublicObjectId
- merged: schemas/BatchReadInputSimplePublicObjectId
- merged: schemas/BatchResponsePublicDefaultAssociation
- merged: schemas/BatchResponseSimplePublicObject
- merged: schemas/BatchResponseSimplePublicObjectWithErrors
- merged: schemas/BatchResponseSimplePublicUpsertObject
- merged: schemas/BatchResponseSimplePublicUpsertObjectWithErrors
- merged: schemas/CollectionResponseAssociatedId
- merged: schemas/CollectionResponseSimplePublicObjectWithAssociationsForwardPaging
- merged: schemas/CollectionResponseWithTotalSimplePublicObject
- merged: schemas/Error
- merged: schemas/ErrorDetail
- merged: schemas/Filter
- merged: schemas/FilterGroup
- merged: schemas/ForwardPaging
- merged: schemas/LabelsBetweenObjectPair
- merged: schemas/NextPage
- merged: schemas/Paging
- merged: schemas/PreviousPage
- merged: schemas/PublicAssociationsForObject
- merged: schemas/PublicDefaultAssociation
- merged: schemas/PublicMergeInput
- merged: schemas/PublicObjectId
- merged: schemas/PublicObjectSearchRequest
- merged: schemas/PublicObjectWarning
- merged: schemas/SimplePublicObject
- merged: schemas/SimplePublicObjectBatchInput
- merged: schemas/SimplePublicObjectBatchInputForCreate
- merged: schemas/SimplePublicObjectBatchInputUpsert
- merged: schemas/SimplePublicObjectId
- merged: schemas/SimplePublicObjectInput
- merged: schemas/SimplePublicObjectInputForCreate
- merged: schemas/SimplePublicObjectWithAssociations
- merged: schemas/SimplePublicUpsertObject
- merged: schemas/StandardError
- merged: schemas/ValueWithTimestamp
- merged: responses/Error
- merged: schemas/BatchResponsePublicDefaultAssociation → AssociationsBatchResponsePublicDefaultAssociation (associations)
- patched /components/schemas/PublicObjectSearchRequest/required: HubSpot's search guide (developers.hubspot.com/docs/api-reference/search/guide): a first page is asked without after
- patched /components/schemas/PublicObjectSearchRequest/properties/sorts/items: HubSpot's search guide (developers.hubspot.com/docs/api-reference/search/guide): a sort is {propertyName, direction}, not a string
