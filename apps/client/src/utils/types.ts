import { type AppRouter } from '@mativated-monorepo/server/src/routers';
import { RouterInput, RouterOutput, TotalSessionType } from '@mativated-monorepo/server/src/utils/types';
import { inferReactQueryProcedureOptions } from '@trpc/react-query';

type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;

export type StatisticDateScope = LabelValue<string, number>;

export interface LabelValue<T = string, U = number> {
  label: T;
  value: U;
}

export interface SessionIconRecord {
  label: string;
  type: TotalSessionType;
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

export type Intensity = (typeof IntensityDictionary)[keyof typeof IntensityDictionary];

export type AddSessionInputField = keyof AddSessionInput;

export type AddSessionInput = RouterInput['sessions']['addSession'];
export type SessionGetOutput = RouterOutput['sessions']['getSessions']['sessions'][number];
export type StatisticsGetOutput = RouterOutput['sessions']['getSessionSpecificStats'];

export type Technique = RouterOutput['techniques'];
