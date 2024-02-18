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

export const SessionSchema = z.object({
  type: SessionTypeSchema,
  id: z.number().int(),
  date: z.string(),
  time: z.string(),
  location: z.string().nullable(),
  minutesLength: z.number().int(),
  notes: z.string().nullable(),
  fightTime: z.number().int().nullable(),
});
