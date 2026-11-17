import { crmValues } from "@wirecat/cli-core/crm"
import type { Raw } from "./records.js"
import type { Post } from "./search.js"

const { fieldOf, id, number, rawsOf, text } = crmValues

/** One associated record and how it is associated: HubSpot's type ids and labels (associations v4 guide). */
export interface Associated {
  id: string
  typeIds: number[]
  labels: string[]
}

/**
 * Each of `ids`' associations of type `to`, by the associations v4 batch read: search answers carry none (search
 * guide). An object with none is left out of the answer. More than one page of associations on one object
 * (`paging.next` inside a result) is not read further.
 */
export const associationsOf = async (post: Post, from: string, to: string, ids: readonly string[]) => {
  const found = new Map<string, Associated[]>()
  if (!ids.length) return found
  const body = await post(`/crm/associations/2026-03/${from}/${to}/batch/read`, {
    inputs: ids.map((one) => ({ id: one })),
  })
  for (const result of rawsOf(fieldOf(body, "results"))) {
    const owner = id(fieldOf(result.from, "id"))
    if (!owner) continue
    const held = new Map((found.get(owner) ?? []).map((one) => [one.id, one]))
    for (const one of rawsOf(result.to)) {
      const linked = id(one.toObjectId)
      if (!linked) continue
      const types = rawsOf(one.associationTypes)
      const kept = held.get(linked) ?? { id: linked, typeIds: [], labels: [] }
      held.set(linked, {
        id: linked,
        typeIds: [...new Set([...kept.typeIds, ...types.flatMap((type) => number(type.typeId) ?? [])])],
        labels: [...new Set([...kept.labels, ...types.flatMap((type) => text(type.label) ?? [])])],
      })
    }
    found.set(owner, [...held.values()])
  }
  return found
}

/**
 * Rows with their associations of type `to` in the shape a list answers them, the type ids and labels beside, so one
 * mapping reads both. A row with none gets an empty list: asked and none is not "not said".
 */
export const withAssociations = (rows: readonly Raw[], to: string, found: ReadonlyMap<string, Associated[]>): Raw[] =>
  rows.map((raw) => ({
    ...raw,
    associations: {
      ...(typeof raw.associations === "object" && raw.associations !== null ? raw.associations : {}),
      [to]: { results: (found.get(String(raw.id)) ?? []).map((one) => ({ ...one, type: to })) },
    },
  }))
