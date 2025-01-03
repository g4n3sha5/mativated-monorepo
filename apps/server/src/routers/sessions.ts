import prisma from '@/prisma';
import { publicProcedure, trpc } from '../trpc';
import {
  GetSessionInputSchema,
  GetSessionsInputSchema,
  GetSessionsOutputSchema,
  GetSessionsSpecStatsInputSchema,
  GetSessionsStatsInputSchema,
  SessionCreateSchema,
  SessionDeleteSchema,
  SessionSchema,
} from '@/utils/validationSchemas';
import { Prisma } from '@prisma/client';
import { getPriorDate } from '@mativated-monorepo/shared/helpers';

const createSessionProcedure = publicProcedure.input(SessionCreateSchema);
const deleteSessionProcedure = publicProcedure.input(SessionDeleteSchema);
const getSessionProcedure = publicProcedure.input(GetSessionInputSchema);
// const getSessionProcedure = publicProcedure.input(GetSessionInputSchema).output(SessionSchema);
const getSessionsProcedure = publicProcedure.input(GetSessionsInputSchema).output(GetSessionsOutputSchema);
const getSessionsTotalStatsProcedure = publicProcedure.input(GetSessionsStatsInputSchema);
const getSessionSpecificStatsProcedure = publicProcedure.input(GetSessionsSpecStatsInputSchema);

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
  //  statistic of sessions total count by type
  getSessionsTotalStats: getSessionsTotalStatsProcedure.query(async (req) => {
    const sessionsStatistics = await prisma.session.groupBy({
      by: ['type'],
      where: {
        authorId: req.input.authorId,
        date: req.input.dateScope,
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
  // get specific statistics for dashboard section
  getSessionSpecificStats: getSessionSpecificStatsProcedure.query(async (req) => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const oneWeekAgo = getPriorDate(7);
    const oneMonthAgo = getPriorDate(30);
    const oneYearAgo = getPriorDate(365);

    // const [dailyAvg, weeklyAvg, monthlyAvg, yearlyAvg, allSessions, mostTrained] = await prisma.$transaction([
    //   // Daily Average Session Time
    //   prisma.session.aggregate({
    //     _avg: { minutesLength: true },
    //     where: {
    //       authorId: req.input.authorId,
    //       date: { lte: today },
    //     },
    //   }),
    //
    //   // Weekly Average Session Time
    //   prisma.session.aggregate({
    //     _avg: { minutesLength: true },
    //     where: {
    //       authorId: req.input.authorId,
    //       date: { lte: oneWeekAgo },
    //     },
    //   }),
    //
    //   // Monthly Average Session Time
    //   prisma.session.aggregate({
    //     _avg: { minutesLength: true },
    //     where: {
    //       authorId: req.input.authorId,
    //       date: { lte: oneMonthAgo },
    //     },
    //   }),
    //
    //   // Yearly Average Session Time
    //   prisma.session.aggregate({
    //     _avg: { minutesLength: true },
    //     where: {
    //       authorId: req.input.authorId,
    //       date: { lte: oneYearAgo },
    //     },
    //   }),
    //
    //   // Fetch all sessions for streak calculations
    //   prisma.session.findMany({
    //     where: { authorId: req.input.authorId, date: { lte: 'asc' } },
    //   }),
    //
    //   // Most Trained Category
    //   prisma.session.groupBy({
    //     by: ['type'], // Assuming a `category` field exists
    //     _sum: { minutesLength: true },
    //     where: { authorId: req.input.authorId },
    //     orderBy: { _sum: { minutesLength: 'desc' } },
    //     take: 1,
    //   }),
    // ]);
    const dailyAvg = await prisma.session.aggregate({
      _avg: { minutesLength: true },
      where: {
        authorId: req.input.authorId,
        date: { lte: today },
      },
    });

    // Weekly Average Session Time
    const weeklyAvg = await prisma.session.aggregate({
      _avg: { minutesLength: true },
      where: {
        authorId: req.input.authorId,
        date: { lte: oneWeekAgo, gte: today },
      },
    });

    // Monthly Average Session Time
    const monthlyAvg = await prisma.session.aggregate({
      _avg: { minutesLength: true },
      where: {
        authorId: req.input.authorId,
        date: { lte: oneMonthAgo },
      },
    });

    // Yearly Average Session Time
    const yearlyAvg = await prisma.session.aggregate({
      _avg: { minutesLength: true },
      where: {
        authorId: req.input.authorId,
        date: { lte: oneYearAgo },
      },
    });

    // // Fetch all sessions for streak calculations
    // const allSessions = await prisma.session.findMany({
    //   where: { authorId: req.input.authorId },
    //   orderBy: { date: 'asc' }, // Changed lte: 'asc' to correct orderBy syntax
    // });

    // Most Trained Category
    const mostTrained = await prisma.session.groupBy({
      by: ['type'], // Assuming a `type` field exists
      _sum: { minutesLength: true },
      where: { authorId: req.input.authorId },
      orderBy: { _sum: { minutesLength: 'desc' } },
      take: 1,
    });

    console.log({
      'Daily Average Session Time': dailyAvg,
      'Weekly Average Session Time': weeklyAvg,
      'Monthly Average Session Time': monthlyAvg,
      'Yearly Average Session Time': yearlyAvg,
      // 'All Sessions': allSessions,
      'Most Trained Category': mostTrained,
    });

    return [dailyAvg, weeklyAvg, monthlyAvg, yearlyAvg, allSessions, mostTrained];
  }),
  deleteSession: deleteSessionProcedure.mutation(async ({ input }) => {
    await prisma.session.delete({
      where: { id: input.id },
    });
  }),
  getSession: getSessionProcedure.query(async ({ input }) => {
    return await prisma.session.findFirst({
      where: { authorId: input.authorId },
      orderBy: { id: 'desc' },
    });
  }),
});
