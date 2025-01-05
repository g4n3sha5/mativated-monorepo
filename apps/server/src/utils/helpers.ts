import prisma from '@/prisma';

// calculate longest streak
export async function getStreaks(authorId: string) {
  const sessions = await prisma.session.findMany({
    where: { authorId: authorId },
    orderBy: { date: 'asc' },
    select: { date: true },
  });

  const uniqueSessionsDates = [...new Set(sessions.map((session) => session.date.toISOString().split('T')[0]))];

  if (sessions.length === 0) return { longestStreak: 0, currentStreak: 0 };

  const streak = uniqueSessionsDates.reduce(
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
