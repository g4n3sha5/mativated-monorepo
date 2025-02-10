import { DateScope, LabelValue, StatisticDateScope } from '@/utils/types';
import { useUser } from '@clerk/clerk-react';
import { getPriorDate } from '@mativated-monorepo/shared/helpers';
import { useEffect, useState } from 'react';
import { ArrowLeftRight } from 'react-bootstrap-icons';
import { StatisticsDateFilterPicker } from './subcomponents/StatisticsDateFilterPicker';
import { StatisticCardSquare } from 'pages/app/dashboard/subcomponents/statisticsRightPanel/subcomponents/StatisticCardSquare';
import { trpc } from 'utils/trpc';

const statisticsDateScopes: StatisticDateScope[] = [
  { label: 'Total', value: 0 },
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 90 days', value: 90 },
  { label: 'Last 180 days', value: 180 },
  { label: 'Last 365 days', value: 365 },
];

interface Props {
  setIsShownRightPanel: (shown: boolean) => void;
}

export const TechniquesRightPanel = ({ setIsShownRightPanel }: Props) => {
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
  const { data: statistics } = trpc.sessions.getSessionsTotalStats.useQuery({
    authorId: user.id,
    dateScope: dateScope,
  });

  return (
    <div
      className="xl:min-w-[37vw] animate-in fade-in slide-in-from-right duration-400    z-10  lg:pl-0  md:w-1/2 lg:w-[45vw] xl:w-[40vw] 2xl:w-[37vw]   h-full pb-10
      bg-indigo-800   min-h-screen pt-navHeight"
    >
      <div className=" flex-1 flex flex-col items-center justify-center w-full gap-x-3 pb-10 pt-8 ">
        <ArrowLeftRight
          className="md:hidden mb-auto cursor-pointer text-white  mr-auto ml-3 text-3xl hover:scale-110"
          onClick={() => setIsShownRightPanel(false)}
        />

        <div className="flex items-stretch justify-center gap-x-5 border-b-2 border-cyan-300 pb-3 px-5 ">
          <StatisticsDateFilterPicker
            options={statisticsDateScopes}
            statisticsTypeOption={statisticsDateOption}
            setStatisticsDateOption={setStatisticsDateOption}
          />
        </div>
      </div>

      <div className=" px-1 2xl:px-10 flex flex-col justify-start  gap-y-4 overflow-y-auto 2xl:overflow-hidden h-[calc(100vh-226px)]">
        <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center lg:justify-around  ">
          {statistics?.slice(0, 10).map((statistic) => (
            <StatisticCardSquare key={statistic.type} type={statistic.type} value={statistic.value} />
          ))}
        </div>
      </div>
    </div>
  );
};
