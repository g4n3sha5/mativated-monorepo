import { PrimarySessionTypes, SecondarySessionTypes } from "./constants";

type PrimarySessionType = (typeof PrimarySessionTypes)[number];
type SecondarySessionType = (typeof SecondarySessionTypes)[number];

export type SessionType = PrimarySessionType | SecondarySessionType;
