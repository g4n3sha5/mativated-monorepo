import { any, z } from 'zod';
import type { Prisma } from '@prisma/client';
import {
  TechniqueCreateNestedManyWithoutSessionsInputSchema,
  UserCreateNestedOneWithoutSessionsInputSchema,
} from '../server/src/prisma/generated/zod';

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
    time: z.string().optional(),
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

export const SessionsListSchema = z.array(
  z.object({
    id: z.number().int(),
    date: z.coerce.date(),
    time: z.string().optional(),
    type: z.lazy(() => SessionTypeSchema),
    location: z.string().optional(),
    minutesLength: z.number().int(),
    intensity: z.lazy(() => IntensitySchema),
    notes: z.string().optional(),
    sparringTime: z.number().int().optional(),
    drillingTime: z.number().int().optional(),
    weight: z.number().int().optional(),
    // techniques: z.any(),
    authorId: z.string(),
  })
);

export const GetSessionsSchema = z.object({ authorId: z.string() });
