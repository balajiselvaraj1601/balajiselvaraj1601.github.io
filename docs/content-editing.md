# Content Editing

How to change what the site says without touching components.

## Golden rule

**All copy lives in JSON under `content/`.** Components render data; they do not embed text.
If you need a new field, update `src/schemas.ts` first, then the JSON, then the component.

## Workflow

1. Edit the relevant JSON file under `content/`.
2. Run `npm run build` — Zod validation runs automatically.
3. Fix any schema errors (the build output shows the exact field path).
4. Preview with `npm run preview` and spot-check the section.

If the change affects page structure, section order, or the overall narrative, update
`content/site.json` first and keep the route files generic.

## File reference

| File | Sections affected | Typical edits |
|------|-------------------|---------------|
| `site.json` | Global meta, nav, pages, SEO, résumé link | Title, tagline, nav labels, page sections, hide a section |
| `person/profile.json` | Hero, About, Leadership, Contact | Headline, metrics, CTAs, about cards, contact interests |
| `person/affiliations.json` | Affiliations strip | Organization names |
| `work/strategic-impact.json` | Strategic Impact | `metrics[]` and `highlights[]` |
| `work/experience.json` | Experience timeline, Career timeline | Roles, optional `mission`, bullets, tier |
| `work/projects.json` | Project cards, Featured projects | Summaries, case-study fields, `featured`, tags |
| `work/skills.json` | Skills | Categories and skill chips |
| `work/mentorship.json` | Mentorship | Bullet items |
| `research/generative-ai.json` | Generative AI | Bullet items |
| `research/publications.json` | Publications | Title + URL links |
| `research/conferences.json` | Conferences | Title + URL links |
| `recognition/education.json` | Education | Degree records |
| `recognition/awards.json` | Awards | Label + detail rows |
| `recognition/kaggle.json` | Kaggle | Rank line + competition links |

Provenance and résumé mapping: [Content map](./content-map.md) · [content/README.md](../content/README.md).

## Common tasks

### Change the headline or tagline

Edit `content/site.json`:

```json
{
  "title": "Technical AI Leader",
  "tagline": "Your one-line positioning statement."
}
```

Also update `person/profile.json` → `title` if the hero should match.

### Reorder, move, or hide a section

Edit `content/site.json`:

- **Reorder within a page** — change the order of ids in that page's `pages[].sections` array.
- **Move to another page** — move the id from one page's `sections` array to another's.
- **Show/hide** — toggle `sections[id].visible`.

Do **not** reorder sections in the route files under `src/pages/` — each route renders the
section list from its `pages` entry in `site.json` via `SectionRenderer`.

### Update SEO meta

Edit `content/site.json` → `seo`:

```json
{
  "seo": {
    "title": "Balaji Selvaraj — Technical AI Leader",
    "description": "…",
    "keywords": ["…"],
    "ogImage": "/assets/og/og-image.png",
    "twitterCard": "summary_large_image"
  }
}
```

OG image path is relative to site root. Implementation: [SEO](./seo.md).

### Add an experience bullet

Edit `content/work/experience.json` → find the role → project → `bullets` array:

```json
{
  "text": "Your bullet text.",
  "tier": "primary"
}
```

Use `"tier": "secondary"` for supporting bullets (rendered with muted styling).

### Add a project card

Edit `content/work/projects.json` → `projects` array. Required fields:

```json
{
  "id": "unique-slug",
  "name": "Project Name",
  "org": "Organization",
  "period": "2023–Present",
  "role": "AI Lead",
  "summary": "One-line summary.",
  "highlights": ["Highlight 1", "Highlight 2"],
  "tags": ["Tag1", "Tag2"],
  "domain": "Domain label"
}
```

Keep summaries consistent with `work/experience.json` — `work/projects.json` is a derived card view.

### Update contact links

Edit `content/person/profile.json` → `contact` array. Allowed public types: `email`, `linkedin`,
`kaggle`, `location`.

```json
{
  "type": "email",
  "label": "balaji.selvaraj.ai@outlook.com",
  "value": "balaji.selvaraj.ai@outlook.com",
  "href": "mailto:balaji.selvaraj.ai@outlook.com",
  "icon": "email"
}
```

**Never add a phone number** — public-site privacy rule.

## Schema rules

Schemas live in `src/schemas.ts`. Key constraints:

| Schema | Notable rules |
|--------|---------------|
| `siteSchema` | internal `pages[]` entries require `seo` and `sections`; external entries require `external: true`; `resume.path` is a site-root path |
| `profileSchema` | hero/about/contact fields drive the public profile; `contact[].href` is nullable for location |
| `experienceSchema` | `tier` must be `"primary"` or `"secondary"`; `period.end` nullable |
| `projectsSchema` | `id` must be unique slug; `highlights` and `tags` are string arrays |
| `linkListSchema` | Publications/conferences: `url` must be valid URL |
| `kaggleSchema` | `profile` URL required; `items[].url` must be valid |

Adding a new field:

1. Extend the Zod schema in `src/schemas.ts`
2. Add the field to the JSON file
3. Update the section component to render it
4. Run `npm run build`

## Re-deriving from the résumé

When the upstream résumé changes (`resume_builder/.../resume_healthcare.json`):

1. Re-derive affected JSON files under `content/` (do not edit resume and portfolio independently).
2. Follow the mapping in [Content map](./content-map.md).
3. Re-run privacy greps — no phone, no references:

```bash
grep -ri phone content/
grep -ri reference content/
```

Both should return nothing.

## Validation errors

Example build failure:

```
Invalid content in profile.json:
  • contact.2.href: Invalid url
```

Fix the JSON field at that path and rebuild. See [Troubleshooting](./troubleshooting.md).

## Related docs

- [Assets](./assets.md) — résumé PDF, images (not JSON)
- [Specification](./specification.md) — per-section rendering contracts
- [Architecture](./architecture.md) — how content flows to components
