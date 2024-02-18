export const primarySessionTypes = ['GI', 'NO-GI', 'GYM'] as const;
export const secondarySessionTypes = ['YOGA', 'MMA', 'BOXING', 'RUN', 'SWIM', 'BIKE', 'MEDITATION', 'OTHER'] as const;

export const sessionTypes = [...primarySessionTypes, ...secondarySessionTypes];
