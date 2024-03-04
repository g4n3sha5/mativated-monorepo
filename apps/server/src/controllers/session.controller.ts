import { createSession, getSessions } from '@/services/session.services';
import { SessionCreateInput, SessionGetInput } from '@mativated-monorepo/shared/types';
import { Context } from 'vm';

export const createSessionHandler = async ({ input, ctx }: { input: SessionCreateInput; ctx: Context }) => {
  try {
    const post = await createSession({ input, ctx });

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

export const getSessionsHandler = async ({ input, ctx }: { input: SessionGetInput; ctx: Context }) => {
  try {
    const data = await getSessions({ input, ctx });
    return data;
  } catch (err: any) {
    throw err;
  }
};
