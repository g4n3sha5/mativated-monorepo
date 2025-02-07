import { sessionTypeIconDictionary } from '@/utils/constants';
import { SessionType } from '@/utils/types';

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
    <div className="animate-in ease-in zoom-in flex gap-x-2 lg:gap-x-3 xl:gap-x-5 basis-[46%] md:basis-[80%]  xl:basis-[48%] overflow-hidden items-center justify-between border-2 p-2 2xl:p-5 xl:py-4 drop-shadow-xl rounded-xl border-blue bg-chillWhite text-black ">
      <div className="flex basis-1/3 2xl:basis-1/2 flex-col  gap-1 lg:gap-3 justify-center items-center text-2xl lg:px-1 xl:px-0">
        <h3 className="text-secondaryDarker text-center text-nowrap tracking-tighter hidden md:block">
          {/* {typeDictionaryObject.label} */}
        </h3>
        <typeDictionaryObject.Icon className="w-6 h-6 lg:w-10 lg:h-10  stroke-black fill-black" />
      </div>
      <div className="border-l border-gray-800 h-[80%]"></div>
      <div className="flex justify-center items-center basis-3/4   2xl:basis-1/2">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold lg:font-bold lg:mx-2 mr-1 ">{roundedHours}</h1>
        <span className="text-xl">h</span>
      </div>
    </div>
  );
};
