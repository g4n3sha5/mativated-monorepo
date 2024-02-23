import { createSession } from '@/services/session.services';
import { SessionCreateInput } from '@mativated-monorepo/shared/types';
import { Context } from 'vm';

export const createSessionHandler = async ({ input, ctx }: { input: SessionCreateInput; ctx: Context }) => {
  try {
    const { user } = await ctx;
    const post = await createSession(input, ctx);

    return {
      status: 'success',
      data: {
        post,
      },
    };
  } catch (err: any) {
    throw err;
  }
};
