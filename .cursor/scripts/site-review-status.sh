#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=site-review-lib.sh
source "$SCRIPT_DIR/site-review-lib.sh"

site_review_init_paths
site_review_load_env

echo "Config: ${ENV_FILE:-missing} (example: $ENV_EXAMPLE)"
if [[ -f "$STATE_FILE" ]]; then
  echo "Run ID:   $(jq -r '.run_id // "none"' "$STATE_FILE")"
  echo "Phase:    $(jq -r '.phase // "none"' "$STATE_FILE")"
  echo "Fire at:  $(jq -r '.fire_at // "none"' "$STATE_FILE") UTC"
  echo "Model:    $(jq -r '.model // "none"' "$STATE_FILE")"
  echo "Commit:   $(jq -r '.allow_commit // false' "$STATE_FILE")"
  echo "Verify:   $(jq -r '.verify_status // "pending"' "$STATE_FILE")"
  commit_sha="$(jq -r '.commit_sha // empty' "$STATE_FILE")"
  if [[ -n "$commit_sha" ]]; then
    echo "Commit:   $commit_sha"
  fi
else
  echo "State:    (not initialized — run site-review-arm.sh)"
fi
echo ""

if systemctl --user is-active "$TIMER_NAME" >/dev/null 2>&1; then
  echo "Timer:"
  systemctl --user list-timers "$TIMER_NAME" --no-pager
elif systemctl --user is-active "$SERVICE_NAME" >/dev/null 2>&1; then
  echo "Service running: $SERVICE_NAME"
  systemctl --user status "$SERVICE_NAME" --no-pager | head -10
else
  echo "Timer: not active"
fi

echo ""
if [[ -d "$LOG_DIR" ]]; then
  echo "Recent logs:"
  ls -1t "$LOG_DIR"/*.log 2>/dev/null | head -5 || echo "(none yet)"
fi
