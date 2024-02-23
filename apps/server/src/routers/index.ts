import { sessionsRouter } from './sessions';
import { trpc } from '../trpc';

export const appRouter = trpc.router({
  sessions: sessionsRouter,
});

export const mergedRouter = trpc.mergeRouters(appRouter);

// @ts-ignore TODO???
export type AppRouterType = typeof mergedRouter;
