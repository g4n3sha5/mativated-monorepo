import { CreateSessionInputField } from '@/utils/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { useFormContext } from 'react-hook-form';
import { totalSessionTypeIconDictionary } from 'utils/constants';

export const SessionTypePicker = () => {
  const field: CreateSessionInputField = 'type';
  const { setValue, watch } = useFormContext();

  return (
    <div className="p-3 items-center ">
      <div className="flex lg:flex flex-wrap basis-full justify-center gap-x-2 gap-y-2 lg:gap-y-1 ">
        {totalSessionTypeIconDictionary.map((session) => (
          <TooltipProvider key={session.type} delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <session.Icon
                  onClick={(evt) => {
                    evt.preventDefault();
                    setValue(field, session.type);
                  }}
                  className={`w-7 h-7 md:h-7 md:hw-7 xl:w-8 xl:h-8 stroke-paleBlack  fill-paleBlack cursor-pointer  hover:stroke-paleWhite hover:fill-paleWhite ${
                    session.type === watch(field) && '!stroke-white !fill-white'
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
