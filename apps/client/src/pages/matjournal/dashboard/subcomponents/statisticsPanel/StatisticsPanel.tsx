import { OverviewStatistics } from '@/pages/matjournal/dashboard/subcomponents/statisticsPanel/subcomponents/OverviewStatistics';
import { SpecificStatistics } from '@/pages/matjournal/dashboard/subcomponents/statisticsPanel/subcomponents/SpecificStatistics';
import { StatisticsDateFilter } from '@/pages/matjournal/dashboard/subcomponents/statisticsPanel/subcomponents/StatisticsDateFilter';
import { StatisticsTypeFilter } from '@/pages/matjournal/dashboard/subcomponents/statisticsPanel/subcomponents/StatisticsTypeFilter';
import { overviewStatisticOption, statisticsDateScopes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { StatisticsFilter } from '@/utils/types';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';

export const StatisticsPanel = () => {
  const utils = trpc.useUtils();
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <></>;
  if (!user || !user?.id) return <></>;

  const [statisticsTypeOption, setStatisticsTypeOption] = useState<StatisticsFilter>(overviewStatisticOption);
  // const [statisticsDateOption, setStatisticsDateOption] = useState<StatisticsFilter>(statisticsDateScopes[0]);

  const { data, isError, isLoading } = trpc.sessions.getSessionsStatistics.useQuery({
    authorId: user.id,
  });

  console.log(data);
  return (
    <div className="absolute z-10 pt-navHeight bottom-0 pl-leftNavWidth right-0 lg:w-[35vw]  h-full bg-darkPurple linear">
      <div className=" flex-1 flex flex-col items-center justify-center w-full gap-x-3 py-10">
        {/* <h1 className="text-white mb-3">Filter by...</h1> */}
        <div className="flex items-stretch justify-center gap-x-5 border-b-2 border-cyan-300 pb-3 px-5">
          {/* <StatisticsTypeFilter
            options={statisticsTypeOption}
            statisticsTypeOption={statisticsTypeOption}
            setStatisticsTypeOption={setStatisticsTypeOption}
          /> */}
          {/* <StatisticsDateFilter
            options={statisticsDateScopes}
            statisticsTypeOption={statisticsDateOption}
            setStatisticsDateOption={setStatisticsDateOption}
          /> */}
        </div>
      </div>
      <nav className="p-0 m-0 pt-5">
        <div className="pt-1 px-10 flex flex-col justify-center  gap-y-4">
          <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center lg:justify-around">
            {statisticsTypeOption.type ? (
              <OverviewStatistics sessionsStatistics={data?.statistics} />
            ) : (
              <SpecificStatistics />
            )}
          </div>

          {/* <div className="flex flex-col gap-y-5 items-center">
            <StatisticIcon type="LAST_30_DAYS" label="Last 30 days" />
            <StatisticIcon type="LAST-7-DAYS" label="Last 7 days" />
            <StatisticIcon type="AVG-30-DAYS" label="Average / 30 days" />
          </div> */}
        </div>
      </nav>
    </div>
  );
};
