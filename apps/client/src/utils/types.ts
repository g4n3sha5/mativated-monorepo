import { SessionType } from '@mativated-monorepo/shared/types';

export interface SessionIconDictionary {
  visibleName: string;
  type: SessionType;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}
