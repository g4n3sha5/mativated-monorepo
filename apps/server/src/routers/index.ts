import { trpc } from '../trpc';
import { sessionsRouter } from './sessions';

export const appRouter = trpc.router({
  sessions: sessionsRouter,
});

export const mergedRouter = trpc.mergeRouters(appRouter);

// export type AppRouter = typeof appRouter;
export type AppRouter = typeof mergedRouter;
// console.log(appRouter.getRouterKeys());
