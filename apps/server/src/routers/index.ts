// import { sessionsRouter } from '@/routers/sessions';
import { userRouter } from '@/routers/users';
import { trpc } from '@/trpc';

export const appRouter = trpc.router({
  users: userRouter,
  // sessions: sessionsRouter,
  sayHi: publicProcedure.query(() => {
    return 'hi';
  }),
  logToServer: publicProcedure
    .input((v) => {
      if (typeof v === 'string') return v;
      throw new Error('expected string');
    })
    .mutation((req) => {
      console.log(`Client says: ${req.input}`);
      return true;
    }),
});

export const mergedRouter = trpc.mergeRouters(appRouter, userRouter);
