import prisma from '../prisma';
import {
  AddTechniqueSchema,
  GetTechniquesInputSchema,
  GetTechniquesOutputSchema,
} from '@utils/validationSchemas/techniques.ts';
import { publicProcedure, trpc } from '../trpc';

export const techniquesRouter = trpc.router({
  getTechniques: publicProcedure
    .input(GetTechniquesInputSchema)
    .output(GetTechniquesOutputSchema)
    .query(async (req) => {
      const techniques = await prisma.technique.findMany({
        // where: req.input.authorId ? { createdBy: { id: req.input.authorId } } : undefined,
        orderBy: { createdAt: 'desc' },
      });
      console.log(techniques);
      return techniques;
    }),

  addTechnique: publicProcedure.input(AddTechniqueSchema).mutation(async ({ input }) => {
    const { authorId, ...techniqueData } = input;

    return await prisma.technique.create({
      data: {
        ...techniqueData,
        createdBy: authorId ? { connect: { id: authorId } } : undefined,
      },
    });
  }),
});
