import { SessionTypeIcon } from '@/components/ui/SessionTypeIcon';
import { StatisticsGetOutput } from '@mativated-monorepo/server/src/utils/types';

interface Props {
  statistics: StatisticsGetOutput;
}

export const Statistics = ({ statistics }: Props) => {
  const statisticsItems = [
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Daily</span> <span className="tracking-tightest">Average</span>
        </div>
      ),
      value: (
        <>
          {statistics?.dailyAvg}
          <span className="font-normal ml-1 text-2xl">h</span>
        </>
      ),
    },
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Weekly</span>
          <span className="tracking-tightest"> Average</span>
        </div>
      ),
      value: (
        <>
          {statistics?.weeklyAvg}
          <span className="font-normal ml-1 text-2xl">h</span>
        </>
      ),
    },
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Monthly</span> <span className="tracking-tightest"> Average</span>
        </div>
      ),
      value: (
        <>
          {statistics?.monthlyAvg}
          <span className="font-normal ml-1 text-2xl">h</span>
        </>
      ),
    },
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Yearly</span>
          <span className="tracking-tightest"> Average</span>
        </div>
      ),
      value: (
        <>
          {statistics?.yearlyAvg}
          <span className="font-normal ml-1 text-2xl">h</span>
        </>
      ),
    },
    {
      label: (
        <div className="text-center">
          Longest <span className="font-semibold">Streak</span>
        </div>
      ),
      value: (
        <>
          {statistics?.longestStreak}
          <span className="font-normal ml-1 text-2xl">days</span>
        </>
      ),
    },
    {
      label: (
        <div className="text-center">
          Current <span className="font-semibold">Streak</span>
        </div>
      ),
      value: (
        <>
          {statistics?.currentStreak}
          <span className="font-normal ml-1 text-2xl">days</span>
        </>
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
    <div className="flex  flex-wrap  overflow-hidden  gap-3 justify-center xl:justify-start items-start  h-max w-full xl:gap-x-10">
      {statisticsItems.map((statistic, index) => {
        return (
          <div
            key={index}
            className="flex bg-white w-24 h-24 xl:w-32 xl:h-32 2xl:h-32 2xl:w-40 rounded-lg p-1 2xl:p-4 flex-col justify-around items-center"
          >
            <div> {statistic.label} </div>
            <span className="font-bold text-3xl tracking-wide">{statistic.value}</span>
          </div>
        );
      })}
    </div>
  );
};
