// Human-facing guide: docs/page-improvement-workflow.md
export const meta = {
  name: 'build-page',
  description: 'Drive the identify->structure->change->review->repeat loop for one portfolio page',
  whenToUse: 'Designing, restructuring, or iterating a single portfolio page end-to-end with an acceptance gate. Pass args:{page} where page is one of home|experience|projects|research|recognition|contact.',
  phases: [
    { title: 'Inventory', detail: 'List candidate items that belong on the page' },
    { title: 'Structure', detail: 'Order sections per page-composition; author the acceptance brief' },
    { title: 'Change', detail: 'Apply content/component edits to realize the structure' },
    { title: 'Review', detail: 'build-gate + composition + visual + a11y + seo vs the brief' },
  ],
}

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------
const PAGES = ['home', 'experience', 'projects', 'research', 'recognition', 'contact']
const page = (typeof args === 'string' ? args : (args && args.page) || '').trim()
if (!PAGES.includes(page)) {
  throw new Error(`build-page: args.page must be one of ${PAGES.join(', ')} (got "${page}")`)
}
const goal = (args && typeof args === 'object' && args.goal) || ''
const maxRounds = (args && typeof args === 'object' && args.maxRounds) || 3
const briefPath = `docs/page-briefs/${page}.md`

// ---------------------------------------------------------------------------
// Schemas (plain JSON Schema literals — validated at the tool layer)
// ---------------------------------------------------------------------------
const INVENTORY = {
  type: 'object',
  required: ['items'],
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'source', 'question', 'weight', 'include', 'rationale'],
        properties: {
          id: { type: 'string', description: 'Section id as used in site.json sections[]' },
          source: { type: 'string', description: 'content/*.json file (or component) the item renders from' },
          question: { type: 'integer', minimum: 1, maximum: 5, description: 'Which of page-composition five-questions this item answers' },
          weight: { type: 'string', enum: ['heavy', 'medium', 'light'] },
          include: { type: 'boolean' },
          rationale: { type: 'string' },
        },
      },
    },
  },
}

const STRUCTURE = {
  type: 'object',
  required: ['sections', 'cadence', 'briefPath', 'acceptanceCriteria'],
  properties: {
    sections: { type: 'array', items: { type: 'string' }, description: 'Ordered section ids to set on site.json pages[page].sections' },
    cadence: {
      type: 'array',
      description: 'Per-block rationale proving the composition formula holds',
      items: {
        type: 'object',
        required: ['section', 'weight', 'why'],
        properties: {
          section: { type: 'string' },
          weight: { type: 'string', enum: ['heavy', 'medium', 'light'] },
          visual: { type: 'string', description: 'Infographic/visual choice for this block, or "none"' },
          why: { type: 'string' },
        },
      },
    },
    briefPath: { type: 'string', description: 'Path the brief markdown was written to' },
    acceptanceCriteria: { type: 'array', items: { type: 'string' }, description: 'The checklist items written into the brief' },
  },
}

const REVIEW_VERDICT = {
  type: 'object',
  required: ['lens', 'verdicts'],
  properties: {
    lens: { type: 'string' },
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        required: ['criterion', 'status', 'evidence'],
        properties: {
          criterion: { type: 'string' },
          status: { type: 'string', enum: ['pass', 'fail'] },
          evidence: { type: 'string' },
          fix: { type: 'string', description: 'Concrete remediation if status=fail' },
        },
      },
    },
  },
}

// ---------------------------------------------------------------------------
// Shared preamble — every agent obeys the repo hard rules + SSOT
// ---------------------------------------------------------------------------
const PREAMBLE = `You are working in the Astro 4 portfolio repo. Before anything else, read AGENTS.md and obey its hard rules: (1) @astrojs/sitemap pinned to 3.6.0 — never touch it; (2) one source of truth for the site URL; (3) PRIVACY — never surface a phone number or a References section; (4) deploy is automated. Content is the single source of truth: change what the site SAYS only via content/*.json (schema-first in src/schemas.ts if a field is added), never hardcode copy in components. Section order/visibility per page lives in content/site.json -> pages[].sections[] and sections{}, rendered by src/components/SectionRenderer.astro. Make surgical changes only.`

// ---------------------------------------------------------------------------
// Stage prompts
// ---------------------------------------------------------------------------
const INVENTORY_PROMPT = `${PREAMBLE}

TASK — STAGE 1 (INVENTORY) for the "${page}" page${goal ? ` (goal: ${goal})` : ''}.
Identify the full list of candidate items that could belong on this page.

Read: content/site.json (the pages[] entry with id "${page}" and the sections{} map), every content/*.json file those sections render from, docs/content-map.md (what résumé content is included/excluded and why), docs/specification.md (per-section data contract), and content/README.md (provenance + curation rules). If a résumé source path is named in content/README.md, consult it for items not yet surfaced.

For EACH candidate item return: id (section id), source (file), question (1-5 from the page-composition five-questions gate: 1=what is this, 2=why care, 3=how it works, 4=why trust, 5=what next), weight (heavy/medium/light), include (true if it earns a place on THIS page), and a one-line rationale. Include items currently on the page AND viable additions; mark clearly which to include vs exclude. Do not edit any files — this is read-only inventory.`

const STRUCTURE_PROMPT = (inventory) => `${PREAMBLE}

TASK — STAGE 2 (STRUCTURE) for the "${page}" page.
Load the page-composition skill (.claude/skills/page-composition/SKILL.md) and its references/composition-formula.md and references/section-catalog.md.

Inventory of candidate items (from stage 1):
${JSON.stringify(inventory, null, 2)}

Using only the items marked include=true, decide the best section ORDER for this page applying the composition formula: no two adjacent sections share a structure; alternate visual weight (heavy->light->medium, never heavy on heavy); alternate background/contrast; exactly one primary CTA; aim for one memorable "moment" every few sections and a strong finish. For each block note the visual/infographic choice (consult references/infographic-catalog.md; "none" if plain text suffices) — but do NOT build anything yet.

Then WRITE the acceptance brief to ${briefPath} using the format in docs/page-briefs/_template.md (create the file). Fill: Items (what belongs here, with source/question/weight), Structure (your ordered sections + one-line rationale each), and Acceptance criteria (start from the template's standard checklist, then add page-specific criteria for "${page}"). If ${briefPath} already exists, refine it rather than overwrite wholesale.

Return: sections (the ordered id array to set on site.json), cadence (per-block weight+visual+why), briefPath ("${briefPath}"), and acceptanceCriteria (the checklist you wrote). Do NOT edit content/site.json in this stage — only write the brief.`

const CHANGE_PROMPT = (structure, unmet, round) => `${PREAMBLE}

TASK — STAGE 3 (CHANGE), round ${round}, for the "${page}" page.
Load the content-editing skill (.claude/skills/content-editing/SKILL.md). Load astro-site and/or infographics skills ONLY if a brand-new section type or in-site visual is required by the brief.

Target structure (from stage 2):
${JSON.stringify(structure, null, 2)}
${unmet && unmet.length ? `\nThis is a REPAIR round. Fix ONLY these unmet acceptance criteria from the last review; do not regress what passed:\n${unmet.map((u) => `- [${u.lens}] ${u.criterion} — ${u.evidence}${u.fix ? ` => FIX: ${u.fix}` : ''}`).join('\n')}` : ''}

Apply the changes:
- Set content/site.json -> the pages[] entry with id "${page}" -> sections[] to the target order (and flip sections{}.<id>.visible only if intentional). Reorder/show/hide there — never hardcode order in route files.
- Edit any content/*.json copy the brief calls for. Build a new component or no-JS infographic from EXISTING primitives only when the brief requires it (prefer reuse: MetricCard, Card, ScanCard, Chip, Icon, Section, CareerTimeline, LeadershipPhilosophy).
- Keep edits surgical and schema-valid. Do not run a full review here.

Return a short summary of the files you touched and what changed.`

const REVIEW_PROMPTS = {
  'build-gate': `${PREAMBLE}

TASK — STAGE 4 REVIEW, lens "build-gate", for the "${page}" page. This is the deterministic gate (equivalent to /verify-content + /privacy-check).
Run \`npm run build\` (this runs Zod validation over content/*.json). Then run the privacy greps over content/*.json:
  grep -rEi '\\+?[0-9][0-9 ()-]{8,}[0-9]' content/*.json   (phone numbers)
  grep -ri '"references"' content/*.json                    (References section)
Read the acceptance criteria in ${briefPath}. Return a verdict per criterion you can judge deterministically (build passes / privacy clean / required items present in content). status=fail with the exact Zod field path or offending file:line as evidence on any error. Do not fix anything — report only.`,

  composition: `${PREAMBLE}

TASK — STAGE 4 REVIEW, lens "composition", for the "${page}" page.
Load .claude/skills/page-composition/references/review-checklist.md. Read ${briefPath} (the intended structure + acceptance criteria) and the current content/site.json pages[] entry for "${page}". Judge the page's section sequence against the brief and the checklist: no two adjacent sections share a structure, visual weight/contrast alternates, exactly one primary CTA, strong finish, a "moment" every few sections. Return a verdict per relevant acceptance criterion with concrete evidence (name the adjacent sections that clash, etc.) and a fix when status=fail. Read-only.`,

  visual: `${PREAMBLE}

TASK — STAGE 4 REVIEW, lens "visual", for the "${page}" page.
Load the visual-review skill and its SSOT loads (docs/design-direction.md, src/styles/global.css, the relevant section components). Read ${briefPath}. Audit hierarchy, whitespace, color restraint (60/30/10), component consistency, theme parity, responsive layout, motion. Return a verdict per relevant acceptance criterion with evidence and a fix when status=fail. Read-only — do not edit.`,

  a11y: `${PREAMBLE}

TASK — STAGE 4 REVIEW, lens "a11y", for the "${page}" page.
Load the accessibility skill (WCAG 2.1 AA). Read ${briefPath}. Check landmarks, heading order, contrast in both themes, visible focus, reduced-motion, tap targets, ARIA for the sections on this page. Return a verdict per relevant acceptance criterion with evidence and a fix when status=fail. Read-only.`,

  seo: `${PREAMBLE}

TASK — STAGE 4 REVIEW, lens "seo", for the "${page}" page.
Load the seo skill. Read ${briefPath} and the pages[] entry for "${page}" in content/site.json. Verify per-page title/description present and sensible, OG/Twitter coverage, JSON-LD/sitemap not broken by the changes. If this page has no SEO-specific acceptance criteria, return a single pass verdict noting SEO is out of scope for this page. Read-only.`,
}

// ---------------------------------------------------------------------------
// Orchestration — the 5-step loop
// ---------------------------------------------------------------------------
phase('Inventory')
const inventory = await agent(INVENTORY_PROMPT, { agentType: 'Explore', label: `inventory:${page}`, schema: INVENTORY })

phase('Structure')
const structure = await agent(STRUCTURE_PROMPT(inventory), { label: `structure:${page}`, schema: STRUCTURE })

const lenses = ['build-gate', 'composition', 'visual', 'a11y', 'seo']
let unmet = null

for (let round = 1; round <= maxRounds; round++) {
  phase('Change')
  await agent(CHANGE_PROMPT(structure, unmet, round), { label: `change:r${round}` })

  phase('Review')
  const results = (await parallel(
    lenses.map((lens) => () =>
      agent(REVIEW_PROMPTS[lens], { label: `review:${lens}:r${round}`, phase: 'Review', schema: REVIEW_VERDICT })
    )
  )).filter(Boolean)

  const verdicts = results.flatMap((r) => (r.verdicts || []).map((v) => ({ ...v, lens: r.lens })))
  unmet = verdicts.filter((v) => v.status === 'fail')
  const passed = verdicts.length - unmet.length
  log(`Round ${round}/${maxRounds}: ${passed}/${verdicts.length} acceptance criteria MET`)

  if (unmet.length === 0) {
    return { page, status: 'MET', round, brief: briefPath, sections: structure.sections }
  }
}

log(`Capped at ${maxRounds} rounds — ${unmet.length} unmet: ${unmet.map((u) => `[${u.lens}] ${u.criterion}`).join('; ')}`)
return { page, status: 'NOT_MET', unmet, brief: briefPath, sections: structure.sections }
