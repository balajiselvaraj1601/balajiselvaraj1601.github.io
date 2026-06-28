---
name: seo
description: >-
  Manage SEO for the Astro portfolio — meta tags, OpenGraph, Twitter cards, JSON-LD Person
  schema, sitemap, robots.txt, canonical URLs, and OG image. Use when updating page titles,
  meta descriptions, social preview, structured data, sitemap issues, robots.txt, site URL
  changes, or running an SEO audit. Trigger phrases — "SEO", "meta tags", "OpenGraph",
  "Twitter card", "JSON-LD", "sitemap", "robots.txt", "og:image", "canonical URL",
  "Rich Results". Content copy in site.json → content-editing skill. URL deploy → deploy skill.
---

# SEO Skill

SEO contract for the static portfolio. **SSOT for copy:** `content/site.json` → `seo` and
per-page `pages[].seo`. **SSOT for URL:** `SITE_URL` in `astro.config.mjs`. **Renderer:**
`src/components/BaseHead.astro`.

Live site: https://balajiselvaraj1601.github.io

## Cross-skill boundaries

| Task | Owner |
|---|---|
| SEO title, description, keywords in JSON | **seo** (+ `content-editing` for JSON edits) |
| OG image file | `public/assets/og/` — see `docs/assets.md` |
| HTML meta implementation | `BaseHead.astro` |
| Heading hierarchy on page | `accessibility` / `visual-review` |
| Change live URL / domain | `deploy` skill |
| Sitemap package version | `astro-site` hard rules (pin 3.6.0) |
| Iterate a whole page end-to-end | `build-page` workflow — this skill is a Review lens (`docs/page-improvement-workflow.md`) |

## What is implemented

| Item | Source |
|---|---|
| `<title>`, description, keywords | `site.json` → `BaseHead.astro` |
| Canonical URL | `Astro.site` + page path |
| OpenGraph + Twitter | `BaseHead.astro` |
| JSON-LD `Person` | Built from `profile.json` + keywords |
| Sitemap | `@astrojs/sitemap` → `dist/sitemap-index.xml` |
| robots.txt | `public/robots.txt` (manual — sync with SITE_URL) |
| OG image | `/assets/og/og-image.png` (1200×630) |
| `lang="en"` | `Layout.astro` |

## Workflow: update SEO copy

1. Edit `content/site.json`:
   - Global: `seo.title`, `seo.description`, `seo.keywords`, `seo.ogImage`
   - Per-page: `pages[n].seo.title`, `pages[n].seo.description`
2. Keep `profile.json` aligned (name, title, contact) for JSON-LD
3. `npm run build && npm run preview`
4. View page source — confirm meta, OG, JSON-LD

```json
{
  "seo": {
    "title": "Balaji Selvaraj — Technical AI Leader",
    "description": "One compelling sentence under 160 characters.",
    "keywords": ["Applied AI", "Medical Imaging", "…"],
    "ogImage": "/assets/og/og-image.png",
    "twitterCard": "summary_large_image"
  }
}
```

## Workflow: change site URL

When `SITE_URL` changes (custom domain, etc.):

1. `astro.config.mjs` → `SITE_URL`
2. `public/robots.txt` → `Sitemap:` line (same absolute URL)
3. Rebuild — canonical, OG image URLs, sitemap entries auto-update
4. Optional: `public/CNAME` for custom domain

Full steps: `deploy` skill → `references/url-and-domain.md`.

## JSON-LD sync

`Person` schema is build-time from `profile.json`:

- `name`, `jobTitle`, `email`, `address`, `sameAs` (LinkedIn, Kaggle)
- `knowsAbout` from `site.seo.keywords`
- `worksFor` from profile/org context in BaseHead

After contact or keyword changes, verify JSON-LD in page source. Validate post-deploy:
[Google Rich Results Test](https://search.google.com/test/rich-results).

Details: `references/json-ld-and-sitemap.md`.

## Sitemap rules

- **Auto-generated** — do not hand-edit XML in `dist/`
- New routes under `src/pages/` auto-include on build
- Package pinned at `@astrojs/sitemap@3.6.0` (Astro 4 compat) — see astro-site hard rules

## Pre-delivery checklist

- [ ] Unique, descriptive `<title>` per page (not duplicate generic titles)
- [ ] Meta description 120–160 chars, human-readable
- [ ] OG image exists at path in `seo.ogImage`; 1200×630, < 1 MB
- [ ] `og:image:alt` set in BaseHead
- [ ] Canonical URL absolute and correct
- [ ] `robots.txt` Sitemap URL matches `SITE_URL`
- [ ] `sitemap-index.xml` in build output
- [ ] One `<h1>` per page (SEO + a11y)
- [ ] Link text descriptive (not "click here")
- [ ] No phone in JSON-LD or visible content

## When to load references

| If the task involves… | Read |
|---|---|
| OG, Twitter, meta tag details | `references/meta-and-social-tags.md` |
| JSON-LD, sitemap, robots | `references/json-ld-and-sitemap.md` |
| Full SEO audit checklist | `references/seo-checklist.md` |

## Quick reference: where to go deeper

| Topic | Reference file |
|---|---|
| OpenGraph, Twitter, meta tags | [references/meta-and-social-tags.md](references/meta-and-social-tags.md) |
| JSON-LD Person, sitemap, robots.txt | [references/json-ld-and-sitemap.md](references/json-ld-and-sitemap.md) |
| Pre-launch SEO audit checklist | [references/seo-checklist.md](references/seo-checklist.md) |
