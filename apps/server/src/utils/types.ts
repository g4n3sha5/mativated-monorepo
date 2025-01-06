import { AppRouter } from '@/routers';
import { SessionType } from '@prisma/client';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type TotalSessionType = SessionType | 'TOTAL';
