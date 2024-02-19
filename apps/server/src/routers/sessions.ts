import { publicProcedure, trpc } from '@/trpc';
import { SessionSchema } from '@mativated-monorepo/shared/validationSchemas';

const addSessionProcedure = publicProcedure.input(SessionSchema);

export const sessionsRouter = trpc.router({
  addSession: addSessionProcedure.mutation((request) => {
    console.log(request);
    return {
      message: 'hello',
    };
  }),
});
