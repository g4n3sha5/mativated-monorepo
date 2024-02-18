import { trpc } from '@/trpc';

export const webhookRouter = trpc.router({
  log: trpc.procedure.query(() => 'webhook Router!'),
});
