---
name: page-composition
description: >-
  Compose and sequence a full static page as a paced editorial narrative for the Astro
  portfolio — section order, visual rhythm, and which infographic/visual fits each block.
  Use when arranging a page, deciding section order or rhythm, fixing a page that feels
  repetitive/flat/monotonous, choosing "what visual or infographic should I use here",
  designing the hero / above-the-fold, planning the overview → highlights → CTA flow, or
  giving a page an editorial, magazine-like feel. Trigger phrases — "compose a page",
  "section order", "page rhythm", "page feels repetitive", "what infographic should I use",
  "editorial layout", "page narrative", "above the fold", "lay out this page", "page
  cadence". This skill decides WHAT goes where and in what order. NOT appearance/polish
  critique → visual-review. NOT writing CSS → css-guide. NOT fonts/type scale → typography.
  NOT building/wiring a component → astro-site. NOT editing copy or toggling sections →
  content-editing.
---

# Page Composition Skill

Arrange a static page so it reads like a well-paced magazine article: every section earns its
place, no two adjacent sections share a structure, and visuals appear only where they explain
faster than text. This skill governs **sequence and composition** — not individual component
styling.

> This skill is **Stage 2 (Structure)** of the `build-page` workflow — it also authors the
> page's acceptance brief. Run `/build-page <page>` to drive the full identify → structure →
> change → review → repeat loop; see `docs/page-improvement-workflow.md`.

## The 5 questions (gate every section)

Every section must answer **one** of these. If it answers none, cut it.

| # | Question | Typical section |
|---|---|---|
| 1 | What is this? | Hero, overview/about |
| 2 | Why should I care? | Highlights, impact metrics, benefits |
| 3 | How does it work? | Detailed sections, process/timeline, projects |
| 4 | Why should I trust it? | Stats, affiliations, quotes, awards, publications |
| 5 | What should I do next? | CTA, contact |

## Composition formula (the default cadence)

A strong page alternates structure, visual weight, and background so the eye never settles
into a rut. Canonical order:

```
Hero → Overview → Highlights/cards → Large visual → Detailed section →
Statistics → Timeline → Comparison → Quote → Illustration → FAQ → Final CTA
```

Three rules make it work — apply all three at once:

1. **No two adjacent sections share a structure.** Reorder until neighbors differ (two-column
   ≠ card grid ≠ timeline ≠ quote).
2. **Alternate visual weight.** Heavy (large image, table, dense grid) → light (quote, one
   stat, short text) → medium. Never stack heavy on heavy.
3. **Alternate background/contrast.** `--bg` → `--bg-elev` → `--bg` → accent CTA. Contrast
   segments the page and aids memory.

Aim for **one memorable "moment" every few sections** — an oversized stat, a full-width
visual, a dramatic quote — and a **strong finish** (summary + trust signal + single CTA).

The **hero is the highest-leverage section** — it must answer who/what/why-trust/what-next in
~5 seconds with one primary CTA. Deep dive → `references/hero-anatomy.md`.

## Core moves (condensed)

| Move | What to do |
|---|---|
| Rhythm, not uniformity | Vary layout pattern per section; identical blocks = skimmed page |
| Visual anchor | Give each major section one focal point (stat, image, bold heading, quote) |
| Progressive disclosure | Simple → complex: headline → overview → benefits → process → detail |
| Layered detail | Each section = headline (L1) → summary (L2) → detail (L3); reader stops where satisfied |
| Visual breaks | Insert a quote / stat / image to reset attention after long text |
| Repeating motifs | Reuse corner radius, icon style, accent, spacing scale to unify variety |
| Strategic CTA | Hero, after the value proposition, and at the end — one clear next step each |

## Applying this in THIS repo

This is a content-driven Astro 4 site: **pure semantic HTML + CSS tokens, no JS framework, no
animation/CSS library.** Composition is mostly a content + ordering task, not a CSS task.

- **Change rhythm by reordering, not rewriting.** Section order per page lives in
  `content/site.json` → each page's `sections: string[]` (e.g. home = `hero, about,
  featured-projects, impact, leadership, skills, timeline, affiliations,
  featured-publications, contact-teaser`). `SectionRenderer.astro` maps each ID to its
  component. Reorder/show/hide there — see the `content-editing` skill.
- **Build new section types from existing primitives**, don't reinvent: stats →
  `MetricCard.astro` + `.metric-grid`; timeline → `CareerTimeline.astro`; pull quote →
  `LeadershipPhilosophy.astro`; icon/feature cards → `Card.astro` + `Icon.astro` /
  `ScanCard.astro`; tags → `Chip.astro`; two-column text+media → `Hero.astro` /
  `Contact.astro` pattern; section landmark + heading → `Section.astro`. For the construction
  recipes of each visual (no-JS markup + static SVG charts) → hand off to `infographics`;
  wiring a genuinely new component → hand off to `astro-site`.
- **Respect the tokens** in `src/styles/global.css`: spacing `--space-*`, fluid type
  `--fs-h1/h2/metric`, `--bg`/`--bg-elev`/`--accent` for the 60/30/10 split, `--radius`.
  Don't hardcode values — see `css-guide`.
- **Never add** carousels, sliders, or competing hero visuals, or rely on animation for the
  narrative. The page must read fully static.

## When to load references

| If the task involves… | Read |
|---|---|
| Reorder one page's sections for better rhythm | This file's formula + `content/site.json` — no reference load |
| The full rhythm/weight/contrast rule set (rules 1–20) | `references/composition-formula.md` |
| Which section type answers which question + page skeleton | `references/section-catalog.md` |
| Designing the hero/header — fields, anatomy, 5s test, CTAs | `references/hero-anatomy.md` |
| "What visual/infographic should I use here" + how to build it no-JS | `references/infographic-catalog.md` |
| Pre-publish composition sign-off | `references/review-checklist.md` |

## Quick reference: where to go deeper

| Topic | Reference file |
|---|---|
| Rhythm, visual weight, contrast, progressive disclosure, editorial pacing (rules 1–20 + formula) | [references/composition-formula.md](references/composition-formula.md) |
| Recommended page structure mapped to repo sections, tagged by question + weight | [references/section-catalog.md](references/section-catalog.md) |
| Hero/header anatomy — fields, 5-second test, CTA rules, optional enhancements | [references/hero-anatomy.md](references/hero-anatomy.md) |
| Content-type → visual matrix, re-mapped to no-JS CSS implementations here | [references/infographic-catalog.md](references/infographic-catalog.md) |
| Visual + final pre-publish composition checklist | [references/review-checklist.md](references/review-checklist.md) |

## Efficiency: batch edits and parallel calls

- **Batch edits:** combine multiple section reorderings/edits to one file (e.g.
  `content/site.json`) into a single Edit call.
- **Parallel calls:** read `site.json`, the target section components, and `global.css`
  tokens in one message before composing.
- **Read before edit:** read each file once, plan the full new section order, then apply the
  fewest edits.
