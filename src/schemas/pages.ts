import { z } from 'zod';
import { profileSchema, collaborationsSchema } from './person';
import { experienceSchema, visionBoardSchema } from './work';
import { linkListSchema, speakersSchema } from './research';
import { awardsSchema, educationSchema, kaggleSchema } from './recognition';

const contactProfileFields = {
  name: true,
  title: true,
  location: true,
  contactIntro: true,
  contactPage: true,
  contact: true,
} as const;

/* ── numbered page JSON files under content/pages/ ─────────────────────── */
export const aboutPageSchema = profileSchema
  .omit({
    contactIntro: true,
    contactPage: true,
    contact: true,
  })
  .extend({
    collaborations: collaborationsSchema,
  });

export const contactPageContentSchema =
  profileSchema.pick(contactProfileFields);

export const researchPageSchema = z.object({
  publications: linkListSchema,
  conferences: linkListSchema,
  speakers: speakersSchema,
});

export const recognitionPageSchema = z.object({
  awards: awardsSchema,
  kaggle: kaggleSchema,
  education: educationSchema,
});

export const experiencePageSchema = experienceSchema;
export const visionPageSchema = visionBoardSchema;

export type AboutPage = z.infer<typeof aboutPageSchema>;
export type ContactPageContent = z.infer<typeof contactPageContentSchema>;
export type ExperiencePage = z.infer<typeof experiencePageSchema>;
export type ResearchPage = z.infer<typeof researchPageSchema>;
export type RecognitionPage = z.infer<typeof recognitionPageSchema>;
export type VisionPage = z.infer<typeof visionPageSchema>;
