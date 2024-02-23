import { initTRPC } from '@trpc/server';
import { createContext } from './context';

export const trpc = initTRPC.context<typeof createContext>().create();
export const publicProcedure = trpc.procedure;
