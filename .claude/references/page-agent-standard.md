# Page Agent Standard — Portfolio Site

Authoring standard for `.claude/agents/page-*.md`, `design-guardian.md`, and
`site-consistency-orchestrator.md`. Load when **creating, auditing, or updating**
page-team agent files.

Runtime rules, modes, and phases live in **one** place:
[`page-agent-playbook.md`](page-agent-playbook.md) — page agents Read it first via
their "Load first" block. Do not restate playbook content in agent files.

---

## File location & naming

| Agent type          | Path                                              | `name` field                           |
| ------------------- | ------------------------------------------------- | -------------------------------------- |
| Page representative | `.claude/agents/page-{view}.md`                   | `page-{view}` (e.g. `page-experience`) |
| Design guardian     | `.claude/agents/design-guardian.md`               | `design-guardian`                      |
| Orchestrator        | `.claude/agents/site-consistency-orchestrator.md` | `site-consistency-orchestrator`        |

- Names are lowercase + hyphens (canonical subagent format); `name` == filename stem.
- `view_id` stays as in `content/site.json → pages[].id` (`home` is represented by `page-about`).
- One agent per file.

---

## Required frontmatter

| Field         | Page agents                                                                             | Guardian | Orchestrator                                                 |
| ------------- | --------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------ |
| `name`        | required                                                                                | required | required                                                     |
| `description` | trigger scenarios + "Use proactively"                                                   | same     | same                                                         |
| `tools`       | `Read, Edit, Grep, Glob, Bash`                                                          | same     | `Read, Grep, Glob, Bash, Agent(<team list>)` — no Edit/Write |
| `model`       | `haiku` (bump one agent to `sonnet` only if its Implement edits repeatedly fail review) | `sonnet` | `sonnet`                                                     |
| `maxTurns`    | `25`                                                                                    | `40`     | `80`                                                         |
| `skills`      | —                                                                                       | —        | `page-consistency-team` (preloaded)                          |

Do not add `memory`, `hooks`, `mcpServers`, `permissionMode`, or `isolation` without a
driving problem. Guardian knowledge persists in contract §11 (documented exceptions),
not agent memory.

---

## Required page-agent structure

```
1. YAML frontmatter (table above)
2. Title (H1) + one-line identity (view_id, anchor)
3. "Load first (mandatory)" block: instructs the agent to Read
   page-agent-playbook.md (rules/modes/phases) and design-consistency-contract.md
   before any phase. (@-imports do NOT expand in subagent system prompts —
   verified 2026-07 — so an explicit Read instruction is required.)
4. ## View-specific rules   — only deltas beyond playbook P1–P14 (2–5 rows)
5. ## Appendix A — View binding — owned sections/components/content;
   plus "Guardian-owned shared components used here (audit-only, never edit): …"
   plus "Shelved (never enable, never audit): …"
6. ## Appendix B — Audit checklist — view-specific checks only
```

Target length: ~40–60 lines. If a rule applies to two or more views, it belongs in the
playbook or the contract, not in agent files.

---

## Finding output

All audit output matches
`.claude/skills/page-consistency-team/references/finding-schema.md`. Do not restate the
JSON shapes in agent files — cite the schema path.

---

## Compliance checklist

| #   | Check                        | Pass criteria                                                     |
| --- | ---------------------------- | ----------------------------------------------------------------- |
| 1   | Frontmatter                  | name, description, tools, model, maxTurns present                 |
| 2   | Name matches file            | `name` == filename stem, lowercase + hyphens                      |
| 3   | Triggers in description      | ≥3 trigger phrases + "Use proactively"                            |
| 4   | Load-first block present     | mandatory Read of playbook + contract before any phase            |
| 5   | No restated playbook content | no Hard Rules P1–P14, modes, or phase prose in agent body         |
| 6   | View-specific rules only     | every rule row is a genuine delta                                 |
| 7   | View binding                 | Appendix A lists owned section ids + components + content paths   |
| 8   | Ownership labels             | guardian-owned components marked audit-only; shelved list present |
| 9   | Checklist scoped             | Appendix B contains only view-specific checks                     |
| 10  | No placeholders              | no TODO/FIXME in production agents                                |
| 11  | Routing sync                 | agent_id/agent_file/shelved_components match `page_routing.csv`   |
