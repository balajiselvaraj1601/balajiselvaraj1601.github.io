---
name: astro-site
description: >-
  Develop and extend the Astro 4 portfolio — pages, layouts, section components, SectionRenderer,
  content pipeline, client JS islands, and build config. Covers adding sections/routes, Astro
  component patterns, Zod content loading, and repo hard rules (sitemap pin). Use when editing
  .astro files, adding a section or page, fixing Astro build errors, configuring astro.config,
  or understanding data flow from JSON to HTML. Trigger phrases — "Astro component", "add section",
  "new page route", "SectionRenderer", "astro build failed", "astro.config". Content JSON →
  content-editing. CSS → css-guide. Deploy → deploy skill.
---

# Astro Site Skill

Astro 4 static portfolio development. **Architecture SSOT:** [`docs/architecture.md`](../../../docs/architecture.md).

```
content/*.json → src/lib/content.ts → src/components/sections/* → src/pages/*.astro → dist/
```

## Hard rules (never break)

1. **`@astrojs/sitemap` pinned to exactly `3.6.0`** — ≥ 3.6.1 requires Astro 5 and crashes Astro 4 build. Do not `npm update` it.
2. **`SITE_URL` SSOT** in `astro.config.mjs` — canonical, OG, sitemap derive from it; sync `public/robots.txt` manually.
3. **Content SSOT** — copy in `content/*.json`, not hardcoded in components.
4. **Section order** from `site.json` pages — never hardcode section lists in route files.
5. **Privacy** — no phone, no References in shipped content.

Details: `references/hard-rules.md`.

## Cross-skill boundaries

| Task | Owner |
|---|---|
| `.astro` components, routes, SectionRenderer | **astro-site** |
| `content/*.json` copy edits | `content-editing` |
| CSS in components / global.css | `css-guide` |
| SEO meta in BaseHead | `seo` |
| GitHub Pages publish | `deploy` |
| Iterate a whole page end-to-end | `build-page` workflow — Stage 3, when a new section/component is needed (`docs/page-improvement-workflow.md`) |

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 4.16, static output |
| Validation | Zod 3 via `src/schemas.ts` |
| Styling | Hand-rolled CSS, scoped `<style>` in components |
| Client JS | Minimal — Header.astro only (theme, menu, reveal behavior) |
| Paths | `@components`, `@lib` aliases in tsconfig |

## Key files

| File | Role |
|---|---|
| `astro.config.mjs` | `SITE_URL`, `base: '/'`, sitemap integration |
| `src/lib/content.ts` | Load + validate JSON, export typed data |
| `src/schemas.ts` | Zod schemas (SSOT for types) |
| `src/components/SectionRenderer.astro` | Section id → component map |
| `src/layouts/Layout.astro` | Chrome: head, header, main, footer |
| `src/components/BaseHead.astro` | Meta, OG, JSON-LD |
| `src/pages/*.astro` | One file per route |

## Add a new section

1. Create `content/new-section.json` + schema in `schemas.ts`
2. Register loader in `content.ts`
3. Create `src/components/sections/NewSection.astro`
4. Add to `SectionRenderer.astro` `SECTIONS` map
5. Add `sections.newId` in `site.json` with `source`, `title`, `visible`
6. Add id to relevant `pages[].sections` array
7. `npm run build`

Full walkthrough: `references/components-and-routing.md`.

## Add a new page route

1. Add `pages[]` entry in `site.json` (id, path, label, seo, sections)
2. Create `src/pages/path.astro`:

```astro
---
import Layout from '@layouts/Layout.astro';
import SectionRenderer from '@components/SectionRenderer.astro';
import { site } from '@lib/content';

const page = site.pages.find((p) => p.id === 'page-id')!;
---
<Layout title={page.seo.title} description={page.seo.description}>
  <SectionRenderer sections={page.sections} />
</Layout>
```

3. Add nav link if needed (Header reads from `site.pages`)
4. `npm run build` — sitemap auto-includes new route

## Component conventions

- Import content from `@lib/content` — never read JSON files directly in components
- Scoped `<style>` for component-specific CSS; use global tokens from `global.css`
- Pass SEO props to Layout → BaseHead
- Client scripts only in Header (or explicit island if added later)
- Section components: one per `content/*.json` source, id matches `site.json` sections key

## Client JavaScript scope

Progressive enhancement in `Header.astro` only:

- Theme toggle + localStorage
- Mobile menu + focus trap
- Header active route + section dot navigation
- Reveal animations (respects reduced motion)

Core content readable without JS (M3 requirement).

## Build and verify

```bash
npm ci
npm run build    # must pass — Zod validates content
npm run preview  # spot-check routes
```

## Pre-delivery checklist

- [ ] No copy hardcoded in components (content/*.json only)
- [ ] New sections registered in SectionRenderer map
- [ ] Schema updated if JSON shape changed
- [ ] `@astrojs/sitemap` still 3.6.0
- [ ] `npm run build` passes
- [ ] No phone/references introduced

## Efficiency: batch edits and parallel calls

- **Read in parallel** — before a multi-file change, read the relevant files together (e.g. `src/lib/content.ts`, `src/schemas.ts`, `SectionRenderer.astro`, `astro.config.mjs`) in one parallel batch.
- **Batch edits** — when adding a section or field, group the schema, content-loader, and component/registration edits into the fewest Edit calls per file.
- **Read before edit** — map the full schema→loader→component change first, then apply minimal edits and run `npm run build` once.

## When to load references

| If the task involves… | Read |
|---|---|
| SectionRenderer, routes, new section/page | `references/components-and-routing.md` |
| content.ts, schemas.ts, data flow | `references/content-pipeline.md` |
| Sitemap pin, SITE_URL, npm constraints | `references/hard-rules.md` |

## Quick reference: where to go deeper

| Topic | Reference file |
|---|---|
| Components, routing, SectionRenderer | [references/components-and-routing.md](references/components-and-routing.md) |
| Content loading and Zod pipeline | [references/content-pipeline.md](references/content-pipeline.md) |
| Hard rules and config constraints | [references/hard-rules.md](references/hard-rules.md) |
