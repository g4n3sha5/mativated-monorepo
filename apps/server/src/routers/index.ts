import { trpc } from '../trpc';
import { sessionsRouter } from './sessions';
import { techniquesRouter } from '@routers/techniques';
import { goalsRouter } from '@routers/goals';

export const appRouter = trpc.router({
  sessions: sessionsRouter,
  techniques: techniquesRouter,
  goals: goalsRouter,
});

export const mergedRouter = trpc.mergeRouters(appRouter);

// export type AppRouter = typeof appRouter;
export type AppRouter = typeof mergedRouter;
