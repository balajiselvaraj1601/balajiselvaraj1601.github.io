#!/usr/bin/env bash
# Cursor stop hook — task-runner | auto-continue while TASKS.md has unchecked queue items | Exits: 0=allow
# Emits {"followup_message": ...} to continue the batch, else {} . Never blocks.
set -uo pipefail  # not -e: stdin/lib pipelines may fail on the success path (empty input / grep no-match)

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
# shellcheck source=../scripts/task-runner-lib.sh
source "$ROOT/.cursor/scripts/task-runner-lib.sh"

task_runner_init_paths

input=$(cat)

# Allow stop on aborted/error turns — do not force another iteration.
status=$(echo "$input" | jq -r '.status // "completed"')
if [[ "$status" != "completed" ]]; then
  echo '{}'
  exit 0
fi

# No active batch.
if [[ ! -f "$STATE_FILE" ]]; then
  echo '{}'
  exit 0
fi

enabled=$(jq -r '.enabled // false' "$STATE_FILE" 2>/dev/null || echo "false")
if [[ "$enabled" != "true" ]]; then
  echo '{}'
  exit 0
fi

if [[ ! -f "$TASKS_FILE" ]]; then
  echo '{}'
  exit 0
fi

# Queue section only: lines after "## Queue" until the next "## " heading or EOF.
unchecked=$(task_runner_count_unchecked)
blocked=$(task_runner_count_blocked)

if [[ "$blocked" -gt 0 ]]; then
  echo '{}'
  exit 0
fi

if [[ "$unchecked" -eq 0 ]]; then
  rm -f "$STATE_FILE"
  echo '{}'
  exit 0
fi

loop_count=$(echo "$input" | jq -r '.loop_count // 0')
followup="Task-runner: $unchecked unchecked item(s) remain in TASKS.md (Queue section). Continue the task-runner skill — pick the first unchecked item, implement, verify with npm run build, mark [x], repeat. (auto-continue #$((loop_count + 1)))"

jq -n --arg msg "$followup" '{ "followup_message": $msg }'
exit 0
