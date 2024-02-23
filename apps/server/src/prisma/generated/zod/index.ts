import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','userName','displayName','externalId']);

export const SessionScalarFieldEnumSchema = z.enum(['id','date','time','type','location','minutesLength','intensity','notes','sparringTime','drillingTime','authorId','weight']);

export const TechniqueScalarFieldEnumSchema = z.enum(['id','name']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const SessionTypeSchema = z.enum(['GI','NO_GI','GYM','YOGA','MMA','BOXING','RUN','SWIM','BIKE','MEDITATION','OTHER']);

export type SessionTypeType = `${z.infer<typeof SessionTypeSchema>}`

export const IntensitySchema = z.enum(['LIGHT','MODERATE','HIGH','VERY_HIGH']);

export type IntensityType = `${z.infer<typeof IntensitySchema>}`

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
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  type: SessionTypeSchema,
  intensity: IntensitySchema,
  id: z.number().int(),
  date: z.coerce.date(),
  time: z.string().nullable(),
  location: z.string().nullable(),
  minutesLength: z.number().int(),
  notes: z.string().nullable(),
  sparringTime: z.number().int().nullable(),
  drillingTime: z.number().int().nullable(),
  authorId: z.string(),
  weight: z.number().int().nullable(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// TECHNIQUE SCHEMA
/////////////////////////////////////////

export const TechniqueSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Technique = z.infer<typeof TechniqueSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  sessions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  userName: z.boolean().optional(),
  displayName: z.boolean().optional(),
  externalId: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  techniques: z.union([z.boolean(),z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionCountOutputTypeArgsSchema: z.ZodType<Prisma.SessionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SessionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SessionCountOutputTypeSelectSchema: z.ZodType<Prisma.SessionCountOutputTypeSelect> = z.object({
  techniques: z.boolean().optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
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
  techniques: z.union([z.boolean(),z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TECHNIQUE
//------------------------------------------------------

export const TechniqueIncludeSchema: z.ZodType<Prisma.TechniqueInclude> = z.object({
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TechniqueCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TechniqueArgsSchema: z.ZodType<Prisma.TechniqueDefaultArgs> = z.object({
  select: z.lazy(() => TechniqueSelectSchema).optional(),
  include: z.lazy(() => TechniqueIncludeSchema).optional(),
}).strict();

export const TechniqueCountOutputTypeArgsSchema: z.ZodType<Prisma.TechniqueCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TechniqueCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TechniqueCountOutputTypeSelectSchema: z.ZodType<Prisma.TechniqueCountOutputTypeSelect> = z.object({
  sessions: z.boolean().optional(),
}).strict();

export const TechniqueSelectSchema: z.ZodType<Prisma.TechniqueSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TechniqueCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  displayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  externalId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    externalId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    externalId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  externalId: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  userName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  displayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  displayName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  externalId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumSessionTypeFilterSchema),z.lazy(() => SessionTypeSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  minutesLength: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  intensity: z.union([ z.lazy(() => EnumIntensityFilterSchema),z.lazy(() => IntensitySchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sparringTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  drillingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueListRelationFilterSchema).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  time: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minutesLength: z.lazy(() => SortOrderSchema).optional(),
  intensity: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sparringTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  drillingTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  techniques: z.lazy(() => TechniqueOrderByRelationAggregateInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumSessionTypeFilterSchema),z.lazy(() => SessionTypeSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  minutesLength: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  intensity: z.union([ z.lazy(() => EnumIntensityFilterSchema),z.lazy(() => IntensitySchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sparringTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  drillingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueListRelationFilterSchema).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  time: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minutesLength: z.lazy(() => SortOrderSchema).optional(),
  intensity: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sparringTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  drillingTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SessionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SessionSumOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  time: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumSessionTypeWithAggregatesFilterSchema),z.lazy(() => SessionTypeSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  minutesLength: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  intensity: z.union([ z.lazy(() => EnumIntensityWithAggregatesFilterSchema),z.lazy(() => IntensitySchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sparringTime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  drillingTime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const TechniqueWhereInputSchema: z.ZodType<Prisma.TechniqueWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TechniqueWhereInputSchema),z.lazy(() => TechniqueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechniqueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechniqueWhereInputSchema),z.lazy(() => TechniqueWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict();

export const TechniqueOrderByWithRelationInputSchema: z.ZodType<Prisma.TechniqueOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TechniqueWhereUniqueInputSchema: z.ZodType<Prisma.TechniqueWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => TechniqueWhereInputSchema),z.lazy(() => TechniqueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechniqueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechniqueWhereInputSchema),z.lazy(() => TechniqueWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict());

export const TechniqueOrderByWithAggregationInputSchema: z.ZodType<Prisma.TechniqueOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TechniqueCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TechniqueAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TechniqueMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TechniqueMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TechniqueSumOrderByAggregateInputSchema).optional()
}).strict();

export const TechniqueScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TechniqueScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema),z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema),z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  date: z.coerce.date(),
  time: z.string().optional().nullable(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  weight: z.number().int().optional().nullable(),
  techniques: z.lazy(() => TechniqueCreateNestedManyWithoutSessionsInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  time: z.string().optional().nullable(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  authorId: z.string(),
  weight: z.number().int().optional().nullable(),
  techniques: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueUpdateManyWithoutSessionsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueUncheckedUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  time: z.string().optional().nullable(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  authorId: z.string(),
  weight: z.number().int().optional().nullable()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TechniqueCreateInputSchema: z.ZodType<Prisma.TechniqueCreateInput> = z.object({
  name: z.string(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutTechniquesInputSchema).optional()
}).strict();

export const TechniqueUncheckedCreateInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutTechniquesInputSchema).optional()
}).strict();

export const TechniqueUpdateInputSchema: z.ZodType<Prisma.TechniqueUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutTechniquesNestedInputSchema).optional()
}).strict();

export const TechniqueUncheckedUpdateInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutTechniquesNestedInputSchema).optional()
}).strict();

export const TechniqueCreateManyInputSchema: z.ZodType<Prisma.TechniqueCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const TechniqueUpdateManyMutationInputSchema: z.ZodType<Prisma.TechniqueUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechniqueUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const EnumSessionTypeFilterSchema: z.ZodType<Prisma.EnumSessionTypeFilter> = z.object({
  equals: z.lazy(() => SessionTypeSchema).optional(),
  in: z.lazy(() => SessionTypeSchema).array().optional(),
  notIn: z.lazy(() => SessionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => NestedEnumSessionTypeFilterSchema) ]).optional(),
}).strict();

export const EnumIntensityFilterSchema: z.ZodType<Prisma.EnumIntensityFilter> = z.object({
  equals: z.lazy(() => IntensitySchema).optional(),
  in: z.lazy(() => IntensitySchema).array().optional(),
  notIn: z.lazy(() => IntensitySchema).array().optional(),
  not: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => NestedEnumIntensityFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const TechniqueListRelationFilterSchema: z.ZodType<Prisma.TechniqueListRelationFilter> = z.object({
  every: z.lazy(() => TechniqueWhereInputSchema).optional(),
  some: z.lazy(() => TechniqueWhereInputSchema).optional(),
  none: z.lazy(() => TechniqueWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const TechniqueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TechniqueOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
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
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SessionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  minutesLength: z.lazy(() => SortOrderSchema).optional(),
  sparringTime: z.lazy(() => SortOrderSchema).optional(),
  drillingTime: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
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
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
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
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SessionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  minutesLength: z.lazy(() => SortOrderSchema).optional(),
  sparringTime: z.lazy(() => SortOrderSchema).optional(),
  drillingTime: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumSessionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSessionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SessionTypeSchema).optional(),
  in: z.lazy(() => SessionTypeSchema).array().optional(),
  notIn: z.lazy(() => SessionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => NestedEnumSessionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSessionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSessionTypeFilterSchema).optional()
}).strict();

export const EnumIntensityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumIntensityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IntensitySchema).optional(),
  in: z.lazy(() => IntensitySchema).array().optional(),
  notIn: z.lazy(() => IntensitySchema).array().optional(),
  not: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => NestedEnumIntensityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIntensityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIntensityFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const TechniqueCountOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechniqueAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechniqueMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechniqueMinOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechniqueSumOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutAuthorInputSchema),z.lazy(() => SessionCreateWithoutAuthorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutAuthorInputSchema),z.lazy(() => SessionCreateWithoutAuthorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const SessionUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutAuthorInputSchema),z.lazy(() => SessionCreateWithoutAuthorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutAuthorInputSchema),z.lazy(() => SessionCreateWithoutAuthorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TechniqueCreateNestedManyWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueCreateNestedManyWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutSessionsInputSchema),z.lazy(() => TechniqueCreateWithoutSessionsInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TechniqueUncheckedCreateNestedManyWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateNestedManyWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutSessionsInputSchema),z.lazy(() => TechniqueCreateWithoutSessionsInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const EnumSessionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSessionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SessionTypeSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumIntensityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumIntensityFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => IntensitySchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const TechniqueUpdateManyWithoutSessionsNestedInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutSessionsInputSchema),z.lazy(() => TechniqueCreateWithoutSessionsInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechniqueUpdateManyWithWhereWithoutSessionsInputSchema),z.lazy(() => TechniqueUpdateManyWithWhereWithoutSessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const TechniqueUncheckedUpdateManyWithoutSessionsNestedInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutSessionsInputSchema),z.lazy(() => TechniqueCreateWithoutSessionsInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutSessionsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutSessionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutSessionsInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutSessionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutSessionsInputSchema),z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutSessionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechniqueUpdateManyWithWhereWithoutSessionsInputSchema),z.lazy(() => TechniqueUpdateManyWithWhereWithoutSessionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutTechniquesInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutTechniquesInputSchema),z.lazy(() => SessionCreateWithoutTechniquesInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema),z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutTechniquesInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutTechniquesInputSchema),z.lazy(() => SessionCreateWithoutTechniquesInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema),z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutTechniquesNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutTechniquesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutTechniquesInputSchema),z.lazy(() => SessionCreateWithoutTechniquesInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema),z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutTechniquesInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutTechniquesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutTechniquesInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutTechniquesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutTechniquesInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutTechniquesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutTechniquesNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutTechniquesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutTechniquesInputSchema),z.lazy(() => SessionCreateWithoutTechniquesInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema),z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutTechniquesInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutTechniquesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutTechniquesInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutTechniquesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutTechniquesInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutTechniquesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSessionTypeFilterSchema: z.ZodType<Prisma.NestedEnumSessionTypeFilter> = z.object({
  equals: z.lazy(() => SessionTypeSchema).optional(),
  in: z.lazy(() => SessionTypeSchema).array().optional(),
  notIn: z.lazy(() => SessionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => NestedEnumSessionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumIntensityFilterSchema: z.ZodType<Prisma.NestedEnumIntensityFilter> = z.object({
  equals: z.lazy(() => IntensitySchema).optional(),
  in: z.lazy(() => IntensitySchema).array().optional(),
  notIn: z.lazy(() => IntensitySchema).array().optional(),
  not: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => NestedEnumIntensityFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumSessionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSessionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SessionTypeSchema).optional(),
  in: z.lazy(() => SessionTypeSchema).array().optional(),
  notIn: z.lazy(() => SessionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => NestedEnumSessionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSessionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSessionTypeFilterSchema).optional()
}).strict();

export const NestedEnumIntensityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumIntensityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IntensitySchema).optional(),
  in: z.lazy(() => IntensitySchema).array().optional(),
  notIn: z.lazy(() => IntensitySchema).array().optional(),
  not: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => NestedEnumIntensityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIntensityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIntensityFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionCreateWithoutAuthorInput> = z.object({
  date: z.coerce.date(),
  time: z.string().optional().nullable(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  weight: z.number().int().optional().nullable(),
  techniques: z.lazy(() => TechniqueCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const SessionUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  time: z.string().optional().nullable(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  weight: z.number().int().optional().nullable(),
  techniques: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutSessionsInputSchema).optional()
}).strict();

export const SessionCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const SessionCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyAuthorInputSchema),z.lazy(() => SessionCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumSessionTypeFilterSchema),z.lazy(() => SessionTypeSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  minutesLength: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  intensity: z.union([ z.lazy(() => EnumIntensityFilterSchema),z.lazy(() => IntensitySchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sparringTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  drillingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const TechniqueCreateWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueCreateWithoutSessionsInput> = z.object({
  name: z.string()
}).strict();

export const TechniqueUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const TechniqueCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TechniqueCreateWithoutSessionsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const TechniqueUpsertWithWhereUniqueWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueUpsertWithWhereUniqueWithoutSessionsInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TechniqueUpdateWithoutSessionsInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => TechniqueCreateWithoutSessionsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const TechniqueUpdateWithWhereUniqueWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueUpdateWithWhereUniqueWithoutSessionsInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TechniqueUpdateWithoutSessionsInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const TechniqueUpdateManyWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => TechniqueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TechniqueUpdateManyMutationInputSchema),z.lazy(() => TechniqueUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export const TechniqueScalarWhereInputSchema: z.ZodType<Prisma.TechniqueScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechniqueScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionCreateWithoutTechniquesInput> = z.object({
  date: z.coerce.date(),
  time: z.string().optional().nullable(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  weight: z.number().int().optional().nullable(),
  author: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutTechniquesInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  time: z.string().optional().nullable(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  authorId: z.string(),
  weight: z.number().int().optional().nullable()
}).strict();

export const SessionCreateOrConnectWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutTechniquesInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema) ]),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutTechniquesInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutTechniquesInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutTechniquesInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutTechniquesInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutTechniquesInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutTechniquesInputSchema) ]),
}).strict();

export const SessionCreateManyAuthorInputSchema: z.ZodType<Prisma.SessionCreateManyAuthorInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  time: z.string().optional().nullable(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  weight: z.number().int().optional().nullable()
}).strict();

export const SessionUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUpdateWithoutAuthorInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueUncheckedUpdateManyWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TechniqueUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueUpdateWithoutSessionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechniqueUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechniqueUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUpdateWithoutTechniquesInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutTechniquesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutTechniquesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const TechniqueFindFirstArgsSchema: z.ZodType<Prisma.TechniqueFindFirstArgs> = z.object({
  select: TechniqueSelectSchema.optional(),
  include: TechniqueIncludeSchema.optional(),
  where: TechniqueWhereInputSchema.optional(),
  orderBy: z.union([ TechniqueOrderByWithRelationInputSchema.array(),TechniqueOrderByWithRelationInputSchema ]).optional(),
  cursor: TechniqueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TechniqueScalarFieldEnumSchema,TechniqueScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TechniqueFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TechniqueFindFirstOrThrowArgs> = z.object({
  select: TechniqueSelectSchema.optional(),
  include: TechniqueIncludeSchema.optional(),
  where: TechniqueWhereInputSchema.optional(),
  orderBy: z.union([ TechniqueOrderByWithRelationInputSchema.array(),TechniqueOrderByWithRelationInputSchema ]).optional(),
  cursor: TechniqueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TechniqueScalarFieldEnumSchema,TechniqueScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TechniqueFindManyArgsSchema: z.ZodType<Prisma.TechniqueFindManyArgs> = z.object({
  select: TechniqueSelectSchema.optional(),
  include: TechniqueIncludeSchema.optional(),
  where: TechniqueWhereInputSchema.optional(),
  orderBy: z.union([ TechniqueOrderByWithRelationInputSchema.array(),TechniqueOrderByWithRelationInputSchema ]).optional(),
  cursor: TechniqueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TechniqueScalarFieldEnumSchema,TechniqueScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TechniqueAggregateArgsSchema: z.ZodType<Prisma.TechniqueAggregateArgs> = z.object({
  where: TechniqueWhereInputSchema.optional(),
  orderBy: z.union([ TechniqueOrderByWithRelationInputSchema.array(),TechniqueOrderByWithRelationInputSchema ]).optional(),
  cursor: TechniqueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TechniqueGroupByArgsSchema: z.ZodType<Prisma.TechniqueGroupByArgs> = z.object({
  where: TechniqueWhereInputSchema.optional(),
  orderBy: z.union([ TechniqueOrderByWithAggregationInputSchema.array(),TechniqueOrderByWithAggregationInputSchema ]).optional(),
  by: TechniqueScalarFieldEnumSchema.array(),
  having: TechniqueScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TechniqueFindUniqueArgsSchema: z.ZodType<Prisma.TechniqueFindUniqueArgs> = z.object({
  select: TechniqueSelectSchema.optional(),
  include: TechniqueIncludeSchema.optional(),
  where: TechniqueWhereUniqueInputSchema,
}).strict() ;

export const TechniqueFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TechniqueFindUniqueOrThrowArgs> = z.object({
  select: TechniqueSelectSchema.optional(),
  include: TechniqueIncludeSchema.optional(),
  where: TechniqueWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const TechniqueCreateArgsSchema: z.ZodType<Prisma.TechniqueCreateArgs> = z.object({
  select: TechniqueSelectSchema.optional(),
  include: TechniqueIncludeSchema.optional(),
  data: z.union([ TechniqueCreateInputSchema,TechniqueUncheckedCreateInputSchema ]),
}).strict() ;

export const TechniqueUpsertArgsSchema: z.ZodType<Prisma.TechniqueUpsertArgs> = z.object({
  select: TechniqueSelectSchema.optional(),
  include: TechniqueIncludeSchema.optional(),
  where: TechniqueWhereUniqueInputSchema,
  create: z.union([ TechniqueCreateInputSchema,TechniqueUncheckedCreateInputSchema ]),
  update: z.union([ TechniqueUpdateInputSchema,TechniqueUncheckedUpdateInputSchema ]),
}).strict() ;

export const TechniqueCreateManyArgsSchema: z.ZodType<Prisma.TechniqueCreateManyArgs> = z.object({
  data: z.union([ TechniqueCreateManyInputSchema,TechniqueCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TechniqueDeleteArgsSchema: z.ZodType<Prisma.TechniqueDeleteArgs> = z.object({
  select: TechniqueSelectSchema.optional(),
  include: TechniqueIncludeSchema.optional(),
  where: TechniqueWhereUniqueInputSchema,
}).strict() ;

export const TechniqueUpdateArgsSchema: z.ZodType<Prisma.TechniqueUpdateArgs> = z.object({
  select: TechniqueSelectSchema.optional(),
  include: TechniqueIncludeSchema.optional(),
  data: z.union([ TechniqueUpdateInputSchema,TechniqueUncheckedUpdateInputSchema ]),
  where: TechniqueWhereUniqueInputSchema,
}).strict() ;

export const TechniqueUpdateManyArgsSchema: z.ZodType<Prisma.TechniqueUpdateManyArgs> = z.object({
  data: z.union([ TechniqueUpdateManyMutationInputSchema,TechniqueUncheckedUpdateManyInputSchema ]),
  where: TechniqueWhereInputSchema.optional(),
}).strict() ;

export const TechniqueDeleteManyArgsSchema: z.ZodType<Prisma.TechniqueDeleteManyArgs> = z.object({
  where: TechniqueWhereInputSchema.optional(),
}).strict() ;