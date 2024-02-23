import { AppRouter, mergedRouter } from '@mativated-monorepo/server/src/routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';


export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type SessionCreateInput = RouterInput['sessions']['createSession'];

export type CreateSessionInputField = keyof SessionCreateInput;
export type InputField = CreateSessionInputField;
export type SessionType = RouterInput['sessions']['createSession']['type'];
