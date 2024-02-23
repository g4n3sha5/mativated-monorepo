import { Prisma, PrismaClient, Session } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { ProcedureResolverOptions } from '@trpc/server/dist/unstable-core-do-not-import';

export const createSession = async (input, ctx) => {
  const authorId = input.authorId;
  delete input.authorId;

  return await ctx.prisma.session.create({
    data: {
      ...input,
      author: { connect: { externalId: authorId } },
    },
  });
};
