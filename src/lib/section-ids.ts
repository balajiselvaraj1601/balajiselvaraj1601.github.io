/** Section component registry keys — must match `SectionRenderer.astro` SECTIONS map. */
export const SECTION_COMPONENT_IDS = [
  'hero',
  'thirukural',
  'impact',
  'technical-vision',
  'leadership',
  'experience',
  'experience-intro',
  'projects-intro',
  'featured-case-studies',
  'generative-ai',
  'education',
  'awards',
  'publications',
  'conferences',
  'speakers',
  'kaggle',
  'contact',
] as const;

export type SectionComponentId = (typeof SECTION_COMPONENT_IDS)[number];

export const SECTION_COMPONENT_ID_SET = new Set<string>(SECTION_COMPONENT_IDS);
