import { SessionTypeIcon } from '@/components/ui/SessionTypeIcon';
import { StatisticsGetOutput } from '@/utils/types';
import { TotalSessionType } from '@mativated-monorepo/client/types';

interface Props {
  statistics: StatisticsGetOutput;
  type: TotalSessionType;
}

export const Statistics = ({ statistics, type }: Props) => {
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
          {type === 'TOTAL' && 'Most'} <span className="font-semibold">Trained</span>
        </>
      ),
      value: (
        <div className="flex flex-col justify-center items-center">
          <SessionTypeIcon className="fill-black stroke-black w-8 h-8 my-1" type={statistics?.percentageTrained.type} />
          {statistics?.percentageTrained.value}%
        </div>
      ),
    },
    {
      label: (
        <>
          Best <span className="font-semibold">Month</span>
        </>
      ),
      value: (
        <div className="flex flex-col font-semibold text-center">
          <span className="font-bold text-xl">June</span>
          <span>
            25<span className="font-normal ml-1">h</span>
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap  gap-y-4 gap-x-2 justify-center xl:justify-start items-start   h-max w-full lg:w-3/4 xl:gap-x-10 px-1 ">
      {statisticsItems.map((statistic, index) => {
        return (
          <div
            key={index}
            className="flex bg-white w-2/5 md:w-28 h-28 xl:w-32 xl:h-32 2xl:h-32 2xl:w-40 rounded-lg p-1 2xl:p-4 flex-col justify-around items-center"
          >
            <div> {statistic.label} </div>
            <span className="font-bold text-3xl tracking-wide">{statistic.value}</span>
          </div>
        );
      })}
    </div>
  );
};
