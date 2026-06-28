---
name: typography
description: >-
  Select, scale, and audit web typography for the portfolio site. Covers font roles
  (UI/body, optional display, mono), type scale, line length, weights, letter-spacing,
  self-hosting via @fontsource, and readability. Use when choosing fonts, fixing typography,
  adjusting heading hierarchy, pairing typefaces, setting measure or line-height, adding
  variable fonts, or when the user asks about font style, readability, type scale, or
  "fix the typography". Trigger phrases — "what font should I use", "typography pass",
  "line length", "heading sizes", "font pairing", "@fontsource". For CSS implementation
  of rules, hand off to css-guide. For visual polish beyond type, use visual-review.
---

# Typography Skill

Typography decisions for this repo. **Single source of truth:** [`docs/design-direction.md`](../../../docs/design-direction.md)
(principles and suggested scale) and [`src/styles/global.css`](../../../src/styles/global.css)
(implemented tokens). Do not invent a parallel type system — extend or fix the existing one.

This portfolio targets **credible, senior, technical** readability (Vercel/Stripe restraint),
not decorative or display-heavy typography.

## Cross-skill boundaries

| Question | Owner |
|---|---|
| Which font, scale, measure, weight? | **typography** (this skill) |
| How to write the CSS rule? | `css-guide` |
| Does the page look polished overall? | `visual-review` |
| Token values and visual principles | `docs/design-direction.md` |
| Contrast / focus on text | `docs/accessibility.md` |
| Iterating a whole page end-to-end? | `build-page` workflow — type issues surface via its Review pass (`docs/page-improvement-workflow.md`) |

## Workflow

### 1. Load context first

Before any typography change, read:

1. `docs/design-direction.md` — Typography section
2. `src/styles/global.css` — `--font-*`, `--fs-*`, `--lh-*`, `--maxw-text`
3. The component or section being edited (scoped `<style>` blocks inherit global tokens)

### 2. Assign font roles (max 2 families + mono)

| Role | Token | Face | Use |
|---|---|---|---|
| UI + body | `--font-sans` | Inter Variable | Body, nav, buttons, chips, captions |
| Display (optional) | `--font-display` | Space Grotesk Variable | h1/h2 only — hero name, section titles |
| Code | `--font-mono` | System mono stack | Inline code, tags if monospace needed |

**Rules:**

- Never use more than two sans families on one page.
- Display face applies to headings only — never body paragraphs, nav, or chips.
- Do not use weights 100–300 (ultra-thin/light); body stays regular (~400), headings 550–650.
- Fallback stack must include `system-ui` and `-apple-system` before generic `sans-serif`.

### 3. Apply the type scale

Use existing tokens — do not hard-code rem values in components:

| Element | Token | Range |
|---|---|---|
| h1 | `--fs-h1` | `clamp(2.1rem … 3rem)` |
| h2 | `--fs-h2` | `clamp(1.6rem … 2rem)` |
| h3 | `--fs-h3` | `1.25rem` |
| body | `--fs-body` | `1.0625rem` (17px) |
| small / UI | `--fs-small` | `0.875rem` |

Headings use `--lh-tight` (1.25); body uses `--lh-body` (1.65). Apply `letter-spacing: -0.01em`
only on large headings (h1/h2), not on body or small text.

When adding a new text size, add a `--fs-*` token in `global.css` rather than a magic number.

### 4. Control measure (line length)

- Body paragraphs and long bullet lists: `max-width: var(--maxw-text)` (~70ch, 65–80 char target).
- Full-width layout containers use `--maxw` (1140px) — text blocks stay narrower than layout.
- Short labels, nav items, and chips are exempt from measure limits.

### 5. Self-host fonts (required)

Both variable faces are bundled via `@fontsource-variable`:

```css
@import '@fontsource-variable/inter';
@import '@fontsource-variable/space-grotesk';
```

Do **not** add Google Fonts CDN links. Packages are pinned in `package.json`. See
`references/web-font-performance.md` for loading details.

Inter OpenType features already enabled on `body`:

```css
font-feature-settings: 'cv11', 'ss01';
```

Keep `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility` on body.

### 6. Display face usage

Apply `--font-display` sparingly:

```css
h1, h2, .hero__name, .section__title {
  font-family: var(--font-display);
}
```

If display and body faces feel redundant, Inter-only is acceptable — do not force Space Grotesk
everywhere. One distinctive heading level (hero h1) is enough.

## Pre-delivery checklist

Before handing off typography work, confirm:

- [ ] All repeated sizes use `--fs-*` tokens, not literal rem/px in components
- [ ] Body text uses `--font-sans`; display token only on h1/h2 (or hero name)
- [ ] No font weights below 400; headings 550–650
- [ ] Long text respects `--maxw-text` (~70ch)
- [ ] Line-height: 1.5–1.65 body, ~1.25 headings
- [ ] Fonts self-hosted via @fontsource — no external CDN
- [ ] Muted/secondary text uses `--text-muted`, not arbitrary opacity hacks
- [ ] Both light and dark themes remain readable (contrast per `accessibility.md`)
- [ ] `npm run build` passes after token or import changes

## When to load references

| If the task involves… | Read |
|---|---|
| Choosing or pairing fonts, anti-patterns | `references/font-selection-and-pairing.md` |
| Scale math, clamp(), vertical rhythm | `references/type-scale-and-rhythm.md` |
| @fontsource setup, variable fonts, performance | `references/web-font-performance.md` |
| Simple token tweak in global.css | No reference — use inline checklist above |

## Efficiency

- **Batch edits:** Combine token changes in a single edit to `global.css`.
- **Read before edit:** Scan `global.css` and the target component's scoped styles first.

## Quick reference: where to go deeper

| Topic | Reference file |
|---|---|
| Font roles, Inter + Space Grotesk pairing, anti-patterns | [references/font-selection-and-pairing.md](references/font-selection-and-pairing.md) |
| Modular scale, fluid clamp(), vertical rhythm | [references/type-scale-and-rhythm.md](references/type-scale-and-rhythm.md) |
| @fontsource, variable fonts, font-display, feature settings | [references/web-font-performance.md](references/web-font-performance.md) |
