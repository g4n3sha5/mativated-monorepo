import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const UserScalarFieldEnumSchema = z.enum(['id', 'userName', 'displayName', 'externalId']);

export const SessionScalarFieldEnumSchema = z.enum([
  'id',
  'date',
  'time',
  'type',
  'location',
  'minutesLength',
  'intensity',
  'notes',
  'sparringTime',
  'drillingTime',
  'authorId',
  'weight',
]);

export const TechniqueScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'description',
  'type',
  'videoUrl',
  'giOnly',
  'createdAt',
  'userId',
]);

export const SessionTechniqueScalarFieldEnumSchema = z.enum([
  'id',
  'sessionId',
  'techniqueId',
  'notes',
  'drillingTime',
]);

export const TagScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'userId']);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const NullsOrderSchema = z.enum(['first', 'last']);

export const SessionTypeSchema = z.enum([
  'GI',
  'NO_GI',
  'GYM',
  'YOGA',
  'MMA',
  'BOXING',
  'RUN',
  'SWIM',
  'BIKE',
  'MEDITATION',
  'OTHER',
]);

export type SessionTypeType = `${z.infer<typeof SessionTypeSchema>}`;

export const TechniqueTypeSchema = z.enum([
  'CHOKE',
  'TAKEDOWN',
  'JOINT_LOCK',
  'SWEEP',
  'ESCAPE',
  'TRANSITION',
  'GUARD',
  'GUARD_PASS',
  'CONTROL',
  'DEFENCE',
  'POSITION',
  'SUBMISSION',
]);

export type TechniqueTypeType = `${z.infer<typeof TechniqueTypeSchema>}`;

export const IntensitySchema = z.enum(['LIGHT', 'MODERATE', 'HIGH', 'VERY_HIGH']);

export type IntensityType = `${z.infer<typeof IntensitySchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  userName: z.string().nullable(),
  displayName: z.string(),
  externalId: z.string(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  type: SessionTypeSchema,
  intensity: IntensitySchema,
  id: z.number().int(),
  date: z.coerce.date(),
  time: z.string(),
  location: z.string().nullable(),
  minutesLength: z.number().int(),
  notes: z.string().nullable(),
  sparringTime: z.number().int().nullable(),
  drillingTime: z.number().int().nullable(),
  authorId: z.string(),
  weight: z.number().int().nullable(),
});

export type Session = z.infer<typeof SessionSchema>;

/////////////////////////////////////////
// TECHNIQUE SCHEMA
/////////////////////////////////////////

export const TechniqueSchema = z.object({
  type: TechniqueTypeSchema,
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  videoUrl: z.string().nullable(),
  giOnly: z.boolean(),
  createdAt: z.coerce.date(),
  userId: z.string().nullable(),
});

export type Technique = z.infer<typeof TechniqueSchema>;

/////////////////////////////////////////
// SESSION TECHNIQUE SCHEMA
/////////////////////////////////////////

export const SessionTechniqueSchema = z.object({
  id: z.string().uuid(),
  sessionId: z.number().int(),
  techniqueId: z.string(),
  notes: z.string().nullable(),
  drillingTime: z.number().int().nullable(),
});

export type SessionTechnique = z.infer<typeof SessionTechniqueSchema>;

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  userId: z.string().nullable(),
});

export type Tag = z.infer<typeof TagSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
    techniquesAdded: z.union([z.boolean(), z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
    tagsAdded: z.union([z.boolean(), z.lazy(() => TagFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
  })
  .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z
  .object({
    sessions: z.boolean().optional(),
    techniquesAdded: z.boolean().optional(),
    tagsAdded: z.boolean().optional(),
  })
  .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    userName: z.boolean().optional(),
    displayName: z.boolean().optional(),
    externalId: z.boolean().optional(),
    sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
    techniquesAdded: z.union([z.boolean(), z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
    tagsAdded: z.union([z.boolean(), z.lazy(() => TagFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z
  .object({
    techniques: z.union([z.boolean(), z.lazy(() => SessionTechniqueFindManyArgsSchema)]).optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => SessionCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z
  .object({
    select: z.lazy(() => SessionSelectSchema).optional(),
    include: z.lazy(() => SessionIncludeSchema).optional(),
  })
  .strict();

export const SessionCountOutputTypeArgsSchema: z.ZodType<Prisma.SessionCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => SessionCountOutputTypeSelectSchema).nullish(),
  })
  .strict();

export const SessionCountOutputTypeSelectSchema: z.ZodType<Prisma.SessionCountOutputTypeSelect> = z
  .object({
    techniques: z.boolean().optional(),
  })
  .strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z
  .object({
    id: z.boolean().optional(),
    date: z.boolean().optional(),
    time: z.boolean().optional(),
    type: z.boolean().optional(),
    location: z.boolean().optional(),
    minutesLength: z.boolean().optional(),
    intensity: z.boolean().optional(),
    notes: z.boolean().optional(),
    sparringTime: z.boolean().optional(),
    drillingTime: z.boolean().optional(),
    authorId: z.boolean().optional(),
    weight: z.boolean().optional(),
    techniques: z.union([z.boolean(), z.lazy(() => SessionTechniqueFindManyArgsSchema)]).optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => SessionCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

// TECHNIQUE
//------------------------------------------------------

export const TechniqueIncludeSchema: z.ZodType<Prisma.TechniqueInclude> = z
  .object({
    Session: z.union([z.boolean(), z.lazy(() => SessionTechniqueFindManyArgsSchema)]).optional(),
    tags: z.union([z.boolean(), z.lazy(() => TagFindManyArgsSchema)]).optional(),
    createdBy: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TechniqueCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

export const TechniqueArgsSchema: z.ZodType<Prisma.TechniqueDefaultArgs> = z
  .object({
    select: z.lazy(() => TechniqueSelectSchema).optional(),
    include: z.lazy(() => TechniqueIncludeSchema).optional(),
  })
  .strict();

export const TechniqueCountOutputTypeArgsSchema: z.ZodType<Prisma.TechniqueCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => TechniqueCountOutputTypeSelectSchema).nullish(),
  })
  .strict();

export const TechniqueCountOutputTypeSelectSchema: z.ZodType<Prisma.TechniqueCountOutputTypeSelect> = z
  .object({
    Session: z.boolean().optional(),
    tags: z.boolean().optional(),
  })
  .strict();

export const TechniqueSelectSchema: z.ZodType<Prisma.TechniqueSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    type: z.boolean().optional(),
    videoUrl: z.boolean().optional(),
    giOnly: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    Session: z.union([z.boolean(), z.lazy(() => SessionTechniqueFindManyArgsSchema)]).optional(),
    tags: z.union([z.boolean(), z.lazy(() => TagFindManyArgsSchema)]).optional(),
    createdBy: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TechniqueCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

// SESSION TECHNIQUE
//------------------------------------------------------

export const SessionTechniqueIncludeSchema: z.ZodType<Prisma.SessionTechniqueInclude> = z
  .object({
    session: z.union([z.boolean(), z.lazy(() => SessionArgsSchema)]).optional(),
    technique: z.union([z.boolean(), z.lazy(() => TechniqueArgsSchema)]).optional(),
  })
  .strict();

export const SessionTechniqueArgsSchema: z.ZodType<Prisma.SessionTechniqueDefaultArgs> = z
  .object({
    select: z.lazy(() => SessionTechniqueSelectSchema).optional(),
    include: z.lazy(() => SessionTechniqueIncludeSchema).optional(),
  })
  .strict();

export const SessionTechniqueSelectSchema: z.ZodType<Prisma.SessionTechniqueSelect> = z
  .object({
    id: z.boolean().optional(),
    sessionId: z.boolean().optional(),
    techniqueId: z.boolean().optional(),
    notes: z.boolean().optional(),
    drillingTime: z.boolean().optional(),
    session: z.union([z.boolean(), z.lazy(() => SessionArgsSchema)]).optional(),
    technique: z.union([z.boolean(), z.lazy(() => TechniqueArgsSchema)]).optional(),
  })
  .strict();

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z
  .object({
    techniques: z.union([z.boolean(), z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
    createdBy: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z
  .object({
    select: z.lazy(() => TagSelectSchema).optional(),
    include: z.lazy(() => TagIncludeSchema).optional(),
  })
  .strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
  })
  .strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z
  .object({
    techniques: z.boolean().optional(),
  })
  .strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    userId: z.boolean().optional(),
    techniques: z.union([z.boolean(), z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
    createdBy: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userName: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    displayName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    externalId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
    techniquesAdded: z.lazy(() => TechniqueListRelationFilterSchema).optional(),
    tagsAdded: z.lazy(() => TagListRelationFilterSchema).optional(),
  })
  .strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userName: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    displayName: z.lazy(() => SortOrderSchema).optional(),
    externalId: z.lazy(() => SortOrderSchema).optional(),
    sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
    techniquesAdded: z.lazy(() => TechniqueOrderByRelationAggregateInputSchema).optional(),
    tagsAdded: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional(),
  })
  .strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z
  .union([
    z.object({
      id: z.string().cuid(),
      externalId: z.string(),
    }),
    z.object({
      id: z.string().cuid(),
    }),
    z.object({
      externalId: z.string(),
    }),
  ])
  .and(
    z
      .object({
        id: z.string().cuid().optional(),
        externalId: z.string().optional(),
        AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => UserWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
        userName: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        displayName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
        techniquesAdded: z.lazy(() => TechniqueListRelationFilterSchema).optional(),
        tagsAdded: z.lazy(() => TagListRelationFilterSchema).optional(),
      })
      .strict()
  );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userName: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    displayName: z.lazy(() => SortOrderSchema).optional(),
    externalId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  })
  .strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    userName: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    displayName: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    externalId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  })
  .strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => SessionWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    date: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    time: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    type: z.union([z.lazy(() => EnumSessionTypeFilterSchema), z.lazy(() => SessionTypeSchema)]).optional(),
    location: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    minutesLength: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    intensity: z.union([z.lazy(() => EnumIntensityFilterSchema), z.lazy(() => IntensitySchema)]).optional(),
    notes: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    sparringTime: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    authorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    weight: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    techniques: z.lazy(() => SessionTechniqueListRelationFilterSchema).optional(),
    author: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
  })
  .strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    date: z.lazy(() => SortOrderSchema).optional(),
    time: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    location: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    minutesLength: z.lazy(() => SortOrderSchema).optional(),
    intensity: z.lazy(() => SortOrderSchema).optional(),
    notes: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    sparringTime: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    drillingTime: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    weight: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    techniques: z.lazy(() => SessionTechniqueOrderByRelationAggregateInputSchema).optional(),
    author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  })
  .strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z
  .object({
    id: z.number().int(),
  })
  .and(
    z
      .object({
        id: z.number().int().optional(),
        AND: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => SessionWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
        date: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        time: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        type: z.union([z.lazy(() => EnumSessionTypeFilterSchema), z.lazy(() => SessionTypeSchema)]).optional(),
        location: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        minutesLength: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        intensity: z.union([z.lazy(() => EnumIntensityFilterSchema), z.lazy(() => IntensitySchema)]).optional(),
        notes: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        sparringTime: z
          .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
          .optional()
          .nullable(),
        drillingTime: z
          .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
          .optional()
          .nullable(),
        authorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        weight: z
          .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
          .optional()
          .nullable(),
        techniques: z.lazy(() => SessionTechniqueListRelationFilterSchema).optional(),
        author: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
      })
      .strict()
  );

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    date: z.lazy(() => SortOrderSchema).optional(),
    time: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    location: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    minutesLength: z.lazy(() => SortOrderSchema).optional(),
    intensity: z.lazy(() => SortOrderSchema).optional(),
    notes: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    sparringTime: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    drillingTime: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    weight: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => SessionAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => SessionSumOrderByAggregateInputSchema).optional(),
  })
  .strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
    date: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    time: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    type: z
      .union([z.lazy(() => EnumSessionTypeWithAggregatesFilterSchema), z.lazy(() => SessionTypeSchema)])
      .optional(),
    location: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    minutesLength: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
    intensity: z
      .union([z.lazy(() => EnumIntensityWithAggregatesFilterSchema), z.lazy(() => IntensitySchema)])
      .optional(),
    notes: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    sparringTime: z
      .union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()])
      .optional()
      .nullable(),
    authorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    weight: z
      .union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()])
      .optional()
      .nullable(),
  })
  .strict();

export const TechniqueWhereInputSchema: z.ZodType<Prisma.TechniqueWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => TechniqueWhereInputSchema), z.lazy(() => TechniqueWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => TechniqueWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => TechniqueWhereInputSchema), z.lazy(() => TechniqueWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    type: z.union([z.lazy(() => EnumTechniqueTypeFilterSchema), z.lazy(() => TechniqueTypeSchema)]).optional(),
    videoUrl: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    giOnly: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    userId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    Session: z.lazy(() => SessionTechniqueListRelationFilterSchema).optional(),
    tags: z.lazy(() => TagListRelationFilterSchema).optional(),
    createdBy: z
      .union([z.lazy(() => UserNullableRelationFilterSchema), z.lazy(() => UserWhereInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const TechniqueOrderByWithRelationInputSchema: z.ZodType<Prisma.TechniqueOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    videoUrl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    giOnly: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    userId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    Session: z.lazy(() => SessionTechniqueOrderByRelationAggregateInputSchema).optional(),
    tags: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional(),
    createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  })
  .strict();

export const TechniqueWhereUniqueInputSchema: z.ZodType<Prisma.TechniqueWhereUniqueInput> = z
  .union([
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    }),
    z.object({
      id: z.string().uuid(),
    }),
    z.object({
      name: z.string(),
    }),
  ])
  .and(
    z
      .object({
        id: z.string().uuid().optional(),
        name: z.string().optional(),
        AND: z
          .union([z.lazy(() => TechniqueWhereInputSchema), z.lazy(() => TechniqueWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => TechniqueWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => TechniqueWhereInputSchema), z.lazy(() => TechniqueWhereInputSchema).array()])
          .optional(),
        description: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        type: z.union([z.lazy(() => EnumTechniqueTypeFilterSchema), z.lazy(() => TechniqueTypeSchema)]).optional(),
        videoUrl: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        giOnly: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        userId: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        Session: z.lazy(() => SessionTechniqueListRelationFilterSchema).optional(),
        tags: z.lazy(() => TagListRelationFilterSchema).optional(),
        createdBy: z
          .union([z.lazy(() => UserNullableRelationFilterSchema), z.lazy(() => UserWhereInputSchema)])
          .optional()
          .nullable(),
      })
      .strict()
  );

export const TechniqueOrderByWithAggregationInputSchema: z.ZodType<Prisma.TechniqueOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    videoUrl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    giOnly: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    userId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => TechniqueCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => TechniqueMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => TechniqueMinOrderByAggregateInputSchema).optional(),
  })
  .strict();

export const TechniqueScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TechniqueScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TechniqueScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      type: z
        .union([z.lazy(() => EnumTechniqueTypeWithAggregatesFilterSchema), z.lazy(() => TechniqueTypeSchema)])
        .optional(),
      videoUrl: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      giOnly: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
      createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
      userId: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionTechniqueWhereInputSchema: z.ZodType<Prisma.SessionTechniqueWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => SessionTechniqueWhereInputSchema), z.lazy(() => SessionTechniqueWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => SessionTechniqueWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => SessionTechniqueWhereInputSchema), z.lazy(() => SessionTechniqueWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    sessionId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    techniqueId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    notes: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    session: z.union([z.lazy(() => SessionRelationFilterSchema), z.lazy(() => SessionWhereInputSchema)]).optional(),
    technique: z
      .union([z.lazy(() => TechniqueRelationFilterSchema), z.lazy(() => TechniqueWhereInputSchema)])
      .optional(),
  })
  .strict();

export const SessionTechniqueOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionTechniqueOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionId: z.lazy(() => SortOrderSchema).optional(),
      techniqueId: z.lazy(() => SortOrderSchema).optional(),
      notes: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      drillingTime: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      session: z.lazy(() => SessionOrderByWithRelationInputSchema).optional(),
      technique: z.lazy(() => TechniqueOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const SessionTechniqueWhereUniqueInputSchema: z.ZodType<Prisma.SessionTechniqueWhereUniqueInput> = z
  .object({
    id: z.string().uuid(),
  })
  .and(
    z
      .object({
        id: z.string().uuid().optional(),
        AND: z
          .union([
            z.lazy(() => SessionTechniqueWhereInputSchema),
            z.lazy(() => SessionTechniqueWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => SessionTechniqueWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => SessionTechniqueWhereInputSchema),
            z.lazy(() => SessionTechniqueWhereInputSchema).array(),
          ])
          .optional(),
        sessionId: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        techniqueId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        notes: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        drillingTime: z
          .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
          .optional()
          .nullable(),
        session: z.union([z.lazy(() => SessionRelationFilterSchema), z.lazy(() => SessionWhereInputSchema)]).optional(),
        technique: z
          .union([z.lazy(() => TechniqueRelationFilterSchema), z.lazy(() => TechniqueWhereInputSchema)])
          .optional(),
      })
      .strict()
  );

export const SessionTechniqueOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionTechniqueOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionId: z.lazy(() => SortOrderSchema).optional(),
      techniqueId: z.lazy(() => SortOrderSchema).optional(),
      notes: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      drillingTime: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      _count: z.lazy(() => SessionTechniqueCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => SessionTechniqueAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => SessionTechniqueMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SessionTechniqueMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => SessionTechniqueSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const SessionTechniqueScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionTechniqueScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SessionTechniqueScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SessionTechniqueScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SessionTechniqueScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SessionTechniqueScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SessionTechniqueScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      sessionId: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      techniqueId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      notes: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()])
        .optional()
        .nullable(),
    })
    .strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => TagWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    techniques: z.lazy(() => TechniqueListRelationFilterSchema).optional(),
    createdBy: z
      .union([z.lazy(() => UserNullableRelationFilterSchema), z.lazy(() => UserWhereInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    userId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    techniques: z.lazy(() => TechniqueOrderByRelationAggregateInputSchema).optional(),
    createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  })
  .strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z
  .union([
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    }),
    z.object({
      id: z.string().uuid(),
    }),
    z.object({
      name: z.string(),
    }),
  ])
  .and(
    z
      .object({
        id: z.string().uuid().optional(),
        name: z.string().optional(),
        AND: z.union([z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => TagWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => TagWhereInputSchema), z.lazy(() => TagWhereInputSchema).array()]).optional(),
        description: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        userId: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        techniques: z.lazy(() => TechniqueListRelationFilterSchema).optional(),
        createdBy: z
          .union([z.lazy(() => UserNullableRelationFilterSchema), z.lazy(() => UserWhereInputSchema)])
          .optional()
          .nullable(),
      })
      .strict()
  );

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    userId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional(),
  })
  .strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TagScalarWhereWithAggregatesInputSchema),
        z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TagScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TagScalarWhereWithAggregatesInputSchema),
        z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    userName: z.string().optional().nullable(),
    displayName: z.string(),
    externalId: z.string(),
    sessions: z.lazy(() => SessionCreateNestedManyWithoutAuthorInputSchema).optional(),
    techniquesAdded: z.lazy(() => TechniqueCreateNestedManyWithoutCreatedByInputSchema).optional(),
    tagsAdded: z.lazy(() => TagCreateNestedManyWithoutCreatedByInputSchema).optional(),
  })
  .strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    userName: z.string().optional().nullable(),
    displayName: z.string(),
    externalId: z.string(),
    sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
    techniquesAdded: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
    tagsAdded: z.lazy(() => TagUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  })
  .strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    displayName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    sessions: z.lazy(() => SessionUpdateManyWithoutAuthorNestedInputSchema).optional(),
    techniquesAdded: z.lazy(() => TechniqueUpdateManyWithoutCreatedByNestedInputSchema).optional(),
    tagsAdded: z.lazy(() => TagUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  })
  .strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    displayName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
    techniquesAdded: z.lazy(() => TechniqueUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
    tagsAdded: z.lazy(() => TagUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  })
  .strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z
  .object({
    id: z.string().cuid().optional(),
    userName: z.string().optional().nullable(),
    displayName: z.string(),
    externalId: z.string(),
  })
  .strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    displayName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    displayName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const AddSessionInputSchema: z.ZodType<Prisma.AddSessionInput> = z
  .object({
    date: z.coerce.date(),
    time: z.string(),
    type: z.lazy(() => SessionTypeSchema),
    location: z.string().optional().nullable(),
    minutesLength: z.number().int(),
    intensity: z.lazy(() => IntensitySchema),
    notes: z.string().optional().nullable(),
    sparringTime: z.number().int().optional().nullable(),
    drillingTime: z.number().int().optional().nullable(),
    weight: z.number().int().optional().nullable(),
    techniques: z.lazy(() => SessionTechniqueCreateNestedManyWithoutSessionInputSchema).optional(),
    author: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
  })
  .strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z
  .object({
    id: z.number().int().optional(),
    date: z.coerce.date(),
    time: z.string(),
    type: z.lazy(() => SessionTypeSchema),
    location: z.string().optional().nullable(),
    minutesLength: z.number().int(),
    intensity: z.lazy(() => IntensitySchema),
    notes: z.string().optional().nullable(),
    sparringTime: z.number().int().optional().nullable(),
    drillingTime: z.number().int().optional().nullable(),
    authorId: z.string(),
    weight: z.number().int().optional().nullable(),
    techniques: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutSessionInputSchema).optional(),
  })
  .strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z
  .object({
    date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    time: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z
      .union([z.lazy(() => SessionTypeSchema), z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    location: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    minutesLength: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    intensity: z
      .union([z.lazy(() => IntensitySchema), z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema)])
      .optional(),
    notes: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    sparringTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    weight: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    techniques: z.lazy(() => SessionTechniqueUpdateManyWithoutSessionNestedInputSchema).optional(),
    author: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional(),
  })
  .strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    time: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z
      .union([z.lazy(() => SessionTypeSchema), z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    location: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    minutesLength: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    intensity: z
      .union([z.lazy(() => IntensitySchema), z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema)])
      .optional(),
    notes: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    sparringTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    weight: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    techniques: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutSessionNestedInputSchema).optional(),
  })
  .strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    date: z.coerce.date(),
    time: z.string(),
    type: z.lazy(() => SessionTypeSchema),
    location: z.string().optional().nullable(),
    minutesLength: z.number().int(),
    intensity: z.lazy(() => IntensitySchema),
    notes: z.string().optional().nullable(),
    sparringTime: z.number().int().optional().nullable(),
    drillingTime: z.number().int().optional().nullable(),
    authorId: z.string(),
    weight: z.number().int().optional().nullable(),
  })
  .strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z
  .object({
    date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    time: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z
      .union([z.lazy(() => SessionTypeSchema), z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    location: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    minutesLength: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    intensity: z
      .union([z.lazy(() => IntensitySchema), z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema)])
      .optional(),
    notes: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    sparringTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    weight: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    time: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z
      .union([z.lazy(() => SessionTypeSchema), z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    location: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    minutesLength: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    intensity: z
      .union([z.lazy(() => IntensitySchema), z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema)])
      .optional(),
    notes: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    sparringTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    weight: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const TechniqueCreateInputSchema: z.ZodType<Prisma.TechniqueCreateInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    type: z.lazy(() => TechniqueTypeSchema),
    videoUrl: z.string().optional().nullable(),
    giOnly: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    Session: z.lazy(() => SessionTechniqueCreateNestedManyWithoutTechniqueInputSchema).optional(),
    tags: z.lazy(() => TagCreateNestedManyWithoutTechniquesInputSchema).optional(),
    createdBy: z.lazy(() => UserCreateNestedOneWithoutTechniquesAddedInputSchema).optional(),
  })
  .strict();

export const TechniqueUncheckedCreateInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    type: z.lazy(() => TechniqueTypeSchema),
    videoUrl: z.string().optional().nullable(),
    giOnly: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    userId: z.string().optional().nullable(),
    Session: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInputSchema).optional(),
    tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutTechniquesInputSchema).optional(),
  })
  .strict();

export const TechniqueUpdateInputSchema: z.ZodType<Prisma.TechniqueUpdateInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    type: z
      .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    videoUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    Session: z.lazy(() => SessionTechniqueUpdateManyWithoutTechniqueNestedInputSchema).optional(),
    tags: z.lazy(() => TagUpdateManyWithoutTechniquesNestedInputSchema).optional(),
    createdBy: z.lazy(() => UserUpdateOneWithoutTechniquesAddedNestedInputSchema).optional(),
  })
  .strict();

export const TechniqueUncheckedUpdateInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    type: z
      .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    videoUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    userId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    Session: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInputSchema).optional(),
    tags: z.lazy(() => TagUncheckedUpdateManyWithoutTechniquesNestedInputSchema).optional(),
  })
  .strict();

export const TechniqueCreateManyInputSchema: z.ZodType<Prisma.TechniqueCreateManyInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    type: z.lazy(() => TechniqueTypeSchema),
    videoUrl: z.string().optional().nullable(),
    giOnly: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    userId: z.string().optional().nullable(),
  })
  .strict();

export const TechniqueUpdateManyMutationInputSchema: z.ZodType<Prisma.TechniqueUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    type: z
      .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    videoUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const TechniqueUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    type: z
      .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    videoUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    userId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const SessionTechniqueCreateInputSchema: z.ZodType<Prisma.SessionTechniqueCreateInput> = z
  .object({
    id: z.string().uuid().optional(),
    notes: z.string().optional().nullable(),
    drillingTime: z.number().int().optional().nullable(),
    session: z.lazy(() => SessionCreateNestedOneWithoutTechniquesInputSchema),
    technique: z.lazy(() => TechniqueCreateNestedOneWithoutSessionInputSchema),
  })
  .strict();

export const SessionTechniqueUncheckedCreateInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedCreateInput> = z
  .object({
    id: z.string().uuid().optional(),
    sessionId: z.number().int(),
    techniqueId: z.string(),
    notes: z.string().optional().nullable(),
    drillingTime: z.number().int().optional().nullable(),
  })
  .strict();

export const SessionTechniqueUpdateInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    notes: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    session: z.lazy(() => SessionUpdateOneRequiredWithoutTechniquesNestedInputSchema).optional(),
    technique: z.lazy(() => TechniqueUpdateOneRequiredWithoutSessionNestedInputSchema).optional(),
  })
  .strict();

export const SessionTechniqueUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    sessionId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    techniqueId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    notes: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const SessionTechniqueCreateManyInputSchema: z.ZodType<Prisma.SessionTechniqueCreateManyInput> = z
  .object({
    id: z.string().uuid().optional(),
    sessionId: z.number().int(),
    techniqueId: z.string(),
    notes: z.string().optional().nullable(),
    drillingTime: z.number().int().optional().nullable(),
  })
  .strict();

export const SessionTechniqueUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyMutationInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionTechniqueUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateManyInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      sessionId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      techniqueId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    techniques: z.lazy(() => TechniqueCreateNestedManyWithoutTagsInputSchema).optional(),
    createdBy: z.lazy(() => UserCreateNestedOneWithoutTagsAddedInputSchema).optional(),
  })
  .strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    userId: z.string().optional().nullable(),
    techniques: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutTagsInputSchema).optional(),
  })
  .strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    techniques: z.lazy(() => TechniqueUpdateManyWithoutTagsNestedInputSchema).optional(),
    createdBy: z.lazy(() => UserUpdateOneWithoutTagsAddedNestedInputSchema).optional(),
  })
  .strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    userId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    techniques: z.lazy(() => TechniqueUncheckedUpdateManyWithoutTagsNestedInputSchema).optional(),
  })
  .strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    userId: z.string().optional().nullable(),
  })
  .strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    userId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z
  .object({
    every: z.lazy(() => SessionWhereInputSchema).optional(),
    some: z.lazy(() => SessionWhereInputSchema).optional(),
    none: z.lazy(() => SessionWhereInputSchema).optional(),
  })
  .strict();

export const TechniqueListRelationFilterSchema: z.ZodType<Prisma.TechniqueListRelationFilter> = z
  .object({
    every: z.lazy(() => TechniqueWhereInputSchema).optional(),
    some: z.lazy(() => TechniqueWhereInputSchema).optional(),
    none: z.lazy(() => TechniqueWhereInputSchema).optional(),
  })
  .strict();

export const TagListRelationFilterSchema: z.ZodType<Prisma.TagListRelationFilter> = z
  .object({
    every: z.lazy(() => TagWhereInputSchema).optional(),
    some: z.lazy(() => TagWhereInputSchema).optional(),
    none: z.lazy(() => TagWhereInputSchema).optional(),
  })
  .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z
  .object({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TechniqueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TechniqueOrderByRelationAggregateInput> = z
  .object({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TagOrderByRelationAggregateInput> = z
  .object({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userName: z.lazy(() => SortOrderSchema).optional(),
    displayName: z.lazy(() => SortOrderSchema).optional(),
    externalId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userName: z.lazy(() => SortOrderSchema).optional(),
    displayName: z.lazy(() => SortOrderSchema).optional(),
    externalId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userName: z.lazy(() => SortOrderSchema).optional(),
    displayName: z.lazy(() => SortOrderSchema).optional(),
    externalId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  })
  .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  })
  .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
  })
  .strict();

export const EnumSessionTypeFilterSchema: z.ZodType<Prisma.EnumSessionTypeFilter> = z
  .object({
    equals: z.lazy(() => SessionTypeSchema).optional(),
    in: z
      .lazy(() => SessionTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SessionTypeSchema)
      .array()
      .optional(),
    not: z.union([z.lazy(() => SessionTypeSchema), z.lazy(() => NestedEnumSessionTypeFilterSchema)]).optional(),
  })
  .strict();

export const EnumIntensityFilterSchema: z.ZodType<Prisma.EnumIntensityFilter> = z
  .object({
    equals: z.lazy(() => IntensitySchema).optional(),
    in: z
      .lazy(() => IntensitySchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => IntensitySchema)
      .array()
      .optional(),
    not: z.union([z.lazy(() => IntensitySchema), z.lazy(() => NestedEnumIntensityFilterSchema)]).optional(),
  })
  .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const SessionTechniqueListRelationFilterSchema: z.ZodType<Prisma.SessionTechniqueListRelationFilter> = z
  .object({
    every: z.lazy(() => SessionTechniqueWhereInputSchema).optional(),
    some: z.lazy(() => SessionTechniqueWhereInputSchema).optional(),
    none: z.lazy(() => SessionTechniqueWhereInputSchema).optional(),
  })
  .strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict();

export const SessionTechniqueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    date: z.lazy(() => SortOrderSchema).optional(),
    time: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => SortOrderSchema).optional(),
    minutesLength: z.lazy(() => SortOrderSchema).optional(),
    intensity: z.lazy(() => SortOrderSchema).optional(),
    notes: z.lazy(() => SortOrderSchema).optional(),
    sparringTime: z.lazy(() => SortOrderSchema).optional(),
    drillingTime: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    weight: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const SessionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SessionAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    minutesLength: z.lazy(() => SortOrderSchema).optional(),
    sparringTime: z.lazy(() => SortOrderSchema).optional(),
    drillingTime: z.lazy(() => SortOrderSchema).optional(),
    weight: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    date: z.lazy(() => SortOrderSchema).optional(),
    time: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => SortOrderSchema).optional(),
    minutesLength: z.lazy(() => SortOrderSchema).optional(),
    intensity: z.lazy(() => SortOrderSchema).optional(),
    notes: z.lazy(() => SortOrderSchema).optional(),
    sparringTime: z.lazy(() => SortOrderSchema).optional(),
    drillingTime: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    weight: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    date: z.lazy(() => SortOrderSchema).optional(),
    time: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => SortOrderSchema).optional(),
    minutesLength: z.lazy(() => SortOrderSchema).optional(),
    intensity: z.lazy(() => SortOrderSchema).optional(),
    notes: z.lazy(() => SortOrderSchema).optional(),
    sparringTime: z.lazy(() => SortOrderSchema).optional(),
    drillingTime: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    weight: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const SessionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SessionSumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    minutesLength: z.lazy(() => SortOrderSchema).optional(),
    sparringTime: z.lazy(() => SortOrderSchema).optional(),
    drillingTime: z.lazy(() => SortOrderSchema).optional(),
    weight: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  })
  .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  })
  .strict();

export const EnumSessionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSessionTypeWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => SessionTypeSchema).optional(),
    in: z
      .lazy(() => SessionTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SessionTypeSchema)
      .array()
      .optional(),
    not: z
      .union([z.lazy(() => SessionTypeSchema), z.lazy(() => NestedEnumSessionTypeWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumSessionTypeFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumSessionTypeFilterSchema).optional(),
  })
  .strict();

export const EnumIntensityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumIntensityWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => IntensitySchema).optional(),
    in: z
      .lazy(() => IntensitySchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => IntensitySchema)
      .array()
      .optional(),
    not: z
      .union([z.lazy(() => IntensitySchema), z.lazy(() => NestedEnumIntensityWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumIntensityFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumIntensityFilterSchema).optional(),
  })
  .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  })
  .strict();

export const EnumTechniqueTypeFilterSchema: z.ZodType<Prisma.EnumTechniqueTypeFilter> = z
  .object({
    equals: z.lazy(() => TechniqueTypeSchema).optional(),
    in: z
      .lazy(() => TechniqueTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => TechniqueTypeSchema)
      .array()
      .optional(),
    not: z.union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => NestedEnumTechniqueTypeFilterSchema)]).optional(),
  })
  .strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
  })
  .strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z
  .object({
    is: z
      .lazy(() => UserWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => UserWhereInputSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const TechniqueCountOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    videoUrl: z.lazy(() => SortOrderSchema).optional(),
    giOnly: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TechniqueMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    videoUrl: z.lazy(() => SortOrderSchema).optional(),
    giOnly: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TechniqueMinOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    videoUrl: z.lazy(() => SortOrderSchema).optional(),
    giOnly: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const EnumTechniqueTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTechniqueTypeWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => TechniqueTypeSchema).optional(),
    in: z
      .lazy(() => TechniqueTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => TechniqueTypeSchema)
      .array()
      .optional(),
    not: z
      .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => NestedEnumTechniqueTypeWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumTechniqueTypeFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumTechniqueTypeFilterSchema).optional(),
  })
  .strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
  })
  .strict();

export const SessionRelationFilterSchema: z.ZodType<Prisma.SessionRelationFilter> = z
  .object({
    is: z.lazy(() => SessionWhereInputSchema).optional(),
    isNot: z.lazy(() => SessionWhereInputSchema).optional(),
  })
  .strict();

export const TechniqueRelationFilterSchema: z.ZodType<Prisma.TechniqueRelationFilter> = z
  .object({
    is: z.lazy(() => TechniqueWhereInputSchema).optional(),
    isNot: z.lazy(() => TechniqueWhereInputSchema).optional(),
  })
  .strict();

export const SessionTechniqueCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionId: z.lazy(() => SortOrderSchema).optional(),
      techniqueId: z.lazy(() => SortOrderSchema).optional(),
      notes: z.lazy(() => SortOrderSchema).optional(),
      drillingTime: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionTechniqueAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueAvgOrderByAggregateInput> =
  z
    .object({
      sessionId: z.lazy(() => SortOrderSchema).optional(),
      drillingTime: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionTechniqueMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionId: z.lazy(() => SortOrderSchema).optional(),
      techniqueId: z.lazy(() => SortOrderSchema).optional(),
      notes: z.lazy(() => SortOrderSchema).optional(),
      drillingTime: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionTechniqueMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionId: z.lazy(() => SortOrderSchema).optional(),
      techniqueId: z.lazy(() => SortOrderSchema).optional(),
      notes: z.lazy(() => SortOrderSchema).optional(),
      drillingTime: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionTechniqueSumOrderByAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueSumOrderByAggregateInput> =
  z
    .object({
      sessionId: z.lazy(() => SortOrderSchema).optional(),
      drillingTime: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const SessionCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutAuthorInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutAuthorInputSchema),
          z.lazy(() => SessionCreateWithoutAuthorInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionCreateManyAuthorInputEnvelopeSchema).optional(),
      connect: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict();

export const TechniqueCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueCreateNestedManyWithoutCreatedByInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema).array(),
          z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TechniqueCreateManyCreatedByInputEnvelopeSchema).optional(),
      connect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict();

export const TagCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutCreatedByInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutCreatedByInputSchema),
          z.lazy(() => TagCreateWithoutCreatedByInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TagCreateManyCreatedByInputEnvelopeSchema).optional(),
      connect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict();

export const SessionUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutAuthorInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutAuthorInputSchema),
          z.lazy(() => SessionCreateWithoutAuthorInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionCreateManyAuthorInputEnvelopeSchema).optional(),
      connect: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict();

export const TechniqueUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateNestedManyWithoutCreatedByInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema).array(),
          z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TechniqueCreateManyCreatedByInputEnvelopeSchema).optional(),
      connect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict();

export const TagUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutCreatedByInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutCreatedByInputSchema),
          z.lazy(() => TagCreateWithoutCreatedByInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TagCreateManyCreatedByInputEnvelopeSchema).optional(),
      connect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z
  .object({
    set: z.string().optional(),
  })
  .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const SessionUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutAuthorNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutAuthorInputSchema),
          z.lazy(() => SessionCreateWithoutAuthorInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutAuthorInputSchema),
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionCreateManyAuthorInputEnvelopeSchema).optional(),
      set: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutAuthorInputSchema),
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutAuthorInputSchema),
          z.lazy(() => SessionUpdateManyWithWhereWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict();

export const TechniqueUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithoutCreatedByNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema).array(),
          z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TechniqueCreateManyCreatedByInputEnvelopeSchema).optional(),
      set: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TechniqueUpdateManyWithWhereWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueUpdateManyWithWhereWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => TechniqueScalarWhereInputSchema), z.lazy(() => TechniqueScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict();

export const TagUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutCreatedByNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutCreatedByInputSchema),
          z.lazy(() => TagCreateWithoutCreatedByInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TagUpsertWithWhereUniqueWithoutCreatedByInputSchema),
          z.lazy(() => TagUpsertWithWhereUniqueWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TagCreateManyCreatedByInputEnvelopeSchema).optional(),
      set: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => TagUpdateWithWhereUniqueWithoutCreatedByInputSchema),
          z.lazy(() => TagUpdateWithWhereUniqueWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TagUpdateManyWithWhereWithoutCreatedByInputSchema),
          z.lazy(() => TagUpdateManyWithWhereWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutAuthorNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutAuthorInputSchema),
          z.lazy(() => SessionCreateWithoutAuthorInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutAuthorInputSchema),
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionCreateManyAuthorInputEnvelopeSchema).optional(),
      set: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutAuthorInputSchema),
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutAuthorInputSchema),
          z.lazy(() => SessionUpdateManyWithWhereWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict();

export const TechniqueUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutCreatedByNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema).array(),
          z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TechniqueCreateManyCreatedByInputEnvelopeSchema).optional(),
      set: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TechniqueUpdateManyWithWhereWithoutCreatedByInputSchema),
          z.lazy(() => TechniqueUpdateManyWithWhereWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => TechniqueScalarWhereInputSchema), z.lazy(() => TechniqueScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict();

export const TagUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutCreatedByNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutCreatedByInputSchema),
          z.lazy(() => TagCreateWithoutCreatedByInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TagUpsertWithWhereUniqueWithoutCreatedByInputSchema),
          z.lazy(() => TagUpsertWithWhereUniqueWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TagCreateManyCreatedByInputEnvelopeSchema).optional(),
      set: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => TagUpdateWithWhereUniqueWithoutCreatedByInputSchema),
          z.lazy(() => TagUpdateWithWhereUniqueWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TagUpdateManyWithWhereWithoutCreatedByInputSchema),
          z.lazy(() => TagUpdateManyWithWhereWithoutCreatedByInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict();

export const SessionTechniqueCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueCreateNestedManyWithoutSessionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema).array(),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionTechniqueCreateManySessionInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const SessionTechniqueUncheckedCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedCreateNestedManyWithoutSessionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema).array(),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionTechniqueCreateManySessionInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z
  .object({
    set: z.coerce.date().optional(),
  })
  .strict();

export const EnumSessionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSessionTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => SessionTypeSchema).optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z
  .object({
    set: z.number().optional(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  })
  .strict();

export const EnumIntensityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumIntensityFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => IntensitySchema).optional(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z
  .object({
    set: z.number().optional().nullable(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  })
  .strict();

export const SessionTechniqueUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyWithoutSessionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema).array(),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutSessionInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionTechniqueCreateManySessionInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutSessionInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutSessionInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionTechniqueScalarWhereInputSchema),
          z.lazy(() => SessionTechniqueScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
      upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),
          z.lazy(() => UserUpdateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionTechniqueUncheckedUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateManyWithoutSessionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema).array(),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutSessionInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionTechniqueCreateManySessionInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutSessionInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutSessionInputSchema),
          z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutSessionInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionTechniqueScalarWhereInputSchema),
          z.lazy(() => SessionTechniqueScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionTechniqueCreateNestedManyWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueCreateNestedManyWithoutTechniqueInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema).array(),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionTechniqueCreateManyTechniqueInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TagCreateNestedManyWithoutTechniquesInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutTechniquesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutTechniquesInputSchema),
          z.lazy(() => TagCreateWithoutTechniquesInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTechniquesAddedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutTechniquesAddedInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutTechniquesAddedInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTechniquesAddedInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema).array(),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionTechniqueCreateManyTechniqueInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TagUncheckedCreateNestedManyWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutTechniquesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutTechniquesInputSchema),
          z.lazy(() => TagCreateWithoutTechniquesInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict();

export const EnumTechniqueTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTechniqueTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => TechniqueTypeSchema).optional(),
    })
    .strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z
  .object({
    set: z.boolean().optional(),
  })
  .strict();

export const SessionTechniqueUpdateManyWithoutTechniqueNestedInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyWithoutTechniqueNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema).array(),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionTechniqueCreateManyTechniqueInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionTechniqueScalarWhereInputSchema),
          z.lazy(() => SessionTechniqueScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TagUpdateManyWithoutTechniquesNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutTechniquesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutTechniquesInputSchema),
          z.lazy(() => TagCreateWithoutTechniquesInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TagUpsertWithWhereUniqueWithoutTechniquesInputSchema),
          z.lazy(() => TagUpsertWithWhereUniqueWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => TagUpdateWithWhereUniqueWithoutTechniquesInputSchema),
          z.lazy(() => TagUpdateWithWhereUniqueWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TagUpdateManyWithWhereWithoutTechniquesInputSchema),
          z.lazy(() => TagUpdateManyWithWhereWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict();

export const UserUpdateOneWithoutTechniquesAddedNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTechniquesAddedNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutTechniquesAddedInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutTechniquesAddedInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTechniquesAddedInputSchema).optional(),
      upsert: z.lazy(() => UserUpsertWithoutTechniquesAddedInputSchema).optional(),
      disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputSchema)]).optional(),
      delete: z.union([z.boolean(), z.lazy(() => UserWhereInputSchema)]).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutTechniquesAddedInputSchema),
          z.lazy(() => UserUpdateWithoutTechniquesAddedInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutTechniquesAddedInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema).array(),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionTechniqueCreateManyTechniqueInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
          z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutTechniqueInputSchema),
          z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutTechniqueInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionTechniqueScalarWhereInputSchema),
          z.lazy(() => SessionTechniqueScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TagUncheckedUpdateManyWithoutTechniquesNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutTechniquesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutTechniquesInputSchema),
          z.lazy(() => TagCreateWithoutTechniquesInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TagUpsertWithWhereUniqueWithoutTechniquesInputSchema),
          z.lazy(() => TagUpsertWithWhereUniqueWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => TagWhereUniqueInputSchema), z.lazy(() => TagWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => TagUpdateWithWhereUniqueWithoutTechniquesInputSchema),
          z.lazy(() => TagUpdateWithWhereUniqueWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TagUpdateManyWithWhereWithoutTechniquesInputSchema),
          z.lazy(() => TagUpdateManyWithWhereWithoutTechniquesInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict();

export const SessionCreateNestedOneWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionCreateNestedOneWithoutTechniquesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutTechniquesInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema).optional(),
      connect: z.lazy(() => SessionWhereUniqueInputSchema).optional(),
    })
    .strict();

export const TechniqueCreateNestedOneWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueCreateNestedOneWithoutSessionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechniqueCreateWithoutSessionInputSchema),
          z.lazy(() => TechniqueUncheckedCreateWithoutSessionInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => TechniqueCreateOrConnectWithoutSessionInputSchema).optional(),
      connect: z.lazy(() => TechniqueWhereUniqueInputSchema).optional(),
    })
    .strict();

export const SessionUpdateOneRequiredWithoutTechniquesNestedInputSchema: z.ZodType<Prisma.SessionUpdateOneRequiredWithoutTechniquesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutTechniquesInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema).optional(),
      upsert: z.lazy(() => SessionUpsertWithoutTechniquesInputSchema).optional(),
      connect: z.lazy(() => SessionWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateToOneWithWhereWithoutTechniquesInputSchema),
          z.lazy(() => SessionUpdateWithoutTechniquesInputSchema),
          z.lazy(() => SessionUncheckedUpdateWithoutTechniquesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TechniqueUpdateOneRequiredWithoutSessionNestedInputSchema: z.ZodType<Prisma.TechniqueUpdateOneRequiredWithoutSessionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechniqueCreateWithoutSessionInputSchema),
          z.lazy(() => TechniqueUncheckedCreateWithoutSessionInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => TechniqueCreateOrConnectWithoutSessionInputSchema).optional(),
      upsert: z.lazy(() => TechniqueUpsertWithoutSessionInputSchema).optional(),
      connect: z.lazy(() => TechniqueWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => TechniqueUpdateToOneWithWhereWithoutSessionInputSchema),
          z.lazy(() => TechniqueUpdateWithoutSessionInputSchema),
          z.lazy(() => TechniqueUncheckedUpdateWithoutSessionInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TechniqueCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueCreateNestedManyWithoutTagsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechniqueCreateWithoutTagsInputSchema),
          z.lazy(() => TechniqueCreateWithoutTagsInputSchema).array(),
          z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema),
          z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema),
          z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTagsAddedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutTagsAddedInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutTagsAddedInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTagsAddedInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const TechniqueUncheckedCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateNestedManyWithoutTagsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechniqueCreateWithoutTagsInputSchema),
          z.lazy(() => TechniqueCreateWithoutTagsInputSchema).array(),
          z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema),
          z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema),
          z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict();

export const TechniqueUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithoutTagsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechniqueCreateWithoutTagsInputSchema),
          z.lazy(() => TechniqueCreateWithoutTagsInputSchema).array(),
          z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema),
          z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema),
          z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutTagsInputSchema),
          z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutTagsInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutTagsInputSchema),
          z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutTagsInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TechniqueUpdateManyWithWhereWithoutTagsInputSchema),
          z.lazy(() => TechniqueUpdateManyWithWhereWithoutTagsInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => TechniqueScalarWhereInputSchema), z.lazy(() => TechniqueScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict();

export const UserUpdateOneWithoutTagsAddedNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTagsAddedNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutTagsAddedInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutTagsAddedInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTagsAddedInputSchema).optional(),
      upsert: z.lazy(() => UserUpsertWithoutTagsAddedInputSchema).optional(),
      disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputSchema)]).optional(),
      delete: z.union([z.boolean(), z.lazy(() => UserWhereInputSchema)]).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutTagsAddedInputSchema),
          z.lazy(() => UserUpdateWithoutTagsAddedInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutTagsAddedInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TechniqueUncheckedUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutTagsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TechniqueCreateWithoutTagsInputSchema),
          z.lazy(() => TechniqueCreateWithoutTagsInputSchema).array(),
          z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema),
          z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema),
          z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutTagsInputSchema),
          z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutTagsInputSchema).array(),
        ])
        .optional(),
      set: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => TechniqueWhereUniqueInputSchema), z.lazy(() => TechniqueWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutTagsInputSchema),
          z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutTagsInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TechniqueUpdateManyWithWhereWithoutTagsInputSchema),
          z.lazy(() => TechniqueUpdateManyWithWhereWithoutTagsInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => TechniqueScalarWhereInputSchema), z.lazy(() => TechniqueScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  })
  .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
  })
  .strict();

export const NestedEnumSessionTypeFilterSchema: z.ZodType<Prisma.NestedEnumSessionTypeFilter> = z
  .object({
    equals: z.lazy(() => SessionTypeSchema).optional(),
    in: z
      .lazy(() => SessionTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => SessionTypeSchema)
      .array()
      .optional(),
    not: z.union([z.lazy(() => SessionTypeSchema), z.lazy(() => NestedEnumSessionTypeFilterSchema)]).optional(),
  })
  .strict();

export const NestedEnumIntensityFilterSchema: z.ZodType<Prisma.NestedEnumIntensityFilter> = z
  .object({
    equals: z.lazy(() => IntensitySchema).optional(),
    in: z
      .lazy(() => IntensitySchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => IntensitySchema)
      .array()
      .optional(),
    not: z.union([z.lazy(() => IntensitySchema), z.lazy(() => NestedEnumIntensityFilterSchema)]).optional(),
  })
  .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  })
  .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
  })
  .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  })
  .strict();

export const NestedEnumSessionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSessionTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => SessionTypeSchema).optional(),
      in: z
        .lazy(() => SessionTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => SessionTypeSchema)
        .array()
        .optional(),
      not: z
        .union([z.lazy(() => SessionTypeSchema), z.lazy(() => NestedEnumSessionTypeWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumSessionTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumSessionTypeFilterSchema).optional(),
    })
    .strict();

export const NestedEnumIntensityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumIntensityWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => IntensitySchema).optional(),
      in: z
        .lazy(() => IntensitySchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => IntensitySchema)
        .array()
        .optional(),
      not: z
        .union([z.lazy(() => IntensitySchema), z.lazy(() => NestedEnumIntensityWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumIntensityFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumIntensityFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  })
  .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedEnumTechniqueTypeFilterSchema: z.ZodType<Prisma.NestedEnumTechniqueTypeFilter> = z
  .object({
    equals: z.lazy(() => TechniqueTypeSchema).optional(),
    in: z
      .lazy(() => TechniqueTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => TechniqueTypeSchema)
      .array()
      .optional(),
    not: z.union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => NestedEnumTechniqueTypeFilterSchema)]).optional(),
  })
  .strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
  })
  .strict();

export const NestedEnumTechniqueTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTechniqueTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => TechniqueTypeSchema).optional(),
      in: z
        .lazy(() => TechniqueTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => TechniqueTypeSchema)
        .array()
        .optional(),
      not: z
        .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => NestedEnumTechniqueTypeWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumTechniqueTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumTechniqueTypeFilterSchema).optional(),
    })
    .strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
  })
  .strict();

export const SessionCreateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionCreateWithoutAuthorInput> = z
  .object({
    date: z.coerce.date(),
    time: z.string(),
    type: z.lazy(() => SessionTypeSchema),
    location: z.string().optional().nullable(),
    minutesLength: z.number().int(),
    intensity: z.lazy(() => IntensitySchema),
    notes: z.string().optional().nullable(),
    sparringTime: z.number().int().optional().nullable(),
    drillingTime: z.number().int().optional().nullable(),
    weight: z.number().int().optional().nullable(),
    techniques: z.lazy(() => SessionTechniqueCreateNestedManyWithoutSessionInputSchema).optional(),
  })
  .strict();

export const SessionUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutAuthorInput> =
  z
    .object({
      id: z.number().int().optional(),
      date: z.coerce.date(),
      time: z.string(),
      type: z.lazy(() => SessionTypeSchema),
      location: z.string().optional().nullable(),
      minutesLength: z.number().int(),
      intensity: z.lazy(() => IntensitySchema),
      notes: z.string().optional().nullable(),
      sparringTime: z.number().int().optional().nullable(),
      drillingTime: z.number().int().optional().nullable(),
      weight: z.number().int().optional().nullable(),
      techniques: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutSessionInputSchema).optional(),
    })
    .strict();

export const SessionCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SessionCreateWithoutAuthorInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export const SessionCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyAuthorInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => SessionCreateManyAuthorInputSchema),
      z.lazy(() => SessionCreateManyAuthorInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TechniqueCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueCreateWithoutCreatedByInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    type: z.lazy(() => TechniqueTypeSchema),
    videoUrl: z.string().optional().nullable(),
    giOnly: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    Session: z.lazy(() => SessionTechniqueCreateNestedManyWithoutTechniqueInputSchema).optional(),
    tags: z.lazy(() => TagCreateNestedManyWithoutTechniquesInputSchema).optional(),
  })
  .strict();

export const TechniqueUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateWithoutCreatedByInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      type: z.lazy(() => TechniqueTypeSchema),
      videoUrl: z.string().optional().nullable(),
      giOnly: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      Session: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInputSchema).optional(),
      tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutTechniquesInputSchema).optional(),
    })
    .strict();

export const TechniqueCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueCreateOrConnectWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => TechniqueWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),
        z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema),
      ]),
    })
    .strict();

export const TechniqueCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.TechniqueCreateManyCreatedByInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => TechniqueCreateManyCreatedByInputSchema),
        z.lazy(() => TechniqueCreateManyCreatedByInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const TagCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.TagCreateWithoutCreatedByInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    techniques: z.lazy(() => TechniqueCreateNestedManyWithoutTagsInputSchema).optional(),
  })
  .strict();

export const TagUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutCreatedByInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      techniques: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutTagsInputSchema).optional(),
    })
    .strict();

export const TagCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => TagWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TagCreateWithoutCreatedByInputSchema),
        z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema),
      ]),
    })
    .strict();

export const TagCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.TagCreateManyCreatedByInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TagCreateManyCreatedByInputSchema),
      z.lazy(() => TagCreateManyCreatedByInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const SessionUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SessionUpdateWithoutAuthorInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutAuthorInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SessionCreateWithoutAuthorInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export const SessionUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateWithoutAuthorInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export const SessionUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => SessionScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateManyMutationInputSchema),
        z.lazy(() => SessionUncheckedUpdateManyWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => SessionScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    date: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    time: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    type: z.union([z.lazy(() => EnumSessionTypeFilterSchema), z.lazy(() => SessionTypeSchema)]).optional(),
    location: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    minutesLength: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    intensity: z.union([z.lazy(() => EnumIntensityFilterSchema), z.lazy(() => IntensitySchema)]).optional(),
    notes: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    sparringTime: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    authorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    weight: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
  })
  .strict();

export const TechniqueUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUpsertWithWhereUniqueWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => TechniqueWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TechniqueUpdateWithoutCreatedByInputSchema),
        z.lazy(() => TechniqueUncheckedUpdateWithoutCreatedByInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),
        z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema),
      ]),
    })
    .strict();

export const TechniqueUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUpdateWithWhereUniqueWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => TechniqueWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TechniqueUpdateWithoutCreatedByInputSchema),
        z.lazy(() => TechniqueUncheckedUpdateWithoutCreatedByInputSchema),
      ]),
    })
    .strict();

export const TechniqueUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithWhereWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => TechniqueScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TechniqueUpdateManyMutationInputSchema),
        z.lazy(() => TechniqueUncheckedUpdateManyWithoutCreatedByInputSchema),
      ]),
    })
    .strict();

export const TechniqueScalarWhereInputSchema: z.ZodType<Prisma.TechniqueScalarWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => TechniqueScalarWhereInputSchema), z.lazy(() => TechniqueScalarWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => TechniqueScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => TechniqueScalarWhereInputSchema), z.lazy(() => TechniqueScalarWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    type: z.union([z.lazy(() => EnumTechniqueTypeFilterSchema), z.lazy(() => TechniqueTypeSchema)]).optional(),
    videoUrl: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    giOnly: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    userId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const TagUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => TagWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TagUpdateWithoutCreatedByInputSchema),
        z.lazy(() => TagUncheckedUpdateWithoutCreatedByInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TagCreateWithoutCreatedByInputSchema),
        z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema),
      ]),
    })
    .strict();

export const TagUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => TagWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TagUpdateWithoutCreatedByInputSchema),
        z.lazy(() => TagUncheckedUpdateWithoutCreatedByInputSchema),
      ]),
    })
    .strict();

export const TagUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutCreatedByInput> =
  z
    .object({
      where: z.lazy(() => TagScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TagUpdateManyMutationInputSchema),
        z.lazy(() => TagUncheckedUpdateManyWithoutCreatedByInputSchema),
      ]),
    })
    .strict();

export const TagScalarWhereInputSchema: z.ZodType<Prisma.TagScalarWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => TagScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => TagScalarWhereInputSchema), z.lazy(() => TagScalarWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const SessionTechniqueCreateWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueCreateWithoutSessionInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      notes: z.string().optional().nullable(),
      drillingTime: z.number().int().optional().nullable(),
      technique: z.lazy(() => TechniqueCreateNestedOneWithoutSessionInputSchema),
    })
    .strict();

export const SessionTechniqueUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedCreateWithoutSessionInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      techniqueId: z.string(),
      notes: z.string().optional().nullable(),
      drillingTime: z.number().int().optional().nullable(),
    })
    .strict();

export const SessionTechniqueCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueCreateOrConnectWithoutSessionInput> =
  z
    .object({
      where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),
        z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema),
      ]),
    })
    .strict();

export const SessionTechniqueCreateManySessionInputEnvelopeSchema: z.ZodType<Prisma.SessionTechniqueCreateManySessionInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => SessionTechniqueCreateManySessionInputSchema),
        z.lazy(() => SessionTechniqueCreateManySessionInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z
  .object({
    id: z.string().cuid().optional(),
    userName: z.string().optional().nullable(),
    displayName: z.string(),
    externalId: z.string(),
    techniquesAdded: z.lazy(() => TechniqueCreateNestedManyWithoutCreatedByInputSchema).optional(),
    tagsAdded: z.lazy(() => TagCreateNestedManyWithoutCreatedByInputSchema).optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userName: z.string().optional().nullable(),
      displayName: z.string(),
      externalId: z.string(),
      techniquesAdded: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
      tagsAdded: z.lazy(() => TagUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ]),
    })
    .strict();

export const SessionTechniqueUpsertWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUpsertWithWhereUniqueWithoutSessionInput> =
  z
    .object({
      where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SessionTechniqueUpdateWithoutSessionInputSchema),
        z.lazy(() => SessionTechniqueUncheckedUpdateWithoutSessionInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),
        z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema),
      ]),
    })
    .strict();

export const SessionTechniqueUpdateWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateWithWhereUniqueWithoutSessionInput> =
  z
    .object({
      where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SessionTechniqueUpdateWithoutSessionInputSchema),
        z.lazy(() => SessionTechniqueUncheckedUpdateWithoutSessionInputSchema),
      ]),
    })
    .strict();

export const SessionTechniqueUpdateManyWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyWithWhereWithoutSessionInput> =
  z
    .object({
      where: z.lazy(() => SessionTechniqueScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SessionTechniqueUpdateManyMutationInputSchema),
        z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutSessionInputSchema),
      ]),
    })
    .strict();

export const SessionTechniqueScalarWhereInputSchema: z.ZodType<Prisma.SessionTechniqueScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SessionTechniqueScalarWhereInputSchema),
        z.lazy(() => SessionTechniqueScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionTechniqueScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionTechniqueScalarWhereInputSchema),
        z.lazy(() => SessionTechniqueScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    sessionId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    techniqueId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    notes: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
  })
  .strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z
  .object({
    id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    displayName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    techniquesAdded: z.lazy(() => TechniqueUpdateManyWithoutCreatedByNestedInputSchema).optional(),
    tagsAdded: z.lazy(() => TagUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  })
  .strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> =
  z
    .object({
      id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      userName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      displayName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      techniquesAdded: z.lazy(() => TechniqueUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
      tagsAdded: z.lazy(() => TagUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
    })
    .strict();

export const SessionTechniqueCreateWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueCreateWithoutTechniqueInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      notes: z.string().optional().nullable(),
      drillingTime: z.number().int().optional().nullable(),
      session: z.lazy(() => SessionCreateNestedOneWithoutTechniquesInputSchema),
    })
    .strict();

export const SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedCreateWithoutTechniqueInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      sessionId: z.number().int(),
      notes: z.string().optional().nullable(),
      drillingTime: z.number().int().optional().nullable(),
    })
    .strict();

export const SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueCreateOrConnectWithoutTechniqueInput> =
  z
    .object({
      where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),
        z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema),
      ]),
    })
    .strict();

export const SessionTechniqueCreateManyTechniqueInputEnvelopeSchema: z.ZodType<Prisma.SessionTechniqueCreateManyTechniqueInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => SessionTechniqueCreateManyTechniqueInputSchema),
        z.lazy(() => SessionTechniqueCreateManyTechniqueInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const TagCreateWithoutTechniquesInputSchema: z.ZodType<Prisma.TagCreateWithoutTechniquesInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    createdBy: z.lazy(() => UserCreateNestedOneWithoutTagsAddedInputSchema).optional(),
  })
  .strict();

export const TagUncheckedCreateWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutTechniquesInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      userId: z.string().optional().nullable(),
    })
    .strict();

export const TagCreateOrConnectWithoutTechniquesInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutTechniquesInput> =
  z
    .object({
      where: z.lazy(() => TagWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TagCreateWithoutTechniquesInputSchema),
        z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema),
      ]),
    })
    .strict();

export const UserCreateWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserCreateWithoutTechniquesAddedInput> = z
  .object({
    id: z.string().cuid().optional(),
    userName: z.string().optional().nullable(),
    displayName: z.string(),
    externalId: z.string(),
    sessions: z.lazy(() => SessionCreateNestedManyWithoutAuthorInputSchema).optional(),
    tagsAdded: z.lazy(() => TagCreateNestedManyWithoutCreatedByInputSchema).optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTechniquesAddedInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userName: z.string().optional().nullable(),
      displayName: z.string(),
      externalId: z.string(),
      sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
      tagsAdded: z.lazy(() => TagUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTechniquesAddedInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutTechniquesAddedInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutTechniquesAddedInputSchema),
      ]),
    })
    .strict();

export const SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInput> =
  z
    .object({
      where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SessionTechniqueUpdateWithoutTechniqueInputSchema),
        z.lazy(() => SessionTechniqueUncheckedUpdateWithoutTechniqueInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),
        z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema),
      ]),
    })
    .strict();

export const SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInput> =
  z
    .object({
      where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SessionTechniqueUpdateWithoutTechniqueInputSchema),
        z.lazy(() => SessionTechniqueUncheckedUpdateWithoutTechniqueInputSchema),
      ]),
    })
    .strict();

export const SessionTechniqueUpdateManyWithWhereWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyWithWhereWithoutTechniqueInput> =
  z
    .object({
      where: z.lazy(() => SessionTechniqueScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SessionTechniqueUpdateManyMutationInputSchema),
        z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutTechniqueInputSchema),
      ]),
    })
    .strict();

export const TagUpsertWithWhereUniqueWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutTechniquesInput> =
  z
    .object({
      where: z.lazy(() => TagWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TagUpdateWithoutTechniquesInputSchema),
        z.lazy(() => TagUncheckedUpdateWithoutTechniquesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TagCreateWithoutTechniquesInputSchema),
        z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema),
      ]),
    })
    .strict();

export const TagUpdateWithWhereUniqueWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutTechniquesInput> =
  z
    .object({
      where: z.lazy(() => TagWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TagUpdateWithoutTechniquesInputSchema),
        z.lazy(() => TagUncheckedUpdateWithoutTechniquesInputSchema),
      ]),
    })
    .strict();

export const TagUpdateManyWithWhereWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutTechniquesInput> =
  z
    .object({
      where: z.lazy(() => TagScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TagUpdateManyMutationInputSchema),
        z.lazy(() => TagUncheckedUpdateManyWithoutTechniquesInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserUpsertWithoutTechniquesAddedInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutTechniquesAddedInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutTechniquesAddedInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutTechniquesAddedInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutTechniquesAddedInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict();

export const UserUpdateToOneWithWhereWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTechniquesAddedInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutTechniquesAddedInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutTechniquesAddedInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserUpdateWithoutTechniquesAddedInput> = z
  .object({
    id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    displayName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    sessions: z.lazy(() => SessionUpdateManyWithoutAuthorNestedInputSchema).optional(),
    tagsAdded: z.lazy(() => TagUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  })
  .strict();

export const UserUncheckedUpdateWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTechniquesAddedInput> =
  z
    .object({
      id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      userName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      displayName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
      tagsAdded: z.lazy(() => TagUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
    })
    .strict();

export const SessionCreateWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionCreateWithoutTechniquesInput> = z
  .object({
    date: z.coerce.date(),
    time: z.string(),
    type: z.lazy(() => SessionTypeSchema),
    location: z.string().optional().nullable(),
    minutesLength: z.number().int(),
    intensity: z.lazy(() => IntensitySchema),
    notes: z.string().optional().nullable(),
    sparringTime: z.number().int().optional().nullable(),
    drillingTime: z.number().int().optional().nullable(),
    weight: z.number().int().optional().nullable(),
    author: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
  })
  .strict();

export const SessionUncheckedCreateWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutTechniquesInput> =
  z
    .object({
      id: z.number().int().optional(),
      date: z.coerce.date(),
      time: z.string(),
      type: z.lazy(() => SessionTypeSchema),
      location: z.string().optional().nullable(),
      minutesLength: z.number().int(),
      intensity: z.lazy(() => IntensitySchema),
      notes: z.string().optional().nullable(),
      sparringTime: z.number().int().optional().nullable(),
      drillingTime: z.number().int().optional().nullable(),
      authorId: z.string(),
      weight: z.number().int().optional().nullable(),
    })
    .strict();

export const SessionCreateOrConnectWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutTechniquesInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SessionCreateWithoutTechniquesInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema),
      ]),
    })
    .strict();

export const TechniqueCreateWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueCreateWithoutSessionInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    type: z.lazy(() => TechniqueTypeSchema),
    videoUrl: z.string().optional().nullable(),
    giOnly: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    tags: z.lazy(() => TagCreateNestedManyWithoutTechniquesInputSchema).optional(),
    createdBy: z.lazy(() => UserCreateNestedOneWithoutTechniquesAddedInputSchema).optional(),
  })
  .strict();

export const TechniqueUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateWithoutSessionInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      type: z.lazy(() => TechniqueTypeSchema),
      videoUrl: z.string().optional().nullable(),
      giOnly: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      userId: z.string().optional().nullable(),
      tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutTechniquesInputSchema).optional(),
    })
    .strict();

export const TechniqueCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueCreateOrConnectWithoutSessionInput> =
  z
    .object({
      where: z.lazy(() => TechniqueWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TechniqueCreateWithoutSessionInputSchema),
        z.lazy(() => TechniqueUncheckedCreateWithoutSessionInputSchema),
      ]),
    })
    .strict();

export const SessionUpsertWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUpsertWithoutTechniquesInput> = z
  .object({
    update: z.union([
      z.lazy(() => SessionUpdateWithoutTechniquesInputSchema),
      z.lazy(() => SessionUncheckedUpdateWithoutTechniquesInputSchema),
    ]),
    create: z.union([
      z.lazy(() => SessionCreateWithoutTechniquesInputSchema),
      z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema),
    ]),
    where: z.lazy(() => SessionWhereInputSchema).optional(),
  })
  .strict();

export const SessionUpdateToOneWithWhereWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUpdateToOneWithWhereWithoutTechniquesInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => SessionUpdateWithoutTechniquesInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutTechniquesInputSchema),
      ]),
    })
    .strict();

export const SessionUpdateWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUpdateWithoutTechniquesInput> = z
  .object({
    date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    time: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z
      .union([z.lazy(() => SessionTypeSchema), z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    location: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    minutesLength: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    intensity: z
      .union([z.lazy(() => IntensitySchema), z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema)])
      .optional(),
    notes: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    sparringTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    weight: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    author: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional(),
  })
  .strict();

export const SessionUncheckedUpdateWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutTechniquesInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      time: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      type: z
        .union([z.lazy(() => SessionTypeSchema), z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema)])
        .optional(),
      location: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      minutesLength: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      intensity: z
        .union([z.lazy(() => IntensitySchema), z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema)])
        .optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      sparringTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      weight: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const TechniqueUpsertWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueUpsertWithoutSessionInput> = z
  .object({
    update: z.union([
      z.lazy(() => TechniqueUpdateWithoutSessionInputSchema),
      z.lazy(() => TechniqueUncheckedUpdateWithoutSessionInputSchema),
    ]),
    create: z.union([
      z.lazy(() => TechniqueCreateWithoutSessionInputSchema),
      z.lazy(() => TechniqueUncheckedCreateWithoutSessionInputSchema),
    ]),
    where: z.lazy(() => TechniqueWhereInputSchema).optional(),
  })
  .strict();

export const TechniqueUpdateToOneWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueUpdateToOneWithWhereWithoutSessionInput> =
  z
    .object({
      where: z.lazy(() => TechniqueWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => TechniqueUpdateWithoutSessionInputSchema),
        z.lazy(() => TechniqueUncheckedUpdateWithoutSessionInputSchema),
      ]),
    })
    .strict();

export const TechniqueUpdateWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueUpdateWithoutSessionInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    type: z
      .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    videoUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    tags: z.lazy(() => TagUpdateManyWithoutTechniquesNestedInputSchema).optional(),
    createdBy: z.lazy(() => UserUpdateOneWithoutTechniquesAddedNestedInputSchema).optional(),
  })
  .strict();

export const TechniqueUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateWithoutSessionInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      type: z
        .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
        .optional(),
      videoUrl: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
      createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      userId: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      tags: z.lazy(() => TagUncheckedUpdateManyWithoutTechniquesNestedInputSchema).optional(),
    })
    .strict();

export const TechniqueCreateWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueCreateWithoutTagsInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    type: z.lazy(() => TechniqueTypeSchema),
    videoUrl: z.string().optional().nullable(),
    giOnly: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    Session: z.lazy(() => SessionTechniqueCreateNestedManyWithoutTechniqueInputSchema).optional(),
    createdBy: z.lazy(() => UserCreateNestedOneWithoutTechniquesAddedInputSchema).optional(),
  })
  .strict();

export const TechniqueUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateWithoutTagsInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      name: z.string(),
      description: z.string().optional().nullable(),
      type: z.lazy(() => TechniqueTypeSchema),
      videoUrl: z.string().optional().nullable(),
      giOnly: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      userId: z.string().optional().nullable(),
      Session: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInputSchema).optional(),
    })
    .strict();

export const TechniqueCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueCreateOrConnectWithoutTagsInput> =
  z
    .object({
      where: z.lazy(() => TechniqueWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TechniqueCreateWithoutTagsInputSchema),
        z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema),
      ]),
    })
    .strict();

export const UserCreateWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserCreateWithoutTagsAddedInput> = z
  .object({
    id: z.string().cuid().optional(),
    userName: z.string().optional().nullable(),
    displayName: z.string(),
    externalId: z.string(),
    sessions: z.lazy(() => SessionCreateNestedManyWithoutAuthorInputSchema).optional(),
    techniquesAdded: z.lazy(() => TechniqueCreateNestedManyWithoutCreatedByInputSchema).optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTagsAddedInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userName: z.string().optional().nullable(),
      displayName: z.string(),
      externalId: z.string(),
      sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
      techniquesAdded: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTagsAddedInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutTagsAddedInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutTagsAddedInputSchema),
      ]),
    })
    .strict();

export const TechniqueUpsertWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUpsertWithWhereUniqueWithoutTagsInput> =
  z
    .object({
      where: z.lazy(() => TechniqueWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TechniqueUpdateWithoutTagsInputSchema),
        z.lazy(() => TechniqueUncheckedUpdateWithoutTagsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TechniqueCreateWithoutTagsInputSchema),
        z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema),
      ]),
    })
    .strict();

export const TechniqueUpdateWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUpdateWithWhereUniqueWithoutTagsInput> =
  z
    .object({
      where: z.lazy(() => TechniqueWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TechniqueUpdateWithoutTagsInputSchema),
        z.lazy(() => TechniqueUncheckedUpdateWithoutTagsInputSchema),
      ]),
    })
    .strict();

export const TechniqueUpdateManyWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithWhereWithoutTagsInput> =
  z
    .object({
      where: z.lazy(() => TechniqueScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TechniqueUpdateManyMutationInputSchema),
        z.lazy(() => TechniqueUncheckedUpdateManyWithoutTagsInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserUpsertWithoutTagsAddedInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutTagsAddedInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutTagsAddedInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutTagsAddedInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutTagsAddedInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict();

export const UserUpdateToOneWithWhereWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTagsAddedInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutTagsAddedInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutTagsAddedInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserUpdateWithoutTagsAddedInput> = z
  .object({
    id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    displayName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    sessions: z.lazy(() => SessionUpdateManyWithoutAuthorNestedInputSchema).optional(),
    techniquesAdded: z.lazy(() => TechniqueUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  })
  .strict();

export const UserUncheckedUpdateWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTagsAddedInput> =
  z
    .object({
      id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      userName: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      displayName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
      techniquesAdded: z.lazy(() => TechniqueUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
    })
    .strict();

export const SessionCreateManyAuthorInputSchema: z.ZodType<Prisma.SessionCreateManyAuthorInput> = z
  .object({
    id: z.number().int().optional(),
    date: z.coerce.date(),
    time: z.string(),
    type: z.lazy(() => SessionTypeSchema),
    location: z.string().optional().nullable(),
    minutesLength: z.number().int(),
    intensity: z.lazy(() => IntensitySchema),
    notes: z.string().optional().nullable(),
    sparringTime: z.number().int().optional().nullable(),
    drillingTime: z.number().int().optional().nullable(),
    weight: z.number().int().optional().nullable(),
  })
  .strict();

export const TechniqueCreateManyCreatedByInputSchema: z.ZodType<Prisma.TechniqueCreateManyCreatedByInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    type: z.lazy(() => TechniqueTypeSchema),
    videoUrl: z.string().optional().nullable(),
    giOnly: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
  })
  .strict();

export const TagCreateManyCreatedByInputSchema: z.ZodType<Prisma.TagCreateManyCreatedByInput> = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
  })
  .strict();

export const SessionUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUpdateWithoutAuthorInput> = z
  .object({
    date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    time: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z
      .union([z.lazy(() => SessionTypeSchema), z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    location: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    minutesLength: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    intensity: z
      .union([z.lazy(() => IntensitySchema), z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema)])
      .optional(),
    notes: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    sparringTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    drillingTime: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    weight: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    techniques: z.lazy(() => SessionTechniqueUpdateManyWithoutSessionNestedInputSchema).optional(),
  })
  .strict();

export const SessionUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutAuthorInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      time: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      type: z
        .union([z.lazy(() => SessionTypeSchema), z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema)])
        .optional(),
      location: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      minutesLength: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      intensity: z
        .union([z.lazy(() => IntensitySchema), z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema)])
        .optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      sparringTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      weight: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      techniques: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutSessionNestedInputSchema).optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutAuthorInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      time: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      type: z
        .union([z.lazy(() => SessionTypeSchema), z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema)])
        .optional(),
      location: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      minutesLength: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      intensity: z
        .union([z.lazy(() => IntensitySchema), z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema)])
        .optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      sparringTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      weight: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const TechniqueUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUpdateWithoutCreatedByInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    type: z
      .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    videoUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    Session: z.lazy(() => SessionTechniqueUpdateManyWithoutTechniqueNestedInputSchema).optional(),
    tags: z.lazy(() => TagUpdateManyWithoutTechniquesNestedInputSchema).optional(),
  })
  .strict();

export const TechniqueUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateWithoutCreatedByInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      type: z
        .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
        .optional(),
      videoUrl: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
      createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      Session: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInputSchema).optional(),
      tags: z.lazy(() => TagUncheckedUpdateManyWithoutTechniquesNestedInputSchema).optional(),
    })
    .strict();

export const TechniqueUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutCreatedByInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      type: z
        .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
        .optional(),
      videoUrl: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
      createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict();

export const TagUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUpdateWithoutCreatedByInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    techniques: z.lazy(() => TechniqueUpdateManyWithoutTagsNestedInputSchema).optional(),
  })
  .strict();

export const TagUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutCreatedByInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      techniques: z.lazy(() => TechniqueUncheckedUpdateManyWithoutTagsNestedInputSchema).optional(),
    })
    .strict();

export const TagUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutCreatedByInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionTechniqueCreateManySessionInputSchema: z.ZodType<Prisma.SessionTechniqueCreateManySessionInput> = z
  .object({
    id: z.string().uuid().optional(),
    techniqueId: z.string(),
    notes: z.string().optional().nullable(),
    drillingTime: z.number().int().optional().nullable(),
  })
  .strict();

export const SessionTechniqueUpdateWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateWithoutSessionInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      technique: z.lazy(() => TechniqueUpdateOneRequiredWithoutSessionNestedInputSchema).optional(),
    })
    .strict();

export const SessionTechniqueUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateWithoutSessionInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      techniqueId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionTechniqueUncheckedUpdateManyWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateManyWithoutSessionInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      techniqueId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionTechniqueCreateManyTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueCreateManyTechniqueInput> =
  z
    .object({
      id: z.string().uuid().optional(),
      sessionId: z.number().int(),
      notes: z.string().optional().nullable(),
      drillingTime: z.number().int().optional().nullable(),
    })
    .strict();

export const SessionTechniqueUpdateWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateWithoutTechniqueInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      session: z.lazy(() => SessionUpdateOneRequiredWithoutTechniquesNestedInputSchema).optional(),
    })
    .strict();

export const SessionTechniqueUncheckedUpdateWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateWithoutTechniqueInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      sessionId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionTechniqueUncheckedUpdateManyWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateManyWithoutTechniqueInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      sessionId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      notes: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      drillingTime: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const TagUpdateWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUpdateWithoutTechniquesInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdBy: z.lazy(() => UserUpdateOneWithoutTagsAddedNestedInputSchema).optional(),
  })
  .strict();

export const TagUncheckedUpdateWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutTechniquesInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      userId: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const TagUncheckedUpdateManyWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutTechniquesInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      userId: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const TechniqueUpdateWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUpdateWithoutTagsInput> = z
  .object({
    id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    type: z
      .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
      .optional(),
    videoUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    Session: z.lazy(() => SessionTechniqueUpdateManyWithoutTechniqueNestedInputSchema).optional(),
    createdBy: z.lazy(() => UserUpdateOneWithoutTechniquesAddedNestedInputSchema).optional(),
  })
  .strict();

export const TechniqueUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateWithoutTagsInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      type: z
        .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
        .optional(),
      videoUrl: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
      createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      userId: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      Session: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInputSchema).optional(),
    })
    .strict();

export const TechniqueUncheckedUpdateManyWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutTagsInput> =
  z
    .object({
      id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      type: z
        .union([z.lazy(() => TechniqueTypeSchema), z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema)])
        .optional(),
      videoUrl: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      giOnly: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
      createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      userId: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema]).optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereInputSchema.optional(),
    orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
    cursor: SessionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereInputSchema.optional(),
    orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
    cursor: SessionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereInputSchema.optional(),
    orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
    cursor: SessionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
    orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
    cursor: SessionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
    orderBy: z
      .union([SessionOrderByWithAggregationInputSchema.array(), SessionOrderByWithAggregationInputSchema])
      .optional(),
    by: SessionScalarFieldEnumSchema.array(),
    having: SessionScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const TechniqueFindFirstArgsSchema: z.ZodType<Prisma.TechniqueFindFirstArgs> = z
  .object({
    select: TechniqueSelectSchema.optional(),
    include: TechniqueIncludeSchema.optional(),
    where: TechniqueWhereInputSchema.optional(),
    orderBy: z
      .union([TechniqueOrderByWithRelationInputSchema.array(), TechniqueOrderByWithRelationInputSchema])
      .optional(),
    cursor: TechniqueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TechniqueScalarFieldEnumSchema, TechniqueScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const TechniqueFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TechniqueFindFirstOrThrowArgs> = z
  .object({
    select: TechniqueSelectSchema.optional(),
    include: TechniqueIncludeSchema.optional(),
    where: TechniqueWhereInputSchema.optional(),
    orderBy: z
      .union([TechniqueOrderByWithRelationInputSchema.array(), TechniqueOrderByWithRelationInputSchema])
      .optional(),
    cursor: TechniqueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TechniqueScalarFieldEnumSchema, TechniqueScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const TechniqueFindManyArgsSchema: z.ZodType<Prisma.TechniqueFindManyArgs> = z
  .object({
    select: TechniqueSelectSchema.optional(),
    include: TechniqueIncludeSchema.optional(),
    where: TechniqueWhereInputSchema.optional(),
    orderBy: z
      .union([TechniqueOrderByWithRelationInputSchema.array(), TechniqueOrderByWithRelationInputSchema])
      .optional(),
    cursor: TechniqueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TechniqueScalarFieldEnumSchema, TechniqueScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const TechniqueAggregateArgsSchema: z.ZodType<Prisma.TechniqueAggregateArgs> = z
  .object({
    where: TechniqueWhereInputSchema.optional(),
    orderBy: z
      .union([TechniqueOrderByWithRelationInputSchema.array(), TechniqueOrderByWithRelationInputSchema])
      .optional(),
    cursor: TechniqueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TechniqueGroupByArgsSchema: z.ZodType<Prisma.TechniqueGroupByArgs> = z
  .object({
    where: TechniqueWhereInputSchema.optional(),
    orderBy: z
      .union([TechniqueOrderByWithAggregationInputSchema.array(), TechniqueOrderByWithAggregationInputSchema])
      .optional(),
    by: TechniqueScalarFieldEnumSchema.array(),
    having: TechniqueScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TechniqueFindUniqueArgsSchema: z.ZodType<Prisma.TechniqueFindUniqueArgs> = z
  .object({
    select: TechniqueSelectSchema.optional(),
    include: TechniqueIncludeSchema.optional(),
    where: TechniqueWhereUniqueInputSchema,
  })
  .strict();

export const TechniqueFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TechniqueFindUniqueOrThrowArgs> = z
  .object({
    select: TechniqueSelectSchema.optional(),
    include: TechniqueIncludeSchema.optional(),
    where: TechniqueWhereUniqueInputSchema,
  })
  .strict();

export const SessionTechniqueFindFirstArgsSchema: z.ZodType<Prisma.SessionTechniqueFindFirstArgs> = z
  .object({
    select: SessionTechniqueSelectSchema.optional(),
    include: SessionTechniqueIncludeSchema.optional(),
    where: SessionTechniqueWhereInputSchema.optional(),
    orderBy: z
      .union([SessionTechniqueOrderByWithRelationInputSchema.array(), SessionTechniqueOrderByWithRelationInputSchema])
      .optional(),
    cursor: SessionTechniqueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([SessionTechniqueScalarFieldEnumSchema, SessionTechniqueScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const SessionTechniqueFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionTechniqueFindFirstOrThrowArgs> = z
  .object({
    select: SessionTechniqueSelectSchema.optional(),
    include: SessionTechniqueIncludeSchema.optional(),
    where: SessionTechniqueWhereInputSchema.optional(),
    orderBy: z
      .union([SessionTechniqueOrderByWithRelationInputSchema.array(), SessionTechniqueOrderByWithRelationInputSchema])
      .optional(),
    cursor: SessionTechniqueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([SessionTechniqueScalarFieldEnumSchema, SessionTechniqueScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const SessionTechniqueFindManyArgsSchema: z.ZodType<Prisma.SessionTechniqueFindManyArgs> = z
  .object({
    select: SessionTechniqueSelectSchema.optional(),
    include: SessionTechniqueIncludeSchema.optional(),
    where: SessionTechniqueWhereInputSchema.optional(),
    orderBy: z
      .union([SessionTechniqueOrderByWithRelationInputSchema.array(), SessionTechniqueOrderByWithRelationInputSchema])
      .optional(),
    cursor: SessionTechniqueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([SessionTechniqueScalarFieldEnumSchema, SessionTechniqueScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const SessionTechniqueAggregateArgsSchema: z.ZodType<Prisma.SessionTechniqueAggregateArgs> = z
  .object({
    where: SessionTechniqueWhereInputSchema.optional(),
    orderBy: z
      .union([SessionTechniqueOrderByWithRelationInputSchema.array(), SessionTechniqueOrderByWithRelationInputSchema])
      .optional(),
    cursor: SessionTechniqueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SessionTechniqueGroupByArgsSchema: z.ZodType<Prisma.SessionTechniqueGroupByArgs> = z
  .object({
    where: SessionTechniqueWhereInputSchema.optional(),
    orderBy: z
      .union([
        SessionTechniqueOrderByWithAggregationInputSchema.array(),
        SessionTechniqueOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: SessionTechniqueScalarFieldEnumSchema.array(),
    having: SessionTechniqueScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SessionTechniqueFindUniqueArgsSchema: z.ZodType<Prisma.SessionTechniqueFindUniqueArgs> = z
  .object({
    select: SessionTechniqueSelectSchema.optional(),
    include: SessionTechniqueIncludeSchema.optional(),
    where: SessionTechniqueWhereUniqueInputSchema,
  })
  .strict();

export const SessionTechniqueFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionTechniqueFindUniqueOrThrowArgs> = z
  .object({
    select: SessionTechniqueSelectSchema.optional(),
    include: SessionTechniqueIncludeSchema.optional(),
    where: SessionTechniqueWhereUniqueInputSchema,
  })
  .strict();

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereInputSchema.optional(),
    orderBy: z.union([TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema]).optional(),
    cursor: TagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereInputSchema.optional(),
    orderBy: z.union([TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema]).optional(),
    cursor: TagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereInputSchema.optional(),
    orderBy: z.union([TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema]).optional(),
    cursor: TagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z
  .object({
    where: TagWhereInputSchema.optional(),
    orderBy: z.union([TagOrderByWithRelationInputSchema.array(), TagOrderByWithRelationInputSchema]).optional(),
    cursor: TagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z
  .object({
    where: TagWhereInputSchema.optional(),
    orderBy: z.union([TagOrderByWithAggregationInputSchema.array(), TagOrderByWithAggregationInputSchema]).optional(),
    by: TagScalarFieldEnumSchema.array(),
    having: TagScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereUniqueInputSchema,
  })
  .strict();

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereUniqueInputSchema,
  })
  .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([AddSessionInputSchema, SessionUncheckedCreateInputSchema]),
  })
  .strict();

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
    create: z.union([AddSessionInputSchema, SessionUncheckedCreateInputSchema]),
    update: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema]),
  })
  .strict();

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z
  .object({
    data: z.union([SessionCreateManyInputSchema, SessionCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema]),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z
  .object({
    data: z.union([SessionUpdateManyMutationInputSchema, SessionUncheckedUpdateManyInputSchema]),
    where: SessionWhereInputSchema.optional(),
  })
  .strict();

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
  })
  .strict();

export const TechniqueCreateArgsSchema: z.ZodType<Prisma.TechniqueCreateArgs> = z
  .object({
    select: TechniqueSelectSchema.optional(),
    include: TechniqueIncludeSchema.optional(),
    data: z.union([TechniqueCreateInputSchema, TechniqueUncheckedCreateInputSchema]),
  })
  .strict();

export const TechniqueUpsertArgsSchema: z.ZodType<Prisma.TechniqueUpsertArgs> = z
  .object({
    select: TechniqueSelectSchema.optional(),
    include: TechniqueIncludeSchema.optional(),
    where: TechniqueWhereUniqueInputSchema,
    create: z.union([TechniqueCreateInputSchema, TechniqueUncheckedCreateInputSchema]),
    update: z.union([TechniqueUpdateInputSchema, TechniqueUncheckedUpdateInputSchema]),
  })
  .strict();

export const TechniqueCreateManyArgsSchema: z.ZodType<Prisma.TechniqueCreateManyArgs> = z
  .object({
    data: z.union([TechniqueCreateManyInputSchema, TechniqueCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TechniqueDeleteArgsSchema: z.ZodType<Prisma.TechniqueDeleteArgs> = z
  .object({
    select: TechniqueSelectSchema.optional(),
    include: TechniqueIncludeSchema.optional(),
    where: TechniqueWhereUniqueInputSchema,
  })
  .strict();

export const TechniqueUpdateArgsSchema: z.ZodType<Prisma.TechniqueUpdateArgs> = z
  .object({
    select: TechniqueSelectSchema.optional(),
    include: TechniqueIncludeSchema.optional(),
    data: z.union([TechniqueUpdateInputSchema, TechniqueUncheckedUpdateInputSchema]),
    where: TechniqueWhereUniqueInputSchema,
  })
  .strict();

export const TechniqueUpdateManyArgsSchema: z.ZodType<Prisma.TechniqueUpdateManyArgs> = z
  .object({
    data: z.union([TechniqueUpdateManyMutationInputSchema, TechniqueUncheckedUpdateManyInputSchema]),
    where: TechniqueWhereInputSchema.optional(),
  })
  .strict();

export const TechniqueDeleteManyArgsSchema: z.ZodType<Prisma.TechniqueDeleteManyArgs> = z
  .object({
    where: TechniqueWhereInputSchema.optional(),
  })
  .strict();

export const SessionTechniqueCreateArgsSchema: z.ZodType<Prisma.SessionTechniqueCreateArgs> = z
  .object({
    select: SessionTechniqueSelectSchema.optional(),
    include: SessionTechniqueIncludeSchema.optional(),
    data: z.union([SessionTechniqueCreateInputSchema, SessionTechniqueUncheckedCreateInputSchema]),
  })
  .strict();

export const SessionTechniqueUpsertArgsSchema: z.ZodType<Prisma.SessionTechniqueUpsertArgs> = z
  .object({
    select: SessionTechniqueSelectSchema.optional(),
    include: SessionTechniqueIncludeSchema.optional(),
    where: SessionTechniqueWhereUniqueInputSchema,
    create: z.union([SessionTechniqueCreateInputSchema, SessionTechniqueUncheckedCreateInputSchema]),
    update: z.union([SessionTechniqueUpdateInputSchema, SessionTechniqueUncheckedUpdateInputSchema]),
  })
  .strict();

export const SessionTechniqueCreateManyArgsSchema: z.ZodType<Prisma.SessionTechniqueCreateManyArgs> = z
  .object({
    data: z.union([SessionTechniqueCreateManyInputSchema, SessionTechniqueCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const SessionTechniqueDeleteArgsSchema: z.ZodType<Prisma.SessionTechniqueDeleteArgs> = z
  .object({
    select: SessionTechniqueSelectSchema.optional(),
    include: SessionTechniqueIncludeSchema.optional(),
    where: SessionTechniqueWhereUniqueInputSchema,
  })
  .strict();

export const SessionTechniqueUpdateArgsSchema: z.ZodType<Prisma.SessionTechniqueUpdateArgs> = z
  .object({
    select: SessionTechniqueSelectSchema.optional(),
    include: SessionTechniqueIncludeSchema.optional(),
    data: z.union([SessionTechniqueUpdateInputSchema, SessionTechniqueUncheckedUpdateInputSchema]),
    where: SessionTechniqueWhereUniqueInputSchema,
  })
  .strict();

export const SessionTechniqueUpdateManyArgsSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyArgs> = z
  .object({
    data: z.union([SessionTechniqueUpdateManyMutationInputSchema, SessionTechniqueUncheckedUpdateManyInputSchema]),
    where: SessionTechniqueWhereInputSchema.optional(),
  })
  .strict();

export const SessionTechniqueDeleteManyArgsSchema: z.ZodType<Prisma.SessionTechniqueDeleteManyArgs> = z
  .object({
    where: SessionTechniqueWhereInputSchema.optional(),
  })
  .strict();

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    data: z.union([TagCreateInputSchema, TagUncheckedCreateInputSchema]),
  })
  .strict();

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereUniqueInputSchema,
    create: z.union([TagCreateInputSchema, TagUncheckedCreateInputSchema]),
    update: z.union([TagUpdateInputSchema, TagUncheckedUpdateInputSchema]),
  })
  .strict();

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z
  .object({
    data: z.union([TagCreateManyInputSchema, TagCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereUniqueInputSchema,
  })
  .strict();

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    data: z.union([TagUpdateInputSchema, TagUncheckedUpdateInputSchema]),
    where: TagWhereUniqueInputSchema,
  })
  .strict();

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z
  .object({
    data: z.union([TagUpdateManyMutationInputSchema, TagUncheckedUpdateManyInputSchema]),
    where: TagWhereInputSchema.optional(),
  })
  .strict();

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z
  .object({
    where: TagWhereInputSchema.optional(),
  })
  .strict();
