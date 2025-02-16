import { trpc } from '../trpc';
import { sessionsRouter } from './sessions';
import { techniquesRouter } from '@routers/techniques.ts';

export const appRouter = trpc.router({
  sessions: sessionsRouter,
  techniques: techniquesRouter,
});

export const mergedRouter = trpc.mergeRouters(appRouter);

// export type AppRouter = typeof appRouter;
export type AppRouter = typeof mergedRouter;
