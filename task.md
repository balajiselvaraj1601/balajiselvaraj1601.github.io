# Open tasks — remaining issues for follow-up agents

Last audited: 2026-07-06, after `27a0aa5` (post-v1.2.0 follow-ups). Every item
below was verified against the working tree on that date; re-verify pointers
before acting (see `docs/audits/refactor-2026-07-06.md` for the refactor ledger).

## 1. Push `main` to origin (needs owner decision) — HIGH

`origin/main` is at `a33739b` (v1.2.0). Local `main` has two unpushed commits:

- `c5d2183` — comprehensive review pass (intentional **visual** changes: Awards
  summary grid, Contact location card, card-shell padding/typography).
- `27a0aa5` — ledger follow-ups (docs, ports SSOT, dual-theme baselines).

Pushing deploys via `deploy.yml`. Because `c5d2183` changes rendering, get the
owner's OK (or a visual review of `docs/reference/screenshots/` diffs) before
pushing. **Done when:** `origin/main` == local `main`, Deploy workflow green.

## 2. Stale `.recog-tile` shell-alias docs in skills — MEDIUM

The `.recog-tile` block class was deleted in `94269ae`; summary tiles now render
via `src/components/ui/RecogTile.astro` as `.theme-card.card` (only
`.recog-tile__count` / `.recog-tile__label` element classes survive —
`.claude/references/design-consistency-contract.md:197` records this). Still
documenting `.recog-tile` as a live Tier-C shell alias:

- `.claude/skills/portfolio-card-shells/SKILL.md` (tier table + base-rule snippet)
- `.claude/skills/portfolio-card-shells/references/card-tiers-and-tokens.md`
  (base rule, tier table, radial-wash row, EX-001)
- `.claude/skills/portfolio-card-shells/references/accent-routing.md` (level-class row)
- `.claude/skills/portfolio-icon-standardization/references/accent-matrix-and-anti-patterns.md`

**Done when:** `grep -rn 'recog-tile' .claude/skills/ | grep -v 'recog-tile__'`
returns nothing that presents `.recog-tile` as a live selector.

## 3. `logo_trophy_badge` mark asset missing (BC5 fallback active) — MEDIUM

`Awards.astro:49` and `Kaggle.astro:35,42` pass `markSlug="logo_trophy_badge"`
to `RecogTile`, whose doc comment says it falls back to `<Icon name="trophy">`
when the SVG asset is absent. No `logo_trophy_badge` asset exists in the repo.
Either produce/install the SVG mark (see `.claude/skills` icon pipeline docs and
`scripts/icons/`) or remove the dead `markSlug` props and the BC5 fallback note.
**Done when:** the tiles render an existing asset, or no code references the slug.

## 4. `main` tracks the stale `pages` mirror remote — LOW (decision)

`git status -sb` reports `main...pages/main [ahead 16]` — the branch tracks the
`balajiselvaraj1601.github.io` mirror remote, which is 16 commits stale, so
ahead/behind output is misleading. Decide: retarget tracking to `origin/main`
(`git branch -u origin/main`) or refresh/retire the mirror remote.

## 5. Unmerged branch `resume/schema-design-consistency` — LOW (decision)

Phase-3 design-token work parked on this branch; merge is pending owner OK.
Re-diff against current `main` before merging — `main` has moved substantially
(v1.2.0 refactor + `c5d2183`).

## 6. Legacy `recog-*` naming rename — OPTIONAL (deferred by design)

The v1.2.0 ledger deliberately deferred renaming live `recog-*` classes: the
fan-out spans agent docs, skills, routing CSV, tests, and frozen audit history
for zero output change. Only pick this up with explicit owner buy-in.

## 7. Stale one-off reference screenshots — LOW

`docs/reference/screenshots/` holds pre-v1.2.0 one-off captures outside the
`SHOTS` baseline set (`full-page-home.png`, `Impact.jpg`, `vision-board*.png`,
`vision-hubs.png`, `vision-intro.png`, `vision-org.png`,
`vision-icons-montage-*.png`). They are referenced by
`docs/audits/logo-manifest.csv` and
`.claude/skills/portfolio-icon-audit/references/content-inventory.md`, so do not
delete blindly — either refresh them, or move them under `docs/audits/` with the
references updated.
