const PrimarySessionTypes = ['GI', 'NO-GI', 'GYM'];
const SecondarySessionTypes = ['YOGA', 'MMA', 'BOXING', 'RUN', 'SWIM', 'BIKE', 'MEDITATION', 'OTHER'];
export const SessionTypes = [...PrimarySessionTypes, ...SecondarySessionTypes];

type PrimarySessionType = (typeof PrimarySessionTypes)[number];
type SecondarySessionType = (typeof SecondarySessionTypes)[number];
export type SessionType = PrimarySessionType | SecondarySessionType;

const primarySession: PrimarySessionType = 'GI';
const secondarySession: SecondarySessionType = 'MMA';
