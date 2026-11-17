import { crmValues } from "@wirecat/cli-core/crm"
import type { Raw } from "./records.js"
import type { Post } from "./search.js"

const { fieldOf, id, rawsOf } = crmValues

/**
 * The ids each of `ids` is associated with of type `to`, by the associations v4 batch read: search answers carry no
 * associations (search guide). An object with none is left out of the answer. More than one page of associations on
 * one object (`paging.next` inside a result) is not read further.
 */
export const associationsOf = async (post: Post, from: string, to: string, ids: readonly string[]) => {
  const found = new Map<string, string[]>()
  if (!ids.length) return found
  const body = await post(`/crm/associations/2026-03/${from}/${to}/batch/read`, {
    inputs: ids.map((one) => ({ id: one })),
  })
  for (const result of rawsOf(fieldOf(body, "results"))) {
    const owner = id(fieldOf(result.from, "id"))
    if (!owner) continue
    const linked = rawsOf(result.to).flatMap((one) => id(one.toObjectId) ?? [])
    found.set(owner, [...new Set([...(found.get(owner) ?? []), ...linked])])
  }
  return found
}

/** Rows with their associations in the shape a list answers them, so one mapping reads both. */
export const withAssociations = (rows: readonly Raw[], to: string, found: ReadonlyMap<string, string[]>): Raw[] =>
  rows.map((raw) => ({
    ...raw,
    associations: {
      ...(typeof raw.associations === "object" && raw.associations !== null ? raw.associations : {}),
      [to]: { results: (found.get(String(raw.id)) ?? []).map((one) => ({ id: one, type: to })) },
    },
  }))
