import { AppRouter } from '../routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { totalSessionTypeValues } from '@utils/constants.ts';

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type TotalSessionType = (typeof totalSessionTypeValues)[number];
