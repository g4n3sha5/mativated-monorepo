import { AppRouterType } from '@mativated-monorepo/server/src/routers';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouterType>();
