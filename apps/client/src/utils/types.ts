import { IntensityDictionary } from '@/utils/constants';
import { RouterInput, SessionCreateInput, SessionGetOutput } from '@mativated-monorepo/shared/types';

export interface SessionIconDictionary {
  visibleName: string;
  type: SessionType;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

export type IntensityReadable = (typeof IntensityDictionary)[keyof typeof IntensityDictionary];

export type CreateSessionInputField = keyof SessionCreateInput;
export type SessionType = RouterInput['sessions']['createSession']['type'];

export type Session = SessionGetOutput 
