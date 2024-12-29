import { type AppRouter } from '@mativated-monorepo/server/src/routers';
import {
  type SessionType,
  type SessionCreateInput,
  type SessionGetOutput,
} from '@mativated-monorepo/server/src/utils/types';
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
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

export type Statistic = {
  type: SessionType;
  value: number;
};

export type DateScopeKey = 'TOTAL' | 'LAST_7_DAYS' | 'LAST_30_DAYS' | 'LAST_90_DAYS';

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

export type Session = SessionGetOutput;
