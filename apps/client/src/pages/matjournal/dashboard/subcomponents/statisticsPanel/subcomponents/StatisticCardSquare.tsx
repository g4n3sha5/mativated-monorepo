import { sessionTypeIconDictionary } from '@/utils/constants';
import { stringHoursMinutes, toHoursAndMinutes } from '@/utils/helpers';
import { type SessionType } from '@mativated-monorepo/server/src/utils/types';

interface Props {
  type?: SessionType;
  value: number;
}

export const StatisticCardSquare = ({ type, value }: Props) => {
  const typeDictionaryObject = sessionTypeIconDictionary.find((obj) => obj.type === type);
  if (!typeDictionaryObject) return;

  // Hours and minutes represented as hour integer number with coma for simplification
  const roundedHours = Math.round((value / 60) * 10) / 10;

  return (
    <div className="animate-in ease-in zoom-in flex md:gap-x-5 basis-[46%] md:basis-[48%] overflow-hidden gap-x-2 items-center justify-between border-2 p-3 lg:p-5 drop-shadow-xl rounded-xl border-blue bg-chillWhite text-black ">
      <div className="flex basis-1/2 flex-col gap-1 lg:gap-3 justify-center items-center text-2xl">
        <h3 className="text-secondaryDarker text-center text-nowrap tracking-tighter hidden md:block">
          {typeDictionaryObject.label}
        </h3>
        <typeDictionaryObject.Icon className="w-6 h-6 lg:w-10 lg:h-10 stroke-black fill-black" />
      </div>
      <div className="border-l border-gray-800 h-[80%]"></div>
      <div className="flex justify-center items-center basis-1/2  ">
        <h1 className="text-2xl lg:text-4xl font-semibold lg:font-bold lg:mx-2 mr-1 ">{roundedHours}</h1>
        <span className="text-xl">h</span>
      </div>
    </div>
  );
};
