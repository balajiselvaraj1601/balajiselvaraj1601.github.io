#!/usr/bin/env bash
# Shared helpers for scheduled Cursor agent runs.

agent_schedule_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

agent_schedule_init_paths() {
  ROOT="$(agent_schedule_root)"
  ENV_FILE="$ROOT/.cursor/agent-schedule.env"
  ENV_EXAMPLE="$ROOT/.cursor/agent-schedule.env.example"
  LOG_DIR="$ROOT/.cursor/logs/agent-schedule"
  RUN_SCRIPT="$ROOT/.cursor/scripts/agent-schedule-run.sh"
  SYSTEMD_DIR="$ROOT/.cursor/systemd"
  USER_UNIT_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/systemd/user"
  SERVICE_NAME="cursor-agent-schedule"
}

agent_schedule_load_env() {
  if [[ -f "$ENV_FILE" ]]; then
    # shellcheck disable=SC1090
    set -a
    source "$ENV_FILE"
    set +a
  elif [[ -f "$ENV_EXAMPLE" ]]; then
    # shellcheck disable=SC1090
    set -a
    source "$ENV_EXAMPLE"
    set +a
  fi

  AGENT_SCHEDULE_ONCALENDAR="${AGENT_SCHEDULE_ONCALENDAR:-Mon *-*-* 09:00:00}"
  AGENT_SCHEDULE_MODEL="${AGENT_SCHEDULE_MODEL:-}"
  AGENT_SCHEDULE_EXTRA_FLAGS="${AGENT_SCHEDULE_EXTRA_FLAGS:-}"
  AGENT_SCHEDULE_PROMPT="${AGENT_SCHEDULE_PROMPT:-Say hello from the scheduled Cursor agent.}"
}

agent_schedule_require_agent() {
  if ! command -v agent >/dev/null 2>&1; then
    echo "error: Cursor CLI 'agent' not found on PATH" >&2
    echo "Install: https://cursor.com/docs/cli/overview" >&2
    exit 1
  fi
}
