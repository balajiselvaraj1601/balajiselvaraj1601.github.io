#!/usr/bin/env bash
# Cursor sessionStart hook — task-runner | remind agent when a batch is active | Exits: 0=allow
# Emits {"additional_context": ...} when a batch is active, else {} . Never blocks.
set -uo pipefail  # not -e: sourced lib pipelines may fail on the success path (grep no-match / head SIGPIPE)

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
# shellcheck source=../scripts/task-runner-lib.sh
source "$ROOT/.cursor/scripts/task-runner-lib.sh"

task_runner_init_paths

enabled=$(task_runner_state_enabled)
if [[ "$enabled" != "true" ]]; then
  echo '{}'
  exit 0
fi

if [[ ! -f "$TASKS_FILE" ]]; then
  echo '{}'
  exit 0
fi

unchecked=$(task_runner_count_unchecked)
blocked=$(task_runner_count_blocked)
first=$(task_runner_first_pending)

if [[ "$blocked" -gt 0 ]]; then
  msg="Active task-runner batch is paused: TASKS.md has a BLOCKED item. Review the queue before continuing."
elif [[ "$unchecked" -eq 0 ]]; then
  msg="Active task-runner batch: TASKS.md queue is empty. Mark complete and remove .cursor/task-runner.state.json if finished."
else
  msg="Active task-runner batch: $unchecked unchecked item(s) in TASKS.md. Continue the task-runner skill — next: ${first:-unknown}. Process one item, verify, mark [x], repeat."
fi

jq -n --arg ctx "$msg" '{ "additional_context": $ctx }'
exit 0
