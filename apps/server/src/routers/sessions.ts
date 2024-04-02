import prisma from '@/prisma';
import { publicProcedure, trpc } from '../trpc';
import {
  GetSessionInputSchema,
  GetSessionOutputSchema,
  SessionCreateSchema,
  SessionDeleteSchema,
  SessionSchema,
  SessionsListSchema,
} from '@/utils/validationSchemas';
import { Prisma } from '@prisma/client';

const createSessionProcedure = publicProcedure.input(SessionCreateSchema);
const deleteSessionProcedure = publicProcedure.input(SessionDeleteSchema);
const getSessionProcedure = publicProcedure.input(GetSessionInputSchema).output(SessionSchema);
const getSessionsProcedure = publicProcedure.input(GetSessionInputSchema).output(GetSessionOutputSchema);

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
  getSessions: getSessionsProcedure.query(async (req) => {
    const page = req.input.page - 1;
    const pageSize = 6;
    const query: Prisma.SessionFindManyArgs = {
      skip: page * pageSize,
      take: pageSize,
      where: {
        authorId: req.input.authorId,
      },
      orderBy: {
        id: 'desc',
      },
    };

    const [sessions, count] = await prisma.$transaction([
      prisma.session.findMany(query),
      prisma.session.count({
        where: {
          authorId: req.input.authorId,
        },
      }),
    ]);
    const pagesTotal = Math.ceil(count / pageSize);
    return {
      pagesTotal: pagesTotal,
      pageSize: pageSize,
      itemsCount: count,
      sessions: sessions,
    };
    // await prisma.session.findMany({
    //   where: { authorId: input.authorId },
    //   orderBy: {
    //     id: 'desc',
    //   },
    // });
  }),
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
