#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=task-runner-lib.sh
source "$SCRIPT_DIR/task-runner-lib.sh"

task_runner_init_paths

if [[ -f "$STATE_FILE" ]]; then
  rm -f "$STATE_FILE"
  echo "Task-runner cancelled (state file removed)."
else
  echo "Task-runner already inactive (no state file)."
fi
