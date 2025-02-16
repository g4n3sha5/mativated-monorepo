import { type AppRouter } from '@mativated-monorepo/server/src/routers';
import { RouterInput, RouterOutput } from '@mativated-monorepo/server/src/utils/types';
import { inferReactQueryProcedureOptions } from '@trpc/react-query';

type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;

export type StatisticDateScope = LabelValue<string, number>;

export interface LabelValue<T = string, U = number> {
  label: T;
  value: U;
}

export interface SessionLabelRecord {
  label: string;
  type: SessionType | 'TOTAL';
}
export interface SessionIconRecord extends SessionLabelRecord {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// gte - starting date, lte - ending date
export interface DateScope {
  lte: Date;
  gte: Date;
}

export const IntensityDictionary = {
  LIGHT: 'Light',
  MODERATE: 'Moderate',
  HIGH: 'High',
  VERY_HIGH: 'Very high',
} as const;

export type IntensityReadable = (typeof IntensityDictionary)[keyof typeof IntensityDictionary];

export type CreateSessionInputField = keyof SessionCreateInput;

export type SessionCreateInput = RouterInput['sessions']['createSession'];
export type SessionGetOutput = RouterOutput['sessions']['getSessions'];
export type StatisticsGetOutput = RouterOutput['sessions']['getSessionSpecificStats'];

export type SessionType = SessionCreateInput['type'];
export type TotalSessionType = SessionType | 'TOTAL';
export type Technique = RouterOutput['techniques'];
