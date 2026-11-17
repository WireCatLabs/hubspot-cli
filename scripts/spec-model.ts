import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  type ApiModel,
  adaptOpenApi,
  mergeOpenApi,
  patchSpec,
  type SpecPatch,
  upgradeToOpenApi3,
} from "@wirecat/cli-base/codegen"

interface Provenance {
  sources: { name: string; url: string; file: string; sha256: string }[]
}

const PATCHES: SpecPatch[] = []

const ASSOCIATION_PATHS = [
  ["put", "/crm/objects/2026-03/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId}"],
  ["put", "/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}"],
  ["delete", "/crm/objects/2026-03/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}"],
] as const

/**
 * Corrections to one source before the merge. The associations spec of 2026-03 names three operations it shares with
 * every object spec after the 2025-09 path, though the method, path, parameters and bodies are the same; the merge
 * takes a shared path once only when the operation ids agree.
 */
const SOURCE_PATCHES: Record<string, SpecPatch[]> = {
  associations: ASSOCIATION_PATHS.map(([method, path]) => ({
    pointer: `/paths/${path.replaceAll("~", "~0").replaceAll("/", "~1")}/${method}/operationId`,
    value: `${method}-${path}_${path}`,
    reason: "the same operation as in each object spec, whose id names the 2026-03 path, not 2025-09",
  })),
}

/**
 * The documents as committed, checked against provenance.json, a Swagger one upgraded to OpenAPI 3, joined when there
 * are several, then corrected.
 */
export const specModel = async (root: string): Promise<{ model: ApiModel; notes: string[] }> => {
  const dir = join(root, "spec/hubspot")
  const provenance = JSON.parse(readFileSync(join(dir, "provenance.json"), "utf8")) as Provenance
  const notes: string[] = []
  const sources = await Promise.all(
    provenance.sources.map(async (source) => {
      const text = readFileSync(join(dir, source.file), "utf8")
      if (createHash("sha256").update(text).digest("hex") !== source.sha256)
        throw new Error(`spec/hubspot/${source.file} does not match provenance.json; run pnpm spec:sync`)
      const parsed = JSON.parse(text) as { openapi?: unknown }
      const upgraded = parsed.openapi ? parsed : await upgradeToOpenApi3(parsed)
      const { document, applied } = patchSpec(upgraded, { patches: SOURCE_PATCHES[source.name] ?? [] })
      notes.push(...applied.map(({ pointer, reason }) => `patched ${source.name} ${pointer}: ${reason}`))
      return { name: source.name, url: source.url, document }
    }),
  )
  const [only] = sources
  const merged =
    sources.length === 1 && only
      ? { document: only.document, notes: [] as string[] }
      : (() => {
          const { document, report } = mergeOpenApi(sources, { title: "hubspot", version: "1" })
          return { document, notes: [...report.merged, ...report.renamed].map((line) => `merged: ${line}`) }
        })()
  const { document, applied } = patchSpec(merged.document, { patches: PATCHES })
  const model = adaptOpenApi(document, {
    sourceUrl: provenance.sources.map((source) => source.url).join(" "),
    sourceRevision: provenance.sources.map((source) => source.sha256).join(" "),
  })
  return {
    model,
    notes: [...notes, ...merged.notes, ...applied.map(({ pointer, reason }) => `patched ${pointer}: ${reason}`)],
  }
}
