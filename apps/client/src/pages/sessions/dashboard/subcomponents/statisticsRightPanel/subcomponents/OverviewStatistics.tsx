import { StatisticCardSquare } from '@/pages/sessions/dashboard/subcomponents/statisticsRightPanel/subcomponents/StatisticCardSquare';
import { Statistic } from '@/utils/types';

interface Props {
  sessionsStatistics: Statistic[];
}

export const OverviewStatistics = ({ sessionsStatistics: statistics }: Props) => {
  if (!statistics) return;
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center lg:justify-around ">
      {statistics.slice(0, 10).map((statistic) => (
        <StatisticCardSquare key={statistic.type} type={statistic.type} value={statistic.value} />
      ))}
    </div>
  );
};
