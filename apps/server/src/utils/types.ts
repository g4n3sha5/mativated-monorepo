import { AppRouter } from '@/routers';
import type { inferProcedureOutput, inferRouterInputs, inferRouterOutputs } from '@trpc/server';

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type SessionCreateInput = RouterInput['sessions']['createSession'];
export type SessionGetOutput = RouterOutput['sessions']['getSessions'];

export type SessionType = RouterOutput['sessions']['createSession']['type'];
