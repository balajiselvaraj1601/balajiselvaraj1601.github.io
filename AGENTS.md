# AGENTS.md — Portfolio Site

## What This Repo Is

A production-focused **Astro 4** portfolio for **Balaji Selvaraj** (Technical AI Leader),
deployed to GitHub Pages as a user site at <https://balajiselvaraj1601.github.io>.
Everything renders from a Zod-validated JSON content layer; components should not hardcode
public copy.

```text
content/**/*.json -> src/lib/content.ts -> src/schemas.ts -> src/components/SectionRenderer.astro -> src/pages/*.astro
```

## Working Rules

- Keep changes surgical and aligned with the existing Astro/component style.
- Change public copy in `content/`, not in components.
- Update `src/schemas.ts` before adding or changing JSON fields.
- Keep route section order in `content/site.json`; route files should stay generic.
- Run `npm run build` before handoff after code or content changes.

## Page structure

The site is a **single-page home** (`/`) that renders every section once. Header nav
activates **views** (About, Experience, Projects, Research, …) via client-side filtering
in `src/scripts/section-views.ts`. Legacy paths (`/research`, `/experience`, …) redirect
to `/#{viewAnchor}` on `/`.

Routing and view wiring live in `content/site.json → pages`:
- **`home.sections`** — full DOM order on `/` (each section id once).
- **`pages[].viewSections`** — sections shown when that nav item is active.
- **`pages[].viewAnchor`** — URL hash for the view (home uses `about`).

Section contracts: `docs/specification.md` and `docs/page-briefs/`.

### Route map

```text
/              About (home)     → all sections; default view shows About subset
/#experience   Experience view  → experience-intro, experience, mentorship, impact
/#projects     Projects view    → projects-intro, featured-case-studies, projects
/#research     Research view    → publications, conferences, speakers
/#recognition  Recognition view → awards, kaggle, education
/#vision       Vision view      → vision-board
/#contact      Contact view     → contact
/experience … /contact         → redirect stubs → /#{viewAnchor}
/assets/...    Resume (PDF)     → external nav link
```

| View | Page id | Nav label | `viewSections` |
|---|---|---|---|
| `/` (default) | `home` | About | hero, about, featured-case-studies, impact, vision-board, leadership, skills, timeline |
| `/#experience` | `experience` | Experience | experience-intro, experience, mentorship, impact |
| `/#projects` | `projects` | Projects | projects-intro, featured-case-studies, projects |
| `/#research` | `research` | Research | publications, conferences, speakers |
| `/#recognition` | `recognition` | Recognition | awards, kaggle, education |
| `/#vision` | `vision` | Vision | vision-board |
| `/#contact` | `contact` | Contact | contact |

**Full home DOM order** (20 sections): hero → about → featured-case-studies → impact →
vision-board → leadership → skills → timeline → experience-intro → experience → mentorship →
projects-intro → projects → publications → conferences → speakers → awards → kaggle →
education → contact.

### Shared sections across views

| Section id | Views | Component |
|---|---|---|
| `featured-case-studies` | About, Projects | `FeaturedCaseStudies.astro` |
| `impact` | About, Experience | `Impact.astro` |
| `vision-board` | About, Vision | `VisionBoard.astro` |

### `SectionRenderer` pageId variants

| Condition | Prop | Effect |
|---|---|---|
| `timeline` + `pageId === 'home'` | `compact` | Hides “Full experience →” CTA on static rail |

When `navViews={true}`, sections are wrapped with `data-nav-views` for client filtering.
See `src/scripts/section-views.ts` and `sectionViewMap` in `src/lib/content.ts`.

## Hard Rules

1. `@astrojs/sitemap` is pinned to exactly `3.6.0`. Do not loosen or upgrade it unless
   migrating the whole site to Astro 5.
2. `SITE_URL` in `astro.config.mjs` is the source of truth for canonical URLs, OG URLs,
   and sitemap generation. Keep `public/robots.txt` in sync if the URL changes.
3. Never publish a phone number or a References section.
4. Do not commit `dist/`; CI rebuilds it through `.github/workflows/deploy.yml`.

## Commands

| Task | Command |
|---|---|
| Install pinned dependencies | `npm ci` |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Preview build | `npm run preview` |

## Documentation

| Area | Read |
|---|---|
| Icon / logo audit (Claude skill) | `.claude/skills/portfolio-icon-audit/SKILL.md` |
| UI icon sourcing (Lucide / Iconify) | `../.claude/skills/ui-icon-acquisition/SKILL.md` |
| Logo evaluation / favicon scoring | `../.claude/skills/brand-logo-evaluation/SKILL.md` |
| Logo SVG authoring | `../image_gen/.claude/skills/logo-emblem-author/SKILL.md` |
| Setup and commands | `docs/getting-started.md` |
| Architecture and data flow | `docs/architecture.md` |
| Content editing | `docs/content-editing.md`, `content/README.md` |
| Section contracts | `docs/specification.md` |
| Per-route section intent | `docs/page-briefs/` |
| SEO and metadata | `docs/seo.md` |
| Assets | `docs/assets.md` |
| Accessibility | `docs/accessibility.md` |
| Deployment | `docs/deployment.md`, `docs/go-live-checklist.md` |
| Build issues | `docs/troubleshooting.md` |
