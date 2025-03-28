import { z } from 'zod';
import { TechniqueType } from '@prisma/client';

const techniqueTypeValues = Object.values(TechniqueType);

export const TechniqueTypeSchema = z.enum(techniqueTypeValues as [TechniqueType, ...TechniqueType[]]);

export const TechniqueSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  type: TechniqueTypeSchema,
  videoUrl: z.string().url().nullable(),
  giOnly: z.boolean(),
  createdAt: z.coerce.date(),
  userId: z.string().nullable(),
});

export const TechniquesListInputSchema = z
  .object({
    authorId: z.string().optional(),
  })
  .optional();

export const TechniquesListOutputSchema = z.array(TechniqueSchema);

export const AddTechniqueSchema = z.object({
  name: z.string().min(1, 'Technique name is required'),
  description: z.string().optional(),
  type: TechniqueTypeSchema,
  videoUrl: z.string().url().optional(),
  giOnly: z.boolean().default(false),
  authorId: z.string().optional(),
});
