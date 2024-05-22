import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

interface Props {
  statisticsTypeOption: any;
  setStatisticsDateOption: () => void;
  options: any;
}

// This component doesn't use icons, so we use a seperate one.
export const StatisticsDateFilter = ({ options, statisticsTypeOption, setStatisticsDateOption }: Props) => {
  return (
    <Popover>
      <PopoverTrigger className="px-4 py-2 border-2 border-white rounded-lg bg-chillWhite font-bold">
        {statisticsTypeOption.label}
        {/* <statisticsTypeOption.Icon className="w-8 h-8 fill-paleBlack stroke-paleBlack" /> */}
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
        className="w-40 bg-chillWhite text-center shadow-lg "
      >
        <div className="gap-4  flex flex-col  w-full justify-center">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center tracking-tighter shadow-sm cursor-pointer "
            >
              {/* <option.Icon
                      onClick={() => setStatisticsTypeOption(option)}
                      className="w-10 h-10 fill-darkPurple stroke-darkPurple
                    hover:fill-paleBlack hover:stroke-paleBlack
                    "
                    /> */}
              {option.label}
              <div className="border-b mt-3 border-gray-400 w-1/3" />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
