// todo  all constants SCREAMING_SNAKE_CASE?
import { SessionType } from '@prisma/client';

export const totalSessionTypeValues = ['TOTAL', ...Object.values(SessionType)] as const;
