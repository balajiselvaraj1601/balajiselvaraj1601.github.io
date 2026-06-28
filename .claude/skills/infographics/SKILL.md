---
name: infographics
description: >-
  Build an infographic or data-visual in this no-JS Astro portfolio — and know when to
  generate one as a static image instead. Use for "build an infographic", "stat cards / big
  numbers", "process or workflow flow", "comparison table", "timeline visual", "journey map",
  "tree / hierarchy / org diagram", "data chart" (bar/line/donut/progress ring), "network /
  ecosystem diagram", "visualize this data", "make this section more visual". Teaches HOW to
  construct each type from existing components + CSS tokens (semantic HTML + static SVG, no
  charting library), plus the handoff to generate a static infographic image asset when
  HTML/CSS/SVG cannot express it. Do NOT use to decide WHICH visual a section needs or section
  order → page-composition. NOT general CSS polish/tokens → css-guide. NOT wiring a brand-new
  reusable `.astro` component/section ID → astro-site. NOT generating/refining the image asset
  itself → refine-image. NOT fonts/type scale → typography.
---

# Infographics Skill

Construct infographics for this content-driven **Astro 4** site. The page is **pure semantic
HTML + CSS tokens — no JS framework, no charting/animation library**. An infographic earns its
place only when it explains a fact **faster than the prose it replaces**; otherwise use text.

This skill covers **HOW to build** the visual. Deciding *which* visual a section needs and in
what order is `page-composition` — load that first if the choice isn't already made. Within the
`build-page` workflow, building a section's visual is part of Stage 3 (Change); see
`docs/page-improvement-workflow.md`.

## Build order (always, in this priority)

1. **Reuse an existing component** before writing markup — see the table below.
2. **Compose from primitives** (`Card`, `Chip`, `Icon`, a grid/flex row) when no component fits.
3. **Hand-author static SVG** for true charts/diagrams (bar, line, donut, network) — no client lib.
4. **Generate a static image asset** only when 1–3 can't express it → `references/image-asset-pipeline.md`.

Never hardcode color/spacing/size — use the tokens in `src/styles/global.css` (`--space-*`,
`--radius`/`--radius-sm`, `--bg-elev`, `--border`/`--border-strong`, `--accent`/`--accent-soft`,
`--text`/`--text-muted`, `--fs-metric`/`--fs-h2`/`--fs-small`, `--font-display`/`--font-mono`).

## Type → how to build it (the 80% case)

| Infographic type | Build it with | Escalate to image only if… |
|---|---|---|
| Big statistic / KPI | `MetricCard.astro` in a CSS grid (`.card`, `--fs-metric`, `--accent`) | never — always in-site |
| Icon / feature cards | `Card.astro` or `ScanCard.astro` + `Icon.astro` in a grid | never |
| Process / workflow flow | flex row of `Card`/`Chip` nodes joined by `→` (`aria-hidden` separators) | >6 nodes or non-linear branching |
| Step / journey map | `JourneyRow.astro` + `JourneyNode.astro`, or flex stages with `↓`/`→` | spatial/geographic layout |
| Timeline / milestones | `CareerTimeline.astro` (dots + connectors) | never |
| Comparison (A vs B) | semantic `<table>`: `--bg-elev` header, `--border` rules, `--accent` emphasis | >4 columns on mobile |
| Tree / hierarchy / org | nested `<ul>` + CSS connector pseudo-elements, or hand-authored SVG | dense multi-level graph |
| Data chart (bar/line/donut/ring) | hand-authored static SVG → `references/svg-charts.md` | many series or precise plotting |
| Network / ecosystem / architecture | static SVG, or annotated diagram image | photoreal / exploded view |

✅ component exists · compose-from-primitives · SVG · image asset — escalate left→right only
when the simpler tier genuinely can't do the job.

## Non-negotiables

- **No JS for the visual.** The page must read fully static; never add a carousel, slider, or a
  client charting library.
- **Theme + a11y.** Works in light **and** dark (token-driven, `currentColor` in SVG); SVG
  charts get `role="img"` + `<title>`/`<desc>`; decorative glyphs/connectors get `aria-hidden`;
  data also legible as text (caption or adjacent value). Respect `prefers-reduced-motion`.
- **Reuse, don't reinvent.** A genuinely new reusable component is an `astro-site` task, not a
  copy-paste of an existing one.

## When to load references

| If the task involves… | Load |
|---|---|
| Picking one of the listed in-site types (default) | No reference — use the table above |
| Constructing a specific type's markup + tokens | `references/build-recipes.md` |
| A real data chart in hand-authored SVG (bar/line/donut/ring/network) | `references/svg-charts.md` |
| HTML/CSS/SVG can't express it; need a static image asset | `references/image-asset-pipeline.md` |

## Efficiency: batch edits and parallel calls

- **Batch edits:** combine all markup + scoped-CSS changes to one component into a single Edit.
- **Parallel calls:** read the target section, the reused component, and `global.css` tokens in
  one message before building.
- **Read before edit:** read each file once, plan the full visual, then apply the fewest edits.

## Quick reference: where to go deeper

| Topic | Reference file |
|---|---|
| Per-type construction recipes (markup skeleton + which tokens) | [references/build-recipes.md](references/build-recipes.md) |
| Hand-authored static SVG charts — bar, line, donut/ring, network, theming, a11y | [references/svg-charts.md](references/svg-charts.md) |
| Generating a static infographic image asset (last resort) | [references/image-asset-pipeline.md](references/image-asset-pipeline.md) |
