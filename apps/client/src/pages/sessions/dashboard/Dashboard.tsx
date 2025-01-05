import { Separator } from '@/components/ui/Separator';
import { GoalProgressIndicator } from '@/pages/sessions/dashboard/subcomponents/GoalProgressIndicator';
import { StatisticsRightPanel } from '@/pages/sessions/dashboard/subcomponents/statisticsRightPanel/StatisticsRightPanel';
import { SessionTypePicker } from '@/pages/sessions/dashboard/subcomponents/statisticsRightPanel/subcomponents/SessionTypePicker';
import { trpc } from '@/utils/trpc';
import { useUser } from '@clerk/clerk-react';
import { SessionType } from '@mativated-monorepo/shared/types';
import { SessionsSection } from 'pages/sessions/common/SessionsSection';
import { FormProvider, useForm } from 'react-hook-form';
import { totalSessionTypeLabelDictionary } from 'utils/constants';
import { Statistics } from './subcomponents/Statistics';

export const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const defaultValues: Record<'type', SessionType> = {
    type: 'TOTAL',
  };
  if (!user?.id) return <></>;

  const methods = useForm<any>({
    defaultValues: defaultValues,
  });
  const { watch } = methods;

  const { data: statistics } = trpc.sessions.getSessionSpecificStats.useQuery({
    authorId: user.id,
  });

  return (
    <SessionsSection className="flex max-h-screen items-stretch ">
      <div className="bg-transparent  hidden lg:flex flex-1 p-2 xl:p-10 flex-col gap-3  animate-in fade-in slide-in-from-left duration-400 ">
        <div className="flex justify-between gap-10 items-center mx-2 pt-navHeight">
          <h1 className=" text-white text-5xl tracking-tighter font-extralight flex-1">Dashboard</h1>{' '}
          <FormProvider {...methods}>
            <form className="flex flex-1 flex-col items-center  basis-[60%]">
              <SessionTypePicker />
            </form>
          </FormProvider>
        </div>
        <h1 className="mx-3  text-2xl -mt-3 text-zinc-300">
          <span className="text-zinc-100  font-bold ">
            {totalSessionTypeLabelDictionary.find((obj) => obj.type === watch('type'))?.label}{' '}
          </span>
          statistics
        </h1>
        <Separator className="bg-white w-64 mt-2 mb-6" />

        <div className="flex w-full h-full overflow-hidden relative">
          <Statistics statistics={statistics} />
          <div className="bottom-0 flex justify-end items-end max-w-64">
            <GoalProgressIndicator />
          </div>
        </div>
      </div>
      <StatisticsRightPanel />
    </SessionsSection>
  );
};
