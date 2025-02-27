import { AddSessionInputField } from '@/utils/types';

import { useFormContext } from 'react-hook-form';
import { sessionTypeOptions } from 'utils/constants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/Tooltip';

export const SessionTypePicker = () => {
  const field: AddSessionInputField = 'type';
  const { setValue, watch } = useFormContext();

  return (
    <div className="min-w-14 addSessionPicker p-3 items-center px-7 xl:px-3.5 pb-8">
      <h1 className="font-semibold text-2xl">Type</h1>

      <div
        className="flex  flex-row lg:flex-col flex-wrap basis-full justify-center
      gap-x-2 gap-y-2 lg:gap-y-1.5
      "
      >
        {sessionTypeOptions.map((session) => (
          <TooltipProvider delayDuration={100} key={session.type}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() => {
                    setValue(field, session.type);
                  }}
                >
                  <session.Icon
                    className={`w-11 h-11 xl:w-13 xl:h-13 stroke-paleBlack  fill-paleBlack cursor-pointer  hover:stroke-paleWhite hover:fill-paleWhite ${
                      session.type === watch(field) && '!stroke-white !fill-white'
                    }`}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-black rounded-md px-3 z-10 capitalize text-white text-lg  border-none"
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
