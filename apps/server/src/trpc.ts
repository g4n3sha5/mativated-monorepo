import { createContext } from '@/context';
import { initTRPC } from '@trpc/server';

export const trpc = initTRPC.context<typeof createContext>().create();
export const publicProcedure = trpc.procedure;
