import { trpc } from '@/trpc';
import { z } from 'zod';

const userProcedure = trpc.procedure.input(z.object({ userId: z.string() }));

export const userRouter = trpc.router({
  getUser: trpc.procedure.query(() => {
    return { id: 1, name: 'Kamil' };
  }),
});

// export type AppRouter = typeof appRouter;
