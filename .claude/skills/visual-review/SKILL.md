---
name: visual-review
description: >-
  Audit webpage visual appearance and polish for the portfolio site. Systematic review of
  hierarchy, whitespace, color restraint, component consistency, theme parity, responsive
  layout, and motion. Use when assessing visual appeal, running a design QA pass, asking
  "does this look good", polishing before go-live, critiquing screenshots, or improving
  overall page aesthetics. Trigger phrases — "visual review", "design audit", "appearance
  check", "polish pass", "does it look professional", "visual appeal", "design QA".
  Typography-specific fixes → typography skill. CSS implementation → css-guide. Content
  changes → content/*.json.
---

# Visual Review Skill

Systematic visual appearance assessment for this portfolio. The site must read as
**credible, senior, and technical**: minimalist, content-first, professionally restrained
(Vercel, Stripe, Linear, Apple references). Not flashy, not template-generic.

**Single source of truth:** [`docs/design-direction.md`](../../../docs/design-direction.md),
[`src/styles/global.css`](../../../src/styles/global.css), [`docs/accessibility.md`](../../../docs/accessibility.md).

## Cross-skill boundaries

| Finding type | Hand off to |
|---|---|
| Font choice, scale, measure, pairing | `typography` |
| CSS rules, tokens, BEM, responsive CSS | `css-guide` |
| Copy, section content, ordering | `content/*.json` + `docs/content-editing.md` |
| WCAG semantics, ARIA, keyboard | `docs/accessibility.md` |
| Visual principles and token values | `docs/design-direction.md` |
| Whole-page iterate/redesign loop | `build-page` workflow — this is its Review lens (`docs/page-improvement-workflow.md`) |

## Review workflow

Run these steps in order. Skip preview only when reviewing static screenshots or diffs.

### 1. Establish scope

Identify the route(s), viewport(s), theme(s), and elements under review. If the request says
"each page" or "full visual review", cover at minimum `/`, `/experience`, `/projects`,
`/research`, `/recognition`, `/contact`, and `/404`.

### 2. Load only the needed sources

Read before judging:

1. `docs/design-direction.md` — principles, tokens, component notes
2. `src/styles/global.css` — implemented tokens
3. Relevant section component(s) under `src/components/`
4. `docs/accessibility.md` — contrast and motion requirements

### 3. Preview the site

```bash
npm run dev
# or after changes:
npm run build && npm run preview
```

Toggle light/dark theme. Check widths: 320px, 390px, 768px, 1280px.

### 4. Inventory page elements

List visible elements before scoring. Typical inventory:

| Area | Elements |
|---|---|
| Global chrome | Header, nav, theme toggle, mobile menu, footer |
| Page lead | Hero, eyebrow, h1, intro copy, CTA group, portrait/monogram |
| Content blocks | Section headings, prose, bullet lists, metrics, timelines |
| Collections | Cards, accordions, link lists, chips, pills, project groups |
| Interaction | Buttons, links, hover states, focus states, expanded states |
| Edge pages | Contact block, 404, empty/error states if present |

Use `references/review-checklist.md` for a comprehensive element-by-element checklist.

### 5. Score each important element

Score 1-5 in each category:

| Category | What to judge |
|---|---|
| Aesthetics | Hierarchy, whitespace, balance, restraint, polish |
| Consistency | Tokens, spacing scale, radii, borders, shadows, component variants |
| Accessibility | Contrast, focus visibility, touch targets, reduced motion, color independence |
| Brand | Senior technical leadership, biopharma/AI credibility, no generic template feel |
| Responsive | Mobile fit, wrapping, grid behavior, zoom/readability |
| Interaction | Hover/focus/active states, motion subtlety, no layout shift |
| Content support | Visuals make credentials easier to scan and understand |

Score anchors:

| Score | Meaning |
|---|---|
| 5 | Portfolio-ready; polished, aligned, and launch-quality |
| 4 | Strong; only minor nits |
| 3 | Acceptable; visibly improvable |
| 2 | Noticeable quality gap; weakens polish or consistency |
| 1 | Blocker; broken, inaccessible, confusing, or off-brand |

For detailed anchors and element-specific rubrics, use `references/element-rubrics.md`.

### 6. Theme, responsive, and interaction pass

Check **light**, **dark**, and **system preference**:

- Text/background contrast holds in both themes
- Borders and shadows visible but subtle in dark mode
- Accent stays sparing in both themes
- No flash of wrong theme on reload
- No horizontal scroll at 320px
- Hover/focus states do not shift layout
- Non-essential motion honors `prefers-reduced-motion`

### 7. Cross-check accessibility visuals

- Body text contrast ≥ 4.5:1 (both themes)
- Large text ≥ 3:1; UI/focus indicators ≥ 3:1
- Information not conveyed by color alone
- Touch targets ≥ 44×44px where practical
- Keyboard focus is visible, ordered, and not hidden by sticky header

Visual review complements but does not replace a full accessibility audit.

## Severity rules

| Severity | Use when |
|---|---|
| Blocker | Broken layout, horizontal scroll, inaccessible contrast/focus, unusable mobile nav, or a visual choice that damages credibility |
| Should fix | Noticeable polish, hierarchy, consistency, brand, or responsive issue that should be fixed before go-live |
| Nit | Small inconsistency that does not affect comprehension, accessibility, or credibility |

Escalate any score of `1` to Blocker. Treat score `2` as at least Should fix. Multiple
repeated `3`s in the same category may become Should fix because they signal system drift.

## Structured output format

Deliver findings first, then a rubric snapshot:

```markdown
## Verdict
Pass / Pass with nits / Needs work

## Findings

| Severity | Page | Element | Category | Evidence | Recommendation | Owner |
|---|---|---|---|---|---|---|
| Blocker | `/projects` | Project cards | Responsive | Cards overflow at 320px. | Adjust grid min width or card padding. | css-guide |

## Rubric Snapshot

| Page | Element | Aesthetic | Consistency | Accessibility | Brand | Responsive | Interaction | Content support | Notes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| `/` | Hero CTA group | 4 | 5 | 4 | 5 | 4 | 4 | 5 | Strong; minor mobile spacing nit. |
```

Use owners:

| Finding type | Owner |
|---|---|
| Font choice, scale, measure, pairing | `typography` |
| CSS rules, tokens, spacing, responsive layout | `css-guide` |
| Copy, section content, ordering | `content/*.json` |
| WCAG semantics, ARIA, keyboard | `accessibility` |

## Portfolio rubric quick pass

Any fail is at least Should fix:

| Criterion | Pass | Fail |
|---|---|---|
| Whitespace | Generous; content breathes | Cramped, edge-to-edge text |
| Accent use | One color for links/CTAs/active nav | Gradients, multi-accent rainbow |
| Hierarchy | Clear h1→h2→body; muted secondaries | Flat wall of same-weight text |
| Components | Cards/chips/buttons consistent | Mixed radii, shadows, border styles |
| Accessibility | Contrast/focus/tap targets hold | Contrast fails or focus disappears |
| Responsive | Mobile feels intentional | Horizontal scroll or broken wraps |
| Tone | Senior technical credibility | Flashy, playful, generic AI template |

## When to load references

| If the task involves… | Read |
|---|---|
| Full page or go-live visual audit | `references/review-checklist.md` |
| Detailed scoring, category anchors, element rubrics | `references/element-rubrics.md` |
| Hierarchy ladder, whitespace, alignment | `references/hierarchy-and-spacing.md` |
| Senior portfolio tone, benchmarks, anti-patterns | `references/portfolio-aesthetic.md` |
| Quick sanity check on one component | Inline workflow and quick rubric only |

## Efficiency: batch findings and parallel checks

- **Batch findings:** Collect all issues in one pass before proposing fixes.
- **Parallel calls:** read independent docs/components together when gathering context.
- **Prioritize blockers:** Fix layout/contrast before nits.
- **One skill per fix type:** Don't mix content edits into a CSS polish pass.

## Quick reference: where to go deeper

| Topic | Reference file |
|---|---|
| Section-by-section audit checklist | [references/review-checklist.md](references/review-checklist.md) |
| Detailed scoring anchors and element rubrics | [references/element-rubrics.md](references/element-rubrics.md) |
| Visual hierarchy, whitespace, grid alignment | [references/hierarchy-and-spacing.md](references/hierarchy-and-spacing.md) |
| Senior tech portfolio tone and anti-patterns | [references/portfolio-aesthetic.md](references/portfolio-aesthetic.md) |
