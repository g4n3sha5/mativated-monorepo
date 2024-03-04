import { createSessionHandler, getSessionsHandler } from '@controllers/session.controller';
import { publicProcedure, trpc } from '../trpc';
import {
  SessionCreateSchema,
  SessionsListSchema,
  GetSessionsSchema,
} from '@mativated-monorepo/shared/validationSchemas';

const createSessionProcedure = publicProcedure.input(SessionCreateSchema);
const getSessionsProcedure = publicProcedure.input(GetSessionsSchema).output(SessionsListSchema);

export const sessionsRouter = trpc.router({
  createSession: createSessionProcedure.mutation(({ input, ctx }) => createSessionHandler({ input, ctx })),
  getSessions: getSessionsProcedure.query(({ input, ctx }) => getSessionsHandler({ input, ctx })),
});
