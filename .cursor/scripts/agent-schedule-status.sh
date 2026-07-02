#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=agent-schedule-lib.sh
source "$SCRIPT_DIR/agent-schedule-lib.sh"

agent_schedule_init_paths
agent_schedule_load_env

echo "Config: ${ENV_FILE:-missing} (example: $ENV_EXAMPLE)"
if [[ -f "$ENV_FILE" ]]; then
  echo "OnCalendar: ${AGENT_SCHEDULE_ONCALENDAR}"
  echo "Model: ${AGENT_SCHEDULE_MODEL:-<default>}"
  echo "Prompt: ${AGENT_SCHEDULE_PROMPT:0:120}$([[ ${#AGENT_SCHEDULE_PROMPT} -gt 120 ]] && echo '…')"
fi
echo ""

if systemctl --user is-active "${SERVICE_NAME}.timer" >/dev/null 2>&1; then
  systemctl --user list-timers "${SERVICE_NAME}.timer" --no-pager
else
  echo "Timer not active. Install with: $ROOT/.cursor/scripts/agent-schedule-install.sh"
fi

echo ""
if [[ -d "$LOG_DIR" ]]; then
  echo "Recent logs:"
  ls -1t "$LOG_DIR"/*.log 2>/dev/null | head -5 || echo "(none yet)"
fi
