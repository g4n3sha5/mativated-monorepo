import { trpc } from '../trpc';

export const goalsRouter = trpc.router({
  // getGoals: publicProcedure
  //   .input(GetGoalsInputSchema)
  //   .output(GetGoalsOutputSchema)
  //   .query(async (req) => {
  //     const goals = await prisma.goal.findMany({
  //       where: req.input.authorId ? { createdBy: { id: req.input.authorId } } : undefined,
  //       orderBy: { createdAt: 'desc' },
  //     });
  //
  //     return goals;
  //   }),
  //
  // addGoal: publicProcedure.input(AddGoalSchema).mutation(async ({ input }) => {
  //   const { authorId, ...goalData } = input;
  //
  //   return await prisma.goal.create({
  //     data: {
  //       ...goalData,
  //       createdBy: authorId ? { connect: { id: authorId } } : undefined,
  //     },
  //   });
  // }),
});
