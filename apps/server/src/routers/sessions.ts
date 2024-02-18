import { trpc } from '@/trpc';
import { z } from 'zod';
import type { Session } from '@prisma/client'


// export const sessionsRouter = trpc.router({
//   addSession: trpc.procedure.input((z.object<Session>) => {
//     // return { id: 1, name: 'Kamil' };
//   })
// });
