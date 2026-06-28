# Page Brief - Home

**Page:** `home`  
**Route:** `/` (single-page shell; nav views filter visible sections)

## About view (`viewSections`)

| Item (section id) | Source | Question | Weight |
|---|---|---|---|
| `hero` | `content/person/profile.json` | What is this? | heavy |
| `about` | `content/person/profile.json` | What is this? | medium |
| `featured-case-studies` | `content/work/projects.json` | Why should I care? | medium |
| `impact` | `content/work/strategic-impact.json` | Why should I care? | heavy |
| `vision-board` | `content/work/vision-board.json` | How does it work? | light |
| `leadership` | `content/person/profile.json` | Why should I trust it? | light |
| `skills` | `content/work/skills.json` | How does it work? | medium |
| `timeline` | `content/work/experience.json` | Why should I trust it? | medium |

Publications are **not** in the About view — use the Research view (`/#research`).

## Full DOM order on `/`

`hero` → `about` → `featured-case-studies` → `impact` → `vision-board` → `leadership` →
`skills` → `timeline` → `experience-intro` → `experience` → `mentorship` → `projects-intro` →
`projects` → `publications` → `conferences` → `speakers` → `awards` → `kaggle` → `education` →
`contact`

Other nav views show subsets of this list. See `content/site.json → pages[].viewSections`.

The About view establishes positioning, concrete systems, measurable impact, and career trust
signals. Research, projects, experience, recognition, vision, and contact each have dedicated
views via header nav.
