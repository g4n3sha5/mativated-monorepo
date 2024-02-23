import { publicProcedure, trpc } from '@/trpc';

export const webhookRouter = trpc.router({
  log: publicProcedure.query(() => 'webhook Router!'),
});
