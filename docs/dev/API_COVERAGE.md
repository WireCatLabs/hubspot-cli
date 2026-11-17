<!--
GENERATED. DO NOT EDIT.
Source: spec/hubspot/, checked against provenance.json
Run: pnpm generate
-->

# API coverage

5 operations from openapi 1.

| Operation | Call | Command | Effect | Request source | Status | Summary |
|---|---|---|---|---|---|---|
| `listComments` | `GET /comments` | `hubspot <profile> api comments-list` | read | — | generated | List comments, newest first |
| `createComment` | `POST /comments` | `hubspot <profile> api comments-create` | write | contract | generated | Create a comment |
| `getComment` | `GET /comments/{comment_id}` | `hubspot <profile> api comments-get` | read | — | generated | Show one comment |
| `updateComment` | `PATCH /comments/{comment_id}` | `hubspot <profile> api comments-update` | write | contract | generated | Change a comment's text |
| `deleteComment` | `DELETE /comments/{comment_id}` | `hubspot <profile> api comments-delete` | destructive | — | generated | Delete a comment |

## Pagination

| Operation | Style | Request | Answer | Source |
|---|---|---|---|---|
| `listComments` | cursor | query `start_cursor`, query `limit` | next `next_cursor`, items `results`, more `has_more` | detected |

## Permission keys

| Operation | Key | When |
|---|---|---|
| `deleteComment` | `comments.delete` | always |
