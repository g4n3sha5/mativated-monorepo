import { z } from 'zod';

export const SessionTypeSchema = z.enum([
  'GI',
  'NO_GI',
  'GYM',
  'YOGA',
  'MMA',
  'BOXING',
  'RUN',
  'SWIM',
  'BIKE',
  'MEDITATION',
  'OTHER',
]);

export const IntensitySchema = z.enum(['LIGHT', 'MODERATE', 'HIGH', 'VERY_HIGH']);

export const SessionCreateSchema = z
  .object({
    date: z.coerce.date(),
    time: z.string(),
    type: z.lazy(() => SessionTypeSchema),
    location: z.string().optional(),
    minutesLength: z.number().int().min(1, { message: 'Length is required' }),
    intensity: z.lazy(() => IntensitySchema),
    notes: z.string().optional(),
    sparringTime: z.number().int().optional(),
    drillingTime: z.number().int().optional(),
    weight: z.number().int().optional(),
    techniques: z.any(),
    authorId: z.string(),
  })
  .strict();

export const SessionDeleteSchema = z.object({
  id: z.number().int(),
});
export const SessionSchema = z.object({
  type: SessionTypeSchema,
  intensity: IntensitySchema,
  id: z.number().int(),
  date: z.coerce.date(),
  time: z.string(),
  location: z.string().nullable(),
  minutesLength: z.number().int(),
  notes: z.string().nullable(),
  sparringTime: z.number().int().nullable(),
  drillingTime: z.number().int().nullable(),
  authorId: z.string(),
  weight: z.number().int().nullable(),
});

export const SessionsListSchema = z.array(
  z.object({
    id: z.number().int(),
    date: z.coerce.date(),
    time: z.string(),
    type: z.lazy(() => SessionTypeSchema),
    location: z.string().nullable(),
    minutesLength: z.number().int(),
    intensity: z.lazy(() => IntensitySchema),
    notes: z.string().nullable(),
    sparringTime: z.number().int().nullable(),
    drillingTime: z.number().int().nullable(),
    weight: z.number().int().nullable(),
    // techniques: z.any(),
    authorId: z.string(),
  })
);

export const GetSessionsOutputSchema = z.object({
  pagesTotal: z.number().int(),
  itemsCount: z.number().int(),
  pageSize: z.number().int(),
  sessions: SessionsListSchema,
});

export const GetSessionInputSchema = z.object({
  authorId: z.string(),
});

export const GetSessionsInputSchema = z.object({
  authorId: z.string(),
  page: z.number().int(),
});

export const GetSessionsStatisticsInputSchema = z.object({
  authorId: z.string(),
});
