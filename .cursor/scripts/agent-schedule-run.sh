#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=agent-schedule-lib.sh
source "$SCRIPT_DIR/agent-schedule-lib.sh"

agent_schedule_init_paths
agent_schedule_load_env
agent_schedule_require_agent

mkdir -p "$LOG_DIR"
stamp="$(date -u +"%Y%m%dT%H%M%SZ")"
log_file="$LOG_DIR/run-${stamp}.log"

cd "$ROOT"

{
  echo "=== cursor agent schedule run ${stamp} ==="
  echo "repo: $ROOT"
  echo "model: ${AGENT_SCHEDULE_MODEL:-<default>}"
  echo "prompt: $AGENT_SCHEDULE_PROMPT"
  echo "---"
} | tee "$log_file"

args=(-p --output-format text)
if [[ -n "$AGENT_SCHEDULE_MODEL" ]]; then
  args+=(--model "$AGENT_SCHEDULE_MODEL")
fi
# shellcheck disable=SC2206
if [[ -n "${AGENT_SCHEDULE_EXTRA_FLAGS:-}" ]]; then
  extra=($AGENT_SCHEDULE_EXTRA_FLAGS)
  args+=("${extra[@]}")
fi
args+=("$AGENT_SCHEDULE_PROMPT")

if agent "${args[@]}" 2>&1 | tee -a "$log_file"; then
  echo "---" | tee -a "$log_file"
  echo "status: ok" | tee -a "$log_file"
else
  status=$?
  echo "---" | tee -a "$log_file"
  echo "status: failed (exit $status)" | tee -a "$log_file"
  exit "$status"
fi
