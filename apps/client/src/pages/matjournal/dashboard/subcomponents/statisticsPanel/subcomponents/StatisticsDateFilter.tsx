import { Button } from '@/components/ui/Button';
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
      <PopoverTrigger>
        <Button variant="basicCyan" size="lg">{statisticsTypeOption.label} </Button>
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
              className="flex flex-col justify-center items-center tracking-tighter shadow-sm cursor-pointer  "
            >
              {/* <option.Icon
                      onClick={() => setStatisticsTypeOption(option)}
                      className="w-10 h-10 fill-darkPurple stroke-darkPurple
                    hover:fill-paleBlack hover:stroke-paleBlack
                    "
                    /> */}
              <div className="hover:bg-neutral-300 w-full rounded-md">{option.label}</div>
              <div className="border-b mt-3 border-gray-400 w-1/3" />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
