import { createSessionHandler, getSessionHandler, getSessionsHandler } from '@controllers/session.controller';
import { publicProcedure, trpc } from '../trpc';
import {
  GetSessionSchema,
  SessionCreateSchema,
  SessionDeleteSchema,
  SessionSchema,
  SessionsListSchema,
} from '@/utils/validationSchemas';

const createSessionProcedure = publicProcedure.input(SessionCreateSchema);
const deleteSessionProcedure = publicProcedure.input(SessionDeleteSchema);
const getSessionProcedure = publicProcedure.input(GetSessionSchema).output(SessionSchema);
const getSessionsProcedure = publicProcedure.input(GetSessionSchema).output(SessionsListSchema);

export const sessionsRouter = trpc.router({
  createSession: createSessionProcedure.mutation(({ input, ctx }) => createSessionHandler({ input, ctx })),
  removeSession: deleteSessionProcedure.mutation(({ input, ctx }) => createSessionHandler({ input, ctx })),
  getSession: getSessionProcedure.query(({ input, ctx }) => getSessionHandler({ input, ctx })),
  getSessions: getSessionsProcedure.query(({ input, ctx }) => getSessionsHandler({ input, ctx })),
});
