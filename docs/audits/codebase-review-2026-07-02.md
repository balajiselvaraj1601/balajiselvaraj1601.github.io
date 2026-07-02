# Codebase Review — 2026-07-02

**Method:** 10 parallel Haiku review agents (sections ×2, cards, ui/chrome/layouts, pages/libs, client scripts/CSS, content-vs-schema, pipeline scripts, config/hygiene, cross-cutting a11y/SEO/SSOT) + toolchain ground truth (`astro check`, `eslint`, `prettier --check`, `astro build`). Every Critical/High agent claim was independently spot-verified by the orchestrator against the actual files; refuted claims are listed in the appendix. **Read-only review — no fixes applied.**

**Scope:** `src/`, `content/`, `scripts/`, `tests/`, configs, repo hygiene. Excluded: `dist/`, `node_modules/`, `.claude/`/`.cursor/` agent tooling internals.

---

## Executive summary

| Severity | Count |
| -------- | ----- |
| Critical | 0     |
| High     | 5     |
| Medium   | 22    |
| Low      | 11    |
| Nit      | 1     |

> **Resolution status (2026-07-02, same day):** All findings below were remediated by a follow-up multi-agent fix pass, verified by `npm run verify` (0 errors/warnings/hints, prettier clean, 8-page build) plus visual sanity screenshots of the vision board, education tiles, and header. Exceptions:
>
> - **Deferred by decision:** M-22 (screenshots stay in git), L-5 (print colors intentional), L-7 (unloaded drafts — content decision), L-10 (`~/` dir holds live `.agentmemory`).
> - **Finding corrected:** L-6 — the `kaggle` entity IS referenced (strategic-impact.json, vision-board.json, site.json, profile.json); kept.
> - **L-1 fix differed from finding:** `Props` in BoardHeader.astro is the live props contract; the hint was silenced with `Astro.props as Props`, not deletion.
> - **L-11:** MPA-assumption comments added; no teardown refactor (not needed until view transitions).

The site is in good shape structurally: `astro build` passes, ESLint is clean, types are derived from Zod schemas via `z.infer`, content is validated at build time with good error messages, and a11y/SEO baselines (unique titles, single h1s, global `:focus-visible`, `rel` on external links) held up under sweep. The issues are concentrated in four themes: **(1) CI is currently red** (Prettier), **(2) SSOT drift** (duplicated constants, hardcoded copy that bypasses the content system), **(3) tracked build artifacts** in git, and **(4) content-data inconsistencies** between JSON files.

### Top findings

1. **`npm run verify` fails** — `prettier --check` rejects 16 markdown files (H-1).
2. **`MEDALS` constant defined twice** — `schemas.ts:534` and `recognition.ts:17`; the comment claims re-export but it's a redefinition (H-2).
3. **94 generated PNGs tracked in git** under `scripts/.icon-stage/` despite `.gitignore:36` — ignore rules don't apply to already-tracked files (H-3).
4. **`Vision.astro` is dead code** — never imported; `SectionRenderer` only registers `VisionBoard` (H-4).
5. **`ResearchDomainMap` hardcodes its content** — domains array lives in the component, violating the site's content-JSON architecture (H-5).
6. **VisionBoard grid is data-fragile** — fixed 5-column grid assumes exactly 2 hubs; data is currently 2 so nothing is broken, but any hub added in JSON breaks the layout (M-1).
7. **Content cross-file drift** — project name, RIKEN/Uppsala/AI Sweden collaborations, and Broad Institute phrasing differ between `profile.json`, `collaborations.json`, `experience.json`, `projects.json` (M-12…M-15).
8. **~10.8 MB of reference screenshots tracked** in git and churning (M-22).

---

## High

- **H-1 | CI | `prettier --check` fails (exit 1) on 16 files** — `AGENTS.md`, `docs/page-team.md`, all `.claude/agents/*.agent.md`, `.claude/references/*`, `.claude/skills/page-consistency-team/*`. `npm run verify` cannot pass until these are formatted or excluded via `.prettierignore`.
- **H-2 | SSOT | `src/lib/recognition.ts:17`** — `export const MEDALS = ['Silver', 'Bronze'] as const;` duplicates `src/schemas.ts:534` verbatim. The doc comment (lines 8–16) states the module "re-exports" the schema definition, but it redefines it — the two can silently diverge.
- **H-3 | Hygiene | `scripts/.icon-stage/` — 94 tracked files** — the path is in `.gitignore:36`, but the files were committed before/despite the rule, so gitignore has no effect. Staging artifacts of `export-icon-svgs.mjs` churn in git history.
- **H-4 | Dead code | `src/components/sections/Vision.astro`** — never imported anywhere; `SectionRenderer.astro:4,31` registers only `VisionBoard` for `'vision-board'`, and `Vision` is not in `SECTION_COMPONENT_IDS`. The file also carries its own issues (double `{vision && ...}` null-check at lines 10/19, hardcoded "Technical Vision" and "Mentorship" headings) which are moot once removed.
- **H-5 | SSOT | `src/components/cards/ResearchDomainMap.astro:11`** — `const domains: Domain[] = [...]` hardcodes label/icon content inside the component, bypassing the content-JSON + Zod pipeline every other data-driven component uses.

## Medium

### Components & layout

- **M-1 | `src/components/sections/VisionBoard.astro:88`** — `.vboard__flow { grid-template-columns: auto auto auto auto minmax(460px, 1fr) }` hardcodes a 5-column flow (hub, arrow, hub, arrow, programs) while the template renders `hubs.map(...)`. `vision-board.json` currently has exactly 2 hubs, so this is latent, not live — but adding a hub in JSON silently breaks the row.
- **M-2 | `src/components/sections/Impact.astro:10,20,51,61`** — `meta = site.sections.impact` is fetched but the eyebrow is hardcoded (`"AI Leadership & Strategic Impact"`), leaving `meta.eyebrow` unused; sub-eyebrow `"Leadership & Organizational Impact"` (line 61) and CTA copy `"See flagship case studies"` (line 51) are also hardcoded. Siblings (Contact, Experience, ExperienceIntro) source these from content config.
- **M-3 | `src/pages/404.astro:6`** — `title="Page not found — Balaji Selvaraj"` hardcodes the author name; `index.astro:11` uses `homePage.seo.title` from content. Description is likewise inline.
- **M-4 | `src/components/chrome/BaseHead.astro:60,65`** — `theme-color` values `#faf8ff` / `#0d0b1e` duplicate the `--bg` token values from `global.css`. Meta tags can't read CSS vars, but the values could live in one shared constant.
- **M-5 | Raw durations bypass `--dur`** — `Header.astro:191-192` (`color 0.2s, background-color 0.2s`), `Header.astro:247` (`spin 0.7s`), `Experience.astro:186` (`background 0.2s`). Rest of codebase uses `var(--dur) var(--ease)`.
- **M-6 | `src/components/chrome/Header.astro:133`** — `box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25)` raw color instead of a shadow token.
- **M-7 | `src/styles/global.css` magic values** — recurring un-tokenized literals: `.recog-tile__icon` 40px (:561), `.recog-search` 38px/200px (:612,616), `.recog-icon` 44px (:735), `h4` 0.9rem (:277), `.btn` padding/0.82rem (:394,400), `.section__subtitle` 0.95rem (:909). Individually minor; collectively they erode the token system.
- **M-8 | `src/components/sections/Education.astro:84,100,133`** — recognition-context class `recog-tile__icon` reused in education markup alongside `edu-*` classes; couples two sections' styling.
- **M-9 | `src/components/sections/ThirukuralQuote.astro:26`** — `alt={quote.imageAlt ?? ''}` silently renders `alt=""` on a content image if `imageAlt` is missing, hiding it from screen readers. Schema-level required `imageAlt` (or a fallback string) would be safer.
- **M-10 | `src/components/sections/Contact.astro:15`** — `actionLabel` collapses every non-email contact type to `'View profile'`; new contact types get a wrong label by default.

### Content data (cross-file consistency)

- **M-12 | `content/work/experience.json:65` vs `content/work/projects.json:44`** — `"Tumor Recurrence Prediction — Translational Oncology"` vs `"Tumor Recurrence Prediction"` for the same project.
- **M-13 | `content/person/profile.json:211`** — `"RIKEN Brain Science Institute"` appears in `vision.collaborations` but not in `collaborations.json`.
- **M-14 | `content/person/collaborations.json:23-31`** — Uppsala University and AI Sweden exist here but not in `profile.json` `vision.collaborations` — the two lists have no owner/derivation relationship.
- **M-15 | `content/person/profile.json:198`** — Broad Institute collaboration detail worded differently from `collaborations.json`'s version of the same fact.

### Pipeline scripts & tooling

- **M-16 | Portability** — `scripts/icon_brightness_lib.py:26` (`WORKSPACE = Path.home() / "workspace"`), `scripts/batch-icon-generate.sh:23`, `scripts/install-vision-logos.sh:14` all assume the `~/workspace` layout; env-var overrides exist in the shell scripts but the Python default has no escape hatch besides editing.
- **M-17 | SSOT** — icon-set names (`icon_box`, `icon_kaggle`, `icon_multimodal`) and their per-set flags duplicated across `batch-icon-generate.sh:53,107`, `icon_brightness_lib.py:29-48`, `install-vision-logos.sh:17-19` instead of one shared config.
- **M-18 | `scripts/requirements-logos.txt`** — lists only Pillow + playwright; `icon_brightness_lib.py` also needs numpy/svgelements/cairosvg, so a fresh `pip install -r` doesn't reproduce the environment.
- **M-19 | Duplicate docs** — `scripts/SVG-ICON-GENERATOR.md` and `scripts/svg-icon-generation-guide.md` overlap; one references the other as "full methodology".
- **M-20 | `scripts/svg-icon-generator.py:605,29`** — `json.loads(Path(args.config).read_text())` sits outside the try/except (invalid config JSON → raw traceback); unused `import os` at line 29.

### Repo hygiene

- **M-21 | `tasks.md` vs `TASKS.md`** — both tracked at root; lowercase `tasks.md` references external directories (`~/workspace/icon_multimodal` etc.) and is referenced nowhere, while `TASKS.md` is the active queue named in `AGENTS.md`. Confusing duplicate, and a hazard on case-insensitive filesystems.
- **M-22 | `docs/reference/screenshots/`** — ~10.8 MB of PNG/JPG tracked and regularly modified (5 modified in the current working tree). Git history will grow without bound; consider Git LFS or excluding regenerable baselines.

## Low

- **L-1 | `src/components/chrome/BoardHeader.astro:4`** — unused `Props` interface (the one `astro check` hint).
- **L-2 | `src/scripts/section-views.ts:29,104`** — selector `a[data-view-anchor]` duplicated within the file; extract a constant.
- **L-3 | `src/styles/global.css:423`** — `.btn-primary:hover { filter: none; }` is a no-op (no filter is ever set).
- **L-4 | `src/styles/global.css:296`** — `ul, ol { padding-left: 1.1em }` un-tokenized (consistent with M-7 theme).
- **L-5 | `src/styles/global.css:945-950`** — print styles use raw `#000`/`#fff` (arguably fine for print, but inconsistent).
- **L-6 | `content/entities.json:46`** — `kaggle` entity defined but never referenced by any content file.
- **L-7 | `content/drafts/competitions/`** — 16 markdown drafts not loaded by `content.ts` (only `generative-ai.json` is); confirm intentional or archive.
- **L-8 | Hardcoded sizes in UI chrome** — `AvailabilityBadge.astro:37-38` (8px dot, duplicated concept with DotNav), `Footer.astro:44` (`Icon size={18}`).
- **L-9 | `src/components/sections/Education.astro:242`** — `.edu-field { white-space: nowrap }` risks overflow with long field names on narrow viewports.
- **L-10 | Literal `~/` directory at repo root** — contains `.agentmemory`; untracked and gitignored, but a `rm -rf ~` typo-hazard and confusing. Likely created by a tool misinterpreting `~`.
- **L-11 | Future-proofing note** — `src/scripts/*.ts` attach window/document listeners and IntersectionObservers with no teardown. Harmless today (MPA, full page loads — verified: no `ViewTransitions`/`ClientRouter`/`astro:page-load` anywhere), but if Astro view transitions are ever enabled, every one of these becomes a real leak. Worth a comment or an `AbortController` pattern when that day comes.

## Nit

- **N-1 | `src/components/cards/MetricCard.astro:4`** — comment says "`detail` is intentionally not rendered" directly above code that renders `{detail && ...}` (line 15).

---

## Toolchain results (ground truth)

| Check                  | Result                                            |
| ---------------------- | ------------------------------------------------- |
| `astro check`          | 0 errors, 0 warnings, 1 hint (L-1)                |
| `eslint .`             | clean                                             |
| `prettier --check .`   | **FAIL** — 16 files (H-1)                         |
| `astro build`          | success — 8 pages, sitemap generated              |

## Appendix — agent claims refuted during verification

Recorded so future audits don't re-raise them:

1. **"Broken link `href="/#projects"`" (Impact.astro:50, 404.astro:20)** — not broken. `projects` is a valid view anchor: `content/site.json` `pages[2].id = "projects"`, and `content.ts:336` resolves `anchor = page.viewAnchor ?? page.id`; `section-views.ts` routes the hash to the view's first section.
2. **"Missing `:focus-visible`" on Header/Footer interactive elements (4 claims)** — covered by the universal rule at `global.css:304` (`:focus-visible { outline: 2px solid var(--focus-ring) … }`). That's the SSOT pattern working as intended.
3. **9 "Critical" listener/observer leaks in `src/scripts/`** — downgraded to L-11. The site is a full-page-load MPA; scripts execute once per document. No soft-navigation mechanism exists in the codebase.
4. **VisionBoard grid "Critical"** — downgraded to M-1: current data (2 hubs) renders correctly; the issue is latent fragility, not a live break.

## Positive observations

- All TypeScript types derive from Zod schemas via `z.infer` — no parallel interfaces found (except the two constants in H-2).
- `content.ts` validates all JSON at build time with actionable error messages; entity references and logo asset paths are checked.
- A11y sweep found no missing `alt` on content images (besides M-9's fallback), no `target="_blank"` without `rel`, one `h1` per page, and consistent aria usage on interactive chrome.
- Pages are uniform: every view page follows the same redirect/layout pattern.
- `__pycache__`, `dist/`, `_shelved/`, and the `~/` directory are all correctly untracked.
