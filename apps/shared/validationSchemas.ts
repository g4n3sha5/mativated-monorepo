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

export const SessionSchema = z.object({
  type: SessionTypeSchema,
  date: z.coerce.date(),
  time: z.string().nullable(),
  location: z.string().nullable(),
  minutesLength: z.number().int().min(1, { message: 'Length is required' }),
  notes: z.string().nullable(),
  sparringTime: z.number().int().nullable(),
  drillingTime: z.number().int().nullable(),
  weight: z.number().int().nullable(),
  intensity: IntensitySchema,
});
