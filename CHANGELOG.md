# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-07-06

### Added

- Self-hosted DM Serif Display and Inter Variable fonts (`fonts-critical` / `fonts-deferred` CSS)
- WebP/AVIF siblings for portrait and section images; image optimize pipeline (`scripts/optimize-images.mjs`)
- Lighthouse check script (`scripts/lighthouse-check.mjs`)
- `asset-guard` and `init-sections` client scripts (dot nav, back-to-top, section inits)
- `docs/icon-size-inventory.md` and expanded `docs/README.md` agent/docs index
- Page-level dot navigation: seven dots (Hero + six nav views) with `sectionToDotNav` scroll-spy

### Changed

- HeroCanvas, Portrait, and card components (CompetitionCard, SpeakingCard, ResearchCard, XpProjectCard) polish and icon standardization
- Chrome: BaseHead font preload, Header/Footer/SiteChromeBoot cleanup
- Section updates: Awards, Education, Experience, Hero, Kaggle, LeadershipPhilosophy, ThirukuralQuote, LogoBadge, VisionHub
- Refreshed SVG logo marks and reference screenshots across views
- Dot nav scroll-spy maps sections to view dots (hero/thirukural → Hero, leadership → About)
- Removed `dotNav` / `dotNavLabel` from section schema (dots derived from nav views)

## [1.0.1] - 2026-07-06

### Added

- Shared `scroll-to-section` helper with compact-header offset and About landing scroll boundary
- Portfolio agent skills: content authoring, visual verify, SEO meta, a11y contrast, icon patterns
- `--header-h-compact` design token for scrolled header height

### Changed

- About landing layout: `#about-landing` hero band ends flush above leadership; About nav scroll hides hero band
- Section `scroll-margin-top` includes header breathing room (`--space-4`)
- Inline `Icon` sizes standardized to `size="sm"` in Hero, Contact, and CompetitionCard
- Header compact state uses `--header-h-compact` token instead of hardcoded `52px`

## [1.0.0] - 2026-07-06

First production release of the Balaji Selvaraj portfolio site.

### Added

- Astro 4 static site with six nav views and thirteen content sections on a single-page home
- Zod-validated JSON content layer under `content/` (build fails on schema violations)
- GitHub Actions CI (`validate.yml`) and GitHub Pages deploy pipeline (`deploy.yml`)
- Icon and mark standardization pipeline with PNG logo assets and token SSOT drift gate
- Multi-agent design consistency and site review system (page team, site-review-fix)
- Scroll-spy section views, mobile nav, save-page export, and reveal animations
- SEO: meta tags, Open Graph, Twitter cards, JSON-LD Person schema, sitemap, robots.txt
- Résumé PDF as a static asset at `/assets/resume/balaji-selvaraj-resume.pdf`

### Changed

- Dark-only theme (removed header theme toggle; `data-theme="dark"` on load)
- About view scroll target: leadership section first in `viewSections`
- Education stat tiles use Recognition gold hairline grid (aligned with Kaggle summary pattern)
- Vision board IDEA lane uses `silver` accent for medal/recognition semantics

[Unreleased]: https://github.com/balajiselvaraj1601/portfolio_site/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/balajiselvaraj1601/portfolio_site/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/balajiselvaraj1601/portfolio_site/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/balajiselvaraj1601/portfolio_site/releases/tag/v1.0.0
