#!/usr/bin/env bash
# Shared helpers for scheduled site-review runs.

site_review_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

site_review_init_paths() {
  ROOT="$(site_review_root)"
  ENV_FILE="$ROOT/.cursor/site-review.env"
  ENV_EXAMPLE="$ROOT/.cursor/site-review.env.example"
  STATE_FILE="$ROOT/.cursor/site-review.state.json"
  STATE_EXAMPLE="$ROOT/.cursor/site-review.state.json.example"
  LOG_DIR="$ROOT/.cursor/logs/site-review"
  RUN_SCRIPT="$ROOT/.cursor/scripts/site-review-run.sh"
  SERVICE_NAME="portfolio-site-review-oneshot.service"
  TIMER_NAME="portfolio-site-review-oneshot.timer"
}

site_review_load_env() {
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

  SITE_REVIEW_MODEL="${SITE_REVIEW_MODEL:-claude-fable-5-thinking-high}"
  SITE_REVIEW_DELAY_MINUTES="${SITE_REVIEW_DELAY_MINUTES:-180}"
  SITE_REVIEW_EXTRA_FLAGS="${SITE_REVIEW_EXTRA_FLAGS:---force --auto-review --approve-mcps}"
  SITE_REVIEW_ALLOW_COMMIT="${SITE_REVIEW_ALLOW_COMMIT:-true}"
  SITE_REVIEW_GOAL="${SITE_REVIEW_GOAL:-Detailed full-site review: audit all sections, content SSOT, a11y, build/CI, design consistency; fix every issue found; verify and commit.}"
}

site_review_require_agent() {
  if ! command -v agent >/dev/null 2>&1; then
    echo "error: Cursor CLI 'agent' not found on PATH" >&2
    echo "Install: https://cursor.com/docs/cli/overview" >&2
    exit 1
  fi
}

site_review_new_run_id() {
  date -u +"%Y-%m-%dT%H%M%SZ"
}

site_review_fire_at() {
  local delay_minutes="${1:-180}"
  date -u -d "+${delay_minutes} minutes" +"%Y-%m-%dT%H%M%SZ" 2>/dev/null \
    || date -u -v "+${delay_minutes}M" +"%Y-%m-%dT%H%M%SZ"
}

site_review_init_state() {
  local goal="${1:-$SITE_REVIEW_GOAL}"
  local fire_at="${2:-}"
  local run_id armed_at allow_commit_json

  run_id="$(site_review_new_run_id)"
  armed_at="$run_id"
  if [[ -z "$fire_at" ]]; then
    fire_at="$(site_review_fire_at "$SITE_REVIEW_DELAY_MINUTES")"
  fi

  if [[ "$SITE_REVIEW_ALLOW_COMMIT" == "true" ]]; then
    allow_commit_json=true
  else
    allow_commit_json=false
  fi

  mkdir -p "$(dirname "$STATE_FILE")"
  jq -n \
    --arg run_id "$run_id" \
    --arg armed_at "$armed_at" \
    --arg fire_at "$fire_at" \
    --arg goal "$goal" \
    --arg model "$SITE_REVIEW_MODEL" \
    --argjson allow_commit "$allow_commit_json" \
    '{
      enabled: true,
      run_id: $run_id,
      armed_at: $armed_at,
      fire_at: $fire_at,
      phase: "armed",
      mode: "full",
      goal: $goal,
      allow_commit: $allow_commit,
      model: $model,
      systemd_unit: "portfolio-site-review-oneshot.service",
      findings: [],
      fixes: [],
      verify_status: null,
      commit_sha: null,
      log_path: null
    }' > "$STATE_FILE"
}

site_review_update_phase() {
  local phase="$1"
  if [[ -f "$STATE_FILE" ]]; then
    tmp="$(mktemp)"
    jq --arg phase "$phase" '.phase = $phase' "$STATE_FILE" > "$tmp"
    mv "$tmp" "$STATE_FILE"
  fi
}

site_review_cancel_state() {
  if [[ -f "$STATE_FILE" ]]; then
    tmp="$(mktemp)"
    jq '.enabled = false | .phase = "cancelled"' "$STATE_FILE" > "$tmp"
    mv "$tmp" "$STATE_FILE"
  fi
}
