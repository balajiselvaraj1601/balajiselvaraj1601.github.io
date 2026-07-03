# Design Consistency Contract

Agent-checkable checklist distilled from `docs/design-direction.md`, `docs/typography.md`,
and `src/styles/global.css`. Page agents audit against this; Design Guardian resolves
cross-view conflicts using these rules as binding authority.

**Do not duplicate token values elsewhere** — cite this contract and `global.css`.

---

## 1. Section wrapper

Every live section must use `Section.astro` (`src/components/ui/Section.astro`) unless
wrapped by `AboutLanding.astro` (hero + thirukural band).

| Check | Rule                                                                    | Evidence                             |
| ----- | ----------------------------------------------------------------------- | ------------------------------------ |
| S1    | Section has `id` matching section registry key                          | `content/site.json → sections`       |
| S2    | Uses `.section` class via `Section.astro`                               | No ad-hoc `<section>` without tokens |
| S3    | Inner layout uses `.container`                                          | Provided by `Section.astro`          |
| S4    | Variant matches intent: `default`, `alt`, `full`, `impact`              | `variant` prop or equivalent class   |
| S5    | Section vertical padding uses `--section-py-start` / `--section-py-end` | `.section` in global.css             |
| S6    | Mobile section padding reduces per global.css media query               | ≤768px: 64px/48px                    |

---

## 2. Spacing tokens (mandatory)

Use CSS variables — never raw px for layout rhythm.

| Token                      | Value                  | Use                           |
| -------------------------- | ---------------------- | ----------------------------- |
| `--space-1` … `--space-24` | 4px scale              | All spacing                   |
| `--section-py-start`       | 96px (64px mobile)     | Section top padding           |
| `--section-py-end`         | 64px (48px mobile)     | Section bottom padding        |
| `--gutter-inline`          | clamp(24px, 4vw, 64px) | Container horizontal          |
| `--stack-sm`               | 16px                   | Tight vertical stacks         |
| `--stack-md`               | 24px                   | Default stacks                |
| `--stack-lg`               | 32px                   | Card grids, section internals |
| `--stack-xl`               | 48px                   | Major section sub-blocks      |
| `--card-padding`           | 24px                   | Standard card inner           |
| `--card-padding-lg`        | 32px                   | Large cards                   |
| `--section-cta-gap`        | 32px                   | CTA button groups             |

**Violation:** Hardcoded `padding: 20px`, `gap: 18px`, or `margin: 30px` where a token exists.

---

## 3. Typography roles

| Element                     | Token / class                 | Font role        |
| --------------------------- | ----------------------------- | ---------------- |
| h1, h2, section titles      | `--font-display`, `--fs-h2`   | DM Serif Display |
| h3, h4, card titles         | `--font-sans`, `--fs-h3`      | Inter 600–700    |
| Body                        | `--font-sans`, `--fs-body`    | Inter 400        |
| Eyebrows, metadata, metrics | `--font-mono`, `--fs-eyebrow` | JetBrains Mono   |
| Tamil / non-Latin           | Inter only                    | Never DM Serif   |

---

## 4. Eyebrow rules

Per `docs/design-direction.md § Section eyebrows`:

| Section type                                  | Eyebrow                                                      |
| --------------------------------------------- | ------------------------------------------------------------ |
| View intros with metrics/custom h2            | **Required** — `Eyebrow.astro` via `Section` prop            |
| Content sections inside a view                | **Omit** — nav provides context                              |
| Ad-hoc kickers (Vision lede, Leadership diff) | Match `.eyebrow` typography (`--accent-ll`, mono, uppercase) |

**View intros with eyebrows:** `experience-intro`, `featured-case-studies`, `vision-intro`, Contact (if eyebrow used).

**Content sections without eyebrows:** `leadership`, `publications`, `conferences`, `speakers`, `awards`, `kaggle`, `education`, `experience` (uses SectionHeading instead), `vision-programs`, `vision-impact`.

---

## 5. Card shells

Four tiers govern box/card surfaces. All tiers share `--radius` (12px default), `--card-lift`
hover, and `box-shadow: var(--shadow-md)` on interactive hover unless §11 documents an exception.

| Tier                | Shell class                                | Padding token              | Used by                                                          |
| ------------------- | ------------------------------------------ | -------------------------- | ---------------------------------------------------------------- |
| **A — compact**     | `.card`                                    | `--card-padding` (24px)    | MetricCard, theme-card, connect-card, proj-card accordion        |
| **B — content**     | `.content-card`                            | `--card-padding-lg` (32px) | ResearchCard, SpeakingCard                                       |
| **C — recognition** | `.recog-card`, `.recog-tile`, `.edu-panel` | `--card-padding` (24px)    | Awards, Kaggle, Education (see §11 for accent/radius exceptions) |
| **D — special**     | `.card--accent`, `.hub__ring`              | varies                     | ProjectCaseStudyCard gradient stripe; Vision hub circle          |

Shared primitives:

| Pattern                | Location                                                                                                                       | Notes                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Icon tile              | `.icon-tile` + modifiers in `global.css`                                                                                       | Fallback icons; `--round`, `--compact`, `--recog`, `--accented` |
| Logo rect              | `.logo-badge` via `LogoBadge.astro`                                                                                            | Horizontal wordmarks                                            |
| Logo round             | `.logo-badge--round`                                                                                                           | Square emblems in circular pill                                 |
| Card tint              | `.card-tint`, `.card-tint--accent`                                                                                             | Nested highlight callouts inside cards                          |
| Metric snapshot        | `MetricCard.astro`                                                                                                             | Tier A                                                          |
| Recognition stack      | `RecogCardShell.astro` + `CompetitionCard.astro`                                                                               | Tier C                                                          |
| Research links         | `ResearchCard.astro` / `ResearchLinkGrid.astro`                                                                                | Tier B — **cross-view reference** for hover lift                |
| Case study             | `ProjectCaseStudyCard.astro`                                                                                                   | Tier D                                                          |
| Education              | `Education.astro`                                                                                                              | Tier C                                                          |
| Vision groups & impact | `ProgramBadgeCard.astro`, `OrgSnapshotCard.astro` (with `CardMark.astro` + `MarkEmblem.astro` for vision-programs group cards) | Tier A                                                          |
| Card mark              | `CardMark.astro`                                                                                                               | All card logo/icon/emblem slots                                 |

**Cross-view rule:** The Research link-list shell (`ResearchCard.astro`) is the reference
implementation for hover lift (`--card-lift` + `--shadow-md`). Tier C cards may diverge on
radius, top accent, and gradient background only when documented in §11.

### Logo / mark slots (inside card shells)

**Sizing SSOT:** `:root { --mark-slot: 44px; --mark-glyph: 22px; }` in `src/styles/global.css`.
Change these two tokens to resize standard circular marks site-wide. Contextual overrides reuse
the same names: `.icon-tile--recog { --mark-slot: 40px; }`, `.icon-tile--compact {
--mark-slot: 36px; --mark-glyph: 18px; }`, `#hub-circle .hub__center` for Tier D hub center.

**Component SSOT:** `CardMark.astro` — all new card marks go through this component; it calls
`resolveLogoSlot()` in `src/lib/logo-display.ts`. Do not hand-roll logo/badge branching in cards.

| Shape                | CSS / component                                                    | When                                                                |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **rect**             | `CardMark` → `.logo-badge` (rounded rect, white surface)           | Horizontal wordmarks (most org logos)                               |
| **round**            | `CardMark` → `.logo-badge--round` or `.icon-tile.icon-tile--round` | Square emblem logos in circular chrome                              |
| **plain**            | `CardMark` → `.logo-badge--plain`                                  | Dark/light marks on card bg (`jitc`, `hcl`)                         |
| **emblem-in-circle** | `CardMark` → `.theme-card__icon` + `MarkEmblem`                    | Vision org/program theme cards (pipeline `logo_*` in accent circle) |
| **emblem bare**      | `MarkEmblem` without chrome                                        | Hub satellite plain nodes, self-ringed assets off-card              |
| **icon**             | `CardMark` → `.icon-tile` (+ modifiers)                            | Lucide fallback when no logo asset                                  |

**Reference implementations (do not redesign):** Contact connect cards (round Lucide via
`CardMark`), Recognition summary tiles (`.icon-tile--recog.icon-tile--accented`).

Icon tile modifiers: `--round` (circle), `--compact` (36px slot), `--recog` (40px slot summary),
`--accented` (tints from contextual `--accent-card`), `--elev` (white node on tinted callout).

### Card colour highlights

Set `--accent-card` on a wrapper (`.card-accent` or level/medal class) to tint Tier C shells.
Use shared callout primitives for nested emphasis — do not reimplement `color-mix` per component.

| Pattern     | Class                                          | Use                                                                  |
| ----------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| Soft tint   | `.card-tint`                                   | Nested callouts (`--accent-soft` wash): pipeline, impact strip       |
| Accent tint | `.card-tint--accent`                           | Contextual `--accent-card` wash: edu highlight, level-coloured bands |
| Top stripe  | `.card--accent::before` or Tier C `border-top` | Card-level category emphasis (see §11)                               |
| Radial wash | `.recog-tile::after`, `.edu-panel::before`     | Tier C hero/stat tiles only                                          |

**Contextual `--accent-card` sources:** Awards (`--lvl` per level), Kaggle (`--medal`), Education
(`--accent-gold`), CompetitionCard (`--medal` per card).

---

## 6. Section variants

SSOT for variant naming. `Section.astro` accepts a single `variant` prop
(`'default' | 'alt' | 'full' | 'impact'`); additional variant classes may be layered via
its `class` prop (e.g. VisionBoard: `variant="full"` + `class="section--alt section--impact"`).

| `variant` prop | Emitted class      | When                                                                                                                           |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `default`      | (none)             | Standard band                                                                                                                  |
| `alt`          | `.section--alt`    | Alternate background (`--bg-alt`); Kaggle, Publications, Speakers, Contact, featured-case-studies, vision-programs, experience |
| `full`         | `.section--full`   | Full-bleed layout (deprecated as of Vision rewrite)                                                                            |
| `impact`       | `.section--impact` | High-emphasis band (deprecated as of Vision rewrite)                                                                           |

Adjacent sections should alternate `default` / `alt` where possible for visual rhythm.
Agents cite this table — never ad-hoc class strings.

---

## 7. Breakpoints

Use token media queries — prefer `var(--bp-md)` etc. over raw `768px`.

| Token     | Value  |
| --------- | ------ |
| `--bp-sm` | 560px  |
| `--bp-md` | 768px  |
| `--bp-lg` | 900px  |
| `--bp-xl` | 1024px |

---

## 8. Accessibility

| Check | Rule                                                         |
| ----- | ------------------------------------------------------------ |
| A1    | Text/background pairs pass WCAG AA (`docs/accessibility.md`) |
| A2    | Focus visible via `--focus-ring`                             |
| A3    | Sections have accessible names (title h2 or `ariaLabel`)     |
| A4    | Images/logos have alt text from content JSON                 |
| A5    | Motion wrapped in `prefers-reduced-motion: no-preference`    |

---

## 9. Content wiring

| Check | Rule                                                                     |
| ----- | ------------------------------------------------------------------------ |
| C1    | Section order from `content/site.json → home.sections` only              |
| C2    | Each section id in exactly one `viewSections` group                      |
| C3    | Copy changes in `content/` paths listed in site.json `sections.*.source` |
| C4    | Schema changes precede content (`src/schemas.ts`)                        |

---

## 10. Severity guide (for findings)

| Severity | Examples                                                                   |
| -------- | -------------------------------------------------------------------------- |
| **P0**   | Build failure, schema violation, WCAG AA failure, broken section wiring    |
| **P1**   | Cross-view padding/card inconsistency, wrong eyebrow pattern, token bypass |
| **P2**   | Minor visual polish, copy tone, non-blocking spacing drift                 |

---

## 11. Documented exceptions

Intentional divergences from this contract, recorded by the Design Guardian during
Implement (Hard Rule: document exceptions). This table — not agent memory — is the SSOT
for approved divergences. Append rows; never delete history.

| exception_id | views                                          | rule waived                  | reason                                                                                                                                                                                                          | date       |
| ------------ | ---------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| EX-001       | recognition                                    | §5 `--radius` default        | `.recog-card` / `.recog-tile` use `--radius-xl` (14px) to pair with top accent stripe                                                                                                                           | 2026-07-02 |
| EX-002       | recognition                                    | §5 solid `--bg-elev` shell   | `.recog-card` gradient background elevates recognition band above standard cards                                                                                                                                | 2026-07-02 |
| EX-003       | recognition                                    | §5 no top accent             | `.recog-card` / `.edu-panel` use 2px solid `border-top: var(--accent-card)` as categorical colour identifier                                                                                                    | 2026-07-02 |
| EX-004       | recognition                                    | §5 standard shell bg         | `.edu-panel::before` dotted radial overlay — education hero treatment unique within Tier C                                                                                                                      | 2026-07-02 |
| EX-005       | projects                                       | §5 recog-style top accent    | `.card--accent::before` 3px gradient stripe (decorative emphasis vs recog 2px solid)                                                                                                                            | 2026-07-02 |
| EX-006       | vision                                         | §5 rectangular `.card` shell | `.hub__ring` circular surface — hover-only `--shadow-md` (not persistent at rest); emblem layout requirement. **Note (2026-07-03):** Superseded by Vision multi-section rewrite; hub-and-spoke diagram retired. | 2026-07-02 |
| EX-007       | home                                           | §5 `--radius` on logo tiles  | `.leadership__collab-mark` uses `--radius-md` (8px) for compact logo grid cells                                                                                                                                 | 2026-07-02 |
| EX-008       | home, research, projects, recognition, contact | §3 single card-title token   | Three-tier `--fs-card-title` scale (0.95rem / var(--fs-h3) / 1.5rem) preserves intentional research-compact / standard / flagship title hierarchy                                                               | 2026-07-03 |
| EX-009       | research                                       | §2 single grid-col-min token | Two-tier `--grid-col-min` scale (320px compact vs 420px full) matches different content grid widths across research and speaking sections                                                                       | 2026-07-03 |

---

## Audit procedure (mechanical)

1. Read owned section Astro files and their CSS (scoped or `:global`).
2. Grep for hardcoded px in owned files: `padding|margin|gap` with numeric px.
3. Confirm `Section.astro` usage and variant.
4. Compare card shell classes to sibling views (Recognition vs Research).
5. Check eyebrow presence against §4 table.
6. Emit one finding per violation with `contract_ref` citing section above.
