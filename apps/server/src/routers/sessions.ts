import prisma from '@/prisma';
import { publicProcedure, trpc } from '../trpc';
import {
  GetSessionInputSchema,
  GetSessionsInputSchema,
  GetSessionsOutputSchema,
  GetSessionsStatisticsInputSchema,
  SessionCreateSchema,
  SessionDeleteSchema,
  SessionSchema,
} from '@/utils/validationSchemas';
import { Prisma } from '@prisma/client';

const createSessionProcedure = publicProcedure.input(SessionCreateSchema);
const deleteSessionProcedure = publicProcedure.input(SessionDeleteSchema);
const getSessionProcedure = publicProcedure.input(GetSessionInputSchema).output(SessionSchema);
const getSessionsProcedure = publicProcedure.input(GetSessionsInputSchema).output(GetSessionsOutputSchema);
const getSessionsStatisticsProcedure = publicProcedure.input(GetSessionsStatisticsInputSchema);

// .output(GetSessionsOutputSchema);

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
    let page = req.input.page - 1;

    let pageSize = 6;

    // if we want to skip pagination - page = 99999
    if (req.input.page === 99999) {
      pageSize = 99999;
      page = 0;
    }

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
  }),
  // ll type of sessions counted by type
  getSessionsStatistics: getSessionsStatisticsProcedure.query(async (req) => {
    const sessionsStatistics = await prisma.session.groupBy({
      by: ['type'],
      where: {
        authorId: req.input.authorId,
      },
      _sum: {
        minutesLength: true,
      },
      orderBy: {
        _count: {
          minutesLength: 'desc',
        },
      },
    });
    const statisticsArray = sessionsStatistics.map((stat) => ({
      type: stat.type,
      value: stat._sum.minutesLength,
    }));
    return {
      statistics: statisticsArray,
    };
  }),
  deleteSession: deleteSessionProcedure.mutation(async ({ input }) => {
    await prisma.session.delete({
      where: { id: input.id },
    });
  }),
  getSession: getSessionProcedure.query(async ({ input }) => {
    return await prisma.session.findFirstOrThrow({
      where: { authorId: input.authorId },
      orderBy: { id: 'desc' },
    });
  }),
});
