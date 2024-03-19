import prisma from '@/prisma';
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
  createSession: createSessionProcedure.mutation(async ({ input }) => {
    const { authorId, ...rest } = input;
    await prisma.session.create({
      data: {
        ...rest,
        author: { connect: { externalId: authorId } },
      },
    });
  }),
  getSessions: getSessionsProcedure.query(
    async ({ input }) =>
      await prisma.session.findMany({
        where: { authorId: input.authorId },
        orderBy: {
          id: 'desc',
        },
      })
  ),
  deleteSession: deleteSessionProcedure.mutation(async ({ input }) => {
    await prisma.session.delete({
      where: { id: input.id },
    });
  }),
  getSession: getSessionProcedure.query(
    async ({ input }) =>
      await prisma.session.findFirstOrThrow({
        where: { authorId: input.authorId },
        orderBy: { id: 'desc' },
      })
  ),
});
