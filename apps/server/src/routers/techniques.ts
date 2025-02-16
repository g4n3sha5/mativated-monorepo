import prisma from '../prisma';
import { GetTechniquesInputSchema, GetTechniquesOutputSchema } from '@utils/validationSchemas';
import { Prisma } from '@prisma/client';

import { publicProcedure, trpc } from '../trpc';

// const createSessionProcedure = publicProcedure.input(SessionCreateSchema);
const getTechniquesProcedure = publicProcedure.input(GetTechniquesInputSchema).output(GetTechniquesOutputSchema);

export const techniquesRouter = trpc.router({
  // createSession: createSessionProcedure.mutation(async ({ input }) => {
  //   const { authorId, ...rest } = input;
  //   await prisma.session.create({
  //     data: {
  //       ...rest,
  //       author: { connect: { externalId: authorId } },
  //     },
  //   });
  // }),
  getTechniques: getTechniquesProcedure.query(async (req) => {
    const query: Prisma.SessionFindManyArgs = {
      where: {
        authorId: req.input.authorId,
      },
      orderBy: {
        id: 'desc',
      },
    };

    const techniques = await prisma.technique.findMany();
    console.log(techniques);
    return techniques;
  }),
});
