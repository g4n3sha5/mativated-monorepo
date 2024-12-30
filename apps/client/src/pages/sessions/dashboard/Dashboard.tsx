import { Separator } from '@/components/ui/Separator';
import { SessionsSection } from 'pages/sessions/common/SessionsSection';
import { StatisticsRightPanel } from '@/pages/sessions/dashboard/subcomponents/statisticsRightPanel/StatisticsRightPanel';
import { SessionTypePicker } from '@/pages/sessions/dashboard/subcomponents/statisticsRightPanel/subcomponents/SessionTypePicker';
import { FormProvider, useForm } from 'react-hook-form';
import { sessionTypeIconDictionary, totalSessionTypeLabelDictionary } from 'utils/constants';
import { SessionTypeIcon } from 'components/ui/SessionTypeIcon';
import { GoalProgressIndicator } from '@/pages/sessions/dashboard/subcomponents/GoalProgressIndicator';
import { SessionType } from '@mativated-monorepo/shared/types';
import { trpc } from '@/utils/trpc';
import { useUser } from '@clerk/clerk-react';

const statistics = [
  {
    label: (
      <div className="text-center">
        <span className="font-semibold">Daily</span> <span className="tracking-tightest">Average</span>
      </div>
    ),
    value: <span>64</span>,
  },
  {
    label: (
      <div className="text-center">
        <span className="font-semibold">Weekly</span> <span className="tracking-tightest"> Average</span>
      </div>
    ),
    value: <span>32</span>,
  },
  {
    label: (
      <div className="text-center">
        <span className="font-semibold">Monthly</span> <span className="tracking-tightest"> Average</span>
      </div>
    ),
    value: <span>16</span>,
  },
  {
    label: (
      <div className="text-center">
        <span className="font-semibold">Yearly</span> <span className="tracking-tightest"> Average</span>
      </div>
    ),
    value: <span>164</span>,
  },
  {
    label: (
      <div className="text-center">
        Longest <span className="font-semibold">Streak</span>
      </div>
    ),
    value: <span>125</span>,
  },
  {
    label: (
      <div className="text-center">
        Current <span className="font-semibold">Streak</span>
      </div>
    ),
    value: <span>645</span>,
  },
  {
    label: (
      <>
        Most <span className="font-semibold">Trained</span>
      </>
    ),
    value: (
      <span>
        <SessionTypeIcon className="fill-black stroke-black w-8 h-8" type="GI" />
        60%
      </span>
    ),
  },
  {
    label: (
      <>
        Most <span className="font-semibold">Trained</span>
      </>
    ),
    value: (
      <span>
        <SessionTypeIcon className="fill-black stroke-black w-8 h-8" type="GI" />
        60%
      </span>
    ),
  },
];

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

  const { data, isError, isLoading } = trpc.sessions.getSessionSpecificStats.useQuery({
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
          <div className="flex  flex-wrap  overflow-hidden  gap-3 justify-center xl:justify-start items-start  h-max w-full xl:gap-x-10">
            {statistics.map((statistic) => {
              return (
                <div className="flex bg-white w-24 h-24 xl:w-32 xl:h-32 2xl:h-32 2xl:w-40 rounded-lg p-1 2xl:p-4 flex-col justify-around items-center">
                  <div> {statistic.label} </div>
                  <span className="font-bold text-3xl tracking-wide">{statistic.value}</span>
                </div>
              );
            })}
          </div>
          <div className="bottom-0 flex justify-end items-end max-w-64">
            <GoalProgressIndicator />
          </div>
        </div>
      </div>
      <StatisticsRightPanel />
    </SessionsSection>
  );
};
