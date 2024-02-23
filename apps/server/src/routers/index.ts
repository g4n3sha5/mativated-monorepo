import { userRouter } from '@routers/users';
import { trpc } from 'trpc';

export const appRouter = trpc.router({
  users: userRouter,
});

export const mergedRouter = trpc.mergeRouters(userRouter);
