---
name: accessibility
description: >-
  Audit and implement WCAG 2.1 AA accessibility for the portfolio — semantics, keyboard nav,
  focus indicators, contrast, ARIA, reduced motion, screen reader support, and tap targets.
  Use when fixing a11y issues, running accessibility audit, keyboard testing, contrast checks,
  ARIA labels, skip links, focus traps, or Lighthouse accessibility score. Trigger phrases —
  "accessibility", "a11y", "WCAG", "screen reader", "keyboard navigation", "focus ring",
  "contrast ratio", "aria-label". CSS focus styles → css-guide/references/accessibility.md.
  Visual polish → visual-review.
---

# Accessibility Skill

Target: **WCAG 2.1 AA** in both light and dark themes. **SSOT checklist:**
[`docs/accessibility.md`](../../../docs/accessibility.md). Core patterns live in
`Layout.astro`, `Header.astro`, `Section.astro`, and `global.css`.

This skill covers **semantic HTML, keyboard, ARIA, and verification** — not CSS authoring
(hand off focus-ring CSS to `css-guide`).

## Cross-skill boundaries

| Task | Owner |
|---|---|
| Landmarks, headings, ARIA, keyboard behavior | **accessibility** |
| `:focus-visible`, contrast tokens in CSS | `css-guide` → `references/accessibility.md` |
| Color token values | `docs/design-direction.md` / `global.css` |
| Visual hierarchy appearance | `visual-review` |
| SEO heading rules | `seo` (overlap: one h1 per page) |
| Iterate a whole page end-to-end | `build-page` workflow — this skill is a Review lens (`docs/page-improvement-workflow.md`) |

## Review workflow

### 1. Automated scan

Post-build or post-deploy:

- Lighthouse accessibility ≥ 95 (target in `requirements.md` S1)
- Zero serious violations

```bash
npm run build && npm run preview
# Then Lighthouse in Chrome DevTools on preview URL
```

### 2. Structure and semantics

- [ ] One `<h1>` per page; no skipped heading levels
- [ ] Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- [ ] Real lists (`<ul>`/`<ol>`), real links (`<a>`), real buttons (`<button>`)
- [ ] Skip-to-content link first focusable element

Details: `references/wcag-checklist.md`.

### 3. Keyboard pass

Tab through entire page without mouse:

- [ ] All interactive elements reachable
- [ ] Tab order matches visual order
- [ ] Visible focus on every focusable element (`--focus-ring`)
- [ ] Mobile menu: focus trapped, Esc closes, focus returns to toggle
- [ ] No keyboard traps

Details: `references/keyboard-and-semantics.md`.

### 4. Color and contrast

- [ ] Body text ≥ 4.5:1 against background (both themes)
- [ ] Large text ≥ 3:1
- [ ] UI components and focus indicators ≥ 3:1
- [ ] Information not conveyed by color alone (external-link icons)

Verify tokens in `global.css` against `docs/design-direction.md`.

### 5. Motion and preferences

- [ ] Animations gated by `prefers-reduced-motion: no-preference`
- [ ] No flashing content
- [ ] Theme respects `prefers-color-scheme`; toggle has `aria-label`

### 6. Manual screen reader smoke test

VoiceOver (macOS) or NVDA (Windows):

- [ ] Landmarks announced
- [ ] Headings navigable by level
- [ ] Icon buttons announce purpose (theme toggle, nav toggle)
- [ ] Decorative icons `aria-hidden`

Details: `references/verification.md`.

## Structured output format

| # | Severity | WCAG area | Finding | Fix | Owner |
|---|---|---|---|---|---|
| 1 | Blocker | Keyboard | … | … | Header.astro |
| 2 | Should fix | Contrast | … | … | global.css |

**Severity:** Blocker (cannot ship) · Should fix · Nit

## Implemented patterns (do not regress)

| Pattern | Location |
|---|---|
| Skip link | `Layout.astro` + `.skip-link` in global.css |
| Focus ring | `:focus-visible` in global.css |
| Theme toggle aria | `Header.astro` |
| Nav toggle aria | `Header.astro` |
| Mobile focus trap | `Header.astro` script |
| Reduced motion | global.css + `.reveal` |
| OG image alt | `BaseHead.astro` meta |
| External link icons | Link list components |

## Forms (future — C1)

Contact form not wired. If added:

- Label every input
- `aria-describedby` for errors
- `aria-live` for submit feedback

## Pre-delivery checklist

- [ ] Lighthouse a11y ≥ 95 or zero serious violations documented
- [ ] Full keyboard pass completed
- [ ] Both themes checked for contrast
- [ ] No `outline: none` without `:focus-visible` replacement
- [ ] Icon-only buttons have `aria-label`
- [ ] One h1 per page verified

## When to load references

| If the task involves… | Read |
|---|---|
| Full WCAG checklist by category | `references/wcag-checklist.md` |
| Keyboard, focus trap, ARIA patterns | `references/keyboard-and-semantics.md` |
| Lighthouse, screen reader, manual testing | `references/verification.md` |

## Quick reference: where to go deeper

| Topic | Reference file |
|---|---|
| WCAG 2.1 AA checklist by category | [references/wcag-checklist.md](references/wcag-checklist.md) |
| Keyboard navigation, focus, ARIA | [references/keyboard-and-semantics.md](references/keyboard-and-semantics.md) |
| Lighthouse, screen reader, manual verification | [references/verification.md](references/verification.md) |
