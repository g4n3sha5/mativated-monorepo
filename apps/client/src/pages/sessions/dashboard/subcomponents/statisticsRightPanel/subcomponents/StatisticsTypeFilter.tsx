import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

interface Props {
  statisticsTypeOption: any;
  setStatisticsTypeOption: any;
  options: any;
  // options: StatisticsFilterType;
}

// todo remove?
// old component to pick filters for statistics on Dashboard
export const StatisticsTypeFilter = ({ options, statisticsTypeOption, setStatisticsTypeOption }: Props) => {
  return (
    <Popover>
      <PopoverTrigger className="px-4 py-2 border-2 border-white rounded-lg bg-chillWhite">
        <statisticsTypeOption.Icon className="w-8 h-8 fill-paleBlack stroke-paleBlack" />
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
        className="max-w-60 bg-white text-center "
      >
        <div className="gap-4 mt-4 flex flex-wrap w-full justify-center">
          {options.map((option) => (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <div className="flex flex-col items-center">
                  <TooltipTrigger>
                    <option.Icon
                      onClick={() => setStatisticsTypeOption(option)}
                      className="w-10 h-10 fill-darkPurple stroke-darkPurple
                    hover:fill-paleBlack hover:stroke-paleBlack
                    "
                    />
                  </TooltipTrigger>
                </div>
                <TooltipContent
                  side="top"
                  className="bg-black rounded-md px-3 z-10 capitalize text-white text-lg font-rajdhani"
                >
                  {option.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
