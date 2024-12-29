import { CreateSessionInputField } from '@/utils/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { useFormContext } from 'react-hook-form';
import { sessionTypeIconDictionary } from 'utils/constants';

export const SessionTypePicker = () => {
  const field: CreateSessionInputField = 'type';
  const { setValue, watch } = useFormContext();

  return (
    <div className="min-w-14 createSessionPickerStyle p-3 items-center ">
      <h1>Type</h1>
      <div className="flex flex-col lg:flex flex-wrap basis-full justify-center gap-x-2 gap-y-2 lg:gap-y-1 ">
        {sessionTypeIconDictionary.map((session) => (
          <TooltipProvider key={session.type} delayDuration={50}>
            <Tooltip>
              <TooltipTrigger>
                <session.Icon
                  onClick={(evt) => {
                    evt.preventDefault();
                    setValue(field, session.type);
                  }}
                  className={`w-11 h-11 xl:w-13 xl:h-13 stroke-paleBlack  fill-paleBlack cursor-pointer  hover:stroke-paleWhite hover:fill-paleWhite ${
                    session.type === watch(field) && '!stroke-white !fill-white'
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent
                side="right"
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
