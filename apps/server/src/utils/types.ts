import { AppRouter } from '../routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { sessionTypeValues, totalSessionTypeValues } from '@utils/constants';

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type SessionType = (typeof sessionTypeValues)[number];
export type TotalSessionType = (typeof totalSessionTypeValues)[number];
