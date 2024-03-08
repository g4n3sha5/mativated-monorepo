import { createSession, getSession, getSessions } from '@/services/session.services';
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

export const getSessionHandler = async ({ input, ctx }: { input: SessionGetInput; ctx: Context }) => {
  try {
    const data = await getSession({ input, ctx });
    return data;
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

// export const deleteSessionHandler = async ({ input, ctx }: { input: SessionDelete }) => {
//   try {
//     const data = await deleteSession({ input, ctx });
//     return data;
//   } catch (err: any) {
//     throw err;
//   }
// };
