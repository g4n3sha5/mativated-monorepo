import { AppRouterType } from '@mativated-monorepo/server/src/routers';
import { type inferReactQueryProcedureOptions } from '@trpc/react-query';

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouterType>;

export * from '@mativated-monorepo/server/src/utils/types';
