import prisma from '../prisma';
import { TotalSessionType } from '../utils/types';

export async function getSessionsStreaks(authorId: string, type: TotalSessionType) {
  let streak = { longestStreak: 0, currentStreak: 0 };
  const sessions = await prisma.session.findMany({
    where: { authorId: authorId, ...(type === 'TOTAL' ? {} : { type: type }) },
    orderBy: { date: 'asc' },
    select: { date: true },
  });

  // system doesn't forbid adding trainings in the future, however they do not add to current streak
  const uniqueSessionsDates = [
    ...new Set(
      sessions
        .filter((session) => new Date() > new Date(session.date))
        .map((session) => session.date.toISOString().split('T')[0])
    ),
  ];

  if (sessions.length === 0) return streak;

  streak = uniqueSessionsDates.reduce(
    (acc, currentDate, i, arr) => {
      if (i === 0) return acc;

      const previousDate = arr[i - 1];
      const differenceInDays =
        Math.floor(new Date(currentDate).getTime() - new Date(previousDate).getTime()) / (1000 * 60 * 60 * 24);

      if (differenceInDays === 1) {
        acc.currentStreak++;
        acc.longestStreak = Math.max(acc.longestStreak, acc.currentStreak);
      } else {
        acc.currentStreak = 1;
      }

      return acc;
    },
    { currentStreak: 1, longestStreak: 1 }
  );
  return streak;
}
