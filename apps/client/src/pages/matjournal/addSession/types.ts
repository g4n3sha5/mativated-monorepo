import { RouterInput } from '@/utils/types';

export type SessionCreateInput = RouterInput['sessions']['addSession'];
export type AddSessionInputField = keyof SessionCreateInput;

export type InputField = AddSessionInputField;
export type SessionType = RouterInput['sessions']['addSession']['type'];
