import { AppRouterType } from '@mativated-monorepo/server/src/routers';
import { type inferReactQueryProcedureOptions } from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouterType>;
export type RouterInput = inferRouterInputs<AppRouterType>;
export type RouterOutput = inferRouterOutputs<AppRouterType>;

export type SessionCreateInput = RouterInput['sessions']['createSession'];
export type SessionGetInput = RouterInput['sessions']['getSessions'];
export type SessionGetOutput = RouterOutput['sessions']['getSessions'][number];
