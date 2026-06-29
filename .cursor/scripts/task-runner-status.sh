#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=task-runner-lib.sh
source "$SCRIPT_DIR/task-runner-lib.sh"

task_runner_init_paths

enabled=$(task_runner_state_enabled)
unchecked=$(task_runner_count_unchecked)
blocked=$(task_runner_count_blocked)
first=$(task_runner_first_pending)

echo "Task-runner status"
echo "  State file: ${STATE_FILE}"
echo "  Enabled:    $enabled"
echo "  Unchecked:  $unchecked"
echo "  Blocked:    $blocked"

if [[ -n "$first" ]]; then
  echo "  Next item:  $first"
elif [[ "$unchecked" -eq 0 ]]; then
  echo "  Next item:  (queue empty)"
fi

if [[ ! -f "$TASKS_FILE" ]]; then
  echo "  Warning:    TASKS.md not found"
fi
