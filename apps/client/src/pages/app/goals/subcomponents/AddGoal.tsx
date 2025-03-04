import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Input} from 'components/ui/Input';
import {Textarea} from 'components/ui/Textarea';

interface Props {
  setIsShownRightPanel: (shown: boolean) => void;
}

x;
const goalSchema = z.object({
  name: z.string().min(3, 'Goal name must be at least 3 characters'),
  description: z.string().optional(),
  isMilestone: z.boolean().default(false),
  // difficulty: z.enum(difficultyLevels, { errorMap: () => ({ message: 'Invalid difficulty level' }) }),
  // suggestedLevels: z.array(z.enum(belts)).optional(),
});

type GoalFormValues = z.infer<typeof goalSchema>;

export const AddGoal = () => {
  const methods = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: '',
      description: '',
      isMilestone: false,
      // difficulty: 'FOUNDATIONAL',
      // suggestedLevels: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: GoalFormValues) => {
    console.log('Form submitted:', data);
    // TODO: Add API submission logic here
  };

  return (
    <div className="flex flex-col w-full text-white pt-navHeight pl-8 pb-10 pr-5 overflow-y-scroll">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-8">
        <div className="w-full flex justify-between items-center pl-2">
          <h1 className="text-2xl font-semibold mb-4 pt-4">Add a Goal</h1>
        </div>

        <div className="flex w-2/3 flex-col">
          <hr className="border-cyan-500 mb-4 w-1/2" />

          <Input
            placeholder="Goal Name"
            {...register('name')}
            className="w-2/3 p-2 border border-gray-600 rounded-lg mb-3 bg-indigo-100 text-black"
          />
          {/*{errors.name && <p className="text-red-400">{errors.name.message}</p>}*/}

          <Textarea
            placeholder="Goal info / tips / video link..."
            {...register('description')}
            className="w-full p-3 border border-gray-600 rounded-lg bg-indigo-200 min-h-24 resize-none text-black"
          />

          <label className="block text-gray-700 font-bold mt-4">Difficulty</label>
          <select
            {/*{...register('difficulty')}*/}
            className="w-2/3 p-2 border border-gray-600 rounded-lg bg-indigo-100 text-black"
          >
            {/*{difficultyLevels.map((level) => (*/}
            {/*  <option key={level} value={level}>*/}
            {/*    {level}*/}
            {/*  </option>*/}
            {/*))}*/}
          </select>
        </div>
      </form>
    </div>
  );
};
