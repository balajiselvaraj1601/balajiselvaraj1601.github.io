#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=site-review-lib.sh
source "$SCRIPT_DIR/site-review-lib.sh"

site_review_init_paths
site_review_load_env
site_review_require_agent

delay_minutes="${1:-$SITE_REVIEW_DELAY_MINUTES}"
if ! [[ "$delay_minutes" =~ ^[0-9]+$ ]] || [[ "$delay_minutes" -lt 1 ]]; then
  echo "error: delay must be a positive integer (minutes)" >&2
  echo "usage: $0 [minutes]" >&2
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  cp "$ENV_EXAMPLE" "$ENV_FILE"
  echo "Created $ENV_FILE from example."
fi

# shellcheck disable=SC1090
set -a
source "$ENV_FILE"
set +a

SITE_REVIEW_DELAY_MINUTES="$delay_minutes"
fire_at="$(site_review_fire_at "$delay_minutes")"
site_review_init_state "$SITE_REVIEW_GOAL" "$fire_at"

chmod +x "$RUN_SCRIPT"

# Cancel any existing oneshot timer/service for this unit name.
systemctl --user stop "$TIMER_NAME" 2>/dev/null || true
systemctl --user stop "$SERVICE_NAME" 2>/dev/null || true
systemctl --user reset-failed "$SERVICE_NAME" 2>/dev/null || true

on_active="${delay_minutes}min"
systemd-run --user \
  --unit="$SERVICE_NAME" \
  --on-active="$on_active" \
  --description="Portfolio site review (Fable, auto)" \
  "$RUN_SCRIPT"

echo ""
echo "Site review armed."
echo "Run ID:   $(jq -r '.run_id' "$STATE_FILE")"
echo "Fire at:  $fire_at UTC (~${delay_minutes} minutes from now)"
echo "Model:    $SITE_REVIEW_MODEL"
echo "Auto:     $SITE_REVIEW_EXTRA_FLAGS"
echo "Commit:   $SITE_REVIEW_ALLOW_COMMIT"
echo "State:    $STATE_FILE"
echo "Logs:     $LOG_DIR"
echo ""
systemctl --user list-timers "$TIMER_NAME" --no-pager 2>/dev/null || true
echo ""
echo "Status:   $ROOT/.cursor/scripts/site-review-status.sh"
echo "Cancel:   $ROOT/.cursor/scripts/site-review-cancel.sh"
echo "Test now: $RUN_SCRIPT"
echo ""
if loginctl show-user "$(whoami)" -p Linger 2>/dev/null | grep -q 'Linger=no'; then
  echo "Note: Linger=no — timer may not fire after logout/reboot."
  echo "      For unmanned runs: sudo loginctl enable-linger $(whoami)"
fi
