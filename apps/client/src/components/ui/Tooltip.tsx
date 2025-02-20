import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { TooltipContentProps, TooltipProps, TooltipProviderProps, TooltipTriggerProps } from '@radix-ui/react-tooltip';
import { cn } from 'lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { PopoverContentProps, PopoverProps, PopoverTriggerProps } from '@radix-ui/react-popover'; // Modified shadcn tooltip - triggering popopver on mobile

// Modified shadcn tooltip - triggering popopver on mobile
const OriginalTooltipProvider = TooltipPrimitive.Provider;

const OriginalTooltip = TooltipPrimitive.Root;

const OriginalTooltipTrigger = TooltipPrimitive.Trigger;

const OriginalTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground ' +
        'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0' +
        ' data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 ' +
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
OriginalTooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TouchContext = createContext<boolean | undefined>(undefined);
const useTouch = () => useContext(TouchContext);

export const TooltipProvider = ({ children, ...props }: TooltipProviderProps) => {
  const [isTouch, setTouch] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  return (
    <TouchContext.Provider value={isTouch}>
      <OriginalTooltipProvider {...props}>{children}</OriginalTooltipProvider>
    </TouchContext.Provider>
  );
};

export const Tooltip = (props: TooltipProps & PopoverProps & { customTime?: number }) => {
  const isTouch = useTouch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isTouch) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, props.customTime || 1500);
      return () => clearTimeout(timer);
    }
  });

  return isTouch ? <Popover open={open} onOpenChange={setOpen} {...props} /> : <OriginalTooltip {...props} />;
};

export const TooltipTrigger = (props: TooltipTriggerProps & PopoverTriggerProps) => {
  const isTouch = useTouch();
  return isTouch ? <PopoverTrigger asChild {...props} /> : <OriginalTooltipTrigger type="button" {...props} />;
};

export const TooltipContent = (props: TooltipContentProps & PopoverContentProps) => {
  const isTouch = useTouch();

  return isTouch ? <PopoverContent {...props} /> : <OriginalTooltipContent {...props} />;
};
