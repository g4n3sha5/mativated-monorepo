import { AppRouter } from '@/routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCReact, type inferReactQueryProcedureOptions } from '@trpc/react-query';

type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type SessionCreateInput = ReactQueryOptions['sessions']['createSession'];
export type SessionGetInput = ReactQueryOptions['sessions']['getSessions'];
export type SessionGetOutput = ReactQueryOptions['sessions']['getSessions'][number];
export type SessionType = ReactQueryOptions['sessions']['createSession']['type'];
