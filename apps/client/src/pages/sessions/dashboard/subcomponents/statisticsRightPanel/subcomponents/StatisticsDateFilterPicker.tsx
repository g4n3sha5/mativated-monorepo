import { Button } from '@/components/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { LabelValue } from '@/utils/types';

interface Props {
  statisticsTypeOption: LabelValue;
  setStatisticsDateOption: (option: LabelValue) => void;
  options: LabelValue[];
}

export const StatisticsDateFilterPicker = ({ options, statisticsTypeOption, setStatisticsDateOption }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild className="w-full font-mono">
        <Button variant="chillBlue" size="lg">
          {statisticsTypeOption.label}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
        className="w-40 xl:w-40 p-0  text-center shadow-lg rounded-lg overflow-hidden font-mono !tracking-wide "
      >
        <div className="flex flex-col  w-full justify-center ">
          {options.map((option, index) => {
            if (option.value === statisticsTypeOption.value) return null;

            return (
              <Button
                key={index + option.value}
                onClick={() => {
                  setStatisticsDateOption(option);
                }}
                tabIndex={-1}
                variant="chillBlue"
                className="!rounded-none outline-white  outline outline-[1px] outline-bottom"
              >
                {option.label}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
