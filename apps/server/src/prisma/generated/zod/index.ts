import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','userName','displayName','externalId','currentLevel']);

export const TagScalarFieldEnumSchema = z.enum(['id','name','description','userId']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','slug','description','icon','type','parentId','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['id','date','time','type','location','minutesLength','intensity','notes','sparringTime','drillingTime','authorId','weight']);

export const TechniqueScalarFieldEnumSchema = z.enum(['id','name','description','type','videoUrl','giOnly','createdAt','userId','recommendedBelts','categoryId']);

export const SessionTechniqueScalarFieldEnumSchema = z.enum(['id','sessionId','techniqueId','notes','drillingTime']);

export const GoalScalarFieldEnumSchema = z.enum(['id','name','slug','description','parentId','isMilestone','currentProgress','weight','difficulty','suggestedLevels','createdAt','updatedAt','tagId']);

export const RequirementScalarFieldEnumSchema = z.enum(['id','goalId','type','description','targetCount','targetMinutes','completed','createdAt']);

export const AchievementScalarFieldEnumSchema = z.enum(['id','name','description','tier','criteriaId','userId','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const BeltsSchema = z.enum(['WHITE','BLUE','PURPLE','BROWN','BLACK']);

export type BeltsType = `${z.infer<typeof BeltsSchema>}`

export const DifficultyLevelSchema = z.enum(['FOUNDATIONAL','DEVELOPING','ADVANCED','EXPERT']);

export type DifficultyLevelType = `${z.infer<typeof DifficultyLevelSchema>}`

export const SessionTypeSchema = z.enum(['GI','NO_GI','GYM','YOGA','MMA','BOXING','RUN','SWIM','BIKE','MEDITATION','OTHER']);

export type SessionTypeType = `${z.infer<typeof SessionTypeSchema>}`

export const IntensitySchema = z.enum(['LIGHT','MODERATE','HIGH','VERY_HIGH']);

export type IntensityType = `${z.infer<typeof IntensitySchema>}`

export const TechniqueTypeSchema = z.enum(['CHOKE','TAKEDOWN','JOINT_LOCK','SWEEP','ESCAPE','TRANSITION','GUARD','GUARD_PASS','CONTROL','DEFENCE','POSITION','SUBMISSION']);

export type TechniqueTypeType = `${z.infer<typeof TechniqueTypeSchema>}`

export const AchievementTierSchema = z.enum(['BRONZE','SILVER','GOLD','PLATINUM']);

export type AchievementTierType = `${z.infer<typeof AchievementTierSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  currentLevel: BeltsSchema,
  id: z.string().cuid(),
  userName: z.string().nullable(),
  displayName: z.string(),
  externalId: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  userId: z.string().nullable(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  type: z.string(),
  parentId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  type: SessionTypeSchema,
  intensity: IntensitySchema,
  id: z.number().int(),
  date: z.coerce.date().nullable(),
  time: z.string(),
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
  type: TechniqueTypeSchema,
  recommendedBelts: BeltsSchema.nullable(),
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  videoUrl: z.string().nullable(),
  giOnly: z.boolean(),
  createdAt: z.coerce.date(),
  userId: z.string().nullable(),
  categoryId: z.string().nullable(),
})

export type Technique = z.infer<typeof TechniqueSchema>

/////////////////////////////////////////
// SESSION TECHNIQUE SCHEMA
/////////////////////////////////////////

export const SessionTechniqueSchema = z.object({
  id: z.string().uuid(),
  sessionId: z.number().int(),
  techniqueId: z.string(),
  notes: z.string().nullable(),
  drillingTime: z.number().int().nullable(),
})

export type SessionTechnique = z.infer<typeof SessionTechniqueSchema>

/////////////////////////////////////////
// GOAL SCHEMA
/////////////////////////////////////////

export const GoalSchema = z.object({
  difficulty: DifficultyLevelSchema,
  suggestedLevels: BeltsSchema,
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  parentId: z.string().nullable(),
  isMilestone: z.boolean(),
  currentProgress: z.number().int(),
  weight: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  tagId: z.string().nullable(),
})

export type Goal = z.infer<typeof GoalSchema>

/////////////////////////////////////////
// REQUIREMENT SCHEMA
/////////////////////////////////////////

export const RequirementSchema = z.object({
  id: z.string().uuid(),
  goalId: z.string(),
  type: z.string(),
  description: z.string(),
  targetCount: z.number().int().nullable(),
  targetMinutes: z.number().int().nullable(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
})

export type Requirement = z.infer<typeof RequirementSchema>

/////////////////////////////////////////
// ACHIEVEMENT SCHEMA
/////////////////////////////////////////

export const AchievementSchema = z.object({
  tier: AchievementTierSchema,
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  criteriaId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
})

export type Achievement = z.infer<typeof AchievementSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  techniquesAdded: z.union([z.boolean(),z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
  tagsAdded: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
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
  techniquesAdded: z.boolean().optional(),
  tagsAdded: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  userName: z.boolean().optional(),
  displayName: z.boolean().optional(),
  externalId: z.boolean().optional(),
  currentLevel: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  techniquesAdded: z.union([z.boolean(),z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
  tagsAdded: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  techniques: z.union([z.boolean(),z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Goal: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  techniques: z.boolean().optional(),
  Goal: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  userId: z.boolean().optional(),
  techniques: z.union([z.boolean(),z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Goal: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  parent: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  subcategories: z.union([z.boolean(),z.lazy(() => CategoryFindManyArgsSchema)]).optional(),
  goals: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  Technique: z.union([z.boolean(),z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  subcategories: z.boolean().optional(),
  goals: z.boolean().optional(),
  Technique: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  description: z.boolean().optional(),
  icon: z.boolean().optional(),
  type: z.boolean().optional(),
  parentId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  parent: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  subcategories: z.union([z.boolean(),z.lazy(() => CategoryFindManyArgsSchema)]).optional(),
  goals: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  Technique: z.union([z.boolean(),z.lazy(() => TechniqueFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  techniques: z.union([z.boolean(),z.lazy(() => SessionTechniqueFindManyArgsSchema)]).optional(),
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
  techniques: z.union([z.boolean(),z.lazy(() => SessionTechniqueFindManyArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SessionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TECHNIQUE
//------------------------------------------------------

export const TechniqueIncludeSchema: z.ZodType<Prisma.TechniqueInclude> = z.object({
  Session: z.union([z.boolean(),z.lazy(() => SessionTechniqueFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
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
  Session: z.boolean().optional(),
  tags: z.boolean().optional(),
}).strict();

export const TechniqueSelectSchema: z.ZodType<Prisma.TechniqueSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  type: z.boolean().optional(),
  videoUrl: z.boolean().optional(),
  giOnly: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  recommendedBelts: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionTechniqueFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TechniqueCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION TECHNIQUE
//------------------------------------------------------

export const SessionTechniqueIncludeSchema: z.ZodType<Prisma.SessionTechniqueInclude> = z.object({
  session: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  technique: z.union([z.boolean(),z.lazy(() => TechniqueArgsSchema)]).optional(),
}).strict()

export const SessionTechniqueArgsSchema: z.ZodType<Prisma.SessionTechniqueDefaultArgs> = z.object({
  select: z.lazy(() => SessionTechniqueSelectSchema).optional(),
  include: z.lazy(() => SessionTechniqueIncludeSchema).optional(),
}).strict();

export const SessionTechniqueSelectSchema: z.ZodType<Prisma.SessionTechniqueSelect> = z.object({
  id: z.boolean().optional(),
  sessionId: z.boolean().optional(),
  techniqueId: z.boolean().optional(),
  notes: z.boolean().optional(),
  drillingTime: z.boolean().optional(),
  session: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  technique: z.union([z.boolean(),z.lazy(() => TechniqueArgsSchema)]).optional(),
}).strict()

// GOAL
//------------------------------------------------------

export const GoalIncludeSchema: z.ZodType<Prisma.GoalInclude> = z.object({
  parent: z.union([z.boolean(),z.lazy(() => GoalArgsSchema)]).optional(),
  subgoals: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  categories: z.union([z.boolean(),z.lazy(() => CategoryFindManyArgsSchema)]).optional(),
  requirements: z.union([z.boolean(),z.lazy(() => RequirementFindManyArgsSchema)]).optional(),
  Tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GoalCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GoalArgsSchema: z.ZodType<Prisma.GoalDefaultArgs> = z.object({
  select: z.lazy(() => GoalSelectSchema).optional(),
  include: z.lazy(() => GoalIncludeSchema).optional(),
}).strict();

export const GoalCountOutputTypeArgsSchema: z.ZodType<Prisma.GoalCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GoalCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GoalCountOutputTypeSelectSchema: z.ZodType<Prisma.GoalCountOutputTypeSelect> = z.object({
  subgoals: z.boolean().optional(),
  categories: z.boolean().optional(),
  requirements: z.boolean().optional(),
}).strict();

export const GoalSelectSchema: z.ZodType<Prisma.GoalSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  description: z.boolean().optional(),
  parentId: z.boolean().optional(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.boolean().optional(),
  weight: z.boolean().optional(),
  difficulty: z.boolean().optional(),
  suggestedLevels: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tagId: z.boolean().optional(),
  parent: z.union([z.boolean(),z.lazy(() => GoalArgsSchema)]).optional(),
  subgoals: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  categories: z.union([z.boolean(),z.lazy(() => CategoryFindManyArgsSchema)]).optional(),
  requirements: z.union([z.boolean(),z.lazy(() => RequirementFindManyArgsSchema)]).optional(),
  Tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GoalCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REQUIREMENT
//------------------------------------------------------

export const RequirementIncludeSchema: z.ZodType<Prisma.RequirementInclude> = z.object({
  goal: z.union([z.boolean(),z.lazy(() => GoalArgsSchema)]).optional(),
}).strict()

export const RequirementArgsSchema: z.ZodType<Prisma.RequirementDefaultArgs> = z.object({
  select: z.lazy(() => RequirementSelectSchema).optional(),
  include: z.lazy(() => RequirementIncludeSchema).optional(),
}).strict();

export const RequirementSelectSchema: z.ZodType<Prisma.RequirementSelect> = z.object({
  id: z.boolean().optional(),
  goalId: z.boolean().optional(),
  type: z.boolean().optional(),
  description: z.boolean().optional(),
  targetCount: z.boolean().optional(),
  targetMinutes: z.boolean().optional(),
  completed: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  goal: z.union([z.boolean(),z.lazy(() => GoalArgsSchema)]).optional(),
}).strict()

// ACHIEVEMENT
//------------------------------------------------------

export const AchievementSelectSchema: z.ZodType<Prisma.AchievementSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  tier: z.boolean().optional(),
  criteriaId: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
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
  currentLevel: z.union([ z.lazy(() => EnumBeltsFilterSchema),z.lazy(() => BeltsSchema) ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueListRelationFilterSchema).optional(),
  tagsAdded: z.lazy(() => TagListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  currentLevel: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueOrderByRelationAggregateInputSchema).optional(),
  tagsAdded: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional()
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
  currentLevel: z.union([ z.lazy(() => EnumBeltsFilterSchema),z.lazy(() => BeltsSchema) ]).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueListRelationFilterSchema).optional(),
  tagsAdded: z.lazy(() => TagListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  currentLevel: z.lazy(() => SortOrderSchema).optional(),
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
  currentLevel: z.union([ z.lazy(() => EnumBeltsWithAggregatesFilterSchema),z.lazy(() => BeltsSchema) ]).optional(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueListRelationFilterSchema).optional(),
  createdBy: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  Goal: z.lazy(() => GoalListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  techniques: z.lazy(() => TechniqueOrderByRelationAggregateInputSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Goal: z.lazy(() => GoalOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueListRelationFilterSchema).optional(),
  createdBy: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  Goal: z.lazy(() => GoalListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  icon: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  parent: z.union([ z.lazy(() => CategoryNullableRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
  subcategories: z.lazy(() => CategoryListRelationFilterSchema).optional(),
  goals: z.lazy(() => GoalListRelationFilterSchema).optional(),
  Technique: z.lazy(() => TechniqueListRelationFilterSchema).optional()
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  icon: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  parent: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional(),
  subcategories: z.lazy(() => CategoryOrderByRelationAggregateInputSchema).optional(),
  goals: z.lazy(() => GoalOrderByRelationAggregateInputSchema).optional(),
  Technique: z.lazy(() => TechniqueOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  icon: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  parent: z.union([ z.lazy(() => CategoryNullableRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
  subcategories: z.lazy(() => CategoryListRelationFilterSchema).optional(),
  goals: z.lazy(() => GoalListRelationFilterSchema).optional(),
  Technique: z.lazy(() => TechniqueListRelationFilterSchema).optional()
}).strict());

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  icon: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  icon: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  parentId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  time: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumSessionTypeFilterSchema),z.lazy(() => SessionTypeSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  minutesLength: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  intensity: z.union([ z.lazy(() => EnumIntensityFilterSchema),z.lazy(() => IntensitySchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sparringTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  drillingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  techniques: z.lazy(() => SessionTechniqueListRelationFilterSchema).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minutesLength: z.lazy(() => SortOrderSchema).optional(),
  intensity: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sparringTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  drillingTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  techniques: z.lazy(() => SessionTechniqueOrderByRelationAggregateInputSchema).optional(),
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
  date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  time: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumSessionTypeFilterSchema),z.lazy(() => SessionTypeSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  minutesLength: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  intensity: z.union([ z.lazy(() => EnumIntensityFilterSchema),z.lazy(() => IntensitySchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sparringTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  drillingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  techniques: z.lazy(() => SessionTechniqueListRelationFilterSchema).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
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
  date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  time: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumTechniqueTypeFilterSchema),z.lazy(() => TechniqueTypeSchema) ]).optional(),
  videoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  giOnly: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => EnumBeltsNullableFilterSchema),z.lazy(() => BeltsSchema) ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueListRelationFilterSchema).optional(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional(),
  createdBy: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  Category: z.union([ z.lazy(() => CategoryNullableRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TechniqueOrderByWithRelationInputSchema: z.ZodType<Prisma.TechniqueOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  giOnly: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  recommendedBelts: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Session: z.lazy(() => SessionTechniqueOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional()
}).strict();

export const TechniqueWhereUniqueInputSchema: z.ZodType<Prisma.TechniqueWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TechniqueWhereInputSchema),z.lazy(() => TechniqueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechniqueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechniqueWhereInputSchema),z.lazy(() => TechniqueWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumTechniqueTypeFilterSchema),z.lazy(() => TechniqueTypeSchema) ]).optional(),
  videoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  giOnly: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => EnumBeltsNullableFilterSchema),z.lazy(() => BeltsSchema) ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueListRelationFilterSchema).optional(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional(),
  createdBy: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  Category: z.union([ z.lazy(() => CategoryNullableRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
}).strict());

export const TechniqueOrderByWithAggregationInputSchema: z.ZodType<Prisma.TechniqueOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  giOnly: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  recommendedBelts: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TechniqueCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TechniqueMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TechniqueMinOrderByAggregateInputSchema).optional()
}).strict();

export const TechniqueScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TechniqueScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema),z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema),z.lazy(() => TechniqueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumTechniqueTypeWithAggregatesFilterSchema),z.lazy(() => TechniqueTypeSchema) ]).optional(),
  videoUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  giOnly: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => EnumBeltsNullableWithAggregatesFilterSchema),z.lazy(() => BeltsSchema) ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionTechniqueWhereInputSchema: z.ZodType<Prisma.SessionTechniqueWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionTechniqueWhereInputSchema),z.lazy(() => SessionTechniqueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionTechniqueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionTechniqueWhereInputSchema),z.lazy(() => SessionTechniqueWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  techniqueId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  drillingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  session: z.union([ z.lazy(() => SessionRelationFilterSchema),z.lazy(() => SessionWhereInputSchema) ]).optional(),
  technique: z.union([ z.lazy(() => TechniqueRelationFilterSchema),z.lazy(() => TechniqueWhereInputSchema) ]).optional(),
}).strict();

export const SessionTechniqueOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionTechniqueOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  techniqueId: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  drillingTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session: z.lazy(() => SessionOrderByWithRelationInputSchema).optional(),
  technique: z.lazy(() => TechniqueOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionTechniqueWhereUniqueInputSchema: z.ZodType<Prisma.SessionTechniqueWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => SessionTechniqueWhereInputSchema),z.lazy(() => SessionTechniqueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionTechniqueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionTechniqueWhereInputSchema),z.lazy(() => SessionTechniqueWhereInputSchema).array() ]).optional(),
  sessionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  techniqueId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  drillingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  session: z.union([ z.lazy(() => SessionRelationFilterSchema),z.lazy(() => SessionWhereInputSchema) ]).optional(),
  technique: z.union([ z.lazy(() => TechniqueRelationFilterSchema),z.lazy(() => TechniqueWhereInputSchema) ]).optional(),
}).strict());

export const SessionTechniqueOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionTechniqueOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  techniqueId: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  drillingTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SessionTechniqueCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SessionTechniqueAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionTechniqueMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionTechniqueMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SessionTechniqueSumOrderByAggregateInputSchema).optional()
}).strict();

export const SessionTechniqueScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionTechniqueScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionTechniqueScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionTechniqueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionTechniqueScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionTechniqueScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionTechniqueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  techniqueId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  drillingTime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const GoalWhereInputSchema: z.ZodType<Prisma.GoalWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isMilestone: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  currentProgress: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyLevelFilterSchema),z.lazy(() => DifficultyLevelSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => EnumBeltsFilterSchema),z.lazy(() => BeltsSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tagId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parent: z.union([ z.lazy(() => GoalNullableRelationFilterSchema),z.lazy(() => GoalWhereInputSchema) ]).optional().nullable(),
  subgoals: z.lazy(() => GoalListRelationFilterSchema).optional(),
  categories: z.lazy(() => CategoryListRelationFilterSchema).optional(),
  requirements: z.lazy(() => RequirementListRelationFilterSchema).optional(),
  Tag: z.union([ z.lazy(() => TagNullableRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional().nullable(),
}).strict();

export const GoalOrderByWithRelationInputSchema: z.ZodType<Prisma.GoalOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isMilestone: z.lazy(() => SortOrderSchema).optional(),
  currentProgress: z.lazy(() => SortOrderSchema).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  suggestedLevels: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parent: z.lazy(() => GoalOrderByWithRelationInputSchema).optional(),
  subgoals: z.lazy(() => GoalOrderByRelationAggregateInputSchema).optional(),
  categories: z.lazy(() => CategoryOrderByRelationAggregateInputSchema).optional(),
  requirements: z.lazy(() => RequirementOrderByRelationAggregateInputSchema).optional(),
  Tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional()
}).strict();

export const GoalWhereUniqueInputSchema: z.ZodType<Prisma.GoalWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isMilestone: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  currentProgress: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyLevelFilterSchema),z.lazy(() => DifficultyLevelSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => EnumBeltsFilterSchema),z.lazy(() => BeltsSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tagId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parent: z.union([ z.lazy(() => GoalNullableRelationFilterSchema),z.lazy(() => GoalWhereInputSchema) ]).optional().nullable(),
  subgoals: z.lazy(() => GoalListRelationFilterSchema).optional(),
  categories: z.lazy(() => CategoryListRelationFilterSchema).optional(),
  requirements: z.lazy(() => RequirementListRelationFilterSchema).optional(),
  Tag: z.union([ z.lazy(() => TagNullableRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional().nullable(),
}).strict());

export const GoalOrderByWithAggregationInputSchema: z.ZodType<Prisma.GoalOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isMilestone: z.lazy(() => SortOrderSchema).optional(),
  currentProgress: z.lazy(() => SortOrderSchema).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  suggestedLevels: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => GoalCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GoalAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GoalMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GoalMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GoalSumOrderByAggregateInputSchema).optional()
}).strict();

export const GoalScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GoalScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GoalScalarWhereWithAggregatesInputSchema),z.lazy(() => GoalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalScalarWhereWithAggregatesInputSchema),z.lazy(() => GoalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isMilestone: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  currentProgress: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyLevelWithAggregatesFilterSchema),z.lazy(() => DifficultyLevelSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => EnumBeltsWithAggregatesFilterSchema),z.lazy(() => BeltsSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  tagId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RequirementWhereInputSchema: z.ZodType<Prisma.RequirementWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RequirementWhereInputSchema),z.lazy(() => RequirementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequirementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequirementWhereInputSchema),z.lazy(() => RequirementWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  goalId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  targetMinutes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  goal: z.union([ z.lazy(() => GoalRelationFilterSchema),z.lazy(() => GoalWhereInputSchema) ]).optional(),
}).strict();

export const RequirementOrderByWithRelationInputSchema: z.ZodType<Prisma.RequirementOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  targetCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  targetMinutes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  goal: z.lazy(() => GoalOrderByWithRelationInputSchema).optional()
}).strict();

export const RequirementWhereUniqueInputSchema: z.ZodType<Prisma.RequirementWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => RequirementWhereInputSchema),z.lazy(() => RequirementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequirementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequirementWhereInputSchema),z.lazy(() => RequirementWhereInputSchema).array() ]).optional(),
  goalId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  targetMinutes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  goal: z.union([ z.lazy(() => GoalRelationFilterSchema),z.lazy(() => GoalWhereInputSchema) ]).optional(),
}).strict());

export const RequirementOrderByWithAggregationInputSchema: z.ZodType<Prisma.RequirementOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  targetCount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  targetMinutes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RequirementCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RequirementAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RequirementMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RequirementMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RequirementSumOrderByAggregateInputSchema).optional()
}).strict();

export const RequirementScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RequirementScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RequirementScalarWhereWithAggregatesInputSchema),z.lazy(() => RequirementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequirementScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequirementScalarWhereWithAggregatesInputSchema),z.lazy(() => RequirementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  goalId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  targetCount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  targetMinutes: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  completed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AchievementWhereInputSchema: z.ZodType<Prisma.AchievementWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AchievementWhereInputSchema),z.lazy(() => AchievementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementWhereInputSchema),z.lazy(() => AchievementWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tier: z.union([ z.lazy(() => EnumAchievementTierFilterSchema),z.lazy(() => AchievementTierSchema) ]).optional(),
  criteriaId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AchievementOrderByWithRelationInputSchema: z.ZodType<Prisma.AchievementOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tier: z.lazy(() => SortOrderSchema).optional(),
  criteriaId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementWhereUniqueInputSchema: z.ZodType<Prisma.AchievementWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => AchievementWhereInputSchema),z.lazy(() => AchievementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementWhereInputSchema),z.lazy(() => AchievementWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tier: z.union([ z.lazy(() => EnumAchievementTierFilterSchema),z.lazy(() => AchievementTierSchema) ]).optional(),
  criteriaId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const AchievementOrderByWithAggregationInputSchema: z.ZodType<Prisma.AchievementOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tier: z.lazy(() => SortOrderSchema).optional(),
  criteriaId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AchievementCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AchievementMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AchievementMinOrderByAggregateInputSchema).optional()
}).strict();

export const AchievementScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AchievementScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AchievementScalarWhereWithAggregatesInputSchema),z.lazy(() => AchievementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementScalarWhereWithAggregatesInputSchema),z.lazy(() => AchievementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tier: z.union([ z.lazy(() => EnumAchievementTierWithAggregatesFilterSchema),z.lazy(() => AchievementTierSchema) ]).optional(),
  criteriaId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  currentLevel: z.lazy(() => BeltsSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutAuthorInputSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tagsAdded: z.lazy(() => TagCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  currentLevel: z.lazy(() => BeltsSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tagsAdded: z.lazy(() => TagUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentLevel: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutAuthorNestedInputSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tagsAdded: z.lazy(() => TagUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentLevel: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tagsAdded: z.lazy(() => TagUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  currentLevel: z.lazy(() => BeltsSchema).optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentLevel: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentLevel: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  techniques: z.lazy(() => TechniqueCreateNestedManyWithoutTagsInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutTagsAddedInputSchema).optional(),
  Goal: z.lazy(() => GoalCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  techniques: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutTagsInputSchema).optional(),
  Goal: z.lazy(() => GoalUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueUpdateManyWithoutTagsNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutTagsAddedNestedInputSchema).optional(),
  Goal: z.lazy(() => GoalUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueUncheckedUpdateManyWithoutTagsNestedInputSchema).optional(),
  Goal: z.lazy(() => GoalUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string().optional().nullable()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  parent: z.lazy(() => CategoryCreateNestedOneWithoutSubcategoriesInputSchema).optional(),
  subcategories: z.lazy(() => CategoryCreateNestedManyWithoutParentInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutCategoriesInputSchema).optional(),
  Technique: z.lazy(() => TechniqueCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  subcategories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => CategoryUpdateOneWithoutSubcategoriesNestedInputSchema).optional(),
  subcategories: z.lazy(() => CategoryUpdateManyWithoutParentNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subcategories: z.lazy(() => CategoryUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  date: z.coerce.date().optional().nullable(),
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
  author: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date().optional().nullable(),
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
  techniques: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => SessionTechniqueUpdateManyWithoutSessionNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date().optional().nullable(),
  time: z.string(),
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
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueCreateNestedManyWithoutTechniqueInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutTechniquesInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutTechniquesAddedInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutTechniqueInputSchema).optional()
}).strict();

export const TechniqueUncheckedCreateInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  categoryId: z.string().optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutTechniquesInputSchema).optional()
}).strict();

export const TechniqueUpdateInputSchema: z.ZodType<Prisma.TechniqueUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUpdateManyWithoutTechniqueNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutTechniquesNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutTechniquesAddedNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutTechniqueNestedInputSchema).optional()
}).strict();

export const TechniqueUncheckedUpdateInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutTechniquesNestedInputSchema).optional()
}).strict();

export const TechniqueCreateManyInputSchema: z.ZodType<Prisma.TechniqueCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  categoryId: z.string().optional().nullable()
}).strict();

export const TechniqueUpdateManyMutationInputSchema: z.ZodType<Prisma.TechniqueUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TechniqueUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionTechniqueCreateInputSchema: z.ZodType<Prisma.SessionTechniqueCreateInput> = z.object({
  id: z.string().uuid().optional(),
  notes: z.string().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  session: z.lazy(() => SessionCreateNestedOneWithoutTechniquesInputSchema),
  technique: z.lazy(() => TechniqueCreateNestedOneWithoutSessionInputSchema)
}).strict();

export const SessionTechniqueUncheckedCreateInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  sessionId: z.number().int(),
  techniqueId: z.string(),
  notes: z.string().optional().nullable(),
  drillingTime: z.number().int().optional().nullable()
}).strict();

export const SessionTechniqueUpdateInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session: z.lazy(() => SessionUpdateOneRequiredWithoutTechniquesNestedInputSchema).optional(),
  technique: z.lazy(() => TechniqueUpdateOneRequiredWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionTechniqueUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  techniqueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionTechniqueCreateManyInputSchema: z.ZodType<Prisma.SessionTechniqueCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  sessionId: z.number().int(),
  techniqueId: z.string(),
  notes: z.string().optional().nullable(),
  drillingTime: z.number().int().optional().nullable()
}).strict();

export const SessionTechniqueUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionTechniqueUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  techniqueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GoalCreateInputSchema: z.ZodType<Prisma.GoalCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  parent: z.lazy(() => GoalCreateNestedOneWithoutSubgoalsInputSchema).optional(),
  subgoals: z.lazy(() => GoalCreateNestedManyWithoutParentInputSchema).optional(),
  categories: z.lazy(() => CategoryCreateNestedManyWithoutGoalsInputSchema).optional(),
  requirements: z.lazy(() => RequirementCreateNestedManyWithoutGoalInputSchema).optional(),
  Tag: z.lazy(() => TagCreateNestedOneWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateInputSchema: z.ZodType<Prisma.GoalUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tagId: z.string().optional().nullable(),
  subgoals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  categories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutGoalsInputSchema).optional(),
  requirements: z.lazy(() => RequirementUncheckedCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalUpdateInputSchema: z.ZodType<Prisma.GoalUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => GoalUpdateOneWithoutSubgoalsNestedInputSchema).optional(),
  subgoals: z.lazy(() => GoalUpdateManyWithoutParentNestedInputSchema).optional(),
  categories: z.lazy(() => CategoryUpdateManyWithoutGoalsNestedInputSchema).optional(),
  requirements: z.lazy(() => RequirementUpdateManyWithoutGoalNestedInputSchema).optional(),
  Tag: z.lazy(() => TagUpdateOneWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subgoals: z.lazy(() => GoalUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  categories: z.lazy(() => CategoryUncheckedUpdateManyWithoutGoalsNestedInputSchema).optional(),
  requirements: z.lazy(() => RequirementUncheckedUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalCreateManyInputSchema: z.ZodType<Prisma.GoalCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tagId: z.string().optional().nullable()
}).strict();

export const GoalUpdateManyMutationInputSchema: z.ZodType<Prisma.GoalUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GoalUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RequirementCreateInputSchema: z.ZodType<Prisma.RequirementCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string(),
  description: z.string(),
  targetCount: z.number().int().optional().nullable(),
  targetMinutes: z.number().int().optional().nullable(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  goal: z.lazy(() => GoalCreateNestedOneWithoutRequirementsInputSchema)
}).strict();

export const RequirementUncheckedCreateInputSchema: z.ZodType<Prisma.RequirementUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  goalId: z.string(),
  type: z.string(),
  description: z.string(),
  targetCount: z.number().int().optional().nullable(),
  targetMinutes: z.number().int().optional().nullable(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RequirementUpdateInputSchema: z.ZodType<Prisma.RequirementUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetMinutes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  goal: z.lazy(() => GoalUpdateOneRequiredWithoutRequirementsNestedInputSchema).optional()
}).strict();

export const RequirementUncheckedUpdateInputSchema: z.ZodType<Prisma.RequirementUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetMinutes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RequirementCreateManyInputSchema: z.ZodType<Prisma.RequirementCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  goalId: z.string(),
  type: z.string(),
  description: z.string(),
  targetCount: z.number().int().optional().nullable(),
  targetMinutes: z.number().int().optional().nullable(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RequirementUpdateManyMutationInputSchema: z.ZodType<Prisma.RequirementUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetMinutes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RequirementUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RequirementUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetMinutes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementCreateInputSchema: z.ZodType<Prisma.AchievementCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  tier: z.lazy(() => AchievementTierSchema),
  criteriaId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AchievementUncheckedCreateInputSchema: z.ZodType<Prisma.AchievementUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  tier: z.lazy(() => AchievementTierSchema),
  criteriaId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AchievementUpdateInputSchema: z.ZodType<Prisma.AchievementUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tier: z.union([ z.lazy(() => AchievementTierSchema),z.lazy(() => EnumAchievementTierFieldUpdateOperationsInputSchema) ]).optional(),
  criteriaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementUncheckedUpdateInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tier: z.union([ z.lazy(() => AchievementTierSchema),z.lazy(() => EnumAchievementTierFieldUpdateOperationsInputSchema) ]).optional(),
  criteriaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementCreateManyInputSchema: z.ZodType<Prisma.AchievementCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  tier: z.lazy(() => AchievementTierSchema),
  criteriaId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AchievementUpdateManyMutationInputSchema: z.ZodType<Prisma.AchievementUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tier: z.union([ z.lazy(() => AchievementTierSchema),z.lazy(() => EnumAchievementTierFieldUpdateOperationsInputSchema) ]).optional(),
  criteriaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tier: z.union([ z.lazy(() => AchievementTierSchema),z.lazy(() => EnumAchievementTierFieldUpdateOperationsInputSchema) ]).optional(),
  criteriaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const EnumBeltsFilterSchema: z.ZodType<Prisma.EnumBeltsFilter> = z.object({
  equals: z.lazy(() => BeltsSchema).optional(),
  in: z.lazy(() => BeltsSchema).array().optional(),
  notIn: z.lazy(() => BeltsSchema).array().optional(),
  not: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NestedEnumBeltsFilterSchema) ]).optional(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const TechniqueListRelationFilterSchema: z.ZodType<Prisma.TechniqueListRelationFilter> = z.object({
  every: z.lazy(() => TechniqueWhereInputSchema).optional(),
  some: z.lazy(() => TechniqueWhereInputSchema).optional(),
  none: z.lazy(() => TechniqueWhereInputSchema).optional()
}).strict();

export const TagListRelationFilterSchema: z.ZodType<Prisma.TagListRelationFilter> = z.object({
  every: z.lazy(() => TagWhereInputSchema).optional(),
  some: z.lazy(() => TagWhereInputSchema).optional(),
  none: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechniqueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TechniqueOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  currentLevel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  currentLevel: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  externalId: z.lazy(() => SortOrderSchema).optional(),
  currentLevel: z.lazy(() => SortOrderSchema).optional()
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

export const EnumBeltsWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBeltsWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BeltsSchema).optional(),
  in: z.lazy(() => BeltsSchema).array().optional(),
  notIn: z.lazy(() => BeltsSchema).array().optional(),
  not: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NestedEnumBeltsWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBeltsFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBeltsFilterSchema).optional()
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const GoalListRelationFilterSchema: z.ZodType<Prisma.GoalListRelationFilter> = z.object({
  every: z.lazy(() => GoalWhereInputSchema).optional(),
  some: z.lazy(() => GoalWhereInputSchema).optional(),
  none: z.lazy(() => GoalWhereInputSchema).optional()
}).strict();

export const GoalOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GoalOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
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

export const CategoryNullableRelationFilterSchema: z.ZodType<Prisma.CategoryNullableRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional().nullable()
}).strict();

export const CategoryListRelationFilterSchema: z.ZodType<Prisma.CategoryListRelationFilter> = z.object({
  every: z.lazy(() => CategoryWhereInputSchema).optional(),
  some: z.lazy(() => CategoryWhereInputSchema).optional(),
  none: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CategoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
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

export const SessionTechniqueListRelationFilterSchema: z.ZodType<Prisma.SessionTechniqueListRelationFilter> = z.object({
  every: z.lazy(() => SessionTechniqueWhereInputSchema).optional(),
  some: z.lazy(() => SessionTechniqueWhereInputSchema).optional(),
  none: z.lazy(() => SessionTechniqueWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SessionTechniqueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueOrderByRelationAggregateInput> = z.object({
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

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
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

export const EnumTechniqueTypeFilterSchema: z.ZodType<Prisma.EnumTechniqueTypeFilter> = z.object({
  equals: z.lazy(() => TechniqueTypeSchema).optional(),
  in: z.lazy(() => TechniqueTypeSchema).array().optional(),
  notIn: z.lazy(() => TechniqueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => NestedEnumTechniqueTypeFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const EnumBeltsNullableFilterSchema: z.ZodType<Prisma.EnumBeltsNullableFilter> = z.object({
  equals: z.lazy(() => BeltsSchema).optional().nullable(),
  in: z.lazy(() => BeltsSchema).array().optional().nullable(),
  notIn: z.lazy(() => BeltsSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NestedEnumBeltsNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const TechniqueCountOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  giOnly: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  recommendedBelts: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechniqueMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  giOnly: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  recommendedBelts: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechniqueMinOrderByAggregateInputSchema: z.ZodType<Prisma.TechniqueMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  giOnly: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  recommendedBelts: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTechniqueTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTechniqueTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TechniqueTypeSchema).optional(),
  in: z.lazy(() => TechniqueTypeSchema).array().optional(),
  notIn: z.lazy(() => TechniqueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => NestedEnumTechniqueTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTechniqueTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTechniqueTypeFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumBeltsNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBeltsNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BeltsSchema).optional().nullable(),
  in: z.lazy(() => BeltsSchema).array().optional().nullable(),
  notIn: z.lazy(() => BeltsSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NestedEnumBeltsNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBeltsNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBeltsNullableFilterSchema).optional()
}).strict();

export const SessionRelationFilterSchema: z.ZodType<Prisma.SessionRelationFilter> = z.object({
  is: z.lazy(() => SessionWhereInputSchema).optional(),
  isNot: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const TechniqueRelationFilterSchema: z.ZodType<Prisma.TechniqueRelationFilter> = z.object({
  is: z.lazy(() => TechniqueWhereInputSchema).optional(),
  isNot: z.lazy(() => TechniqueWhereInputSchema).optional()
}).strict();

export const SessionTechniqueCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  techniqueId: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  drillingTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionTechniqueAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueAvgOrderByAggregateInput> = z.object({
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  drillingTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionTechniqueMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  techniqueId: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  drillingTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionTechniqueMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  techniqueId: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  drillingTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionTechniqueSumOrderByAggregateInputSchema: z.ZodType<Prisma.SessionTechniqueSumOrderByAggregateInput> = z.object({
  sessionId: z.lazy(() => SortOrderSchema).optional(),
  drillingTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumDifficultyLevelFilterSchema: z.ZodType<Prisma.EnumDifficultyLevelFilter> = z.object({
  equals: z.lazy(() => DifficultyLevelSchema).optional(),
  in: z.lazy(() => DifficultyLevelSchema).array().optional(),
  notIn: z.lazy(() => DifficultyLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => NestedEnumDifficultyLevelFilterSchema) ]).optional(),
}).strict();

export const GoalNullableRelationFilterSchema: z.ZodType<Prisma.GoalNullableRelationFilter> = z.object({
  is: z.lazy(() => GoalWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => GoalWhereInputSchema).optional().nullable()
}).strict();

export const RequirementListRelationFilterSchema: z.ZodType<Prisma.RequirementListRelationFilter> = z.object({
  every: z.lazy(() => RequirementWhereInputSchema).optional(),
  some: z.lazy(() => RequirementWhereInputSchema).optional(),
  none: z.lazy(() => RequirementWhereInputSchema).optional()
}).strict();

export const TagNullableRelationFilterSchema: z.ZodType<Prisma.TagNullableRelationFilter> = z.object({
  is: z.lazy(() => TagWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TagWhereInputSchema).optional().nullable()
}).strict();

export const RequirementOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RequirementOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalCountOrderByAggregateInputSchema: z.ZodType<Prisma.GoalCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  isMilestone: z.lazy(() => SortOrderSchema).optional(),
  currentProgress: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  suggestedLevels: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GoalAvgOrderByAggregateInput> = z.object({
  currentProgress: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GoalMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  isMilestone: z.lazy(() => SortOrderSchema).optional(),
  currentProgress: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  suggestedLevels: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalMinOrderByAggregateInputSchema: z.ZodType<Prisma.GoalMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  isMilestone: z.lazy(() => SortOrderSchema).optional(),
  currentProgress: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  suggestedLevels: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalSumOrderByAggregateInputSchema: z.ZodType<Prisma.GoalSumOrderByAggregateInput> = z.object({
  currentProgress: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumDifficultyLevelWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDifficultyLevelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DifficultyLevelSchema).optional(),
  in: z.lazy(() => DifficultyLevelSchema).array().optional(),
  notIn: z.lazy(() => DifficultyLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => NestedEnumDifficultyLevelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDifficultyLevelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDifficultyLevelFilterSchema).optional()
}).strict();

export const GoalRelationFilterSchema: z.ZodType<Prisma.GoalRelationFilter> = z.object({
  is: z.lazy(() => GoalWhereInputSchema).optional(),
  isNot: z.lazy(() => GoalWhereInputSchema).optional()
}).strict();

export const RequirementCountOrderByAggregateInputSchema: z.ZodType<Prisma.RequirementCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  targetCount: z.lazy(() => SortOrderSchema).optional(),
  targetMinutes: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RequirementAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RequirementAvgOrderByAggregateInput> = z.object({
  targetCount: z.lazy(() => SortOrderSchema).optional(),
  targetMinutes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RequirementMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RequirementMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  targetCount: z.lazy(() => SortOrderSchema).optional(),
  targetMinutes: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RequirementMinOrderByAggregateInputSchema: z.ZodType<Prisma.RequirementMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  targetCount: z.lazy(() => SortOrderSchema).optional(),
  targetMinutes: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RequirementSumOrderByAggregateInputSchema: z.ZodType<Prisma.RequirementSumOrderByAggregateInput> = z.object({
  targetCount: z.lazy(() => SortOrderSchema).optional(),
  targetMinutes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAchievementTierFilterSchema: z.ZodType<Prisma.EnumAchievementTierFilter> = z.object({
  equals: z.lazy(() => AchievementTierSchema).optional(),
  in: z.lazy(() => AchievementTierSchema).array().optional(),
  notIn: z.lazy(() => AchievementTierSchema).array().optional(),
  not: z.union([ z.lazy(() => AchievementTierSchema),z.lazy(() => NestedEnumAchievementTierFilterSchema) ]).optional(),
}).strict();

export const AchievementCountOrderByAggregateInputSchema: z.ZodType<Prisma.AchievementCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tier: z.lazy(() => SortOrderSchema).optional(),
  criteriaId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AchievementMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tier: z.lazy(() => SortOrderSchema).optional(),
  criteriaId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementMinOrderByAggregateInputSchema: z.ZodType<Prisma.AchievementMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tier: z.lazy(() => SortOrderSchema).optional(),
  criteriaId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAchievementTierWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAchievementTierWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AchievementTierSchema).optional(),
  in: z.lazy(() => AchievementTierSchema).array().optional(),
  notIn: z.lazy(() => AchievementTierSchema).array().optional(),
  not: z.union([ z.lazy(() => AchievementTierSchema),z.lazy(() => NestedEnumAchievementTierWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAchievementTierFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAchievementTierFilterSchema).optional()
}).strict();

export const SessionCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutAuthorInputSchema),z.lazy(() => SessionCreateWithoutAuthorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TechniqueCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TechniqueCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutCreatedByInputSchema),z.lazy(() => TagCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutAuthorInputSchema),z.lazy(() => SessionCreateWithoutAuthorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TechniqueUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TechniqueCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutCreatedByInputSchema),z.lazy(() => TagCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumBeltsFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBeltsFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BeltsSchema).optional()
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

export const TechniqueUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TechniqueCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechniqueUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => TechniqueUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutCreatedByInputSchema),z.lazy(() => TagCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
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

export const TechniqueUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TechniqueCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechniqueUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => TechniqueUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutCreatedByInputSchema),z.lazy(() => TagCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TagCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TagCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TechniqueCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutTagsInputSchema),z.lazy(() => TechniqueCreateWithoutTagsInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTagsAddedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTagsAddedInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsAddedInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTagsAddedInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const GoalCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.GoalCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutTagInputSchema),z.lazy(() => GoalCreateWithoutTagInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutTagInputSchema),z.lazy(() => GoalUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutTagInputSchema),z.lazy(() => GoalCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TechniqueUncheckedCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutTagsInputSchema),z.lazy(() => TechniqueCreateWithoutTagsInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GoalUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.GoalUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutTagInputSchema),z.lazy(() => GoalCreateWithoutTagInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutTagInputSchema),z.lazy(() => GoalUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutTagInputSchema),z.lazy(() => GoalCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TechniqueUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutTagsInputSchema),z.lazy(() => TechniqueCreateWithoutTagsInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechniqueUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => TechniqueUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutTagsAddedNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTagsAddedNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTagsAddedInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsAddedInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTagsAddedInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTagsAddedInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTagsAddedInputSchema),z.lazy(() => UserUpdateWithoutTagsAddedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTagsAddedInputSchema) ]).optional(),
}).strict();

export const GoalUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.GoalUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutTagInputSchema),z.lazy(() => GoalCreateWithoutTagInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutTagInputSchema),z.lazy(() => GoalUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutTagInputSchema),z.lazy(() => GoalCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TechniqueUncheckedUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutTagsInputSchema),z.lazy(() => TechniqueCreateWithoutTagsInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechniqueUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => TechniqueUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GoalUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutTagInputSchema),z.lazy(() => GoalCreateWithoutTagInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutTagInputSchema),z.lazy(() => GoalUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutTagInputSchema),z.lazy(() => GoalCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryCreateNestedOneWithoutSubcategoriesInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutSubcategoriesInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutSubcategoriesInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutSubcategoriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutSubcategoriesInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const CategoryCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.CategoryCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutParentInputSchema),z.lazy(() => CategoryCreateWithoutParentInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutParentInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutParentInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoryCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GoalCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutCategoriesInputSchema),z.lazy(() => GoalCreateWithoutCategoriesInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => GoalCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TechniqueCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCategoryInputSchema),z.lazy(() => TechniqueCreateWithoutCategoryInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TechniqueCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoryUncheckedCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutParentInputSchema),z.lazy(() => CategoryCreateWithoutParentInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutParentInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutParentInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoryCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GoalUncheckedCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalUncheckedCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutCategoriesInputSchema),z.lazy(() => GoalCreateWithoutCategoriesInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => GoalCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TechniqueUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCategoryInputSchema),z.lazy(() => TechniqueCreateWithoutCategoryInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TechniqueCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const CategoryUpdateOneWithoutSubcategoriesNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneWithoutSubcategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutSubcategoriesInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutSubcategoriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutSubcategoriesInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutSubcategoriesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutSubcategoriesInputSchema),z.lazy(() => CategoryUpdateWithoutSubcategoriesInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutSubcategoriesInputSchema) ]).optional(),
}).strict();

export const CategoryUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.CategoryUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutParentInputSchema),z.lazy(() => CategoryCreateWithoutParentInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutParentInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutParentInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoryUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CategoryUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoryCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CategoryUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoryUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => CategoryUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoryScalarWhereInputSchema),z.lazy(() => CategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GoalUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.GoalUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutCategoriesInputSchema),z.lazy(() => GoalCreateWithoutCategoriesInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => GoalCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TechniqueUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCategoryInputSchema),z.lazy(() => TechniqueCreateWithoutCategoryInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TechniqueCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechniqueUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => TechniqueUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutParentInputSchema),z.lazy(() => CategoryCreateWithoutParentInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutParentInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutParentInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoryUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CategoryUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoryCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CategoryUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoryUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => CategoryUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoryScalarWhereInputSchema),z.lazy(() => CategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GoalUncheckedUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutCategoriesInputSchema),z.lazy(() => GoalCreateWithoutCategoriesInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => GoalCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TechniqueUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCategoryInputSchema),z.lazy(() => TechniqueCreateWithoutCategoryInputSchema).array(),z.lazy(() => TechniqueUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechniqueCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TechniqueCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TechniqueUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TechniqueCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechniqueWhereUniqueInputSchema),z.lazy(() => TechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TechniqueUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechniqueUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => TechniqueUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionTechniqueCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema).array(),z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema),z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionTechniqueCreateManySessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SessionTechniqueUncheckedCreateNestedManyWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedCreateNestedManyWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema).array(),z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema),z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionTechniqueCreateManySessionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
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

export const SessionTechniqueUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema).array(),z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema),z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionTechniqueCreateManySessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionTechniqueScalarWhereInputSchema),z.lazy(() => SessionTechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const SessionTechniqueUncheckedUpdateManyWithoutSessionNestedInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateManyWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema).array(),z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema),z.lazy(() => SessionTechniqueCreateOrConnectWithoutSessionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionTechniqueCreateManySessionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutSessionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutSessionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionTechniqueScalarWhereInputSchema),z.lazy(() => SessionTechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionTechniqueCreateNestedManyWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueCreateNestedManyWithoutTechniqueInput> = z.object({
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema).array(),z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionTechniqueCreateManyTechniqueInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagCreateNestedManyWithoutTechniquesInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutTechniquesInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutTechniquesInputSchema),z.lazy(() => TagCreateWithoutTechniquesInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema),z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema),z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTechniquesAddedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTechniquesAddedInputSchema),z.lazy(() => UserUncheckedCreateWithoutTechniquesAddedInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTechniquesAddedInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CategoryCreateNestedOneWithoutTechniqueInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutTechniqueInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutTechniqueInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTechniqueInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutTechniqueInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInput> = z.object({
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema).array(),z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionTechniqueCreateManyTechniqueInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedCreateNestedManyWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutTechniquesInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutTechniquesInputSchema),z.lazy(() => TagCreateWithoutTechniquesInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema),z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema),z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumTechniqueTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTechniqueTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TechniqueTypeSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableEnumBeltsFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumBeltsFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BeltsSchema).optional().nullable()
}).strict();

export const SessionTechniqueUpdateManyWithoutTechniqueNestedInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyWithoutTechniqueNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema).array(),z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionTechniqueCreateManyTechniqueInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutTechniqueInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionTechniqueScalarWhereInputSchema),z.lazy(() => SessionTechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUpdateManyWithoutTechniquesNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutTechniquesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutTechniquesInputSchema),z.lazy(() => TagCreateWithoutTechniquesInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema),z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema),z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutTechniquesInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutTechniquesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutTechniquesInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutTechniquesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutTechniquesInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutTechniquesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutTechniquesAddedNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTechniquesAddedNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTechniquesAddedInputSchema),z.lazy(() => UserUncheckedCreateWithoutTechniquesAddedInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTechniquesAddedInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTechniquesAddedInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTechniquesAddedInputSchema),z.lazy(() => UserUpdateWithoutTechniquesAddedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTechniquesAddedInputSchema) ]).optional(),
}).strict();

export const CategoryUpdateOneWithoutTechniqueNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneWithoutTechniqueNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutTechniqueInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTechniqueInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutTechniqueInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutTechniqueInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutTechniqueInputSchema),z.lazy(() => CategoryUpdateWithoutTechniqueInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTechniqueInputSchema) ]).optional(),
}).strict();

export const SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema).array(),z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionTechniqueCreateManyTechniqueInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionTechniqueWhereUniqueInputSchema),z.lazy(() => SessionTechniqueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUpdateManyWithWhereWithoutTechniqueInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionTechniqueScalarWhereInputSchema),z.lazy(() => SessionTechniqueScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedUpdateManyWithoutTechniquesNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutTechniquesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutTechniquesInputSchema),z.lazy(() => TagCreateWithoutTechniquesInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema),z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema),z.lazy(() => TagCreateOrConnectWithoutTechniquesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutTechniquesInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutTechniquesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutTechniquesInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutTechniquesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutTechniquesInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutTechniquesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedOneWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionCreateNestedOneWithoutTechniquesInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema).optional(),
  connect: z.lazy(() => SessionWhereUniqueInputSchema).optional()
}).strict();

export const TechniqueCreateNestedOneWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueCreateNestedOneWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutSessionInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TechniqueCreateOrConnectWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => TechniqueWhereUniqueInputSchema).optional()
}).strict();

export const SessionUpdateOneRequiredWithoutTechniquesNestedInputSchema: z.ZodType<Prisma.SessionUpdateOneRequiredWithoutTechniquesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SessionCreateOrConnectWithoutTechniquesInputSchema).optional(),
  upsert: z.lazy(() => SessionUpsertWithoutTechniquesInputSchema).optional(),
  connect: z.lazy(() => SessionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SessionUpdateToOneWithWhereWithoutTechniquesInputSchema),z.lazy(() => SessionUpdateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutTechniquesInputSchema) ]).optional(),
}).strict();

export const TechniqueUpdateOneRequiredWithoutSessionNestedInputSchema: z.ZodType<Prisma.TechniqueUpdateOneRequiredWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechniqueCreateWithoutSessionInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TechniqueCreateOrConnectWithoutSessionInputSchema).optional(),
  upsert: z.lazy(() => TechniqueUpsertWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => TechniqueWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TechniqueUpdateToOneWithWhereWithoutSessionInputSchema),z.lazy(() => TechniqueUpdateWithoutSessionInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutSessionInputSchema) ]).optional(),
}).strict();

export const GoalCreateNestedOneWithoutSubgoalsInputSchema: z.ZodType<Prisma.GoalCreateNestedOneWithoutSubgoalsInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutSubgoalsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutSubgoalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutSubgoalsInputSchema).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional()
}).strict();

export const GoalCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.GoalCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutParentInputSchema),z.lazy(() => GoalCreateWithoutParentInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutParentInputSchema),z.lazy(() => GoalUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutParentInputSchema),z.lazy(() => GoalCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoryCreateNestedManyWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryCreateNestedManyWithoutGoalsInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutGoalsInputSchema),z.lazy(() => CategoryCreateWithoutGoalsInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutGoalsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutGoalsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutGoalsInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutGoalsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RequirementCreateNestedManyWithoutGoalInputSchema: z.ZodType<Prisma.RequirementCreateNestedManyWithoutGoalInput> = z.object({
  create: z.union([ z.lazy(() => RequirementCreateWithoutGoalInputSchema),z.lazy(() => RequirementCreateWithoutGoalInputSchema).array(),z.lazy(() => RequirementUncheckedCreateWithoutGoalInputSchema),z.lazy(() => RequirementUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequirementCreateOrConnectWithoutGoalInputSchema),z.lazy(() => RequirementCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequirementCreateManyGoalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RequirementWhereUniqueInputSchema),z.lazy(() => RequirementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagCreateNestedOneWithoutGoalInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutGoalInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutGoalInputSchema),z.lazy(() => TagUncheckedCreateWithoutGoalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutGoalInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const GoalUncheckedCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.GoalUncheckedCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutParentInputSchema),z.lazy(() => GoalCreateWithoutParentInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutParentInputSchema),z.lazy(() => GoalUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutParentInputSchema),z.lazy(() => GoalCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoryUncheckedCreateNestedManyWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateNestedManyWithoutGoalsInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutGoalsInputSchema),z.lazy(() => CategoryCreateWithoutGoalsInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutGoalsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutGoalsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutGoalsInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutGoalsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RequirementUncheckedCreateNestedManyWithoutGoalInputSchema: z.ZodType<Prisma.RequirementUncheckedCreateNestedManyWithoutGoalInput> = z.object({
  create: z.union([ z.lazy(() => RequirementCreateWithoutGoalInputSchema),z.lazy(() => RequirementCreateWithoutGoalInputSchema).array(),z.lazy(() => RequirementUncheckedCreateWithoutGoalInputSchema),z.lazy(() => RequirementUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequirementCreateOrConnectWithoutGoalInputSchema),z.lazy(() => RequirementCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequirementCreateManyGoalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RequirementWhereUniqueInputSchema),z.lazy(() => RequirementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumDifficultyLevelFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDifficultyLevelFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DifficultyLevelSchema).optional()
}).strict();

export const GoalUpdateOneWithoutSubgoalsNestedInputSchema: z.ZodType<Prisma.GoalUpdateOneWithoutSubgoalsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutSubgoalsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutSubgoalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutSubgoalsInputSchema).optional(),
  upsert: z.lazy(() => GoalUpsertWithoutSubgoalsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => GoalWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => GoalWhereInputSchema) ]).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GoalUpdateToOneWithWhereWithoutSubgoalsInputSchema),z.lazy(() => GoalUpdateWithoutSubgoalsInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutSubgoalsInputSchema) ]).optional(),
}).strict();

export const GoalUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.GoalUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutParentInputSchema),z.lazy(() => GoalCreateWithoutParentInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutParentInputSchema),z.lazy(() => GoalUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutParentInputSchema),z.lazy(() => GoalCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryUpdateManyWithoutGoalsNestedInputSchema: z.ZodType<Prisma.CategoryUpdateManyWithoutGoalsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutGoalsInputSchema),z.lazy(() => CategoryCreateWithoutGoalsInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutGoalsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutGoalsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutGoalsInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutGoalsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoryUpsertWithWhereUniqueWithoutGoalsInputSchema),z.lazy(() => CategoryUpsertWithWhereUniqueWithoutGoalsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateWithWhereUniqueWithoutGoalsInputSchema),z.lazy(() => CategoryUpdateWithWhereUniqueWithoutGoalsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoryUpdateManyWithWhereWithoutGoalsInputSchema),z.lazy(() => CategoryUpdateManyWithWhereWithoutGoalsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoryScalarWhereInputSchema),z.lazy(() => CategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RequirementUpdateManyWithoutGoalNestedInputSchema: z.ZodType<Prisma.RequirementUpdateManyWithoutGoalNestedInput> = z.object({
  create: z.union([ z.lazy(() => RequirementCreateWithoutGoalInputSchema),z.lazy(() => RequirementCreateWithoutGoalInputSchema).array(),z.lazy(() => RequirementUncheckedCreateWithoutGoalInputSchema),z.lazy(() => RequirementUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequirementCreateOrConnectWithoutGoalInputSchema),z.lazy(() => RequirementCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RequirementUpsertWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => RequirementUpsertWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequirementCreateManyGoalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RequirementWhereUniqueInputSchema),z.lazy(() => RequirementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RequirementWhereUniqueInputSchema),z.lazy(() => RequirementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RequirementWhereUniqueInputSchema),z.lazy(() => RequirementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RequirementWhereUniqueInputSchema),z.lazy(() => RequirementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RequirementUpdateWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => RequirementUpdateWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RequirementUpdateManyWithWhereWithoutGoalInputSchema),z.lazy(() => RequirementUpdateManyWithWhereWithoutGoalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RequirementScalarWhereInputSchema),z.lazy(() => RequirementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUpdateOneWithoutGoalNestedInputSchema: z.ZodType<Prisma.TagUpdateOneWithoutGoalNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutGoalInputSchema),z.lazy(() => TagUncheckedCreateWithoutGoalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutGoalInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutGoalInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TagWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TagWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutGoalInputSchema),z.lazy(() => TagUpdateWithoutGoalInputSchema),z.lazy(() => TagUncheckedUpdateWithoutGoalInputSchema) ]).optional(),
}).strict();

export const GoalUncheckedUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutParentInputSchema),z.lazy(() => GoalCreateWithoutParentInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutParentInputSchema),z.lazy(() => GoalUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutParentInputSchema),z.lazy(() => GoalCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyWithoutGoalsNestedInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyWithoutGoalsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutGoalsInputSchema),z.lazy(() => CategoryCreateWithoutGoalsInputSchema).array(),z.lazy(() => CategoryUncheckedCreateWithoutGoalsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutGoalsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoryCreateOrConnectWithoutGoalsInputSchema),z.lazy(() => CategoryCreateOrConnectWithoutGoalsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoryUpsertWithWhereUniqueWithoutGoalsInputSchema),z.lazy(() => CategoryUpsertWithWhereUniqueWithoutGoalsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoryWhereUniqueInputSchema),z.lazy(() => CategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateWithWhereUniqueWithoutGoalsInputSchema),z.lazy(() => CategoryUpdateWithWhereUniqueWithoutGoalsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoryUpdateManyWithWhereWithoutGoalsInputSchema),z.lazy(() => CategoryUpdateManyWithWhereWithoutGoalsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoryScalarWhereInputSchema),z.lazy(() => CategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RequirementUncheckedUpdateManyWithoutGoalNestedInputSchema: z.ZodType<Prisma.RequirementUncheckedUpdateManyWithoutGoalNestedInput> = z.object({
  create: z.union([ z.lazy(() => RequirementCreateWithoutGoalInputSchema),z.lazy(() => RequirementCreateWithoutGoalInputSchema).array(),z.lazy(() => RequirementUncheckedCreateWithoutGoalInputSchema),z.lazy(() => RequirementUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RequirementCreateOrConnectWithoutGoalInputSchema),z.lazy(() => RequirementCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RequirementUpsertWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => RequirementUpsertWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RequirementCreateManyGoalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RequirementWhereUniqueInputSchema),z.lazy(() => RequirementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RequirementWhereUniqueInputSchema),z.lazy(() => RequirementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RequirementWhereUniqueInputSchema),z.lazy(() => RequirementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RequirementWhereUniqueInputSchema),z.lazy(() => RequirementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RequirementUpdateWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => RequirementUpdateWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RequirementUpdateManyWithWhereWithoutGoalInputSchema),z.lazy(() => RequirementUpdateManyWithWhereWithoutGoalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RequirementScalarWhereInputSchema),z.lazy(() => RequirementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GoalCreateNestedOneWithoutRequirementsInputSchema: z.ZodType<Prisma.GoalCreateNestedOneWithoutRequirementsInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutRequirementsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutRequirementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutRequirementsInputSchema).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional()
}).strict();

export const GoalUpdateOneRequiredWithoutRequirementsNestedInputSchema: z.ZodType<Prisma.GoalUpdateOneRequiredWithoutRequirementsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutRequirementsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutRequirementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutRequirementsInputSchema).optional(),
  upsert: z.lazy(() => GoalUpsertWithoutRequirementsInputSchema).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GoalUpdateToOneWithWhereWithoutRequirementsInputSchema),z.lazy(() => GoalUpdateWithoutRequirementsInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutRequirementsInputSchema) ]).optional(),
}).strict();

export const EnumAchievementTierFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAchievementTierFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AchievementTierSchema).optional()
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

export const NestedEnumBeltsFilterSchema: z.ZodType<Prisma.NestedEnumBeltsFilter> = z.object({
  equals: z.lazy(() => BeltsSchema).optional(),
  in: z.lazy(() => BeltsSchema).array().optional(),
  notIn: z.lazy(() => BeltsSchema).array().optional(),
  not: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NestedEnumBeltsFilterSchema) ]).optional(),
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

export const NestedEnumBeltsWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBeltsWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BeltsSchema).optional(),
  in: z.lazy(() => BeltsSchema).array().optional(),
  notIn: z.lazy(() => BeltsSchema).array().optional(),
  not: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NestedEnumBeltsWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBeltsFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBeltsFilterSchema).optional()
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

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
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

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
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

export const NestedEnumTechniqueTypeFilterSchema: z.ZodType<Prisma.NestedEnumTechniqueTypeFilter> = z.object({
  equals: z.lazy(() => TechniqueTypeSchema).optional(),
  in: z.lazy(() => TechniqueTypeSchema).array().optional(),
  notIn: z.lazy(() => TechniqueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => NestedEnumTechniqueTypeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumBeltsNullableFilterSchema: z.ZodType<Prisma.NestedEnumBeltsNullableFilter> = z.object({
  equals: z.lazy(() => BeltsSchema).optional().nullable(),
  in: z.lazy(() => BeltsSchema).array().optional().nullable(),
  notIn: z.lazy(() => BeltsSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NestedEnumBeltsNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumTechniqueTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTechniqueTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TechniqueTypeSchema).optional(),
  in: z.lazy(() => TechniqueTypeSchema).array().optional(),
  notIn: z.lazy(() => TechniqueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => NestedEnumTechniqueTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTechniqueTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTechniqueTypeFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumBeltsNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBeltsNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BeltsSchema).optional().nullable(),
  in: z.lazy(() => BeltsSchema).array().optional().nullable(),
  notIn: z.lazy(() => BeltsSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NestedEnumBeltsNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBeltsNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBeltsNullableFilterSchema).optional()
}).strict();

export const NestedEnumDifficultyLevelFilterSchema: z.ZodType<Prisma.NestedEnumDifficultyLevelFilter> = z.object({
  equals: z.lazy(() => DifficultyLevelSchema).optional(),
  in: z.lazy(() => DifficultyLevelSchema).array().optional(),
  notIn: z.lazy(() => DifficultyLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => NestedEnumDifficultyLevelFilterSchema) ]).optional(),
}).strict();

export const NestedEnumDifficultyLevelWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDifficultyLevelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DifficultyLevelSchema).optional(),
  in: z.lazy(() => DifficultyLevelSchema).array().optional(),
  notIn: z.lazy(() => DifficultyLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => NestedEnumDifficultyLevelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDifficultyLevelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDifficultyLevelFilterSchema).optional()
}).strict();

export const NestedEnumAchievementTierFilterSchema: z.ZodType<Prisma.NestedEnumAchievementTierFilter> = z.object({
  equals: z.lazy(() => AchievementTierSchema).optional(),
  in: z.lazy(() => AchievementTierSchema).array().optional(),
  notIn: z.lazy(() => AchievementTierSchema).array().optional(),
  not: z.union([ z.lazy(() => AchievementTierSchema),z.lazy(() => NestedEnumAchievementTierFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAchievementTierWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAchievementTierWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AchievementTierSchema).optional(),
  in: z.lazy(() => AchievementTierSchema).array().optional(),
  notIn: z.lazy(() => AchievementTierSchema).array().optional(),
  not: z.union([ z.lazy(() => AchievementTierSchema),z.lazy(() => NestedEnumAchievementTierWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAchievementTierFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAchievementTierFilterSchema).optional()
}).strict();

export const SessionCreateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionCreateWithoutAuthorInput> = z.object({
  date: z.coerce.date().optional().nullable(),
  time: z.string(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  weight: z.number().int().optional().nullable(),
  techniques: z.lazy(() => SessionTechniqueCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const SessionUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date().optional().nullable(),
  time: z.string(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  weight: z.number().int().optional().nullable(),
  techniques: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutSessionInputSchema).optional()
}).strict();

export const SessionCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutAuthorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const SessionCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyAuthorInputSchema),z.lazy(() => SessionCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TechniqueCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueCreateWithoutCreatedByInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueCreateNestedManyWithoutTechniqueInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutTechniquesInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutTechniqueInputSchema).optional()
}).strict();

export const TechniqueUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  categoryId: z.string().optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutTechniquesInputSchema).optional()
}).strict();

export const TechniqueCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const TechniqueCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.TechniqueCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TechniqueCreateManyCreatedByInputSchema),z.lazy(() => TechniqueCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TagCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.TagCreateWithoutCreatedByInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  techniques: z.lazy(() => TechniqueCreateNestedManyWithoutTagsInputSchema).optional(),
  Goal: z.lazy(() => GoalCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  techniques: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutTagsInputSchema).optional(),
  Goal: z.lazy(() => GoalUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutCreatedByInputSchema),z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const TagCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.TagCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TagCreateManyCreatedByInputSchema),z.lazy(() => TagCreateManyCreatedByInputSchema).array() ]),
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
  date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  time: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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

export const TechniqueUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TechniqueUpdateWithoutCreatedByInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCreatedByInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const TechniqueUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TechniqueUpdateWithoutCreatedByInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const TechniqueUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TechniqueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TechniqueUpdateManyMutationInputSchema),z.lazy(() => TechniqueUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export const TechniqueScalarWhereInputSchema: z.ZodType<Prisma.TechniqueScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechniqueScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechniqueScalarWhereInputSchema),z.lazy(() => TechniqueScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumTechniqueTypeFilterSchema),z.lazy(() => TechniqueTypeSchema) ]).optional(),
  videoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  giOnly: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => EnumBeltsNullableFilterSchema),z.lazy(() => BeltsSchema) ]).optional().nullable(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TagUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TagUpdateWithoutCreatedByInputSchema),z.lazy(() => TagUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutCreatedByInputSchema),z.lazy(() => TagUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const TagUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TagUpdateWithoutCreatedByInputSchema),z.lazy(() => TagUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const TagUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TagUpdateManyMutationInputSchema),z.lazy(() => TagUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export const TagScalarWhereInputSchema: z.ZodType<Prisma.TagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TechniqueCreateWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueCreateWithoutTagsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueCreateNestedManyWithoutTechniqueInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutTechniquesAddedInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutTechniqueInputSchema).optional()
}).strict();

export const TechniqueUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  categoryId: z.string().optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInputSchema).optional()
}).strict();

export const TechniqueCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TechniqueCreateWithoutTagsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const UserCreateWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserCreateWithoutTagsAddedInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  currentLevel: z.lazy(() => BeltsSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutAuthorInputSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTagsAddedInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  currentLevel: z.lazy(() => BeltsSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTagsAddedInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTagsAddedInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsAddedInputSchema) ]),
}).strict();

export const GoalCreateWithoutTagInputSchema: z.ZodType<Prisma.GoalCreateWithoutTagInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  parent: z.lazy(() => GoalCreateNestedOneWithoutSubgoalsInputSchema).optional(),
  subgoals: z.lazy(() => GoalCreateNestedManyWithoutParentInputSchema).optional(),
  categories: z.lazy(() => CategoryCreateNestedManyWithoutGoalsInputSchema).optional(),
  requirements: z.lazy(() => RequirementCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.GoalUncheckedCreateWithoutTagInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  subgoals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  categories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutGoalsInputSchema).optional(),
  requirements: z.lazy(() => RequirementUncheckedCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutTagInputSchema),z.lazy(() => GoalUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const GoalCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.GoalCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GoalCreateManyTagInputSchema),z.lazy(() => GoalCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TechniqueUpsertWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUpsertWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TechniqueUpdateWithoutTagsInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => TechniqueCreateWithoutTagsInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TechniqueUpdateWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUpdateWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TechniqueUpdateWithoutTagsInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const TechniqueUpdateManyWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => TechniqueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TechniqueUpdateManyMutationInputSchema),z.lazy(() => TechniqueUncheckedUpdateManyWithoutTagsInputSchema) ]),
}).strict();

export const UserUpsertWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserUpsertWithoutTagsAddedInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTagsAddedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTagsAddedInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTagsAddedInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsAddedInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTagsAddedInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTagsAddedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTagsAddedInputSchema) ]),
}).strict();

export const UserUpdateWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserUpdateWithoutTagsAddedInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentLevel: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutAuthorNestedInputSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTagsAddedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTagsAddedInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentLevel: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const GoalUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.GoalUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GoalUpdateWithoutTagInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutTagInputSchema),z.lazy(() => GoalUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const GoalUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.GoalUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateWithoutTagInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const GoalUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.GoalUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => GoalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateManyMutationInputSchema),z.lazy(() => GoalUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const GoalScalarWhereInputSchema: z.ZodType<Prisma.GoalScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isMilestone: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  currentProgress: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyLevelFilterSchema),z.lazy(() => DifficultyLevelSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => EnumBeltsFilterSchema),z.lazy(() => BeltsSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tagId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CategoryCreateWithoutSubcategoriesInputSchema: z.ZodType<Prisma.CategoryCreateWithoutSubcategoriesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  parent: z.lazy(() => CategoryCreateNestedOneWithoutSubcategoriesInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutCategoriesInputSchema).optional(),
  Technique: z.lazy(() => TechniqueCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateWithoutSubcategoriesInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutSubcategoriesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryCreateOrConnectWithoutSubcategoriesInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutSubcategoriesInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutSubcategoriesInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutSubcategoriesInputSchema) ]),
}).strict();

export const CategoryCreateWithoutParentInputSchema: z.ZodType<Prisma.CategoryCreateWithoutParentInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  subcategories: z.lazy(() => CategoryCreateNestedManyWithoutParentInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutCategoriesInputSchema).optional(),
  Technique: z.lazy(() => TechniqueCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateWithoutParentInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutParentInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  subcategories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryCreateOrConnectWithoutParentInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutParentInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutParentInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutParentInputSchema) ]),
}).strict();

export const CategoryCreateManyParentInputEnvelopeSchema: z.ZodType<Prisma.CategoryCreateManyParentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CategoryCreateManyParentInputSchema),z.lazy(() => CategoryCreateManyParentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const GoalCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalCreateWithoutCategoriesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  parent: z.lazy(() => GoalCreateNestedOneWithoutSubgoalsInputSchema).optional(),
  subgoals: z.lazy(() => GoalCreateNestedManyWithoutParentInputSchema).optional(),
  requirements: z.lazy(() => RequirementCreateNestedManyWithoutGoalInputSchema).optional(),
  Tag: z.lazy(() => TagCreateNestedOneWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalUncheckedCreateWithoutCategoriesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tagId: z.string().optional().nullable(),
  subgoals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  requirements: z.lazy(() => RequirementUncheckedCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalCreateOrConnectWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutCategoriesInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutCategoriesInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict();

export const TechniqueCreateWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueCreateWithoutCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueCreateNestedManyWithoutTechniqueInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutTechniquesInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutTechniquesAddedInputSchema).optional()
}).strict();

export const TechniqueUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUncheckedCreateNestedManyWithoutTechniqueInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutTechniquesInputSchema).optional()
}).strict();

export const TechniqueCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCategoryInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const TechniqueCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.TechniqueCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TechniqueCreateManyCategoryInputSchema),z.lazy(() => TechniqueCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CategoryUpsertWithoutSubcategoriesInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutSubcategoriesInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutSubcategoriesInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutSubcategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutSubcategoriesInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutSubcategoriesInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutSubcategoriesInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutSubcategoriesInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutSubcategoriesInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutSubcategoriesInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutSubcategoriesInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutSubcategoriesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => CategoryUpdateOneWithoutSubcategoriesNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateWithoutSubcategoriesInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutSubcategoriesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUpsertWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.CategoryUpsertWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CategoryUpdateWithoutParentInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutParentInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutParentInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutParentInputSchema) ]),
}).strict();

export const CategoryUpdateWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutParentInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutParentInputSchema) ]),
}).strict();

export const CategoryUpdateManyWithWhereWithoutParentInputSchema: z.ZodType<Prisma.CategoryUpdateManyWithWhereWithoutParentInput> = z.object({
  where: z.lazy(() => CategoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CategoryUpdateManyMutationInputSchema),z.lazy(() => CategoryUncheckedUpdateManyWithoutParentInputSchema) ]),
}).strict();

export const CategoryScalarWhereInputSchema: z.ZodType<Prisma.CategoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereInputSchema),z.lazy(() => CategoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereInputSchema),z.lazy(() => CategoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  icon: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GoalUpsertWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalUpsertWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GoalUpdateWithoutCategoriesInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutCategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutCategoriesInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict();

export const GoalUpdateWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalUpdateWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateWithoutCategoriesInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutCategoriesInputSchema) ]),
}).strict();

export const GoalUpdateManyWithWhereWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalUpdateManyWithWhereWithoutCategoriesInput> = z.object({
  where: z.lazy(() => GoalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateManyMutationInputSchema),z.lazy(() => GoalUncheckedUpdateManyWithoutCategoriesInputSchema) ]),
}).strict();

export const TechniqueUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TechniqueUpdateWithoutCategoryInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => TechniqueCreateWithoutCategoryInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const TechniqueUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TechniqueUpdateWithoutCategoryInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const TechniqueUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => TechniqueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TechniqueUpdateManyMutationInputSchema),z.lazy(() => TechniqueUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const SessionTechniqueCreateWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueCreateWithoutSessionInput> = z.object({
  id: z.string().uuid().optional(),
  notes: z.string().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  technique: z.lazy(() => TechniqueCreateNestedOneWithoutSessionInputSchema)
}).strict();

export const SessionTechniqueUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().uuid().optional(),
  techniqueId: z.string(),
  notes: z.string().optional().nullable(),
  drillingTime: z.number().int().optional().nullable()
}).strict();

export const SessionTechniqueCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const SessionTechniqueCreateManySessionInputEnvelopeSchema: z.ZodType<Prisma.SessionTechniqueCreateManySessionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionTechniqueCreateManySessionInputSchema),z.lazy(() => SessionTechniqueCreateManySessionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  currentLevel: z.lazy(() => BeltsSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tagsAdded: z.lazy(() => TagCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  currentLevel: z.lazy(() => BeltsSchema).optional(),
  techniquesAdded: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tagsAdded: z.lazy(() => TagUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const SessionTechniqueUpsertWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUpsertWithWhereUniqueWithoutSessionInput> = z.object({
  where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionTechniqueUpdateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const SessionTechniqueUpdateWithWhereUniqueWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateWithWhereUniqueWithoutSessionInput> = z.object({
  where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionTechniqueUpdateWithoutSessionInputSchema),z.lazy(() => SessionTechniqueUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const SessionTechniqueUpdateManyWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => SessionTechniqueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionTechniqueUpdateManyMutationInputSchema),z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutSessionInputSchema) ]),
}).strict();

export const SessionTechniqueScalarWhereInputSchema: z.ZodType<Prisma.SessionTechniqueScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionTechniqueScalarWhereInputSchema),z.lazy(() => SessionTechniqueScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionTechniqueScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionTechniqueScalarWhereInputSchema),z.lazy(() => SessionTechniqueScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  techniqueId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  drillingTime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
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
  currentLevel: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  techniquesAdded: z.lazy(() => TechniqueUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tagsAdded: z.lazy(() => TagUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentLevel: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  techniquesAdded: z.lazy(() => TechniqueUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tagsAdded: z.lazy(() => TagUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const SessionTechniqueCreateWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueCreateWithoutTechniqueInput> = z.object({
  id: z.string().uuid().optional(),
  notes: z.string().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  session: z.lazy(() => SessionCreateNestedOneWithoutTechniquesInputSchema)
}).strict();

export const SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedCreateWithoutTechniqueInput> = z.object({
  id: z.string().uuid().optional(),
  sessionId: z.number().int(),
  notes: z.string().optional().nullable(),
  drillingTime: z.number().int().optional().nullable()
}).strict();

export const SessionTechniqueCreateOrConnectWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueCreateOrConnectWithoutTechniqueInput> = z.object({
  where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema) ]),
}).strict();

export const SessionTechniqueCreateManyTechniqueInputEnvelopeSchema: z.ZodType<Prisma.SessionTechniqueCreateManyTechniqueInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionTechniqueCreateManyTechniqueInputSchema),z.lazy(() => SessionTechniqueCreateManyTechniqueInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TagCreateWithoutTechniquesInputSchema: z.ZodType<Prisma.TagCreateWithoutTechniquesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutTagsAddedInputSchema).optional(),
  Goal: z.lazy(() => GoalCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutTechniquesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  Goal: z.lazy(() => GoalUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutTechniquesInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutTechniquesInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutTechniquesInputSchema),z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema) ]),
}).strict();

export const UserCreateWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserCreateWithoutTechniquesAddedInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  currentLevel: z.lazy(() => BeltsSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutAuthorInputSchema).optional(),
  tagsAdded: z.lazy(() => TagCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTechniquesAddedInput> = z.object({
  id: z.string().cuid().optional(),
  userName: z.string().optional().nullable(),
  displayName: z.string(),
  externalId: z.string(),
  currentLevel: z.lazy(() => BeltsSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  tagsAdded: z.lazy(() => TagUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTechniquesAddedInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTechniquesAddedInputSchema),z.lazy(() => UserUncheckedCreateWithoutTechniquesAddedInputSchema) ]),
}).strict();

export const CategoryCreateWithoutTechniqueInputSchema: z.ZodType<Prisma.CategoryCreateWithoutTechniqueInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  parent: z.lazy(() => CategoryCreateNestedOneWithoutSubcategoriesInputSchema).optional(),
  subcategories: z.lazy(() => CategoryCreateNestedManyWithoutParentInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateWithoutTechniqueInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutTechniqueInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  subcategories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict();

export const CategoryCreateOrConnectWithoutTechniqueInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutTechniqueInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutTechniqueInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTechniqueInputSchema) ]),
}).strict();

export const SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUpsertWithWhereUniqueWithoutTechniqueInput> = z.object({
  where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionTechniqueUpdateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUncheckedUpdateWithoutTechniqueInputSchema) ]),
  create: z.union([ z.lazy(() => SessionTechniqueCreateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUncheckedCreateWithoutTechniqueInputSchema) ]),
}).strict();

export const SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateWithWhereUniqueWithoutTechniqueInput> = z.object({
  where: z.lazy(() => SessionTechniqueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionTechniqueUpdateWithoutTechniqueInputSchema),z.lazy(() => SessionTechniqueUncheckedUpdateWithoutTechniqueInputSchema) ]),
}).strict();

export const SessionTechniqueUpdateManyWithWhereWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyWithWhereWithoutTechniqueInput> = z.object({
  where: z.lazy(() => SessionTechniqueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionTechniqueUpdateManyMutationInputSchema),z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutTechniqueInputSchema) ]),
}).strict();

export const TagUpsertWithWhereUniqueWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutTechniquesInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TagUpdateWithoutTechniquesInputSchema),z.lazy(() => TagUncheckedUpdateWithoutTechniquesInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutTechniquesInputSchema),z.lazy(() => TagUncheckedCreateWithoutTechniquesInputSchema) ]),
}).strict();

export const TagUpdateWithWhereUniqueWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutTechniquesInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TagUpdateWithoutTechniquesInputSchema),z.lazy(() => TagUncheckedUpdateWithoutTechniquesInputSchema) ]),
}).strict();

export const TagUpdateManyWithWhereWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutTechniquesInput> = z.object({
  where: z.lazy(() => TagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TagUpdateManyMutationInputSchema),z.lazy(() => TagUncheckedUpdateManyWithoutTechniquesInputSchema) ]),
}).strict();

export const UserUpsertWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserUpsertWithoutTechniquesAddedInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTechniquesAddedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTechniquesAddedInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTechniquesAddedInputSchema),z.lazy(() => UserUncheckedCreateWithoutTechniquesAddedInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTechniquesAddedInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTechniquesAddedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTechniquesAddedInputSchema) ]),
}).strict();

export const UserUpdateWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserUpdateWithoutTechniquesAddedInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentLevel: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutAuthorNestedInputSchema).optional(),
  tagsAdded: z.lazy(() => TagUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTechniquesAddedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTechniquesAddedInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  externalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currentLevel: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  tagsAdded: z.lazy(() => TagUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const CategoryUpsertWithoutTechniqueInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutTechniqueInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutTechniqueInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTechniqueInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutTechniqueInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTechniqueInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutTechniqueInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutTechniqueInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutTechniqueInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTechniqueInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutTechniqueInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutTechniqueInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => CategoryUpdateOneWithoutSubcategoriesNestedInputSchema).optional(),
  subcategories: z.lazy(() => CategoryUpdateManyWithoutParentNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateWithoutTechniqueInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutTechniqueInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subcategories: z.lazy(() => CategoryUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict();

export const SessionCreateWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionCreateWithoutTechniquesInput> = z.object({
  date: z.coerce.date().optional().nullable(),
  time: z.string(),
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
  date: z.coerce.date().optional().nullable(),
  time: z.string(),
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

export const TechniqueCreateWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueCreateWithoutSessionInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  tags: z.lazy(() => TagCreateNestedManyWithoutTechniquesInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutTechniquesAddedInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutTechniqueInputSchema).optional()
}).strict();

export const TechniqueUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  categoryId: z.string().optional().nullable(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutTechniquesInputSchema).optional()
}).strict();

export const TechniqueCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => TechniqueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TechniqueCreateWithoutSessionInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const SessionUpsertWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUpsertWithoutTechniquesInput> = z.object({
  update: z.union([ z.lazy(() => SessionUpdateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutTechniquesInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedCreateWithoutTechniquesInputSchema) ]),
  where: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const SessionUpdateToOneWithWhereWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUpdateToOneWithWhereWithoutTechniquesInput> = z.object({
  where: z.lazy(() => SessionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SessionUpdateWithoutTechniquesInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutTechniquesInputSchema) ]),
}).strict();

export const SessionUpdateWithoutTechniquesInputSchema: z.ZodType<Prisma.SessionUpdateWithoutTechniquesInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const TechniqueUpsertWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueUpsertWithoutSessionInput> = z.object({
  update: z.union([ z.lazy(() => TechniqueUpdateWithoutSessionInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => TechniqueCreateWithoutSessionInputSchema),z.lazy(() => TechniqueUncheckedCreateWithoutSessionInputSchema) ]),
  where: z.lazy(() => TechniqueWhereInputSchema).optional()
}).strict();

export const TechniqueUpdateToOneWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueUpdateToOneWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => TechniqueWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TechniqueUpdateWithoutSessionInputSchema),z.lazy(() => TechniqueUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const TechniqueUpdateWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.lazy(() => TagUpdateManyWithoutTechniquesNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutTechniquesAddedNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutTechniqueNestedInputSchema).optional()
}).strict();

export const TechniqueUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutTechniquesNestedInputSchema).optional()
}).strict();

export const GoalCreateWithoutSubgoalsInputSchema: z.ZodType<Prisma.GoalCreateWithoutSubgoalsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  parent: z.lazy(() => GoalCreateNestedOneWithoutSubgoalsInputSchema).optional(),
  categories: z.lazy(() => CategoryCreateNestedManyWithoutGoalsInputSchema).optional(),
  requirements: z.lazy(() => RequirementCreateNestedManyWithoutGoalInputSchema).optional(),
  Tag: z.lazy(() => TagCreateNestedOneWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateWithoutSubgoalsInputSchema: z.ZodType<Prisma.GoalUncheckedCreateWithoutSubgoalsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tagId: z.string().optional().nullable(),
  categories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutGoalsInputSchema).optional(),
  requirements: z.lazy(() => RequirementUncheckedCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalCreateOrConnectWithoutSubgoalsInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutSubgoalsInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutSubgoalsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutSubgoalsInputSchema) ]),
}).strict();

export const GoalCreateWithoutParentInputSchema: z.ZodType<Prisma.GoalCreateWithoutParentInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  subgoals: z.lazy(() => GoalCreateNestedManyWithoutParentInputSchema).optional(),
  categories: z.lazy(() => CategoryCreateNestedManyWithoutGoalsInputSchema).optional(),
  requirements: z.lazy(() => RequirementCreateNestedManyWithoutGoalInputSchema).optional(),
  Tag: z.lazy(() => TagCreateNestedOneWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateWithoutParentInputSchema: z.ZodType<Prisma.GoalUncheckedCreateWithoutParentInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tagId: z.string().optional().nullable(),
  subgoals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  categories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutGoalsInputSchema).optional(),
  requirements: z.lazy(() => RequirementUncheckedCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalCreateOrConnectWithoutParentInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutParentInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutParentInputSchema),z.lazy(() => GoalUncheckedCreateWithoutParentInputSchema) ]),
}).strict();

export const GoalCreateManyParentInputEnvelopeSchema: z.ZodType<Prisma.GoalCreateManyParentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GoalCreateManyParentInputSchema),z.lazy(() => GoalCreateManyParentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CategoryCreateWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryCreateWithoutGoalsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  parent: z.lazy(() => CategoryCreateNestedOneWithoutSubcategoriesInputSchema).optional(),
  subcategories: z.lazy(() => CategoryCreateNestedManyWithoutParentInputSchema).optional(),
  Technique: z.lazy(() => TechniqueCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutGoalsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  subcategories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryCreateOrConnectWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutGoalsInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutGoalsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutGoalsInputSchema) ]),
}).strict();

export const RequirementCreateWithoutGoalInputSchema: z.ZodType<Prisma.RequirementCreateWithoutGoalInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string(),
  description: z.string(),
  targetCount: z.number().int().optional().nullable(),
  targetMinutes: z.number().int().optional().nullable(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RequirementUncheckedCreateWithoutGoalInputSchema: z.ZodType<Prisma.RequirementUncheckedCreateWithoutGoalInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string(),
  description: z.string(),
  targetCount: z.number().int().optional().nullable(),
  targetMinutes: z.number().int().optional().nullable(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RequirementCreateOrConnectWithoutGoalInputSchema: z.ZodType<Prisma.RequirementCreateOrConnectWithoutGoalInput> = z.object({
  where: z.lazy(() => RequirementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RequirementCreateWithoutGoalInputSchema),z.lazy(() => RequirementUncheckedCreateWithoutGoalInputSchema) ]),
}).strict();

export const RequirementCreateManyGoalInputEnvelopeSchema: z.ZodType<Prisma.RequirementCreateManyGoalInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RequirementCreateManyGoalInputSchema),z.lazy(() => RequirementCreateManyGoalInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TagCreateWithoutGoalInputSchema: z.ZodType<Prisma.TagCreateWithoutGoalInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  techniques: z.lazy(() => TechniqueCreateNestedManyWithoutTagsInputSchema).optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutTagsAddedInputSchema).optional()
}).strict();

export const TagUncheckedCreateWithoutGoalInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutGoalInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  techniques: z.lazy(() => TechniqueUncheckedCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const TagCreateOrConnectWithoutGoalInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutGoalInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutGoalInputSchema),z.lazy(() => TagUncheckedCreateWithoutGoalInputSchema) ]),
}).strict();

export const GoalUpsertWithoutSubgoalsInputSchema: z.ZodType<Prisma.GoalUpsertWithoutSubgoalsInput> = z.object({
  update: z.union([ z.lazy(() => GoalUpdateWithoutSubgoalsInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutSubgoalsInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutSubgoalsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutSubgoalsInputSchema) ]),
  where: z.lazy(() => GoalWhereInputSchema).optional()
}).strict();

export const GoalUpdateToOneWithWhereWithoutSubgoalsInputSchema: z.ZodType<Prisma.GoalUpdateToOneWithWhereWithoutSubgoalsInput> = z.object({
  where: z.lazy(() => GoalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GoalUpdateWithoutSubgoalsInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutSubgoalsInputSchema) ]),
}).strict();

export const GoalUpdateWithoutSubgoalsInputSchema: z.ZodType<Prisma.GoalUpdateWithoutSubgoalsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => GoalUpdateOneWithoutSubgoalsNestedInputSchema).optional(),
  categories: z.lazy(() => CategoryUpdateManyWithoutGoalsNestedInputSchema).optional(),
  requirements: z.lazy(() => RequirementUpdateManyWithoutGoalNestedInputSchema).optional(),
  Tag: z.lazy(() => TagUpdateOneWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateWithoutSubgoalsInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateWithoutSubgoalsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categories: z.lazy(() => CategoryUncheckedUpdateManyWithoutGoalsNestedInputSchema).optional(),
  requirements: z.lazy(() => RequirementUncheckedUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUpsertWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.GoalUpsertWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GoalUpdateWithoutParentInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutParentInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutParentInputSchema),z.lazy(() => GoalUncheckedCreateWithoutParentInputSchema) ]),
}).strict();

export const GoalUpdateWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.GoalUpdateWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateWithoutParentInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutParentInputSchema) ]),
}).strict();

export const GoalUpdateManyWithWhereWithoutParentInputSchema: z.ZodType<Prisma.GoalUpdateManyWithWhereWithoutParentInput> = z.object({
  where: z.lazy(() => GoalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateManyMutationInputSchema),z.lazy(() => GoalUncheckedUpdateManyWithoutParentInputSchema) ]),
}).strict();

export const CategoryUpsertWithWhereUniqueWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryUpsertWithWhereUniqueWithoutGoalsInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CategoryUpdateWithoutGoalsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutGoalsInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutGoalsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutGoalsInputSchema) ]),
}).strict();

export const CategoryUpdateWithWhereUniqueWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutGoalsInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutGoalsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutGoalsInputSchema) ]),
}).strict();

export const CategoryUpdateManyWithWhereWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryUpdateManyWithWhereWithoutGoalsInput> = z.object({
  where: z.lazy(() => CategoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CategoryUpdateManyMutationInputSchema),z.lazy(() => CategoryUncheckedUpdateManyWithoutGoalsInputSchema) ]),
}).strict();

export const RequirementUpsertWithWhereUniqueWithoutGoalInputSchema: z.ZodType<Prisma.RequirementUpsertWithWhereUniqueWithoutGoalInput> = z.object({
  where: z.lazy(() => RequirementWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RequirementUpdateWithoutGoalInputSchema),z.lazy(() => RequirementUncheckedUpdateWithoutGoalInputSchema) ]),
  create: z.union([ z.lazy(() => RequirementCreateWithoutGoalInputSchema),z.lazy(() => RequirementUncheckedCreateWithoutGoalInputSchema) ]),
}).strict();

export const RequirementUpdateWithWhereUniqueWithoutGoalInputSchema: z.ZodType<Prisma.RequirementUpdateWithWhereUniqueWithoutGoalInput> = z.object({
  where: z.lazy(() => RequirementWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RequirementUpdateWithoutGoalInputSchema),z.lazy(() => RequirementUncheckedUpdateWithoutGoalInputSchema) ]),
}).strict();

export const RequirementUpdateManyWithWhereWithoutGoalInputSchema: z.ZodType<Prisma.RequirementUpdateManyWithWhereWithoutGoalInput> = z.object({
  where: z.lazy(() => RequirementScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RequirementUpdateManyMutationInputSchema),z.lazy(() => RequirementUncheckedUpdateManyWithoutGoalInputSchema) ]),
}).strict();

export const RequirementScalarWhereInputSchema: z.ZodType<Prisma.RequirementScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RequirementScalarWhereInputSchema),z.lazy(() => RequirementScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RequirementScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RequirementScalarWhereInputSchema),z.lazy(() => RequirementScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  goalId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  targetMinutes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TagUpsertWithoutGoalInputSchema: z.ZodType<Prisma.TagUpsertWithoutGoalInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutGoalInputSchema),z.lazy(() => TagUncheckedUpdateWithoutGoalInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutGoalInputSchema),z.lazy(() => TagUncheckedCreateWithoutGoalInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutGoalInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutGoalInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutGoalInputSchema),z.lazy(() => TagUncheckedUpdateWithoutGoalInputSchema) ]),
}).strict();

export const TagUpdateWithoutGoalInputSchema: z.ZodType<Prisma.TagUpdateWithoutGoalInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueUpdateManyWithoutTagsNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutTagsAddedNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutGoalInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutGoalInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueUncheckedUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const GoalCreateWithoutRequirementsInputSchema: z.ZodType<Prisma.GoalCreateWithoutRequirementsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  parent: z.lazy(() => GoalCreateNestedOneWithoutSubgoalsInputSchema).optional(),
  subgoals: z.lazy(() => GoalCreateNestedManyWithoutParentInputSchema).optional(),
  categories: z.lazy(() => CategoryCreateNestedManyWithoutGoalsInputSchema).optional(),
  Tag: z.lazy(() => TagCreateNestedOneWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateWithoutRequirementsInputSchema: z.ZodType<Prisma.GoalUncheckedCreateWithoutRequirementsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tagId: z.string().optional().nullable(),
  subgoals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  categories: z.lazy(() => CategoryUncheckedCreateNestedManyWithoutGoalsInputSchema).optional()
}).strict();

export const GoalCreateOrConnectWithoutRequirementsInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutRequirementsInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutRequirementsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutRequirementsInputSchema) ]),
}).strict();

export const GoalUpsertWithoutRequirementsInputSchema: z.ZodType<Prisma.GoalUpsertWithoutRequirementsInput> = z.object({
  update: z.union([ z.lazy(() => GoalUpdateWithoutRequirementsInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutRequirementsInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutRequirementsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutRequirementsInputSchema) ]),
  where: z.lazy(() => GoalWhereInputSchema).optional()
}).strict();

export const GoalUpdateToOneWithWhereWithoutRequirementsInputSchema: z.ZodType<Prisma.GoalUpdateToOneWithWhereWithoutRequirementsInput> = z.object({
  where: z.lazy(() => GoalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GoalUpdateWithoutRequirementsInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutRequirementsInputSchema) ]),
}).strict();

export const GoalUpdateWithoutRequirementsInputSchema: z.ZodType<Prisma.GoalUpdateWithoutRequirementsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => GoalUpdateOneWithoutSubgoalsNestedInputSchema).optional(),
  subgoals: z.lazy(() => GoalUpdateManyWithoutParentNestedInputSchema).optional(),
  categories: z.lazy(() => CategoryUpdateManyWithoutGoalsNestedInputSchema).optional(),
  Tag: z.lazy(() => TagUpdateOneWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateWithoutRequirementsInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateWithoutRequirementsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subgoals: z.lazy(() => GoalUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  categories: z.lazy(() => CategoryUncheckedUpdateManyWithoutGoalsNestedInputSchema).optional()
}).strict();

export const SessionCreateManyAuthorInputSchema: z.ZodType<Prisma.SessionCreateManyAuthorInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date().optional().nullable(),
  time: z.string(),
  type: z.lazy(() => SessionTypeSchema),
  location: z.string().optional().nullable(),
  minutesLength: z.number().int(),
  intensity: z.lazy(() => IntensitySchema),
  notes: z.string().optional().nullable(),
  sparringTime: z.number().int().optional().nullable(),
  drillingTime: z.number().int().optional().nullable(),
  weight: z.number().int().optional().nullable()
}).strict();

export const TechniqueCreateManyCreatedByInputSchema: z.ZodType<Prisma.TechniqueCreateManyCreatedByInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable(),
  categoryId: z.string().optional().nullable()
}).strict();

export const TagCreateManyCreatedByInputSchema: z.ZodType<Prisma.TagCreateManyCreatedByInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable()
}).strict();

export const SessionUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUpdateWithoutAuthorInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => SessionTechniqueUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SessionTypeSchema),z.lazy(() => EnumSessionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minutesLength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intensity: z.union([ z.lazy(() => IntensitySchema),z.lazy(() => EnumIntensityFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sparringTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TechniqueUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUpdateManyWithoutTechniqueNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutTechniquesNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutTechniqueNestedInputSchema).optional()
}).strict();

export const TechniqueUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutTechniquesNestedInputSchema).optional()
}).strict();

export const TechniqueUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TagUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueUpdateManyWithoutTagsNestedInputSchema).optional(),
  Goal: z.lazy(() => GoalUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techniques: z.lazy(() => TechniqueUncheckedUpdateManyWithoutTagsNestedInputSchema).optional(),
  Goal: z.lazy(() => GoalUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GoalCreateManyTagInputSchema: z.ZodType<Prisma.GoalCreateManyTagInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TechniqueUpdateWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUpdateManyWithoutTechniqueNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutTechniquesAddedNestedInputSchema).optional(),
  Category: z.lazy(() => CategoryUpdateOneWithoutTechniqueNestedInputSchema).optional()
}).strict();

export const TechniqueUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInputSchema).optional()
}).strict();

export const TechniqueUncheckedUpdateManyWithoutTagsInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutTagsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GoalUpdateWithoutTagInputSchema: z.ZodType<Prisma.GoalUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => GoalUpdateOneWithoutSubgoalsNestedInputSchema).optional(),
  subgoals: z.lazy(() => GoalUpdateManyWithoutParentNestedInputSchema).optional(),
  categories: z.lazy(() => CategoryUpdateManyWithoutGoalsNestedInputSchema).optional(),
  requirements: z.lazy(() => RequirementUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subgoals: z.lazy(() => GoalUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  categories: z.lazy(() => CategoryUncheckedUpdateManyWithoutGoalsNestedInputSchema).optional(),
  requirements: z.lazy(() => RequirementUncheckedUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutTagInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryCreateManyParentInputSchema: z.ZodType<Prisma.CategoryCreateManyParentInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TechniqueCreateManyCategoryInputSchema: z.ZodType<Prisma.TechniqueCreateManyCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.lazy(() => TechniqueTypeSchema),
  videoUrl: z.string().optional().nullable(),
  giOnly: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  recommendedBelts: z.lazy(() => BeltsSchema).optional().nullable()
}).strict();

export const CategoryUpdateWithoutParentInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutParentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subcategories: z.lazy(() => CategoryUpdateManyWithoutParentNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateWithoutParentInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutParentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subcategories: z.lazy(() => CategoryUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateManyWithoutParentInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyWithoutParentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GoalUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalUpdateWithoutCategoriesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => GoalUpdateOneWithoutSubgoalsNestedInputSchema).optional(),
  subgoals: z.lazy(() => GoalUpdateManyWithoutParentNestedInputSchema).optional(),
  requirements: z.lazy(() => RequirementUpdateManyWithoutGoalNestedInputSchema).optional(),
  Tag: z.lazy(() => TagUpdateOneWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateWithoutCategoriesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subgoals: z.lazy(() => GoalUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  requirements: z.lazy(() => RequirementUncheckedUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateManyWithoutCategoriesInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutCategoriesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TechniqueUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUpdateManyWithoutTechniqueNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutTechniquesNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneWithoutTechniquesAddedNestedInputSchema).optional()
}).strict();

export const TechniqueUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Session: z.lazy(() => SessionTechniqueUncheckedUpdateManyWithoutTechniqueNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutTechniquesNestedInputSchema).optional()
}).strict();

export const TechniqueUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.TechniqueUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => TechniqueTypeSchema),z.lazy(() => EnumTechniqueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  giOnly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recommendedBelts: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => NullableEnumBeltsFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionTechniqueCreateManySessionInputSchema: z.ZodType<Prisma.SessionTechniqueCreateManySessionInput> = z.object({
  id: z.string().uuid().optional(),
  techniqueId: z.string(),
  notes: z.string().optional().nullable(),
  drillingTime: z.number().int().optional().nullable()
}).strict();

export const SessionTechniqueUpdateWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  technique: z.lazy(() => TechniqueUpdateOneRequiredWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionTechniqueUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techniqueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionTechniqueUncheckedUpdateManyWithoutSessionInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateManyWithoutSessionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techniqueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionTechniqueCreateManyTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueCreateManyTechniqueInput> = z.object({
  id: z.string().uuid().optional(),
  sessionId: z.number().int(),
  notes: z.string().optional().nullable(),
  drillingTime: z.number().int().optional().nullable()
}).strict();

export const SessionTechniqueUpdateWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUpdateWithoutTechniqueInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session: z.lazy(() => SessionUpdateOneRequiredWithoutTechniquesNestedInputSchema).optional()
}).strict();

export const SessionTechniqueUncheckedUpdateWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateWithoutTechniqueInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionTechniqueUncheckedUpdateManyWithoutTechniqueInputSchema: z.ZodType<Prisma.SessionTechniqueUncheckedUpdateManyWithoutTechniqueInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drillingTime: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TagUpdateWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUpdateWithoutTechniquesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.lazy(() => UserUpdateOneWithoutTagsAddedNestedInputSchema).optional(),
  Goal: z.lazy(() => GoalUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutTechniquesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Goal: z.lazy(() => GoalUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateManyWithoutTechniquesInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutTechniquesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GoalCreateManyParentInputSchema: z.ZodType<Prisma.GoalCreateManyParentInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  isMilestone: z.boolean().optional(),
  currentProgress: z.number().int().optional(),
  weight: z.number().int().optional().nullable(),
  difficulty: z.lazy(() => DifficultyLevelSchema),
  suggestedLevels: z.lazy(() => BeltsSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tagId: z.string().optional().nullable()
}).strict();

export const RequirementCreateManyGoalInputSchema: z.ZodType<Prisma.RequirementCreateManyGoalInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string(),
  description: z.string(),
  targetCount: z.number().int().optional().nullable(),
  targetMinutes: z.number().int().optional().nullable(),
  completed: z.boolean().optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const GoalUpdateWithoutParentInputSchema: z.ZodType<Prisma.GoalUpdateWithoutParentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subgoals: z.lazy(() => GoalUpdateManyWithoutParentNestedInputSchema).optional(),
  categories: z.lazy(() => CategoryUpdateManyWithoutGoalsNestedInputSchema).optional(),
  requirements: z.lazy(() => RequirementUpdateManyWithoutGoalNestedInputSchema).optional(),
  Tag: z.lazy(() => TagUpdateOneWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateWithoutParentInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateWithoutParentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  subgoals: z.lazy(() => GoalUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  categories: z.lazy(() => CategoryUncheckedUpdateManyWithoutGoalsNestedInputSchema).optional(),
  requirements: z.lazy(() => RequirementUncheckedUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateManyWithoutParentInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutParentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isMilestone: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  currentProgress: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  difficulty: z.union([ z.lazy(() => DifficultyLevelSchema),z.lazy(() => EnumDifficultyLevelFieldUpdateOperationsInputSchema) ]).optional(),
  suggestedLevels: z.union([ z.lazy(() => BeltsSchema),z.lazy(() => EnumBeltsFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CategoryUpdateWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutGoalsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => CategoryUpdateOneWithoutSubcategoriesNestedInputSchema).optional(),
  subcategories: z.lazy(() => CategoryUpdateManyWithoutParentNestedInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutGoalsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  subcategories: z.lazy(() => CategoryUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  Technique: z.lazy(() => TechniqueUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateManyWithoutGoalsInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyWithoutGoalsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RequirementUpdateWithoutGoalInputSchema: z.ZodType<Prisma.RequirementUpdateWithoutGoalInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetMinutes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RequirementUncheckedUpdateWithoutGoalInputSchema: z.ZodType<Prisma.RequirementUncheckedUpdateWithoutGoalInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetMinutes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RequirementUncheckedUpdateManyWithoutGoalInputSchema: z.ZodType<Prisma.RequirementUncheckedUpdateManyWithoutGoalInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetMinutes: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
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

export const SessionTechniqueFindFirstArgsSchema: z.ZodType<Prisma.SessionTechniqueFindFirstArgs> = z.object({
  select: SessionTechniqueSelectSchema.optional(),
  include: SessionTechniqueIncludeSchema.optional(),
  where: SessionTechniqueWhereInputSchema.optional(),
  orderBy: z.union([ SessionTechniqueOrderByWithRelationInputSchema.array(),SessionTechniqueOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionTechniqueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionTechniqueScalarFieldEnumSchema,SessionTechniqueScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionTechniqueFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionTechniqueFindFirstOrThrowArgs> = z.object({
  select: SessionTechniqueSelectSchema.optional(),
  include: SessionTechniqueIncludeSchema.optional(),
  where: SessionTechniqueWhereInputSchema.optional(),
  orderBy: z.union([ SessionTechniqueOrderByWithRelationInputSchema.array(),SessionTechniqueOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionTechniqueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionTechniqueScalarFieldEnumSchema,SessionTechniqueScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionTechniqueFindManyArgsSchema: z.ZodType<Prisma.SessionTechniqueFindManyArgs> = z.object({
  select: SessionTechniqueSelectSchema.optional(),
  include: SessionTechniqueIncludeSchema.optional(),
  where: SessionTechniqueWhereInputSchema.optional(),
  orderBy: z.union([ SessionTechniqueOrderByWithRelationInputSchema.array(),SessionTechniqueOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionTechniqueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionTechniqueScalarFieldEnumSchema,SessionTechniqueScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionTechniqueAggregateArgsSchema: z.ZodType<Prisma.SessionTechniqueAggregateArgs> = z.object({
  where: SessionTechniqueWhereInputSchema.optional(),
  orderBy: z.union([ SessionTechniqueOrderByWithRelationInputSchema.array(),SessionTechniqueOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionTechniqueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionTechniqueGroupByArgsSchema: z.ZodType<Prisma.SessionTechniqueGroupByArgs> = z.object({
  where: SessionTechniqueWhereInputSchema.optional(),
  orderBy: z.union([ SessionTechniqueOrderByWithAggregationInputSchema.array(),SessionTechniqueOrderByWithAggregationInputSchema ]).optional(),
  by: SessionTechniqueScalarFieldEnumSchema.array(),
  having: SessionTechniqueScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionTechniqueFindUniqueArgsSchema: z.ZodType<Prisma.SessionTechniqueFindUniqueArgs> = z.object({
  select: SessionTechniqueSelectSchema.optional(),
  include: SessionTechniqueIncludeSchema.optional(),
  where: SessionTechniqueWhereUniqueInputSchema,
}).strict() ;

export const SessionTechniqueFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionTechniqueFindUniqueOrThrowArgs> = z.object({
  select: SessionTechniqueSelectSchema.optional(),
  include: SessionTechniqueIncludeSchema.optional(),
  where: SessionTechniqueWhereUniqueInputSchema,
}).strict() ;

export const GoalFindFirstArgsSchema: z.ZodType<Prisma.GoalFindFirstArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GoalScalarFieldEnumSchema,GoalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GoalFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GoalFindFirstOrThrowArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GoalScalarFieldEnumSchema,GoalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GoalFindManyArgsSchema: z.ZodType<Prisma.GoalFindManyArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GoalScalarFieldEnumSchema,GoalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GoalAggregateArgsSchema: z.ZodType<Prisma.GoalAggregateArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GoalGroupByArgsSchema: z.ZodType<Prisma.GoalGroupByArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithAggregationInputSchema.array(),GoalOrderByWithAggregationInputSchema ]).optional(),
  by: GoalScalarFieldEnumSchema.array(),
  having: GoalScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GoalFindUniqueArgsSchema: z.ZodType<Prisma.GoalFindUniqueArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const GoalFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GoalFindUniqueOrThrowArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const RequirementFindFirstArgsSchema: z.ZodType<Prisma.RequirementFindFirstArgs> = z.object({
  select: RequirementSelectSchema.optional(),
  include: RequirementIncludeSchema.optional(),
  where: RequirementWhereInputSchema.optional(),
  orderBy: z.union([ RequirementOrderByWithRelationInputSchema.array(),RequirementOrderByWithRelationInputSchema ]).optional(),
  cursor: RequirementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RequirementScalarFieldEnumSchema,RequirementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RequirementFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RequirementFindFirstOrThrowArgs> = z.object({
  select: RequirementSelectSchema.optional(),
  include: RequirementIncludeSchema.optional(),
  where: RequirementWhereInputSchema.optional(),
  orderBy: z.union([ RequirementOrderByWithRelationInputSchema.array(),RequirementOrderByWithRelationInputSchema ]).optional(),
  cursor: RequirementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RequirementScalarFieldEnumSchema,RequirementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RequirementFindManyArgsSchema: z.ZodType<Prisma.RequirementFindManyArgs> = z.object({
  select: RequirementSelectSchema.optional(),
  include: RequirementIncludeSchema.optional(),
  where: RequirementWhereInputSchema.optional(),
  orderBy: z.union([ RequirementOrderByWithRelationInputSchema.array(),RequirementOrderByWithRelationInputSchema ]).optional(),
  cursor: RequirementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RequirementScalarFieldEnumSchema,RequirementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RequirementAggregateArgsSchema: z.ZodType<Prisma.RequirementAggregateArgs> = z.object({
  where: RequirementWhereInputSchema.optional(),
  orderBy: z.union([ RequirementOrderByWithRelationInputSchema.array(),RequirementOrderByWithRelationInputSchema ]).optional(),
  cursor: RequirementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RequirementGroupByArgsSchema: z.ZodType<Prisma.RequirementGroupByArgs> = z.object({
  where: RequirementWhereInputSchema.optional(),
  orderBy: z.union([ RequirementOrderByWithAggregationInputSchema.array(),RequirementOrderByWithAggregationInputSchema ]).optional(),
  by: RequirementScalarFieldEnumSchema.array(),
  having: RequirementScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RequirementFindUniqueArgsSchema: z.ZodType<Prisma.RequirementFindUniqueArgs> = z.object({
  select: RequirementSelectSchema.optional(),
  include: RequirementIncludeSchema.optional(),
  where: RequirementWhereUniqueInputSchema,
}).strict() ;

export const RequirementFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RequirementFindUniqueOrThrowArgs> = z.object({
  select: RequirementSelectSchema.optional(),
  include: RequirementIncludeSchema.optional(),
  where: RequirementWhereUniqueInputSchema,
}).strict() ;

export const AchievementFindFirstArgsSchema: z.ZodType<Prisma.AchievementFindFirstArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  where: AchievementWhereInputSchema.optional(),
  orderBy: z.union([ AchievementOrderByWithRelationInputSchema.array(),AchievementOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AchievementScalarFieldEnumSchema,AchievementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AchievementFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AchievementFindFirstOrThrowArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  where: AchievementWhereInputSchema.optional(),
  orderBy: z.union([ AchievementOrderByWithRelationInputSchema.array(),AchievementOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AchievementScalarFieldEnumSchema,AchievementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AchievementFindManyArgsSchema: z.ZodType<Prisma.AchievementFindManyArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  where: AchievementWhereInputSchema.optional(),
  orderBy: z.union([ AchievementOrderByWithRelationInputSchema.array(),AchievementOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AchievementScalarFieldEnumSchema,AchievementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AchievementAggregateArgsSchema: z.ZodType<Prisma.AchievementAggregateArgs> = z.object({
  where: AchievementWhereInputSchema.optional(),
  orderBy: z.union([ AchievementOrderByWithRelationInputSchema.array(),AchievementOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AchievementGroupByArgsSchema: z.ZodType<Prisma.AchievementGroupByArgs> = z.object({
  where: AchievementWhereInputSchema.optional(),
  orderBy: z.union([ AchievementOrderByWithAggregationInputSchema.array(),AchievementOrderByWithAggregationInputSchema ]).optional(),
  by: AchievementScalarFieldEnumSchema.array(),
  having: AchievementScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AchievementFindUniqueArgsSchema: z.ZodType<Prisma.AchievementFindUniqueArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  where: AchievementWhereUniqueInputSchema,
}).strict() ;

export const AchievementFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AchievementFindUniqueOrThrowArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  where: AchievementWhereUniqueInputSchema,
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

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
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

export const SessionTechniqueCreateArgsSchema: z.ZodType<Prisma.SessionTechniqueCreateArgs> = z.object({
  select: SessionTechniqueSelectSchema.optional(),
  include: SessionTechniqueIncludeSchema.optional(),
  data: z.union([ SessionTechniqueCreateInputSchema,SessionTechniqueUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionTechniqueUpsertArgsSchema: z.ZodType<Prisma.SessionTechniqueUpsertArgs> = z.object({
  select: SessionTechniqueSelectSchema.optional(),
  include: SessionTechniqueIncludeSchema.optional(),
  where: SessionTechniqueWhereUniqueInputSchema,
  create: z.union([ SessionTechniqueCreateInputSchema,SessionTechniqueUncheckedCreateInputSchema ]),
  update: z.union([ SessionTechniqueUpdateInputSchema,SessionTechniqueUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionTechniqueCreateManyArgsSchema: z.ZodType<Prisma.SessionTechniqueCreateManyArgs> = z.object({
  data: z.union([ SessionTechniqueCreateManyInputSchema,SessionTechniqueCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionTechniqueDeleteArgsSchema: z.ZodType<Prisma.SessionTechniqueDeleteArgs> = z.object({
  select: SessionTechniqueSelectSchema.optional(),
  include: SessionTechniqueIncludeSchema.optional(),
  where: SessionTechniqueWhereUniqueInputSchema,
}).strict() ;

export const SessionTechniqueUpdateArgsSchema: z.ZodType<Prisma.SessionTechniqueUpdateArgs> = z.object({
  select: SessionTechniqueSelectSchema.optional(),
  include: SessionTechniqueIncludeSchema.optional(),
  data: z.union([ SessionTechniqueUpdateInputSchema,SessionTechniqueUncheckedUpdateInputSchema ]),
  where: SessionTechniqueWhereUniqueInputSchema,
}).strict() ;

export const SessionTechniqueUpdateManyArgsSchema: z.ZodType<Prisma.SessionTechniqueUpdateManyArgs> = z.object({
  data: z.union([ SessionTechniqueUpdateManyMutationInputSchema,SessionTechniqueUncheckedUpdateManyInputSchema ]),
  where: SessionTechniqueWhereInputSchema.optional(),
}).strict() ;

export const SessionTechniqueDeleteManyArgsSchema: z.ZodType<Prisma.SessionTechniqueDeleteManyArgs> = z.object({
  where: SessionTechniqueWhereInputSchema.optional(),
}).strict() ;

export const GoalCreateArgsSchema: z.ZodType<Prisma.GoalCreateArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  data: z.union([ GoalCreateInputSchema,GoalUncheckedCreateInputSchema ]),
}).strict() ;

export const GoalUpsertArgsSchema: z.ZodType<Prisma.GoalUpsertArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
  create: z.union([ GoalCreateInputSchema,GoalUncheckedCreateInputSchema ]),
  update: z.union([ GoalUpdateInputSchema,GoalUncheckedUpdateInputSchema ]),
}).strict() ;

export const GoalCreateManyArgsSchema: z.ZodType<Prisma.GoalCreateManyArgs> = z.object({
  data: z.union([ GoalCreateManyInputSchema,GoalCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GoalDeleteArgsSchema: z.ZodType<Prisma.GoalDeleteArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const GoalUpdateArgsSchema: z.ZodType<Prisma.GoalUpdateArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  data: z.union([ GoalUpdateInputSchema,GoalUncheckedUpdateInputSchema ]),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const GoalUpdateManyArgsSchema: z.ZodType<Prisma.GoalUpdateManyArgs> = z.object({
  data: z.union([ GoalUpdateManyMutationInputSchema,GoalUncheckedUpdateManyInputSchema ]),
  where: GoalWhereInputSchema.optional(),
}).strict() ;

export const GoalDeleteManyArgsSchema: z.ZodType<Prisma.GoalDeleteManyArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
}).strict() ;

export const RequirementCreateArgsSchema: z.ZodType<Prisma.RequirementCreateArgs> = z.object({
  select: RequirementSelectSchema.optional(),
  include: RequirementIncludeSchema.optional(),
  data: z.union([ RequirementCreateInputSchema,RequirementUncheckedCreateInputSchema ]),
}).strict() ;

export const RequirementUpsertArgsSchema: z.ZodType<Prisma.RequirementUpsertArgs> = z.object({
  select: RequirementSelectSchema.optional(),
  include: RequirementIncludeSchema.optional(),
  where: RequirementWhereUniqueInputSchema,
  create: z.union([ RequirementCreateInputSchema,RequirementUncheckedCreateInputSchema ]),
  update: z.union([ RequirementUpdateInputSchema,RequirementUncheckedUpdateInputSchema ]),
}).strict() ;

export const RequirementCreateManyArgsSchema: z.ZodType<Prisma.RequirementCreateManyArgs> = z.object({
  data: z.union([ RequirementCreateManyInputSchema,RequirementCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RequirementDeleteArgsSchema: z.ZodType<Prisma.RequirementDeleteArgs> = z.object({
  select: RequirementSelectSchema.optional(),
  include: RequirementIncludeSchema.optional(),
  where: RequirementWhereUniqueInputSchema,
}).strict() ;

export const RequirementUpdateArgsSchema: z.ZodType<Prisma.RequirementUpdateArgs> = z.object({
  select: RequirementSelectSchema.optional(),
  include: RequirementIncludeSchema.optional(),
  data: z.union([ RequirementUpdateInputSchema,RequirementUncheckedUpdateInputSchema ]),
  where: RequirementWhereUniqueInputSchema,
}).strict() ;

export const RequirementUpdateManyArgsSchema: z.ZodType<Prisma.RequirementUpdateManyArgs> = z.object({
  data: z.union([ RequirementUpdateManyMutationInputSchema,RequirementUncheckedUpdateManyInputSchema ]),
  where: RequirementWhereInputSchema.optional(),
}).strict() ;

export const RequirementDeleteManyArgsSchema: z.ZodType<Prisma.RequirementDeleteManyArgs> = z.object({
  where: RequirementWhereInputSchema.optional(),
}).strict() ;

export const AchievementCreateArgsSchema: z.ZodType<Prisma.AchievementCreateArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  data: z.union([ AchievementCreateInputSchema,AchievementUncheckedCreateInputSchema ]),
}).strict() ;

export const AchievementUpsertArgsSchema: z.ZodType<Prisma.AchievementUpsertArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  where: AchievementWhereUniqueInputSchema,
  create: z.union([ AchievementCreateInputSchema,AchievementUncheckedCreateInputSchema ]),
  update: z.union([ AchievementUpdateInputSchema,AchievementUncheckedUpdateInputSchema ]),
}).strict() ;

export const AchievementCreateManyArgsSchema: z.ZodType<Prisma.AchievementCreateManyArgs> = z.object({
  data: z.union([ AchievementCreateManyInputSchema,AchievementCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AchievementDeleteArgsSchema: z.ZodType<Prisma.AchievementDeleteArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  where: AchievementWhereUniqueInputSchema,
}).strict() ;

export const AchievementUpdateArgsSchema: z.ZodType<Prisma.AchievementUpdateArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  data: z.union([ AchievementUpdateInputSchema,AchievementUncheckedUpdateInputSchema ]),
  where: AchievementWhereUniqueInputSchema,
}).strict() ;

export const AchievementUpdateManyArgsSchema: z.ZodType<Prisma.AchievementUpdateManyArgs> = z.object({
  data: z.union([ AchievementUpdateManyMutationInputSchema,AchievementUncheckedUpdateManyInputSchema ]),
  where: AchievementWhereInputSchema.optional(),
}).strict() ;

export const AchievementDeleteManyArgsSchema: z.ZodType<Prisma.AchievementDeleteManyArgs> = z.object({
  where: AchievementWhereInputSchema.optional(),
}).strict() ;