import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { useState } from 'react';
import { sessionTypeIconDictionary } from 'utils/constants.ts';
import { SessionIconPair, SessionType } from 'utils/types';

export const SessionTypePicker = () => {
  const [chosenType, setChosenType] = useState<SessionType | null>(null);
  console.log(chosenType);

  return (
    <div className="rounded-xl text-center p-3 bg-cyan items-center pt-5">
      <h1 className="font-semibold text-lg mb-3">Type</h1>
      <div className="flex lg:flex-col flex-wrap basis-full justify-center gap-x-2 gap-y-2 lg:gap-y-1">
        {sessionTypeIconDictionary.map((session) => (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <session.Icon
                  onClick={() => setChosenType(session.type)}
                  className={`w-11 h-11 xl:w-8 xl:h-8 cursor-pointer stroke-black hover:stroke-white hover:fill-white ${
                    chosenType === session.type && 'stroke-white fill-white'
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-black px-3 capitalize text-white text-lg font-rajdhani">
                {session.type.toLowerCase()}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
