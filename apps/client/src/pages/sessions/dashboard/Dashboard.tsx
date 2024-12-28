import { Separator } from '@/components/ui/Separator';
import { SessionsSection } from 'pages/sessions/common/SessionsSection';

import { StatisticsRightPanel } from '@/pages/sessions/dashboard/subcomponents/statisticsPanel/StatisticsRightPanel';
import { SessionTypePicker } from '@/pages/sessions/dashboard/subcomponents/statisticsPanel/subcomponents/SessionTypePicker';
import { FormProvider, useForm } from 'react-hook-form';
import { sessionTypeIconDictionary } from 'utils/constants';
import { SessionTypeIcon } from 'components/ui/SessionTypeIcon';

export const Dashboard = () => {
  const defaultValues = {
    type: '',
  };

  const methods = useForm<any>({
    defaultValues: defaultValues,
  });

  const statistics = [
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Daily</span> <span className="tracking-tightest">Average Session Time</span>
        </div>
      ),
      value: <span>64</span>,
    },
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Weekly</span> <span className="tracking-tightest"> Average Session Time</span>
        </div>
      ),
      value: <span>32</span>,
    },
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Monthly</span>{' '}
          <span className="tracking-tightest"> Average Session Time</span>
        </div>
      ),
      value: <span>16</span>,
    },
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Year</span> <span className="tracking-tightest"> Average Session Time</span>
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

  return (
    <SessionsSection className="flex h-screen">
      <div className="bg-transparent  hidden lg:flex flex-1 p-10 pt-navHeight  h-full flex-col gap-3">
        <div className="flex justify-between gap-10">
          <h1 className="text-white text-5xl tracking-tighter">Dashboard</h1>{' '}
          <FormProvider {...methods}>
            <form className="flex flex-col items-center">
              <SessionTypePicker />
            </form>
          </FormProvider>
        </div>
        <Separator className="bg-white w-64 mt-2 mb-6" />

        <div className="flex break-before-all flex-wrap overflow-hidden flex-col gap-3 justify-start items-start  h-full">
          {statistics.map((statistic) => {
            return (
              <div className="flex bg-white w-32 h-32 2xl:h-48 2xl:w-64 rounded-lg p-1 2xl:p-4 flex-col justify-around items-center">
                <div> {statistic.label} </div>
                <span className="font-bold text-3xl tracking-wide">{statistic.value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <StatisticsRightPanel />
    </SessionsSection>
  );
};
