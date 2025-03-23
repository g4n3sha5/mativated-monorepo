import { useFormContext } from 'react-hook-form';
import { totalSessionTypeOptions } from 'utils/constants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/Tooltip';

export const SessionTypePicker = () => {
  const { setValue, watch } = useFormContext();

  // TODO: probably should be radio
  return (
    <div>
      <div className="flex lg:flex w-full flex-wrap basis-full justify-center gap-x-2 gap-y-2 lg:gap-y-1 ">
        {totalSessionTypeOptions.map((session) => (
          <TooltipProvider key={session.type} delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <session.Icon
                  onClick={(evt) => {
                    evt.preventDefault();
                    setValue('type', session.type);
                  }}
                  className={`w-7 h-7 md:h-7 md:hw-7 xl:w-8 xl:h-8 stroke-paleBlack  fill-paleBlack cursor-pointer  hover:stroke-paleWhite hover:fill-paleWhite ${
                    session.type === watch('type') && '!stroke-white !fill-white'
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-black rounded-md px-3 z-10 capitalize text-white text-lg font-rajdhani"
              >
                {session.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
