import { z } from 'zod';
import { sessionTypeValues, totalSessionTypeValues } from '../constants';
import { SessionType } from '../types';

export const SessionTypeSchema = z.enum(sessionTypeValues as [SessionType, ...SessionType[]]);
export const TotalSessionTypeSchema = z.enum(totalSessionTypeValues);

export const IntensitySchema = z.enum(['LIGHT', 'MODERATE', 'HIGH', 'VERY_HIGH']);

const SessionSchema = z.object({
  date: z.coerce.date().nullable(),
  time: z.string(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional(),
  minutesLength: z.number().int().min(1, { message: 'Length is required' }),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional(),
  sparringTime: z.number().int().optional(),
  drillingTime: z.number().int().optional(),
  weight: z.number().int().optional(),
  // techniques: z.any(),
  authorId: z.string(),
});

export const AddSessionSchema = SessionSchema;

export const SessionDeleteSchema = z.object({
  id: z.number().int(),
});

export const SessionsListSchema = z.array(SessionSchema);
export const GetSessionInputSchema = z.object({
  authorId: z.string(),
});

export const SessionListInputSchema = z.object({
  authorId: z.string(),
  page: z.number().int(),
});

export const SessionListOutputSchema = z.object({
  pagesTotal: z.number().int(),
  itemsCount: z.number().int(),
  pageSize: z.number().int(),
  sessions: SessionsListSchema,
});

export const SessionTotalStatsInputSchema = z.object({
  authorId: z.string(),
  dateScope: z.object({
    lte: z.coerce.date(),
    gte: z.coerce.date(),
  }),
});

export const SessionTotalStatsOutputSchema = z.array(
  z.object({
    type: SessionTypeSchema,
    value: z.number().int(),
  })
);

export const SessionSpecificStatsInputSchema = z.object({
  authorId: z.string(),
  type: TotalSessionTypeSchema,
});

export const SessionSpecificStatsOutputSchema = z.object({
  dailyAvg: z.number().positive(),
  weeklyAvg: z.number().positive(),
  monthlyAvg: z.number().positive(),
  yearlyAvg: z.number().positive(),
  currentStreak: z.number().int().nonnegative(),
  longestStreak: z.number().int().nonnegative(),
  percentageTrained: z.object({
    type: TotalSessionTypeSchema,
    value: z.number().min(0).max(100),
  }),
});
