import { SessionCreateInput, SessionGetInput } from '@mativated-monorepo/shared/types';
import { Session, User } from '@prisma/client';
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

export const getSession = async ({ input, ctx }: { input: SessionGetInput; ctx: Context }): Promise<Session> => {
  console.log('IM IN');
  return await ctx.prisma.session.findFirstOrThrow({
    where: { authorId: input.id },
    orderBy: { id: 'desc' },
  });
};

export const getSessions = async ({ input, ctx }: { input: SessionGetInput; ctx: Context }): Promise<Session[]> => {
  return await ctx.prisma.session.findMany({
    where: { authorId: input.id },
    orderBy: {
      id: 'desc',
    },
  });
};
