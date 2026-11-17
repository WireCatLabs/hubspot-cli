#!/usr/bin/env bash
# The release's live check against the real service (WC-TEST-18, WC-REL-17). The owner runs bin/live, which prints
# the `# Needs:` lines below, passes the key on stdin and records the pass. Every folder is a temporary one and the
# keyring is out of reach, so nothing touches the owner's store, keyring or settings. Every call reads: no request
# changes the account.
#   scripts/live.sh < key-file
# Needs: a HubSpot developer test account, never one that matters
# Needs: a service key or private app token on it with the read scopes of docs/installation.md, and nothing more
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

"${cli[@]}" live session end --json >/dev/null
echo "live check passed: describe format 2, sign-in, status --check, pipelines, sync, deals, people, users, doctor, sign-out"
