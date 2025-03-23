// todo  all constants SCREAMING_SNAKE_CASE?
import { SessionType } from '@prisma/client';

export const sessionTypeValues = [...Object.values(SessionType)] as const;
export const totalSessionTypeValues = ['TOTAL', ...Object.values(SessionType)] as const;
