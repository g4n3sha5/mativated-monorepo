import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'lib/utils';

export type Variant = VariantProps<typeof buttonVariants>['variant'];

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all ease-in' +
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white shadow hover:bg-primary/90',
        disabled: 'bg-secondaryDarker text-white cursor-not-allowed',
        destructive: 'bg-red-700 text-white shadow-sm hover:bg-red-900',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        outlineLight: 'border border-input bg-background hover:border-neutral-300 shadow-sm  hover:text-neutral-100',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        basicCyan: 'bg-basicCyan text-white hover:bg-chillWhite hover:text-black',
        secondaryCyan: 'bg-secondaryCyan text-white hover:bg-chillWhite hover:text-black',
        chillBlue: 'bg-chillBlue text-white hover:bg-chillWhite hover:text-black',
        paleBlack: 'bg-paleBlack text-white hover:bg-paleWhite hover:text-paleBlack',
        secondary:
          'bg-secondary text-white hover:bg-chillWhite hover:text-black  hover:border-secondary disabled:cursor-not-allowed border-[rgba(255,255,255,0.48)] border-[1px]',
        secondaryContrast:
          'bg-secondary text-white hover:bg-secondaryDarker   hover:border-secondary disabled:cursor-not-allowed border-[rgba(255,255,255,0.48)] border-[1px]',
        secondaryDarker:
          'bg-secondaryDarker text-white hover:bg-paleWhite hover:text-black border-[1px]  border-[rgba(255,255,255,0.48)] hover:border-secondaryDarker ',
        basicBlue: 'bg-footerCyan text-white',
        indigo: 'bg-indigo-600 text-white hover:bg-indigo-700 ',
        darkIndigo: 'bg-indigo-900 text-white hover:bg-indigo-600 ',
        white: 'bg-chillWhite text-neutral-700 hover:bg-secondary active:text-neutral-700',
        black: 'bg-black text-black hover:bg-secondary hover:text-white',
      },
      size: {
        default: 'px-2 h-7 md:h-9 md:px-4 py-2 ',
        sm: 'h-8 rounded-md px-3 text-sm font-semibold',
        md: 'h-9 rounded-md px-3 text-md tracking-tight ',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-7 w-7 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size, type = 'button', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        type={type}
        disabled={variant === 'disabled'}
        className={cn(buttonVariants({ variant, size, className }), 'rounded-lg')}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
