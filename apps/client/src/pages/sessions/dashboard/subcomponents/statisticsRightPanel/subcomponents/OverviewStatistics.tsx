<<<<<<<< HEAD:apps/client/src/pages/sessions/dashboard/subcomponents/statisticsRightPanel/subcomponents/OverviewStatistics.tsx
import { StatisticCardSquare } from '@/pages/sessions/dashboard/subcomponents/statisticsRightPanel/subcomponents/StatisticCardSquare';
========
import { StatisticCardSquare } from '@/pages/sessions/dashboard/subcomponents/statisticsPanel/subcomponents/StatisticCardSquare';
>>>>>>>> d1b9b74e3d7b0bb3df5867ad8a27c905296a5faf:apps/client/src/pages/sessions/dashboard/subcomponents/statisticsPanel/subcomponents/OverviewStatistics.tsx
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