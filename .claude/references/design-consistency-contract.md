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

**View intros with eyebrows:** `experience-intro`, `featured-case-studies`, Contact (if eyebrow used).

**Content sections without eyebrows:** `leadership`, `publications`, `conferences`, `speakers`, `awards`, `kaggle`, `education`, `experience` (uses SectionHeading instead).

---

## 5. Card shells

| Pattern           | Component                                                          | Used by                              |
| ----------------- | ------------------------------------------------------------------ | ------------------------------------ |
| Metric snapshot   | `MetricCard.astro`                                                 | Hero, ExperienceIntro, ProjectsIntro |
| Recognition stack | `RecogCardShell.astro` + `CompetitionCard.astro`                   | Awards, Kaggle                       |
| Research links    | `ResearchCard.astro` / `ResearchLinkGrid.astro`                    | Publications, Conferences            |
| Case study        | `ProjectCaseStudyCard.astro`                                       | FeaturedCaseStudies                  |
| Education         | Education card pattern in `Education.astro`                        | Education                            |
| Vision hub        | `HubCircle.astro`, `ProgramBadgeCard.astro`, `OrgImpactCard.astro` | VisionBoard                          |

**Cross-view rule:** The Research link-list shell (`ResearchCard.astro`) is the reference
implementation for cross-view card alignment. Recognition cards (Awards, Kaggle) must share
the same shell spacing, border radius (`--radius`), and hover lift (`--card-lift`) as
Research cards unless Guardian documents an intentional exception in §11. This section is
the only canonical-card statement — agents must not claim reference status elsewhere.

---

## 6. Section variants

SSOT for variant naming. `Section.astro` accepts a single `variant` prop
(`'default' | 'alt' | 'full' | 'impact'`); additional variant classes may be layered via
its `class` prop (e.g. VisionBoard: `variant="full"` + `class="section--alt section--impact"`).

| `variant` prop | Emitted class      | When                                                                                              |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------- |
| `default`      | (none)             | Standard band                                                                                     |
| `alt`          | `.section--alt`    | Alternate background (`--bg-alt`); Kaggle, Publications, Speakers, Contact, featured-case-studies |
| `full`         | `.section--full`   | Full-bleed layout; Vision board                                                                   |
| `impact`       | `.section--impact` | High-emphasis band; Vision board (layered via `class` prop)                                       |

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

| exception_id | views | rule waived | reason | date |
| ------------ | ----- | ----------- | ------ | ---- |
| —            | —     | —           | —      | —    |

---

## Audit procedure (mechanical)

1. Read owned section Astro files and their CSS (scoped or `:global`).
2. Grep for hardcoded px in owned files: `padding|margin|gap` with numeric px.
3. Confirm `Section.astro` usage and variant.
4. Compare card shell classes to sibling views (Recognition vs Research).
5. Check eyebrow presence against §4 table.
6. Emit one finding per violation with `contract_ref` citing section above.
