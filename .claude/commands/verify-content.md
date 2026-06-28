---
description: Validate content/*.json via the Astro build, then run the preview spot-check. Use when validating content changes before pushing.
allowed-tools: Bash(npm run build:*) Bash(npm run preview:*)
---

Run the content validation gate for this repo.

1. Run `npm run build` — this runs Zod validation on `content/*.json`. If it fails, report the exact field path from the error and STOP.
2. If the build passes, run `npm run preview` and spot-check (from docs/getting-started.md):
   - Configured routes render their `site.json` sections
   - Résumé PDF downloads from header
   - Light/dark toggle persists on reload
   - Mobile menu opens, traps focus, closes on Esc
   - No phone number anywhere on the page

Report pass/fail for each item.

This is the deterministic **build-gate** lens of the `build-page` Review stage (`docs/page-improvement-workflow.md`).
