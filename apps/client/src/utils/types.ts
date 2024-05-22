import { type AppRouter } from '@mativated-monorepo/server/src/routers';
import {
  type SessionType,
  type SessionCreateInput,
  type SessionGetOutput,
} from '@mativated-monorepo/server/src/utils/types';
import { inferReactQueryProcedureOptions } from '@trpc/react-query';

type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;

export interface SessionIconMap {
  label: string;
  type: SessionType;
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

type DateFilter = 'LAST_30_DAYS';
// type TypeFilter = keyof statisticsTypeOptions

// type Filter = DateFilter | TypeFilter;
type Filter = DateFilter;

export interface StatisticsFilter extends SessionIconMap {
  type: Filter;
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
