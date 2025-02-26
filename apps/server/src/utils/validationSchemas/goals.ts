// import {z} from 'zod';
// import {Belts, DifficultyLevel, RequirementType} from '@prisma/client';
//
// // Input schema for fetching goals
// export const GetGoalsInputSchema = z.object({
//   authorId: z.string().optional(),
// });
//
// // Output schema for returning goals
// export const GetGoalsOutputSchema = z.array(
//   z.object({
//     id: z.string(),
//     name: z.string(),
//     slug: z.string(),
//     description: z.string().nullable(),
//     parentId: z.string().nullable(),
//     isMilestone: z.boolean(),
//     currentProgress: z.number(),
//     weight: z.number().nullable(),
//     difficulty: z.nativeEnum(DifficultyLevel),
//     suggestedLevels: z.array(z.nativeEnum(Belts)),
//     createdAt: z.date(),
//     updatedAt: z.date(),
//   })
// );
//
// // Schema for adding a goal
// export const AddGoalSchema = z.object({
//   name: z.string().min(3).max(255),
//   slug: z.string().min(3).max(255),
//   description: z.string().optional(),
//   parentId: z.string().optional().nullable(),
//   isMilestone: z.boolean().default(false),
//   currentProgress: z.number().default(0),
//   weight: z.number().optional().nullable(),
//   difficulty: z.nativeEnum(DifficultyLevel),
//   suggestedLevels: z.array(z.nativeEnum(Belts)).optional(),
//   requirements: z
//     .array(
//       z.object({
//         type: z.nativeEnum(RequirementType),
//         description: z.string(),
//         targetCount: z.number().optional(),
//         targetMinutes: z.number().optional(),
//         completed: z.boolean().default(false),
//       })
//     )
//     .optional(),
// });
