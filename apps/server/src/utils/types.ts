import { AppRouter } from '../routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
