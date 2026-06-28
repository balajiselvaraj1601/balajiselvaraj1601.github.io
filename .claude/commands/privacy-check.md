---
description: Enforce AGENTS.md hard rule #3 — no phone number, no References section in content. Use when checking content before go-live.
allowed-tools: Bash(grep:*)
---

Check that no private content leaked into `content/*.json` (AGENTS.md hard rule #3: never surface a phone number or a References section).

Run:
```bash
grep -rEi '\+?[0-9][0-9 ()-]{8,}[0-9]' content/*.json
grep -ri '"references"' content/*.json
```

If either command prints a match, flag it and report the offending file and line — a phone-like number or a References section must never be surfaced. If both return nothing, report "privacy check clean".

Together with `/verify-content` this forms the deterministic **build-gate** lens of the `build-page` Review stage (`docs/page-improvement-workflow.md`).
