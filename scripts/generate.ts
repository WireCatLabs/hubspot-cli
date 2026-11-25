import { execFileSync } from "node:child_process"
import { resolve } from "node:path"
import {
  coverageGenerator,
  definitionsGenerator,
  generate,
  manifestGenerator,
  typesGenerator,
  valibotGenerator,
  writeArtifacts,
} from "@wirecat/cli-base/codegen"
import { specModel } from "./spec-model.ts"

// The service's API description → src/generated/ and docs/dev/API_COVERAGE.md. Each correction below is read from
// the service's documentation, never guessed; cli-base docs/standards/kit-surface.md says what each one does.
const P = "/crm/pipelines/2026-03/{objectType}"
const R = "/crm/properties/2026-03/{objectType}"
const R_OLD = "/crm/properties/2025-09/{objectType}"
/** A list and a read of one both end in a path parameter here, so the path alone names them alike. */
const COMMANDS: Record<string, string> = {
  [`get-${P}_getAll`]: "pipelines-list",
  [`get-${P}/{pipelineId}_getById`]: "pipelines-get",
  [`post-${P}_create`]: "pipelines-create",
  [`patch-${P}/{pipelineId}_update`]: "pipelines-update",
  [`get-${R}_${R_OLD}`]: "properties-list",
  [`get-${R}/{propertyName}_${R_OLD}/{propertyName}`]: "properties-get",
  [`post-${R}_${R_OLD}`]: "properties-create",
  [`patch-${R}/{propertyName}_${R_OLD}/{propertyName}`]: "properties-update",
}

/**
 * POSTs that delete: `batch/archive` and `labels/archive` archive records or labels, `gdpr-delete` erases a contact
 * for good, and `merge` keeps one of two records (HubSpot's "Using object APIs" and "Merge records" guides).
 */
const READING_POST = /\/batch\/read$/
const DELETING_POST = /\/(batch\/archive|batch\/labels\/archive|gdpr-delete|merge)$/
/**
 * A PUT of a whole pipeline must send its stages as one list (`stages` is required in PipelineReplaceInput). The spec
 * does not say what becomes of a stage the list leaves out, so the replace counts as a delete.
 */
const REPLACED_PIPELINE = `PUT ${P}/{pipelineId}`

/** The words of cli-core's CRM commands, so `people.delete` denied there also holds in `api`. */
const GROUPS: Record<string, string> = {
  contacts: "people",
  companies: "organizations",
  owners: "users",
  properties: "fields",
  "account-info": "account",
}
const groupOf = (command: string) => {
  const first = command.startsWith("account-info") ? "account-info" : (command.split("-")[0] ?? command)
  return GROUPS[first] ?? first
}

const root = resolve(import.meta.dirname, "..")
const { model, notes } = await specModel(root)
const effectOf = (method: string, path: string) =>
  `${method} ${path}` === REPLACED_PIPELINE
    ? { effect: "destructive" as const, reason: "a replace of a pipeline may drop each stage its body leaves out" }
    : method !== "POST"
      ? undefined
      : DELETING_POST.test(path)
        ? { effect: "destructive" as const, reason: "a POST that archives, erases or merges away records" }
        : READING_POST.test(path)
          ? { effect: "read" as const, reason: "a batch read by ids, in the body because the list can be long" }
          : undefined
const overrides = Object.fromEntries(
  model.operations.flatMap(({ id, binding }) => {
    const override = binding.kind === "http" ? effectOf(binding.method, binding.path) : undefined
    return override ? [[id, override]] : []
  }),
)
const artifacts = generate(
  model,
  [
    typesGenerator({ path: "src/generated/types.ts" }),
    valibotGenerator({ path: "src/generated/schemas.ts", typesImport: "./types.js" }),
    manifestGenerator({ path: "src/generated/manifest.ts" }),
    definitionsGenerator({ path: "src/generated/definitions.ts" }),
    coverageGenerator({
      path: "docs/dev/API_COVERAGE.md",
      title: "API coverage",
      command: (operation) => `hubspot <profile> api ${operation.command}`,
    }),
  ],
  {
    banner: ["Source: spec/hubspot/, checked against provenance.json", "Run: pnpm generate"],
    overrides,
    readingPosts: true,
    names: { fromPath: true, segments: { crm: "", objects: "", "0-3": "deals" }, commands: COMMANDS },
    permissions: { group: (operation) => groupOf(operation.command ?? operation.id), deletingFlags: [] },
    pagination: true,
    auth: {
      securitySchemes: { token: { type: "http", scheme: "bearer" } },
      security: [{ token: [] }],
      reason:
        "a private app token or service key goes in Authorization: Bearer; the specs list only OAuth and the retired hapikey",
    },
  },
)
const coverage = artifacts.find((artifact) => artifact.path === "docs/dev/API_COVERAGE.md")
if (coverage && notes.length)
  coverage.content += ["", "## Spec corrections", "", ...notes.map((n) => `- ${n}`), ""].join("\n")
const format = (path: string, content: string) =>
  path.endsWith(".ts")
    ? execFileSync(
        process.execPath,
        [`${root}/node_modules/@biomejs/biome/bin/biome`, "check", "--write", `--stdin-file-path=${path}`],
        { cwd: root, encoding: "utf8", input: content, maxBuffer: 64 * 1024 * 1024 },
      )
    : content
const check = process.argv.includes("--check")
const stale = writeArtifacts(artifacts, { root, check, format })
if (check && stale.length) {
  process.stderr.write(`Generated files are stale: ${stale.join(", ")}; run pnpm generate\n`)
  process.exitCode = 1
}
