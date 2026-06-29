#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=task-runner-lib.sh
source "$SCRIPT_DIR/task-runner-lib.sh"

task_runner_init_paths

mkdir -p "$ROOT/.cursor"
echo '{ "enabled": true }' > "$STATE_FILE"

unchecked=$(task_runner_count_unchecked)
blocked=$(task_runner_count_blocked)
first=$(task_runner_first_pending)

echo "Task-runner enabled: $STATE_FILE"
echo "Pending: $unchecked unchecked item(s)"
if [[ -n "$first" ]]; then
  echo "Next: $first"
fi
if [[ "$blocked" -gt 0 ]]; then
  echo "Warning: $blocked BLOCKED item(s) in queue — hook will not auto-continue."
fi
echo ""
echo "Paste into Agent chat:"
echo "---"
cat <<EOF
Enable task-runner mode. Work through TASKS.md using the task-runner skill.
Process one unchecked item at a time, verify, mark [x], continue until all done.
State file is already enabled at .cursor/task-runner.state.json.
EOF
echo "---"
