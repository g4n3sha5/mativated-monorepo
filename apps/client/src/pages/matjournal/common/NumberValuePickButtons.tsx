import { Button, Variant } from '@/components/ui/Button';
import { useMemo } from 'react';

interface HelperProps {
  start?: number;
  scope?: number;
  modulo?: number;
}
interface Props extends HelperProps {
  callback: (value: number) => void;
  variant: (value: number) => Variant;
  disabled: (value: number) => boolean;
  suffix?: string;
  className?: string;
}

export const NumberValuePickButtons = ({
  start,
  scope,
  modulo,
  callback,
  variant,
  disabled,
  suffix = 'min',
  className,
}: Props) => {
  const quickTimeValues = useMemo(() => generateMappedValues({ start, scope, modulo }), [scope]);

  return (
    <div className={`flex gap-x-1 justify-center flex-wrap mb-2 gap-y-1 ${className}`}>
      {quickTimeValues.map((value) => (
        <Button
          key={value}
          size="sm"
          variant={variant(value)}
          disabled={disabled(value)}
          onClick={() => callback(value)}
        >
          <h3 className="m-0">
            {value}&nbsp;{suffix}
          </h3>
        </Button>
      ))}
    </div>
  );
};

export const generateMappedValues = ({ start = 0, scope = 60, modulo = 5 }: HelperProps) =>
  Array.from(Array(scope).keys())
    .map((number) => {
      if (number > start && number % modulo === 0) return number;
    })
    .filter(Number) as number[];
