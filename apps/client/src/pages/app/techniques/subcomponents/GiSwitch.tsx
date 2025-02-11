import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import nogigi from 'assets/images/no-gigi.png';
import gi from 'assets/images/gi.png';
import { cn } from 'lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/Tooltip';

export const GiSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip disableHoverableContent={true}>
      <TooltipTrigger>
        <SwitchPrimitives.Root
          className={cn(
            'peer inline-flex h-12 w-20 shrink-0 cursor-pointer  items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-paleWhite data-[state=checked]:bg-indigo-700',
            className
          )}
          {...props}
          ref={ref}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              'pointer-events-none  h-12 w-12 rounded-full   ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 flex justify-center items-center  group'
            )}
          >
            <img src={nogigi} className="w-4/5 h-4/5 group-data-[state=checked]:hidden " />
            <img src={gi} className="w-4/5 h-4/5 group-data-[state=unchecked]:hidden " />
          </SwitchPrimitives.Thumb>
        </SwitchPrimitives.Root>
      </TooltipTrigger>
      <TooltipContent
        side="left"
        className="bg-black rounded-md border-none px-3 z-10  text-semibold text-white text-lg font-rajdhani max-w-40 md:max-w-72 mr-3"
      >
        Check if the technique is GI only
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
));
GiSwitch.displayName = SwitchPrimitives.Root.displayName;
