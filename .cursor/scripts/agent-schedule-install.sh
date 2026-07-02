#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=agent-schedule-lib.sh
source "$SCRIPT_DIR/agent-schedule-lib.sh"

agent_schedule_init_paths
agent_schedule_load_env
agent_schedule_require_agent

if [[ ! -f "$ENV_FILE" ]]; then
  cp "$ENV_EXAMPLE" "$ENV_FILE"
  echo "Created $ENV_FILE from example — edit schedule and prompt, then re-run install."
fi

# shellcheck disable=SC1090
set -a
source "$ENV_FILE"
set +a

mkdir -p "$USER_UNIT_DIR" "$LOG_DIR"
chmod +x "$RUN_SCRIPT"

service_src="$SYSTEMD_DIR/${SERVICE_NAME}.service"
timer_src="$SYSTEMD_DIR/${SERVICE_NAME}.timer"
service_dst="$USER_UNIT_DIR/${SERVICE_NAME}.service"
timer_dst="$USER_UNIT_DIR/${SERVICE_NAME}.timer"

sed -e "s|@REPO_ROOT@|$ROOT|g" \
    -e "s|@PATH@|${HOME}/.local/bin:/usr/local/bin:/usr/bin:/bin|g" \
    "$service_src" > "$service_dst"

cat > "$timer_dst" <<EOF
[Unit]
Description=Scheduled Cursor agent run (portfolio_site)

[Timer]
OnCalendar=${AGENT_SCHEDULE_ONCALENDAR}
Persistent=true
Unit=${SERVICE_NAME}.service

[Install]
WantedBy=timers.target
EOF

systemctl --user daemon-reload
systemctl --user enable --now "${SERVICE_NAME}.timer"

echo "Installed user timer: ${SERVICE_NAME}.timer"
echo "Schedule (OnCalendar): ${AGENT_SCHEDULE_ONCALENDAR}"
echo "Config: $ENV_FILE"
echo "Logs:   $LOG_DIR"
echo ""
systemctl --user list-timers "${SERVICE_NAME}.timer" --no-pager
echo ""
echo "Test now: $RUN_SCRIPT"
echo "Disable:  systemctl --user disable --now ${SERVICE_NAME}.timer"
