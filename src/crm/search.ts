import { CliError } from "@wirecat/cli-base"
import { SERVICE } from "../hubspot/transport.js"
import { msOf, nextOf, propertiesOf, type Raw, resultsOf } from "./records.js"

/** The search guide: 200 rows a page, 10,000 results a query (400 past it), 5 groups, 6 filters each, 18 in all. */
export const SEARCH_PAGE = 200
export const SEARCH_CAP = 10_000
export const MAX_FILTERS_PER_GROUP = 6

export interface Filter {
  propertyName: string
  operator: string
  value?: string
  values?: string[]
}

export interface SearchRequest {
  filters: Filter[]
  sort: { propertyName: string; direction: "ASCENDING" | "DESCENDING" }
  properties: readonly string[]
  limit: number
  offset: number
  query?: string
}

export type Post = (path: string, body: Record<string, unknown>) => Promise<unknown>

/**
 * One search page. `sorts` takes objects as the search guide shows them; the spec types it as strings. `after` is the
 * offset as an integer string (search guide, paging), sent only past the first page as the guide's examples do.
 */
export const search = async (post: Post, path: string, request: SearchRequest) => {
  if (request.filters.length > MAX_FILTERS_PER_GROUP)
    throw new CliError(
      "validation_error",
      `${SERVICE} search takes at most ${MAX_FILTERS_PER_GROUP} conditions together; drop some`,
      { reason: "hubspot.too-many-filters" },
    )
  if (request.offset + request.limit > SEARCH_CAP)
    throw new CliError(
      "validation_error",
      `${SERVICE} search reaches only its first ${SEARCH_CAP} results; narrow the query`,
      { reason: "hubspot.search-cap" },
    )
  const body = await post(`/crm/objects/2026-03/${path}/search`, {
    filterGroups: request.filters.length ? [{ filters: request.filters }] : [],
    sorts: [request.sort],
    properties: [...request.properties],
    limit: request.limit,
    ...(request.offset ? { after: String(request.offset) } : {}),
    ...(request.query ? { query: request.query } : {}),
  })
  return { rows: resultsOf(body), more: nextOf(body) !== null }
}

/** Where a round of changes stands: rows modified at or after `from`, the first `offset` of them read. */
export interface Spot {
  from: number
  offset: number
}

/**
 * The next spot after a page sorted by modified time. Keyset, not the search's own offset: a row changed mid-round
 * moves to the end, and an offset would then skip the row after it. Rows at the boundary time are read twice. A page
 * that is all one time (a mass import) moves by offset inside it; past the cap, `null`.
 */
export const nextSpot = (spot: Spot, rows: readonly Raw[], modified: string, limit: number): Spot | null => {
  const last = rows.at(-1)
  const at = last ? (msOf(propertiesOf(last)[modified]) ?? msOf(last.updatedAt)) : null
  if (at !== null && at > spot.from) return { from: at, offset: 0 }
  const offset = spot.offset + rows.length
  return offset + limit > SEARCH_CAP ? null : { from: spot.from, offset }
}

export const modifiedSince = (modified: string, spot: Spot, limit: number, properties: readonly string[]) =>
  ({
    filters: [{ propertyName: modified, operator: "GTE", value: String(spot.from) }],
    sort: { propertyName: modified, direction: "ASCENDING" },
    properties,
    limit,
    offset: spot.offset,
  }) satisfies SearchRequest
