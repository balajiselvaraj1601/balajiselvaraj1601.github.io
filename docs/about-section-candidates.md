# About Section — Candidate Content Worksheet

> A complete list of items (sourced from `content/work/strategic-impact.json`,
> `content/person/profile.json`, and the resume SSOT) that _could_ be added to the
> About section. Mark each `[x]` to add / `[ ]` to skip.
>
> Companion (resume-sourced, hero-deduplicated): [`about-page-content.md`](./about-page-content.md)
> — note that companion’s About structure blurb may lag this file; treat **this worksheet**
> as the coverage source of truth after the July 2026 audit.
>
> Groups **J–O** were added from the authoritative resume
> `resume_builder/jobs/generalized_ai_tech_lead/resume/resume.json`.

## Coverage legend

| Symbol | Meaning                                                                              |
| ------ | ------------------------------------------------------------------------------------ |
| `[x]`  | **On About** — live in About view DOM (`hero`, `thirukural`, or `leadership` blocks) |
| `[ ]`  | **Not on About** — still a valid candidate for future About cards                    |
| ⚠️     | **On site elsewhere** — published on another nav view; avoid duplicating on About    |
| ~      | **Partial** — fragment only; trailing note says what is missing                      |

Each bullet includes a trailing annotation: `*(About: …)*`, `⚠️ *(Site: …)*`, or `~ *(Partial: …)*`.

## Current About DOM order

Section `leadership` on `/` (About view). **Restructured 2026-07 into CTO-for-AI pillars** (see group [P](#p-cto-for-ai-positioning-lens-reframes--priorities)):

```text
hero → thirukural → leadership intro (CTO thesis; Clinical+AI folded in)
  → Strategy & Sponsorship      (strategicVision: P1, P4, G1, G2, C4/G4, C2)
  → Business & P&L Impact        (businessImpact: A3/E1, E6, E4, E5)
  → Platform & Infrastructure    (platform: K1, K9 GxP AI-Bench, J3/distributed)
  → Team & Org Building          (peopleMentoring: F1, F2, F3, F4)
  → Governance & Responsible AI  (governance: K5 NemoClaw, GxP, risk-as-constraint)
  → collaboration logos
```

The former **"What sets me apart" differentiators** and empty **themes** arrays were removed
from the schema; the Clinical+AI bridge (B1) now lives as one line in the intro thesis, and
Business-impact (B4) is superseded by the Business & P&L Impact block. See
[Removed from About](#removed-from-about-formerly-leadershipphilosophythemes).

## Site-wide summary (July 2026 audit)

| Status       | Count | Meaning                                                    |
| ------------ | ----- | ---------------------------------------------------------- |
| `[x]` About  | 22    | Explicitly on About (includes clusters sharing one card)   |
| ⚠️ Site-only | 38    | Published elsewhere; do not re-add to About without reason |
| ~ Partial    | 24    | Fragment on site; worksheet item not fully satisfied       |
| `[ ]` Open   | 15    | Not published anywhere (or intentionally excluded)         |

Sources audited: `content/person/profile.json`, `content/person/collaborations.json`, `content/work/strategic-impact.json`, `content/work/experience.json`, `content/work/projects.json`, `content/recognition/*.json`, `content/research/*.json`.

### Implemented on About (wiring)

| Block                       | Content keys                             | Component                                                                             |
| --------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------- |
| Intro (CTO thesis)          | `leadershipPhilosophy.intro`             | [`LeadershipPhilosophy.astro`](../src/components/sections/LeadershipPhilosophy.astro) |
| Strategy & Sponsorship      | `leadershipPhilosophy.strategicVision[]` | same                                                                                  |
| Business & P&L Impact       | `leadershipPhilosophy.businessImpact[]`  | same                                                                                  |
| Platform & Infrastructure   | `leadershipPhilosophy.platform[]`        | same                                                                                  |
| Team & Org Building         | `leadershipPhilosophy.peopleMentoring[]` | same                                                                                  |
| Governance & Responsible AI | `leadershipPhilosophy.governance[]`      | same                                                                                  |
| Collaboration logos         | `content/person/collaborations.json`     | same                                                                                  |

Schema: [`src/schemas.ts`](../src/schemas.ts) → `leadershipPhilosophy.strategicVision`, `.businessImpact`, `.platform`, `.peopleMentoring`, `.governance` (all optional card arrays). The `.differentiators` and `.themes` arrays were **removed** in the 2026-07 CTO restructure. The component renders blocks from a single `cardBlocks` map (headings hardcoded there, not data-driven).

---

## To Consider

- 21 awards
- Strategic Positioning of team
-

## A. Headline metrics (numbers)

Source: `strategic-impact.json` + `profile.json`

- [x] **A1** — `12+` Years in AI & ML — ⚠️ _(Site: Hero metric)_
- [x] **A2** — `Top 0.3%` Kaggle, 652 / 200K+ — ⚠️ _(Site: Hero metric + `credentialHook`)_
- [x] **A3** — `$20–50M` Projected annual savings (flagship) — ⚠️ _(Site: Hero; also Impact, Experience, Projects)_
- [x] **A4** — `5 countries` Distributed team (IN·UK·SE·MX·CN) — ~ _(About: Hero “5 Countries” + F1 country breakdown)_
- [x] **A5** — `$500K` Funding secured — ⚠️ _(Site: Hero “$0.5M+”; also Impact leadershipCards C3)_
- [ ] **A6** — `14` European research partners (EU consortium) — ⚠️ _(Site: Impact metrics + EU consortium card)_
- [x] **A7** — `1 → 12` Engineers built / scaled — _(About: F1; also Impact “12 Engineers built”)_
- [x] **A8** — `3` Strategic R&D priorities aligned — _(About: Vision scorecard card; cf. G4, L4, N2)_
- [ ] **A9** — `6` Roles · 4 organizations — _(Open: orgs in Experience timeline only; no metric)_
- [ ] **A10** — `21` AstraZeneca internal awards (over 5 yrs) — ~ _(Partial: Recognition `awards.json` lists 22 entries; no tier tally)_
- [ ] **A11** — `7` Peer-reviewed publications — ~ _(Partial: Research lists 3 publications; resume claims 7)_
- [x] **A12** — `400+` Surgical procedures supported (5 specialties) — _(About: B1 Clinical + AI)_

## B. "What sets me apart" — differentiators

Source: `profile.md` §Key Differentiators + sector breadth

> _Note (2026-07):_ the "What sets me apart" differentiator cards were removed in the CTO-pillar
> restructure. B1/B2/B4 content relocated as noted below.

- [x] **B1 — Clinical + AI bridge:** biomedical engineer, 400+ surgeries across 5 specialties, production AI architect — _(About: one-line clause in the CTO intro thesis; standalone differentiator card removed 2026-07)_
- [ ] **B2 — End-to-end ownership:** problem identification → production deployment — _(Removed from About with the differentiators block, 2026-07; not currently surfaced as a card)_
- [ ] **B3 — Cross-cultural leadership:** built/led a team across 5 countries — _(Skipped: covered by A4/F1 + Hero; not a differentiator card)_
- [x] **B4 — Business-impact orientation:** merged with former Outcome-Driven Decisions theme → **Business-impact first** — _(About: superseded by the Business & P&L Impact block, 2026-07)_
- [ ] **B5 — Sector breadth:** AZ · HCL · IIT Madras · Healthware — ~ _(Partial: Experience org timeline; no sector-breadth narrative card)_

## C. Leadership & organizational highlights (icon cards)

Source: `strategic-impact.json` → `leadershipCards`

- [x] **C1 — EVP-level Award** — drug-safety platform — _(About: Vision EVP card; also Impact leadershipCards; cf. I3)_
- [x] **C2 — Gartner submission** — GITC Chennai multimodal vision — _(About: Vision Gartner card; also Impact leadershipCards; cf. Technical Vision page)_
- [x] *_C3 — $0.5M+ secured** — multiple times for team — ⚠️ *(Site: Hero $0.5M+; Impact leadershipCards; not on About)_
- [x] **C4 — 3 corporate scorecards** — aligned projects — _(About: Vision scorecard card; also Impact leadershipCards; cf. A8, G4, L4, N2)_
- [ ] **C5 — Strategic positioning** — 7 internal groups · 3 startups — _(Open: not on site)_
- [x] **C6 — Scaled team** — 1 → 12 members — _(About: F1; also Impact leadershipCards)_
- [x] **C7 — Global management** — UK · Sweden · India · Mexico · China — _(About: F1 country breakdown; also Impact leadershipCards)_

## D. The "journey" (3-step arc)

Source: `strategic-impact.json` → `journey`

- [ ] **D1 — Idea:** Top 0.3% Kaggle signals & patterns — ⚠️ _(Site: Impact journey + Hero Kaggle metrics)_
- [ ] **D2 — Vision:** multimodal AI platform architecture — ⚠️ _(Site: Impact journey + Technical Vision `profile.vision`)_
- [x] **D3 — Execution:** SVP + Chief Scientist-backed programs — _(About: Vision executive sponsorship; also Impact journey + Hero “Chief Scientist & SVP”)_

## E. Financial / business impact facts

Source: `enterprise_impact.md` + `strategic_impact.md`

- [ ] **E1** — SVP drug-safety program `$20–50M/yr` — ⚠️ _(Site: Experience, Projects, Impact; not on About)_
- [ ] **E2** — Chief Scientist workstream in `€14M` EU consortium (14 institutions) — ⚠️ _(Site: Impact subtitle + EU consortium card)_
- [ ] **E3** — CT tumor segmentation `46%` above SOTA, 4–5× targets, `$0.5M` follow-on — ⚠️ _(Site: Experience, Projects; cf. J1)_
- [ ] **E4** — `$40K+/yr` licensing savings (W&B restructure) — _(Open: not in live JSON)_
- [ ] **E5** — Recovered `$3K/month` GPU + `6 months` capacity — _(Open: not in live JSON)_
- [ ] **E6** — Drug-safety timelines `5 years → 3 years` — ⚠️ _(Site: Experience, Projects)_
- [ ] **E7** — `8× speedup` (10 hrs → 20 min) CCTV analytics — _(Open: not in live JSON; cf. J8)_

## F. People & mentoring

Source: `leadership_scope.md` → `leadershipPhilosophy.peopleMentoring[]`

- [x] **F1** — Scaled team 1 → 12 across India (6), UK (2), Sweden (2), Mexico (1), China (1) — _(About: People & Mentoring)_
- [x] **F2** — Mentored AI/ML engineers (3) and graduate trainees (10) into full-time industry/research roles — _(About: People & Mentoring)_
- [x] **F3** — Mentored a team of junior engineers (3) to Kaggle Bronze (Top 6%, 76th/1,220) — _(About: People & Mentoring)_
- [x] **F4** — Mentored a student team (4) to Top 4 nationally, Smart India Hackathon (2019) — _(About: People & Mentoring)_
- [ ] **F5** — Secured 4 graduate-rotation engineers (50%+ of cohort); IIT intern selection framework — ~ _(Partial: Recognition `awards.json` Ignite award text on IIT selection; not an About card)_
- [ ] **F6** — Technical interviewing 5+ years (Director / AD / Senior DL) — _(Open: not on site)_

## G. Stakeholder & influence

Source: `leadership_scope.md`

- [ ] **G1** — Influenced VP, SVP, Chief Scientist, EVP across AZ R&D — ~ _(Partial: About Vision exec sponsorship + Hero exec projects; VP/EVP breadth not spelled out)_
- [ ] **G2** — Positioned team across 7 internal groups + 3 startups, zero conflicts — _(Open: not on site)_
- [x] **G3** — Collaborations: Broad, IIT Madras, Uppsala, AI Sweden — ~ _(Partial: About collab logos; named partner text on Technical Vision page)_
- [x] **G4** — Aligned to 3 scorecards (Oncology R&D, BioPharma R&D, CPSS) — _(About: Vision scorecard card; cf. A8, C4, L4, N2)_

## H. Personal / human / identity

Source: `profile.md` + `education.json` + hero

- [ ] **H1** — Tamil heritage (Thiruvalluvar / Thirukural) — ~ _(Partial: About Thirukural quote; heritage not stated explicitly)_
- [ ] **H2** — Languages: English (professional), Tamil (native) — _(Open: not on site)_
- [ ] **H3** — B.E. Biomedical Engineering — Gold Medal, CGPA 9.03 — ⚠️ _(Site: Recognition / Education)_
- [ ] **H4** — Based in Gothenburg; from Tamil Nadu — ~ _(Partial: `profile.location` + contact; Tamil Nadu origin not stated)_
- [ ] **H5** — AZ Gothenburg Diwali; Speakers' Corner — ⚠️ _(Site: Recognition / Awards entries)_

## I. Recognition tallies

Source: `enterprise_impact.md`

- [ ] **I1** — 21 AZ internal awards across 5 tiers — ~ _(Partial: Awards section lists items; no aggregate tally)_
- [ ] **I2** — Kaggle: 2 Silver + 7 Bronze across 9 competitions — ⚠️ _(Site: Recognition / Kaggle `rankDetail`)_
- [ ] **I3** — CIO IT Excellence (2022); EVP R&D Award (2025) — ~ _(Partial: About Vision EVP card + Awards detail; CIO award in Awards only)_
- [ ] **I4** — GAIA 2025 (1,100+ attendees), first AISI team member — ⚠️ _(Site: Research / Speakers)_

## J. Signature technical results (performance numbers)

Source: `resume.json` → experience bullets

- [ ] **J1** — CT segmentation 46% Dice over SOTA, 4–5× targets — ⚠️ _(Site: Experience, Projects; cf. E3)_
- [ ] **J2** — CT dynamic window (+11% Dice), TTA (+7% Dice) — ~ _(Partial: Experience bullets)_
- [ ] **J3** — CT 20% faster training, 15–20% less GPU memory — ~ _(Partial: Experience bullets)_
- [ ] **J4** — Tumor recurrence 90% F1; 13%+ over SOTA on public datasets — ~ _(Partial: Experience bullets)_
- [ ] **J5** — Tumor recurrence 30% less compute via Optuna — ~ _(Partial: Experience bullets)_
- [ ] **J6** — Digital pathology foundation models at 60% lower GPU cost — ~ _(Partial: Experience, Projects narratives)_
- [ ] **J7** — Endoscopy NBI ~$5K/device hardware savings — ~ _(Partial: Experience bullets)_
- [ ] **J8** — CCTV 8× faster review, 10 hrs → 20 min — _(Open: not in live JSON; cf. E7)_

## K. Technical breadth — what I build

Source: `resume.json` → experience, generative_ai, tools

- [ ] **K1** — Foundation-model framework, 3 modalities, 3 infrastructures — ~ _(Partial: Projects / Experience narratives)_
- [ ] **K2** — Multimodal drug-safety platform — ⚠️ ~ _(Site: Projects flagship case study)_
- [ ] **K3** — Single-cell pipeline + Med-PaLM + Knowledge Graph — ~ _(Partial: Experience bullets)_
- [ ] **K4** — GNN tumor microenvironment pipelines — ~ _(Partial: Experience bullets)_
- [ ] **K5** — Generative AI: RAG, BI agent, NemoClaw VPC — ~ _(Partial: Experience / draft content)_
- [ ] **K6** — Edge endoscopy on Jetson TX1 — ~ _(Partial: Experience bullets)_
- [ ] **K7** — Enterprise CV at HCL — ~ _(Partial: Experience org section)_
- [ ] **K8** — Medical-imaging research at IIT Madras — ~ _(Partial: Experience org section)_
- [ ] **K9** — Full stack list (PyTorch, AWS, LangChain, …) — _(Open: no stack block on site)_

## L. Career arc & organizations

Source: `resume.json` → experience

- [ ] **L1** — Senior DL Engineer / AI Associate Principal, AZ (Sweden) — ⚠️ _(Site: Experience roles)_
- [ ] **L2** — Four sectors: Healthware → IIT → HCL → AZ — ~ _(Partial: Experience timeline; no arc card)_
- [ ] **L3** — Sponsorship ladder: ED, SVP, Chief Scientist — ⚠️ ~ _(Site: Experience subtitles + About Vision exec sponsorship)_
- [x] **L4** — Delivered across Oncology, BioPharma R&D, CPSS over 3 years — _(About: Vision scorecard card; cf. A8, G4, N2)_
- [ ] **L5** — Healthware: 50+ hospital sites, KOL networks — ~ _(Partial: B1 surgeries; Experience Healthware bullets)_

## M. Research & scientific footprint

Source: `resume.json` → publications, conferences

- [ ] **M1** — GraphITE (JITC) + 2 bioRxiv 2021 — ⚠️ ~ _(Site: Research / Publications, 3 items; not 7-paper tally)_
- [ ] **M2** — AACR presenter 2021, 2023, 2024, 2025 — ⚠️ ~ _(Site: Conferences has 2021–2024; 2025 not in JSON)_
- [ ] **M3** — GAIA 2025 speaker — ⚠️ _(Site: Research / Speakers; cf. I4)_
- [ ] **M4** — Broad (Dr. Singh), IIT Madras collaborations — ~ _(Partial: About collab logos + Technical Vision text; cf. G3, N4)_
- [ ] **M5** — CSHL (Dr. Mitra), RIKEN deliveries — ~ _(Partial: CSHL logo on About; RIKEN in `profile.vision` text only)_

## N. Positioning lines (verbatim resume summary)

Source: `resume.json` → `personal.summary.lines`

- [ ] **N1** — "Hands-on Technical AI Lead… 12+ years… 5 countries." — ⚠️ _(Site: Hero headline + metrics; About view)_
- [x] **N2** — "Delivered AI programs across Oncology, Biopharma R&D, and CPSS…" — _(About: Vision scorecard card; cf. A8, G4, L4)_
- [ ] **N3** — "Top 0.3% Kaggle… medical imaging, speech, OCR, energy, climate, wildlife." — ~ _(Partial: Hero Kaggle rank; domain breadth clause not published)_
- [ ] **N4** — "Collaborations with Broad Institute and IIT Madras…" — ~ _(Partial: About collab logos; full line not used)_
- [x] **N5** — "Scaled team 1 → 12… five countries." — _(About: F1; cf. A4, A7, C6, C7)_

## O. Credibility / references (optional — names are private)

Source: `resume.json` → references

- [ ] **O1** — Endorsed at Chief Scientist / Executive Director level — _(Open: correctly excluded; no names on site)_

## P. CTO-for-AI positioning lens (reframes + priorities)

Source: synthesis across groups A–O, targeting a **CTO for AI / Chief AI Officer** frame.

> A cross-cutting lens for elevating About from "Technical AI Lead" to **CTO for AI**. Most bullets
> _reframe_ existing items (cross-refs in `(cf. …)`) rather than add new facts — the elevation is in
> framing, ordering, and emphasis. Seven pillars to showcase, three things to de-emphasize, one
> honest scope caveat.

### Seven pillars to showcase

> **Status (2026-07):** P1–P6 are **LIVE on About** via the CTO-pillar restructure — new
> `leadershipPhilosophy` blocks `strategicVision` (Strategy & Sponsorship), `businessImpact`,
> `platform`, `peopleMentoring` (Team & Org Building), `governance`. P7 is _partial_ (thesis
> folded into the intro; the standalone Vision-nav POV is untouched). P9 done (Clinical+AI
> trimmed to one intro line). P8, P10, P11 remain open (P10 touches the Hero title, not About).

- [x] **P1 — Enterprise AI strategy ownership (set the agenda):** "sell first, build next" — secure executive sponsorship and align portfolios _before_ data/infra exist; turned an ambiguous 5-direction landscape into 2 funded, company-scale programs; authored the 2030 Gene & Cell Therapy multimodal-AI roadmap the company took to Gartner. _(cf. C2, D3, E1, N2 — reframe "submitted to Gartner" → "authored the roadmap")_
- [x] **P2 — AI as business / P&L outcome (speak money, not models):** $20–50M projected annual savings; drug-safety timelines 5yr → 3yr; recovered $40K/yr licensing + $3K/mo GPU; freed ~6 months delivery capacity by killing low-probability work. _(cf. A3, E1, E4, E5, E6 — lead with the "decide what NOT to build" angle)_
- [x] **P3 — AI platform ownership (the compounding asset):** reframe the reusable foundation-model framework (3 modalities × 3 infrastructures) as "the internal AI platform the org ships on"; first to deploy AWS SageMaker + Lambda inside AZ's GxP-compliant AI-Bench = established the regulated production AI infrastructure others build on. _(cf. K1, K9)_
- [x] **P4 — Executive & organizational influence (upward, not just downward):** influence spanning VP → SVP → Chief Scientist → EVP; positioned the AI team across 7 internal groups + 3 external startups with zero conflicting priorities; a repeatable sponsorship ladder (Executive Director, SVP, Chief Scientist). _(cf. C5, G1, G2, L3)_
- [x] **P5 — Building the AI organization (the machine, not the headcount):** scaled 1 → 12 across 5 countries _and_ designed the intern-selection framework, secured 50%+ of a graduate cohort, 5+ yrs interviewing at Director/AD level — reframe as "built the AI hiring & talent engine." _(cf. F1, F5, F6)_
- [x] **P6 — AI governance & responsible deployment (the risk owner):** human-in-the-loop guardrails in sandboxed/isolated VPCs (NemoClaw) and GxP-compliant AI — treat AI safety, compliance, and regulatory risk as first-class design constraints. _(cf. K5)_
- [ ] **P7 — A forward AI thesis (a POV, not a project):** sharpen the Vision ("model-agnostic multimodal platforms that adapt to new modalities without re-engineering") from "what I'm building" into a stated belief about where enterprise AI is heading. _(cf. `profile.json` → `vision`, C2, D2)_

### De-emphasize (elevation requires subtraction)

- [ ] **P8 — Move Kaggle rank + per-model metrics off About:** 46% Dice, F1 scores, and the Kaggle 652 rank are elite _IC_ credentials that cap you as "best engineer in the room." Keep on Recognition / Projects; supporting texture at most on About. _(cf. A2, J1–J8)_
- [x] **P9 — Trim the clinical-origin story to one line:** told at length it frames a specialist, not a leader; one sentence = unique lens, three paragraphs = domain expert. _(cf. A12, B1)_
- [ ] **P10 — Drop "Hands-on" from the title:** "Hands-on Technical AI Lead" reads IC. Consider "AI Technology Leader" / "AI Strategy & Platforms Leader." _(cf. `profile.json` → `title` / `headline`, N1)_

### Honest scope caveat

- [ ] **P11 — Lead from strength, don't over-claim reach:** CTO-for-AI implies company-wide AI ownership; current evidence is deep but sits inside R&D. Lead with strategy + platform + org + executive influence + governance; avoid claiming an enterprise-wide remit not yet backed — the only place this framing looks thin under scrutiny.

---

## Captured on site (not on About)

Grouped by nav view — use before adding new About cards to avoid duplication.

### Hero (About view, metrics block)

- A1, A2, A3, A5 (partial A4 country list without F1 breakdown)
- N1 headline + tagline
- D3 partial (Chief Scientist & SVP executive projects metric)

### Impact view (`strategic-impact.json`)

- A3, A5 (C3), A6, A7
- C1–C4, C6, C7 (leadershipCards duplicate Vision About cards for C1, C2, C4)
- D1, D2, D3 journey arc
- E1, E2 highlights in subtitle

### Experience view

- E1, E3, E6; J1–J7 partial; K6–K8 partial; L1–L3, L5
- B5 org list implicit

### Projects view

- E1, E3, E6; J1; K2 flagship narratives

### Recognition view

- H3 Education; H5 Awards (Diwali, Speakers' Corner)
- I1 partial, I2 Kaggle medals, I3 award detail
- F5 partial (IIT selection award text)

### Research view

- A11 partial; I4, M3 GAIA; M1 Publications; M2 Conferences

### Vision nav view (Technical Vision + Vision Board)

- C2, D2 Gartner / multimodal vision (`profile.vision`)
- G3, M4, M5 partner detail text
- Vision Board principles (partial overlap with B4, B3 themes)

---

## Cross-reference index

Items that share one live About card or proof block:

| Cluster                         | Worksheet IDs                  | Live About location                              |
| ------------------------------- | ------------------------------ | ------------------------------------------------ |
| **Scorecard alignment**         | A8, C4, G4, L4, N2             | Vision — R&D scorecard alignment                 |
| **Team scaling / global mgmt**  | A4, A7, C6, C7, N5; B3 skipped | F1 + Hero “5 Countries”                          |
| **EVP recognition**             | C1, I3                         | Vision — EVP-level recognition + Awards detail   |
| **Gartner / multimodal vision** | C2, D2                         | Vision — Gartner card (+ Technical Vision page)  |
| **Executive sponsorship**       | D3, G1 partial, L3 partial     | Vision — Executive sponsorship + Hero metric     |
| **Clinical + AI / surgeries**   | A12, B1, L5 partial            | B1 differentiator                                |
| **Business impact / outcomes**  | B4                             | B4 differentiator (merged Outcome-Driven theme)  |
| **Kaggle coaching**             | F3                             | F3 card (distinct from I2 site-wide medal tally) |
| **Collaborations**              | G3, M4, N4 partial             | Collab logos (+ Vision page text)                |

---

## Removed from About (formerly `leadershipPhilosophy.themes[]`)

| Former theme                           | Now covered by                      |
| -------------------------------------- | ----------------------------------- |
| Hiring & Scaling                       | F1 (People & Mentoring)             |
| Mentoring                              | F2 (People & Mentoring)             |
| Cross-functional & Executive Alignment | Vision — Executive sponsorship      |
| Outcome-Driven Decisions               | B4 — Business-impact first (merged) |

## Resolved

- **Drug-safety timeline compression:** authoritative figure is **"5 years → 3 years"** (per `resume.json`). Item **E6** on site uses this figure.
- **B4 + Outcome-Driven Decisions:** merged into one differentiator card; themes grid emptied.

---

## Decision log

| Date / ref | Decision                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `2751c9f`  | Added B1–B4 as "What sets me apart" differentiators (4 cards).                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-07    | Added People & Mentoring (F1–F4); skipped F5.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 2026-07    | Added Vision subsection (`strategicVision`: C1, C2, C4 + executive sponsorship).                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-07    | Trimmed differentiators to B1, B2, merged B4; removed B3 and entire themes grid.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-07    | **Coverage audit:** site-wide ⚠️ / ~ annotations added; cross-reference index and “Captured on site” sections added.                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-07    | Added group **P** — CTO-for-AI positioning lens (P1–P11): reframes and priorities to elevate About from Technical AI Lead to CTO-for-AI.                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-07    | **CTO-pillar restructure (P1–P6 LIVE):** replaced differentiators/themes with Intro (CTO thesis) → Strategy & Sponsorship → Business & P&L Impact → Platform & Infrastructure → Team & Org Building → Governance & Responsible AI. Schema: removed `differentiators`/`themes`, added `businessImpact`/`platform`/`governance`. Now covered: C5, E4, E5, E6, G1, G2, K1, K5. Clinical+AI (B1)→intro line; B4 superseded. Team & Org Building trimmed 2026-07 to F1 + F2/F3/F4 (dropped F5 hiring-engine, F6 interviewing). |
| Ongoing    | Open About candidates: B5, E7, F5, F6, J8, O1, P7–P8, P10–P11, and most partial items.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
