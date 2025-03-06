import prisma from '../prisma';
import { getSessionsStreaks } from '../utils/helpers';
import {
  AddSessionSchema,
  GetSessionInputSchema,
  SessionDeleteSchema,
  SessionListInputSchema,
  SessionListOutputSchema,
  SessionSpecificStatsInputSchema,
  SessionSpecificStatsOutputSchema,
  SessionTotalStatsInputSchema,
  SessionTotalStatsOutputSchema,
} from '../utils/validationSchemas/sessions';
import { Prisma } from '@prisma/client';
import { publicProcedure, trpc } from '../trpc';
// todo: why frontend infers correct types only when using relative paths

export const sessionsRouter = trpc.router({
  addSession: publicProcedure.input(AddSessionSchema).mutation(async ({ input }) => {
    const { authorId, ...rest } = input;
    await prisma.session.create({
      data: {
        ...rest,
        author: { connect: { externalId: authorId } },
      },
    });
  }),
  getSessions: publicProcedure
    .input(SessionListInputSchema)
    .output(SessionListOutputSchema)
    .query(async (req) => {
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
  getSessionsTotalStats: publicProcedure
    .input(SessionTotalStatsInputSchema)
    .output(SessionTotalStatsOutputSchema)
    .query(async (req) => {
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
      return sessionsStatistics.map((stat) => ({
        type: stat.type,
        value: stat._sum.minutesLength || 0,
      }));
    }),
  // get specific statistics for dashboard section
  getSessionSpecificStats: publicProcedure
    .input(SessionSpecificStatsInputSchema)
    .output(SessionSpecificStatsOutputSchema)
    .query(async (req) => {
      const totalSessions = await prisma.session.aggregate({
        _sum: { minutesLength: true },
        where: { authorId: req.input.authorId, ...(req.input.type === 'TOTAL' ? {} : { type: req.input.type }) },
      });
      const totalMinutes = totalSessions._sum.minutesLength || 0;

      const firstSessionDate = await prisma.session.findFirst({
        where: { authorId: req.input.authorId, ...(req.input.type === 'TOTAL' ? {} : { type: req.input.type }) },
        orderBy: { date: 'asc' },
        select: { date: true },
      });
      const { currentStreak, longestStreak } = await getSessionsStreaks(req.input.authorId, req.input.type);

      const today = new Date();
      const totalDays = firstSessionDate
        ? Math.ceil((today.getTime() - firstSessionDate.date.getTime()) / (1000 * 60 * 60 * 24))
        : 1;

      const typesTrainedSummary = await prisma.session.groupBy({
        by: ['type'],
        where: {
          authorId: req.input.authorId,
        },
        _sum: {
          minutesLength: true,
        },
        orderBy: {
          _sum: {
            minutesLength: 'desc',
          },
        },
      });

      const totalDurationResult = await prisma.session.aggregate({
        where: {
          authorId: req.input.authorId,
        },
        _sum: {
          minutesLength: true,
        },
      });

      // depending if total type is chosen or a specific type = back-end returns either the most trained type or percentage trained for each chosen type
      const totalTrainedDuration = totalDurationResult._sum.minutesLength || 0;
      const mostTrainedDuration = typesTrainedSummary[0]._sum.minutesLength || 0;
      const pickedTypeDuration =
        (req.input.type !== 'TOTAL' &&
          typesTrainedSummary.find((result) => result.type === req.input.type)?._sum.minutesLength) ||
        0;
      const trainedType = req.input.type === 'TOTAL' ? typesTrainedSummary[0].type : req.input.type;
      const trainedDuration = req.input.type === 'TOTAL' ? mostTrainedDuration : pickedTypeDuration;
      const trainedPercentage = Math.round((trainedDuration / totalTrainedDuration) * 100);

      const percentageTrained = {
        type: trainedType,
        value: trainedPercentage,
      };

      const dailyAvg = totalMinutes / 60 / totalDays;
      const weeklyAvg = dailyAvg * 7;
      const monthlyAvg = dailyAvg * 30;
      const yearlyAvg = dailyAvg * 365.25;

      return {
        dailyAvg: Math.round(dailyAvg * 100) / 100,
        weeklyAvg: Math.round(weeklyAvg * 100) / 100,
        monthlyAvg: Math.round(monthlyAvg * 100) / 100,
        yearlyAvg: Math.round(yearlyAvg * 100) / 100,
        currentStreak: currentStreak,
        longestStreak: longestStreak,
        percentageTrained: percentageTrained,
      };
    }),
  deleteSession: publicProcedure.input(SessionDeleteSchema).mutation(async ({ input }) => {
    await prisma.session.delete({
      where: { id: input.id },
    });
  }),
  getSession: publicProcedure.input(GetSessionInputSchema).query(async ({ input }) => {
    return await prisma.session.findFirst({
      where: { authorId: input.authorId },
      orderBy: { id: 'desc' },
    });
  }),
});
