import { trpc } from '@/trpc';
import { z } from 'zod';
import type { SessionType } from '@prisma/client';

export const sessionsRouter = trpc.router({
  addSession: publicProcedure.input((session) => trpc.mutation.createOneSession(SessionSchema)),
});
