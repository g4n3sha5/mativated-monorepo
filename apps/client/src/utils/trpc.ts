import type { AppRouter } from '@mativated-monorepo/server/src/routers';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();
