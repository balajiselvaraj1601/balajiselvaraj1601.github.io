#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=page-team-lib.sh
source "$SCRIPT_DIR/page-team-lib.sh"

page_team_init_paths

if [[ ! -f "$STATE_FILE" ]]; then
  echo "Page-team: no active run (state file missing)"
  echo "Start with: ./.cursor/scripts/page-team-start.sh"
  exit 0
fi

enabled="$(page_team_state_enabled)"
phase="$(page_team_phase)"
run_id="$(jq -r '.run_id // "?"' "$STATE_FILE" 2>/dev/null || echo "?")"
mode="$(jq -r '.mode // "?"' "$STATE_FILE" 2>/dev/null || echo "?")"
goal="$(jq -r '.goal // ""' "$STATE_FILE" 2>/dev/null || echo "")"
findings_count="$(jq '.findings | length' "$STATE_FILE" 2>/dev/null || echo 0)"
decisions_count="$(jq '.decisions | length' "$STATE_FILE" 2>/dev/null || echo 0)"
build="$(jq -r '.build // "pending"' "$STATE_FILE" 2>/dev/null || echo pending)"

read -r p0 p1 p2 <<< "$(page_team_finding_counts)"

echo "Page-team status"
echo "  enabled:  $enabled"
echo "  run_id:   $run_id"
echo "  mode:     $mode"
echo "  phase:    $phase"
echo "  goal:     $goal"
echo "  findings: $findings_count (P0=$p0 P1=$p1 P2=$p2)"
echo "  decisions: $decisions_count"
echo "  build:    $build"
