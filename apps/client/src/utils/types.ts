export type PrimarySessionType = 'GI' | 'NO-GI' | 'GYM';
export type SecondarySessionType = 'YOGA' | 'MMA' | 'BOXING' | 'RUN' | 'SWIM' | 'BIKE' | 'MEDITATION' | 'OTHER';

export type SessionType = PrimarySessionType | SecondarySessionType;

export interface SessionIconPair {
  type: SessionType;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

export type Intensity = 'Light' | 'Moderate' | 'High' | 'Very high';
