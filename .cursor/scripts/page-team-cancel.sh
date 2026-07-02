#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=page-team-lib.sh
source "$SCRIPT_DIR/page-team-lib.sh"

page_team_init_paths

if [[ -f "$STATE_FILE" ]]; then
  jq '.enabled = false' "$STATE_FILE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"
  echo "Page-team disabled: $STATE_FILE (enabled=false)"
else
  echo "Page-team: no state file to cancel"
fi
