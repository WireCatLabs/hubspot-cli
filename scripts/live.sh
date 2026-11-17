#!/usr/bin/env bash
# The release's live check against the real service (WC-TEST-18, WC-REL-17). The owner runs bin/live, which prints
# the `# Needs:` lines below, passes the key on stdin and records the pass. Every folder is a temporary one and the
# keyring is out of reach, so nothing touches the owner's store, keyring or settings. After the reads it makes a deal,
# a note on it and a contact named "WireCat live test", changes each and deletes each, also when a step fails.
#   scripts/live.sh < key-file
# Needs: a HubSpot developer test account, never one that matters
# Needs: a service key or private app token on it with the read and the write scopes of docs/installation.md
# Needs: at least one deal in a deal pipeline, with a contact and a company associated
# Needs: at least one owner (a user of the test account)
set -euo pipefail
root=$(cd -- "$(dirname -- "$0")/.." && pwd)
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

export WCHUBSPOT_CONFIG_DIR="$work/config" WCHUBSPOT_STATE_DIR="$work/state" WCHUBSPOT_CACHE_DIR="$work/cache"
export MESSAGING_STORE="$work/wirecat.db"
export DBUS_SESSION_BUS_ADDRESS="disabled:"
unset WCHUBSPOT_TOKEN
cli=(node "$root/dist/bin/hubspot.js")

pnpm --dir "$root" -s build >/dev/null
# Set after the build, which needs the owner's pnpm store: a CLI that moves its folders on start must not see the
# owner's home.
export HOME="$work/home" XDG_CONFIG_HOME="$work/xdg/config" XDG_DATA_HOME="$work/xdg/data"
export XDG_STATE_HOME="$work/xdg/state" XDG_CACHE_HOME="$work/xdg/cache"
mkdir -p "$HOME"

"${cli[@]}" --wcat-describe | node -e '
  const answer = JSON.parse(require("fs").readFileSync(0, "utf8"))
  if (answer.wcat_describe !== 2 || !/^[0-9a-f]{64}$/.test(answer.manifest_sha256)) throw new Error("not format 2")'

"${cli[@]}" live session start --credential-storage file --json >/dev/null
trap '"${cli[@]}" live session end --json >/dev/null 2>&1 || true; rm -rf "$work"' EXIT

"${cli[@]}" live session status --check --json >"$work/status.json"
"${cli[@]}" live api pipelines-list --object-type deals --json >"$work/pipelines.json"
"${cli[@]}" live sync --json >"$work/sync.json"
"${cli[@]}" live deals list --json >"$work/deals.json"
"${cli[@]}" live people list --json >"$work/people.json"
"${cli[@]}" live users list --json >"$work/users.json"
node -e '
  const fs = require("fs")
  const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"))
  const [status, pipelines, sync, deals, people, users] = process.argv.slice(1).map(read)
  if (status.item.verified !== true || !/^\d+$/.test(status.item.account)) throw new Error("the key was not verified")
  if (!JSON.stringify(pipelines).includes("stages")) throw new Error("no deal pipeline with stages")
  if (sync.item?.complete === false) throw new Error(`the sync was partial: ${JSON.stringify(sync.item.issues)}`)
  for (const [name, list] of Object.entries({ deals, people, users }))
    if (!Array.isArray(list.items) || list.items.length === 0) throw new Error(`no ${name}`)' \
  "$work/status.json" "$work/pipelines.json" "$work/sync.json" "$work/deals.json" "$work/people.json" "$work/users.json"
"${cli[@]}" live doctor --json >/dev/null

# The write round trip. A run without a terminal refuses `ask`: this profile allows the writes it makes, and each
# api delete, which also checks its own `api.<command>`, confirms with --yes.
for key in deals.delete people.delete notes.write notes.delete; do
  "${cli[@]}" live config set "permissions.$key" allow --json >/dev/null
done
made="$work/made"
mkdir -p "$made"
cleanup() {
  [ -f "$made/note" ] && "${cli[@]}" live api notes-delete --note-id "$(cat "$made/note")" --yes --json >/dev/null 2>&1 || true
  [ -f "$made/contact" ] && "${cli[@]}" live api contacts-delete --contact-id "$(cat "$made/contact")" --yes --json >/dev/null 2>&1 || true
  [ -f "$made/deal" ] && "${cli[@]}" live deals delete "$(cat "$made/deal")" --json >/dev/null 2>&1 || true
  "${cli[@]}" live session end --json >/dev/null 2>&1 || true
  rm -rf "$work"
}
trap cleanup EXIT
field() { node -e 'let v = JSON.parse(require("fs").readFileSync(0, "utf8")); for (const k of process.argv[1].split(".")) v = v?.[k]; if (v === undefined || v === null) process.exit(1); console.log(v)' "$1"; }

stamp=$(date -u +%Y%m%dT%H%M%SZ)
currency=$("${cli[@]}" live api account-info-details-list --json | field item.companyCurrency)
stages=$(node -e '
  const pipelines = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"))
  const [first] = pipelines.item?.results ?? pipelines.results ?? []
  const open = (first?.stages ?? []).filter((one) => one.metadata?.isClosed !== "true")
  if (open.length < 2) throw new Error("the first deal pipeline needs two open stages")
  console.log([first.label, open[0].label, open[1].label].join("\t"))' "$work/pipelines.json")
IFS=$'\t' read -r pipeline first_stage second_stage <<<"$stages"

"${cli[@]}" live deals create --title "WireCat live test $stamp" --pipeline "$pipeline" \
  --stage "$first_stage" --amount 100 --currency "$currency" --json >"$work/deal.json"
# The ref names the deal in the copy, the external id in HubSpot: the commands take one, api the other.
deal=$(field item.deal.ref <"$work/deal.json")
deal_id=$(field item.deal.external_id <"$work/deal.json")
echo "$deal" >"$made/deal"
"${cli[@]}" live deals update "$deal" --title "WireCat live test $stamp, renamed" --json >/dev/null
"${cli[@]}" live deals move "$deal" "$second_stage" --json >/dev/null
"${cli[@]}" live deals close "$deal" won --reason "WireCat live test" --json >"$work/closed.json"
"${cli[@]}" live api deals-get --deal-id "$deal_id" --properties dealname,dealstage,closed_won_reason --json \
  >"$work/deal-read.json"

# A note on the deal, associated with HubSpot's default note-to-deal type 214 (associations v4 guide).
now_ms=$(($(date +%s) * 1000))
note_body=$(printf '{"properties":{"hs_note_body":"WireCat live test %s","hs_timestamp":"%s"},"associations":[{"to":{"id":"%s"},"types":[{"associationCategory":"HUBSPOT_DEFINED","associationTypeId":214}]}]}' "$stamp" "$now_ms" "$deal_id")
"${cli[@]}" live api notes-create --body "$note_body" --json | field item.result.id >"$made/note"
"${cli[@]}" live api notes-delete --note-id "$(cat "$made/note")" --yes --json >/dev/null
rm "$made/note"

"${cli[@]}" live people create --first-name WireCat --last-name "Live test $stamp" \
  --email "live-$stamp@example.com" --json >"$work/contact.json"
field item.person.id <"$work/contact.json" >"$made/contact"
"${cli[@]}" live people update "$(cat "$made/contact")" --position "Live test" --json >/dev/null
"${cli[@]}" live api contacts-delete --contact-id "$(cat "$made/contact")" --yes --json >/dev/null
rm "$made/contact"

"${cli[@]}" live deals delete "$deal" --json >/dev/null
rm "$made/deal"
node -e '
  const fs = require("fs")
  const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"))
  const [pipelines, got] = process.argv.slice(1).map(read)
  const properties = got.item?.result?.properties ?? got.item?.properties ?? {}
  if (!String(properties.dealname).endsWith(", renamed")) throw new Error("the update did not reach HubSpot")
  if (properties.closed_won_reason !== "WireCat live test") throw new Error("the close kept no reason")
  const stages = (pipelines.item?.results ?? pipelines.results ?? []).flatMap((one) => one.stages ?? [])
  const stage = stages.find((one) => one.id === properties.dealstage)
  if (stage?.metadata?.probability !== "1.0") throw new Error("the close did not reach a closed won stage")' \
  "$work/pipelines.json" "$work/deal-read.json"

"${cli[@]}" live session end --json >/dev/null
echo "live check passed: describe format 2, sign-in, status --check, pipelines, sync, deals, people, users, doctor," \
  "deal create, update, move, close and delete, note create and delete, contact create, update and delete, sign-out"
