import { StatisticCardSquare } from '@/pages/matjournal/dashboard/subcomponents/statisticsPanel/subcomponents/StatisticCardSquare';
import { Statistic } from '@/utils/types';

interface Props {
  sessionsStatistics: Statistic[];
}

export const OverviewStatistics = ({ sessionsStatistics: statistics }: Props) => {
  if (!statistics) return;
  return (
    <>
      {statistics.slice(0, 10).map((statistic) => (
        <StatisticCardSquare key={statistic.type} type={statistic.type} value={statistic.value} />
      ))}
    </>
  );
};
