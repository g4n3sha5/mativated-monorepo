import { SessionCreateInput, SessionGetInput } from '@mativated-monorepo/shared/types';
import { Context } from 'vm';

export const createSession = async ({ input, ctx }: { input: SessionCreateInput; ctx: Context }) => {
  const authorId = input.authorId;
  delete input.authorId;

  return await ctx.prisma.session.create({
    data: {
      ...input,
      author: { connect: { externalId: authorId } },
    },
  });
};

export const getSessions = async ({ input, ctx }: { input: SessionGetInput; ctx: Context }) => {
  return await ctx.prisma.session.findMany({
    where: { authorId: input.id },
    orderBy: {
      id: 'desc',
    },
  });
};
