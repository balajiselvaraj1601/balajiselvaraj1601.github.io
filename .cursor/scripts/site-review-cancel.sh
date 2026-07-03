#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=site-review-lib.sh
source "$SCRIPT_DIR/site-review-lib.sh"

site_review_init_paths
site_review_load_env

systemctl --user stop "$TIMER_NAME" 2>/dev/null || true
systemctl --user stop "$SERVICE_NAME" 2>/dev/null || true
site_review_cancel_state

echo "Site review cancelled."
echo "State: $STATE_FILE (phase: cancelled)"
