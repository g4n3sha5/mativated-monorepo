import { SessionType } from '@/pages/matjournal/addSession/types';
import { AppRouter } from '@mativated-monorepo/server/src/routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export interface SessionIconDictionary {
  visibleName: string;
  type: SessionType;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
