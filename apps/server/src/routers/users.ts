import { publicProcedure, trpc } from '@/trpc';
import { z } from 'zod';

const userProcedure = publicProcedure.input(z.object({ userId: z.string() }));

export const userRouter = trpc.router({
  getUser: publicProcedure.query(() => {
    return { id: 1, name: 'Kamil' };
  }),
});
