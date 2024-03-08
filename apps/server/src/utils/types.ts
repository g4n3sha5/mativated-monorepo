import { AppRouterType } from '@/routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

type RouterInput = inferRouterInputs<AppRouterType>;
export type RouterOutput = inferRouterOutputs<AppRouterType>;

export type SessionCreateInput = RouterInput['sessions']['createSession'];
export type SessionGetInput = RouterInput['sessions']['getSessions'];
export type SessionGetOutput = RouterOutput['sessions']['getSessions'][number];
export type SessionType = RouterInput['sessions']['createSession']['type'];
