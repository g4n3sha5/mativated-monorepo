import * as React from 'react';
import { cn } from 'lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  'flex h-9 w-full rounded-md border border-input  px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-lg font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-white text-primary-foreground shadow hover:bg-primary/90',
        purple: 'bg-white border-2 border-purple focus:border-white',
      },
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', type, ...props }, ref) => {
    return <input type={type} className={cn(inputVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Input.displayName = 'Input';

export { Input };
