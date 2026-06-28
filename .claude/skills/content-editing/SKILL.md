---
name: content-editing
description: >-
  Edit portfolio site copy via content/*.json with Zod validation. Covers which JSON file
  affects each section, reordering/hiding sections in site.json, adding bullets/projects/skills,
  contact links, schema changes, and privacy rules (no phone). Use when updating site text,
  adding experience or projects, changing tagline/headline, toggling section visibility,
  fixing build validation errors on content, or syncing from résumé. Trigger phrases —
  "update content", "edit JSON", "add a bullet", "change tagline", "hide section",
  "content validation error", "update experience". For SEO meta fields see seo skill.
  For new Astro components see astro-site skill.
---

# Content Editing Skill

All site copy lives in `content/*.json`. Components render data — they never embed strings.
**SSOT:** JSON files validated by `src/schemas.ts` at build time via `src/lib/content.ts`.

## Golden rule

To change what the site **says** → edit JSON.
To change how it **looks** → edit components/CSS (astro-site, css-guide).
To add a new field → schema first, then JSON, then component.

## Cross-skill boundaries

| Task | Owner |
|---|---|
| Edit copy, bullets, links, section order | **content-editing** |
| Add Zod field + render in component | content-editing + `astro-site` |
| SEO meta, OG, JSON-LD | `seo` |
| Visual styling of rendered content | `css-guide` / `visual-review` |
| Résumé → portfolio mapping | `docs/content-map.md` |
| Iterate a whole page end-to-end | `build-page` workflow — this skill is Stage 3 Change (`docs/page-improvement-workflow.md`) |

## Workflow

### 1. Identify the file

| File | Sections | Typical edits |
|---|---|---|
| `site.json` | Global, nav, pages, SEO, résumé | Tagline, section order, visibility |
| `profile.json` | Hero, About, Contact | Summary, email, LinkedIn |
| `experience.json` | Experience timeline | Roles, bullets, tier |
| `projects.json` | Project cards | Summaries, tags, highlights |
| `skills.json` | Skills chips | Categories, skill names |
| Others | See reference table | Publications, awards, etc. |

Full map: `references/content-file-map.md`.

### 2. Edit JSON

- Match existing structure and indentation (2 spaces)
- Use valid JSON — trailing commas break the build
- URLs must be absolute `https://…` where schema requires `.url()`
- Experience bullets: `"tier": "primary"` or `"secondary"` only

### 3. Validate

```bash
npm run build
```

Zod errors show exact path, e.g. `contact.2.href: Invalid url`. Fix and rebuild.

### 4. Preview

```bash
npm run preview
```

Spot-check the affected section(s) in light and dark theme.

## Common tasks (quick)

**Tagline / title:** `site.json` → `tagline`, `title`; sync `profile.json` → `title` for hero.

**Hide a section:** `site.json` → `sections[id].visible: false` and remove id from page's
`sections` array if it should not appear on any route.

**Reorder sections:** Change order in `pages[].sections` — never reorder in `src/pages/`.

**Add experience bullet:**

```json
{ "text": "Achievement with metric.", "tier": "primary" }
```

**Add project card:** `projects.json` → `projects[]` with unique `id` slug. Required fields
in `references/schema-and-validation.md`.

**Update contact:** `profile.json` → `contact[]`. Allowed: `email`, `linkedin`, `kaggle`,
`location`. **Never add phone.**

## Privacy (hard rule)

Before handoff:

```bash
grep -ri phone content/
grep -ri reference content/
```

Both must return nothing. No References section in public content.

## Adding a new content field

1. Extend Zod schema in `src/schemas.ts`
2. Add field to JSON file(s)
3. Update section component to render it
4. `npm run build`

Details: `references/schema-and-validation.md`.

## Re-deriving from résumé

When upstream résumé changes, re-derive affected JSON via `docs/content-map.md` — do not
maintain resume and portfolio independently. See `references/privacy-and-provenance.md`.

## Pre-delivery checklist

- [ ] Only `content/*.json` changed for copy edits (unless new field needs component)
- [ ] `npm run build` passes
- [ ] Privacy greps clean (no phone, no references)
- [ ] External URLs valid and use `https://`
- [ ] Section visibility/order changed only in `site.json`
- [ ] Preview spot-check of edited sections

## Efficiency: batch edits and parallel calls

- **Batch edits** — combine multiple changes to the same content file (e.g. several fields in `site.json`) into the fewest Edit calls; don't re-open the file per field.
- **Read in parallel** — when a change spans several `content/*.json` files, read them all in one parallel batch before editing.
- **Read before edit** — read each file once, plan the full change against `src/schemas.ts`, then apply the minimal edits and run `npm run build` once to validate.

## When to load references

| If the task involves… | Read |
|---|---|
| Which file maps to which section | `references/content-file-map.md` |
| Schema rules, adding fields, validation errors | `references/schema-and-validation.md` |
| Privacy, résumé sync, provenance | `references/privacy-and-provenance.md` |

## Quick reference: where to go deeper

| Topic | Reference file |
|---|---|
| Content file → section mapping | [references/content-file-map.md](references/content-file-map.md) |
| Zod schemas, field rules, validation | [references/schema-and-validation.md](references/schema-and-validation.md) |
| Privacy rules and résumé provenance | [references/privacy-and-provenance.md](references/privacy-and-provenance.md) |
