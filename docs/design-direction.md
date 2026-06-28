# Design Direction

Tech-agnostic visual language. Defines tokens and principles; any stack/CSS approach can
implement them. The site should read as **credible, senior, and technical** — not flashy.

## Principles

- **Minimalist & content-first.** Generous whitespace; the work is the hero (à la Vercel,
  Stripe, Linear, Apple references). No decorative clutter.
- **Professional restraint.** One accent color, used sparingly for emphasis and links.
- **Legible density.** Long-form bullets must stay scannable — short measure, clear hierarchy.
- **Motion as polish, not spectacle.** Subtle entrance/hover transitions; always honor
  `prefers-reduced-motion`.

## Color tokens (semantic — provide both themes)

Purple biopharma palette. Dark theme is the primary design target; light theme uses derived tints.

| Token | Dark | Light | Use |
|-------|------|-------|-----|
| `--bg` | `#0D0B1E` | `#FAF8FF` | Page background |
| `--bg-alt` / `--bg-elev` | `#13102B` / `#1A1530` | `#F0EBFA` / `#FFFFFF` | Alt sections / cards |
| `--text` | `#E8E0F5` | `#1A1530` | Primary text |
| `--text-muted` | `#9085B8` | `#5C5470` | Secondary text |
| `--border` | `rgba(108,47,191,0.25)` | `rgba(108,47,191,0.18)` | Dividers, card borders |
| `--accent` | `#6C2FBF` | `#6C2FBF` | Links, active nav, primary CTA |
| `--accent-light` | `#9B5EE8` | `#9B5EE8` | Hover, emphasis |
| `--accent-red` | `#C0182A` | `#C0182A` | Secondary accent (awards, tags) |
| `--focus-ring` | `#9B5EE8` | `#6C2FBF` | Keyboard focus outline |

> These are sensible defaults, not mandates. Whatever values are chosen must pass **WCAG AA
> contrast** in both themes (see `accessibility.md`). Verify text/background and accent/background pairs.

## Typography

- **Display:** DM Serif Display (headings, brand logotype)
- **Body/UI:** Inter Variable (sans)
- **Labels:** JetBrains Mono (eyebrows, meta, footer)
- **Scale (rem):** h1 `clamp(2.8rem, 6vw, 5.5rem)`, h2 `clamp(2rem, 4vw, 3rem)`, body `0.95–1.0625`, eyebrow `0.72`

## Spacing & layout

- Base spacing unit `4px`; use a consistent scale (4, 8, 12, 16, 24, 32, 48, 64).
- Content max-width ~`1100–1200px`; text blocks narrower (~`70ch`).
- Section vertical rhythm: large, consistent padding between sections (e.g. 64–96px desktop).

## Components — visual notes

- **Hero:** name + title + one-line tagline + 2–3 CTAs (Projects, Contact, Résumé). Calm, lots of space.
- **Timeline (Experience):** single rail with role markers; project sub-groups; primary
  bullets full-weight, `secondary` bullets muted.
- **Project cards:** title, domain, one-line summary, tag chips; hover elevation; optional detail.
- **Skill chips:** grouped by category; quiet pill style, not loud badges.
- **Link lists (Publications/Conferences/Kaggle):** label + title, external-link icon, clear hover.

## Motion

- Durations 150–250ms; ease-out for entrances.
- Effects limited to opacity/transform (cheap, smooth); no layout-thrashing animations.
- Wrap all non-essential motion in `@media (prefers-reduced-motion: no-preference)`.

## Imagery

- Optional professional headshot in Hero/About (`assets/images/`).
- One OG/social image (`assets/og/`) — name, title, accent background.
- Keep imagery light; the portfolio is text-led.

## Related docs

- [Assets](./assets.md) — file paths and specs for OG/headshot
- [Accessibility](./accessibility.md) — contrast requirements for tokens above
- [Specification](./specification.md) — component visual notes
