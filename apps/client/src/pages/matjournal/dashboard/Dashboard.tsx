import { Separator } from '@/components/ui/Separator';
import { MatJournalSection } from '@/pages/matjournal/common/MatJournalSection';

import { StatisticsRightPanel } from '@/pages/matjournal/dashboard/subcomponents/statisticsPanel/StatisticsRightPanel';
import { SessionTypePicker } from '@/pages/matjournal/dashboard/subcomponents/statisticsPanel/subcomponents/SessionTypePicker';
import { FormProvider, useForm } from 'react-hook-form';

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
        <>
          <span className="font-semibold">Daily</span> Average Session Time
        </>
      ),
      value: 64,
    },
    {
      label: (
        <>
          <span className="font-semibold">Weekly</span> Average Session Time
        </>
      ),
      value: 32,
    },
    {
      label: (
        <>
          <span className="font-semibold">Monthly</span> Average Session Time
        </>
      ),
      value: 16,
    },
    {
      label: (
        <>
          <span className="font-semibold">Year</span> Average Session Time
        </>
      ),
      value: 128,
    },
    {
      label: (
        <>
          Longest <span className="font-semibold">Streak</span>
        </>
      ),
      value: 128,
    },
    {
      label: (
        <>
          Current <span className="font-semibold">Streak</span>
        </>
      ),
      value: 128,
    },
    {
      label: (
        <>
          Most <span className="font-semibold">Trained</span>
        </>
      ),
      value: 'GI - 60%',
    },
    {
      label: (
        <>
          Most <span className="font-semibold">Trained</span>
        </>
      ),
      value: 'GI - 60%',
    },
    {
      label: (
        <>
          Most <span className="font-semibold">Trained</span>
        </>
      ),
      value: 'GI - 60%',
    },
    {
      label: (
        <>
          Most <span className="font-semibold">Trained</span>
        </>
      ),
      value: 'GI - 60%',
    },
  ];

  return (
    <MatJournalSection className="flex justify-end h-[100vh]">
      <div className="bg-transparent  hidden lg:flex flex-1 p-10 pt-navHeight  flex-col gap-3">
        <div className="flex justify-between gap-10">
          <h1 className="text-white text-5xl tracking-tighter">Dashboard</h1>{' '}
          <FormProvider {...methods}>
            <form className="flex flex-col items-center">
              <SessionTypePicker />
            </form>
          </FormProvider>
        </div>
        <Separator className="bg-white w-64 mt-2 mb-6" />

        <div className="flex break-before-all flex-wrap overflow-hidden flex-col gap-3 justify-start items-start w-max h-full">
          {statistics.map((statistic) => {
            return (
              <div className="flex bg-white w-64 rounded-lg p-4 flex-col">
                <div> {statistic.label} </div>
                <span className="font-bold text-3xl tracking-wide">{statistic.value}</span>
              </div>
            );
          })}
        </div>
        {/* Add your dashboard components here */}
        {/* Example: <AverageFightTimePerWeek /> */}
        {/* Example: <AverageFightTimePerMonth /> */}
        {/* Example: <AverageTrainingTimePerWeek /> */}
        {/* Example: <FightCountPerMonth /> */}
        {/* Example: <TrainingCountPerMonth /> */}
        {/* Example: <MostPopularFighters /> */}
        {/* Example: <MostPopularTrainingMethods /> */}
        {/* Example: <MostPopularWeaponTypes /> */}
        {/* Example: <MostPopularWeaponEnhancements /> */}
        {/* Example: <MostPopularFightOutcomes /> */}
        {/* Example: <MostPopularFighterSkills /> */}
        {/* Example: <MostPopularFighterTalents /> */}
        {/* Example: <MostPopularFighterGear /> */}
        {/* Example: <MostPopularFighterEquipment /> */}
      </div>
      <StatisticsRightPanel />
    </MatJournalSection>
  );
};
