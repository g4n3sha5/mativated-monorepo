import { AppRouter } from '@/routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';


type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type SessionCreateInput = RouterInput['sessions']['createSession'];
// export type SessionGetInput = ReactQueryOptions['sessions']['getSessions'];
export type SessionGetOutput = RouterOutput['sessions']['getSessions']
// export type SessionGetOutput = ReactQueryOptions['sessions']['getSessions'][number];

export type SessionType = RouterOutput['sessions']['createSession']['type'];
