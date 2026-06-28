---
name: deploy
description: >-
  Deploy the Astro portfolio to GitHub Pages — CI workflow, user-site repo setup, go-live
  checklist, local build verification, custom domain, and URL sync. Use when publishing the
  site, fixing deploy failures, enabling GitHub Pages, pushing to production, running go-live
  checklist, or changing SITE_URL/domain. Trigger phrases — "deploy", "GitHub Pages", "go live",
  "publish site", "production URL", "custom domain", "CNAME", "deploy workflow failed".
  Astro config rules → astro-site. SEO URL sync → seo skill.
---

# Deploy Skill

GitHub Pages deployment for the static Astro portfolio. **SSOT:**
[`docs/deployment.md`](../../../docs/deployment.md) · [`docs/go-live-checklist.md`](../../../docs/go-live-checklist.md).

| Item | Value |
|---|---|
| Production repo | `balajiselvaraj1601/balajiselvaraj1601.github.io` |
| Staging mirror | `balajiselvaraj1601/portfolio_site` (build only) |
| Live URL | https://balajiselvaraj1601.github.io |
| Trigger | Push to `main` |
| Output | `dist/` via GitHub Actions |

## Cross-skill boundaries

| Task | Owner |
|---|---|
| GitHub Pages setup, CI, go-live | **deploy** |
| `SITE_URL`, `base`, sitemap pin | `astro-site` → hard-rules |
| robots.txt Sitemap line sync | `deploy` + `seo` |
| Pre-deploy content/a11y/SEO checks | `content-editing`, `accessibility`, `seo`, `visual-review` |
| Build errors in Astro/Zod | `astro-site`, `content-editing` |
| Iterate a page before publishing | `build-page` workflow — runs the pre-publish loop (`docs/page-improvement-workflow.md`) |

## CI/CD workflow

`.github/workflows/deploy.yml` on push to `main`:

1. `npm ci`
2. `npm run build` → `dist/`
3. Upload Pages artifact
4. Deploy to GitHub Pages

**Deploy gate:**

```yaml
if: github.repository == 'balajiselvaraj1601/balajiselvaraj1601.github.io'
```

Staging repo runs build job only — validates without publishing.

## Pre-deploy workflow (local)

Always run before push:

```bash
npm ci
npm run build
npm run preview
```

### Phase 1 checks

- [ ] Build passes (Zod validation included)
- [ ] Privacy greps clean (`grep -ri phone content/`)
- [ ] Résumé PDF at `/assets/resume/balaji-selvaraj-resume.pdf`
- [ ] OG image at `/assets/og/og-image.png`
- [ ] Light/dark toggle, mobile menu, external links work
- [ ] `dist/robots.txt`, `dist/sitemap-index.xml`, `dist/.nojekyll` present

Full list: `references/go-live-verification.md`.

## GitHub setup (first publish)

1. Create public repo `balajiselvaraj1601/balajiselvaraj1601.github.io`
2. Push codebase to `main`
3. **Settings → Pages → Source: GitHub Actions**
4. Confirm workflow completes green
5. Verify https://balajiselvaraj1601.github.io loads

Details: `references/github-pages-setup.md`.

## Push commands

```bash
# Production (triggers deploy)
git remote add origin https://github.com/balajiselvaraj1601/balajiselvaraj1601.github.io.git
git push -u origin main

# Staging first (build only)
git remote add origin https://github.com/balajiselvaraj1601/portfolio_site.git
git push -u origin main
```

Authenticate as **balajiselvaraj1601** (`gh auth login`).

## Custom domain (optional C4)

1. Add `public/CNAME` with domain name
2. Configure DNS (A/ALIAS or CNAME to GitHub Pages)
3. Update `SITE_URL` in `astro.config.mjs`
4. Update `Sitemap:` in `public/robots.txt`
5. Rebuild, push, verify HTTPS

Details: `references/url-and-domain.md`.

## Post-deploy verification

- [ ] Live URL loads all routes
- [ ] View source: canonical, OG, JSON-LD correct on production
- [ ] `https://balajiselvaraj1601.github.io/robots.txt` accessible
- [ ] `https://balajiselvaraj1601.github.io/sitemap-index.xml` accessible
- [ ] Lighthouse on production URL (SEO, a11y, perf)
- [ ] Rich Results Test on live URL

## Troubleshooting deploy failures

| Symptom | Check |
|---|---|
| Build fails in CI | Read workflow log; usually Zod or Astro error — fix locally first |
| Deploy skipped | Repo name — must be user-site repo for deploy job |
| Pages 404 | Pages source must be GitHub Actions, not branch |
| CSS/JS 404 on Pages | `.nojekyll` in public/ |
| Wrong base path assets | `base: '/'` for user site |
| Stale content | `dist/` not committed — CI rebuilds fresh |

See `docs/troubleshooting.md` for build errors.

## Pre-delivery checklist

- [ ] Local `npm run build` passes
- [ ] Go-live Phase 1 checks complete
- [ ] Pushing to correct remote (production vs staging)
- [ ] SITE_URL and robots.txt in sync if URL changed
- [ ] No secrets in committed files

## When to load references

| If the task involves… | Read |
|---|---|
| First-time GitHub Pages setup | `references/github-pages-setup.md` |
| Pre/post deploy verification | `references/go-live-verification.md` |
| URL change, CNAME, domain DNS | `references/url-and-domain.md` |

## Quick reference: where to go deeper

| Topic | Reference file |
|---|---|
| GitHub repo and Pages configuration | [references/github-pages-setup.md](references/github-pages-setup.md) |
| Go-live and post-deploy verification | [references/go-live-verification.md](references/go-live-verification.md) |
| SITE_URL, CNAME, custom domain | [references/url-and-domain.md](references/url-and-domain.md) |
