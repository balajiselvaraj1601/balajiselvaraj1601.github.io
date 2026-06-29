import { z } from 'zod';

/** Semantic icon keys rendered by `Icon.astro`. */
export const iconNameSchema = z.enum([
  'email',
  'linkedin',
  'kaggle',
  'github',
  'location',
  'external',
  'download',
  'clock',
  'calendar',
  'arrow-right',
  'sun',
  'moon',
  'menu',
  'close',
  'arrow-up',
  'chevron',
  'chevron-right',
  'trophy',
  'brain',
  'rocket',
  'pill',
  'institution',
  'microscope',
  'presentation',
  'chart',
  'funding',
  'target',
  'link',
  'team',
  'globe',
  'blocks',
  'document',
  'graduation',
  'diamond',
  'folder',
  'layers',
  'scan',
  'graph',
  'dna',
  'vision',
  'lightbulb',
  'book',
  'handshake',
  'table',
  'pulse',
  'image',
  'save',
]);

export type IconName = z.infer<typeof iconNameSchema>;

/** Resolve a content icon string to a known icon key, with safe fallback. */
export function resolveIcon(
  value: string | undefined,
  fallback: IconName = 'folder'
): IconName {
  const parsed = iconNameSchema.safeParse(value);
  return parsed.success ? parsed.data : fallback;
}

const COMPETITION_ICONS: Record<string, IconName> = {
  'bengaliai-speech-recognition': 'pulse',
  'happywhale-identification': 'image',
  'google-contrails': 'globe',
  'open-problems-multimodal-single-cell': 'dna',
  'uw-madison-gi-tract-segmentation': 'scan',
  'google-asl-signs': 'lightbulb',
  'enefit-energy-prosumers': 'sun',
  'bengaliai-handwritten-grapheme': 'document',
  'aptos-2019-blindness-detection': 'microscope',
};

const COMPETITION_DOMAIN_ICONS: Record<string, IconName> = {
  'Speech Recognition & NLP': 'pulse',
  'Re-Identification & Conservation AI': 'image',
  'Satellite Segmentation & Climate AI': 'globe',
  'Computational Biology & Multi-Omics': 'dna',
  'Medical Imaging & Radiation Oncology': 'scan',
  'Accessibility AI & Edge Deployment': 'lightbulb',
  'Time Series & Sustainability': 'sun',
  'Computer Vision & OCR': 'document',
  'Medical Imaging & Ophthalmology': 'microscope',
};

/** Map Kaggle competition id (and domain) to a semantic icon. */
export function competitionIcon(id: string, domain: string): IconName {
  return COMPETITION_ICONS[id] ?? COMPETITION_DOMAIN_ICONS[domain] ?? 'kaggle';
}
