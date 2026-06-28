# Rules Sync Mapping

This document tracks how rules are synchronized across tools, following the `maintain-rules` "Multi-tool sync" standard.

**Canonical source:** [`AGENTS.md`](../AGENTS.md) is the single source of truth for all project rules, commands, and agent guidance. All other files mirror it — never edit one without updating the others in the same commit.

## Sync map

| AGENTS.md section | Mirrored in |
|---|---|
| Behavioral guidelines (3) | `.cursor/rules/portfolio-guardrails.mdc` § Behavioral guidelines |
| Hard rules (4) | `.cursor/rules/portfolio-guardrails.mdc` § Hard rules |
| | `.github/copilot-instructions.md` § Hard rules + Behavioral guidelines |
| Commands table | npm table in AGENTS.md (lines 44–51) |
| Memory — AgentMemory | Both Cursor and Copilot files reference AgentMemory |
| Context loading table | Progressive disclosure in AGENTS.md; skills indexed |
| Agent skills | `.claude/skills/` and AGENTS.md table |
| Slash commands (`/build-page`, `/build-all-pages`, …) | AGENTS.md only — intentionally **not** mirrored to Cursor/Copilot |

## Sync rule

**Never update one system without updating the others in the same commit.**

When editing:
1. Update AGENTS.md (canonical)
2. Update `.cursor/rules/portfolio-guardrails.mdc` (Cursor)
3. Update `.github/copilot-instructions.md` (Copilot)
4. Commit all three together

Violations to catch during review:
- A change to AGENTS.md not reflected in `.cursor/rules/`
- A change to `.cursor/rules/` that broke parity with AGENTS.md
- A new hard rule in AGENTS.md not in the Copilot file
- A new behavioral guideline in AGENTS.md not in both tool files
