import { StatisticCardSquare } from '@/pages/matjournal/dashboard/subcomponents/statisticsPanel/subcomponents/StatisticCardSquare';
import { Statistic } from '@/utils/types';

interface Props {
  sessionsStatistics: Statistic[];
}

export const OverviewStatistics = ({ sessionsStatistics: statistics }: Props) => {
  if (!statistics) return;
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center lg:justify-start">
      {statistics.map((statistic) => (
        <StatisticCardSquare key={statistic.type} type={statistic.type} value={statistic.value} />
      ))}
    </div>
  );
};
