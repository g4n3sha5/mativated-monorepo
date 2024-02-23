import { AppRouterType } from '@mativated-monorepo/server/src/routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { type inferReactQueryProcedureOptions } from '@trpc/react-query';

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouterType>;
export type RouterInput = inferRouterInputs<AppRouterType>;
export type RouterOutput = inferRouterOutputs<AppRouterType>;

// export type SessionCreateInput = ReactQueryOptions['sessions']['createSession'];

export type SessionCreateInput = RouterInput['sessions']['createSession'];
