import { RouterInput, SessionCreateInput, SessionGetOutput, SessionType } from '@mativated-monorepo/shared/types';

export interface SessionIconDictionary {
  visibleName: string;
  type: SessionType;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

export const IntensityDictionary = {
  LIGHT: 'Light',
  MODERATE: 'Moderate',
  HIGH: 'High',
  VERY_HIGH: 'Very high',
} as const;

export type IntensityReadable = (typeof IntensityDictionary)[keyof typeof IntensityDictionary];

export type CreateSessionInputField = keyof SessionCreateInput;

export type Session = SessionGetOutput 
