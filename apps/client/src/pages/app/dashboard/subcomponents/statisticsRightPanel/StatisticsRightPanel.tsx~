import { DateScope, LabelValue, SessionType, StatisticDateScope } from 'utils/types';
import { useUser } from '@clerk/clerk-react';
import { getPriorDate } from '@mativated-monorepo/shared/helpers';
import { useEffect, useState } from 'react';
import { ArrowLeftRight } from 'react-bootstrap-icons';
import { StatisticCardSquare } from 'pages/app/dashboard/subcomponents/statisticsRightPanel/subcomponents/StatisticCardSquare';
import { trpc } from 'utils/trpc';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/Popover';
import { Button } from 'components/ui/Button';
import { sessionTypeOptions } from 'utils/constants';

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

export const StatisticsRightPanel = ({ setIsShownRightPanel }: Props) => {
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
      bg-indigo-800   min-h-screen pt-navHeight ml-auto"
    >
      <div className=" flex-1 flex flex-col items-center justify-center w-full gap-x-3 pb-10 pt-8 ">
        <ArrowLeftRight
          className="md:hidden mb-auto cursor-pointer text-white  mr-auto ml-3 text-3xl hover:scale-110"
          onClick={() => setIsShownRightPanel(false)}
        />

        <div className="flex items-stretch justify-center gap-x-5 border-b-2 border-cyan-300 pb-3 px-5 ">
          <Popover>
            <PopoverTrigger asChild className="w-full font-mono ">
              <Button variant="chillBlue" size="lg">
                {statisticsDateOption.label}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              onOpenAutoFocus={(event) => {
                event.preventDefault();
              }}
              className=" p-0  bg-indigo-700 text-center shadow-lg rounded-lg overflow-hidden font-mono !tracking-wide "
            >
              <div className="flex flex-col  w-full justify-center rounded-lg overflow-hidden animate-out slide-in-from-top">
                {statisticsDateScopes.map((option, index) => {
                  if (option.value === statisticsDateOption.value) return null;

                  return (
                    <Button
                      key={index + option.value}
                      onClick={() => {
                        setStatisticsDateOption(option);
                      }}
                      tabIndex={-1}
                      size="lg"
                      variant="indigo"
                      className={`${
                        index + 1 < statisticsDateScopes.length && 'border-b'
                      } !rounded-none animate-in slide-in-from-right transition-all`}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="lg:px-6 2xl:px-10 px-2 flex flex-col justify-start  gap-y-4 overflow-y-auto 2xl:overflow-hidden h-[calc(100vh-226px)]">
        <div className="flex flex-wrap gap-x-2 lg:gap-x-3 gap-y-2 justify-center lg:justify-around  ">
          {statistics?.slice(0, 10).map((statistic) => (
            <StatisticCardSquare key={statistic.type} type={statistic.type} value={statistic.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatisticCardSquare = ({ type, value }: { type?: SessionType; value: number }) => {
  const typeDictionaryObject = sessionTypeOptions.find((obj) => obj.type === type);
  if (!typeDictionaryObject) return;

  // Hours and minutes represented as hour integer number with coma for simplification
  const roundedHours = Math.round((value / 60) * 10) / 10;

  return (
    <div className="animate-in ease-in zoom-in flex gap-x-2 lg:gap-x-3 xl:gap-x-5 basis-[46%] md:basis-[80%]  xl:basis-[48%] overflow-hidden items-center justify-between border-2 p-2 2xl:p-5 xl:py-4 drop-shadow-xl rounded-xl border-blue bg-chillWhite text-black ">
      <div className="flex basis-1/3 2xl:basis-1/2 flex-col  gap-1 lg:gap-3 justify-center items-center text-2xl lg:px-1 xl:px-0">
        <h3 className="text-secondaryDarker text-center text-nowrap tracking-tighter hidden md:block">
          {/* {typeDictionaryObject.label} */}
        </h3>
        <typeDictionaryObject.Icon className="w-6 h-6 lg:w-10 lg:h-10  stroke-black fill-black" />
      </div>
      <div className="border-l -mr-0.5 lg:mr-0 border-gray-800 h-[80%]"></div>
      <div className="flex justify-center items-center basis-3/4   2xl:basis-1/2">
        <h1 className="text-xl lg:text-3xl xl:text-4xl font-semibold lg:font-bold lg:mx-2 mr-0.5 ">{roundedHours}</h1>
        <span className="text-xl">h</span>
      </div>
    </div>
  );
};
