#!/usr/bin/env bash
# Shared helpers for task-runner scripts and hooks.
task_runner_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

task_runner_init_paths() {
  ROOT="$(task_runner_root)"
  STATE_FILE="$ROOT/.cursor/task-runner.state.json"
  TASKS_FILE="$ROOT/TASKS.md"
}

task_runner_queue_section() {
  local tasks_file="${1:-$TASKS_FILE}"
  if [[ ! -f "$tasks_file" ]]; then
    return 0
  fi
  awk '
    /^## Queue/ { in_queue=1; next }
    in_queue && /^## / { exit }
    in_queue { print }
  ' "$tasks_file"
}

task_runner_count_unchecked() {
  local section
  section="$(task_runner_queue_section)"
  echo "$section" | grep -cE '^\s*-\s*\[ \]' || true
}

task_runner_count_blocked() {
  local section
  section="$(task_runner_queue_section)"
  echo "$section" | grep -cE '^\s*-\s*\[ \]\s*BLOCKED:' || true
}

task_runner_first_pending() {
  local section
  section="$(task_runner_queue_section)"
  echo "$section" | grep -E '^\s*-\s*\[ \]' | head -1 | sed 's/^\s*-\s*\[ \]\s*//'
}

task_runner_state_enabled() {
  if [[ ! -f "$STATE_FILE" ]]; then
    echo "false"
    return 0
  fi
  jq -r '.enabled // false' "$STATE_FILE" 2>/dev/null || echo "false"
}
