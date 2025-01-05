import { StatisticsDateFilterPicker } from './subcomponents/StatisticsDateFilterPicker';
import { getPriorDate } from '@mativated-monorepo/shared/helpers';
import { trpc } from '@/utils/trpc';
import { DateScope, LabelValue, StatisticDateScope } from '@/utils/types';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { OverviewStatistics } from './subcomponents/OverviewStatistics';

const statisticsDateScopes: StatisticDateScope[] = [
  { label: 'Total', value: 0 },
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 90 days', value: 90 },
  { label: 'Last 180 days', value: 180 },
  { label: 'Last 365 days', value: 365 },
];

export const StatisticsRightPanel = () => {
  const [statisticsDateOption, setStatisticsDateOption] = useState<LabelValue>(statisticsDateScopes[0]);
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <></>;
  if (!user?.id) return <></>;

  const [dateScope, setDateScope] = useState<DateScope>({ lte: new Date(), gte: new Date() });

  useEffect(() => {
    // date to get total time recorded if no time scope is specified
    let gte = new Date('1990-01-01');
    if (statisticsDateOption.value !== 0) {
      gte = getPriorDate(statisticsDateOption.value);
    }
    setDateScope({ ...dateScope, gte: gte });
  }, [statisticsDateOption]);

  const { data } = trpc.sessions.getSessionsTotalStats.useQuery({
    authorId: user.id,
    dateScope: dateScope,
  });

  return (
    <div className="animate-in fade-in slide-in-from-right duration-400 pt-navHeight  justify-self-end z-10  lg:pl-0 w-full lg:w-[45vw] xl:w-[40vw] 2xl:w-[37vw]   h-full pb-10 bg-darkPurple  min-h-screen">
      <div className=" flex-1 flex flex-col items-center justify-center w-full gap-x-3 py-10">
        <div className="flex items-stretch justify-center gap-x-5 border-b-2 border-cyan-300 pb-3 px-5 ">
          <StatisticsDateFilterPicker
            options={statisticsDateScopes}
            statisticsTypeOption={statisticsDateOption}
            setStatisticsDateOption={setStatisticsDateOption}
          />
        </div>
      </div>

      <div className=" px-1 2xl:px-10 flex flex-col justify-start  gap-y-4 overflow-y-scroll 2xl:overflow-hidden h-[calc(100vh-226px)]">
        <OverviewStatistics sessionsStatistics={data?.statistics} />
      </div>
    </div>
  );
};
