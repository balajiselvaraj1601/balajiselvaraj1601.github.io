# Content Layer

Tech-agnostic, presentation-free content for the portfolio. Every section of the site
derives from a file here — this is the **single source of truth** for site content.

## Provenance

This content is a **curated public snapshot derived from**
`resume_builder/jobs/generalized_ai_tech_lead/resume/resume_healthcare.json`
(schemaVersion 3). The resume JSON remains the upstream source; when the resume changes,
re-derive these files rather than editing both independently.

## Curation rules applied

- **No phone number.** The resume's phone field is omitted everywhere (public-site privacy).
- **No References.** The resume's `references` section is private and is not surfaced.
- **Contact** in `person/profile.json` includes email, LinkedIn, Kaggle, GitHub, and location (no phone).
- **Kaggle:** uses the compact list (`kaggle_compact` in the resume); the duplicate raw
  `kaggle` list with per-competition descriptions is intentionally dropped.

## Files

| File                         | Drives                              | Source in resume                    |
| ---------------------------- | ----------------------------------- | ----------------------------------- |
| `site.json`                  | Site meta, nav, SEO defaults, theme | derived                             |
| `person/profile.json`        | Hero, About, Contact                | `personal` (no phone)               |
| `person/collaborations.json` | Collaborations strip                | derived                             |
| `work/strategic-impact.json` | Strategic Impact                    | `sections[id="funds"]`              |
| `work/vision-board.json`     | Vision board (infographic)          | derived                             |
| `work/experience.json`       | Experience timeline                 | `sections[id="experience"]`         |
| `work/projects.json`         | Projects showcase (derived view)    | derived from `work/experience.json` |
| `research/publications.json` | Publications                        | `sections[id="publications"]`       |
| `research/conferences.json`  | Conferences                         | `sections[id="conferences"]`        |
| `research/speakers.json`     | Speaking Engagements                | derived                             |
| `recognition/education.json` | Education                           | `sections[id="education"]`          |
| `recognition/awards.json`    | Awards & Recognition                | `sections[id="awards"]`             |
| `recognition/kaggle.json`    | Kaggle Competitions                 | `sections[id="kaggle_compact"]`     |
| `entities.json`              | Entity URL/name registry            | derived                             |

**Shelved (not live):**

- `drafts/research/generative-ai.json` — Generative AI section; see [docs/content-editing.md](../docs/content-editing.md).

`work/projects.json` is a derived convenience view for a card/detail UI — `work/experience.json`
stays authoritative for role bullets. Keep them consistent when editing.

## Editing guide

See [docs/content-editing.md](../docs/content-editing.md) for step-by-step instructions,
schema rules, and common tasks (reorder sections, update SEO, add bullets, etc.).
