import { useState } from 'react';
import { Input } from 'components/ui/Input';
import { PlusButton } from 'pages/matjournal/common/PlusButton';
import { MinusButton } from 'pages/matjournal/common/MinusButton';
import drill from 'assets/images/rinse.png';
import { Button } from 'components/ui/Button';
import { quickTimeValues } from 'utils/constants';
import { CreateSessionInputField } from '@mativated-monorepo/shared/types';
import { useFormContext } from 'react-hook-form';

export const DrillingTimePicker = () => {
  const field: CreateSessionInputField = 'drillingTime';
  const { register, watch, setValue } = useFormContext();

  return (
    <div className="createSessionPickerStyle w-full">
      <img src={drill} className="icon" alt="Drilling icon" />
      <h1>Drilling Time</h1>
      <div className="flex gap-x-1 w-full justify-center items-center">
        <MinusButton valueToModify={watch(field)} onClick={() => setValue(field, watch(field) - 1)} />
        <div
          className="relative w-24  
        text-2xl"
        >
          <Input
            {...register(field, {
              valueAsNumber: true,
            })}
            type="number"
            variant="purple"
            min="0"
            className="w-full text-center pr-5"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm">min</div>
        </div>
        <PlusButton onClick={() => setValue(field, watch(field) + 1)} />
      </div>

      {quickTimeValues && (
        <div className="flex gap-x-1 flex-wrap justify-center gap-y-1">
          {quickTimeValues.map((value) => {
            if (!value) return;
            return (
              <Button
                key={value}
                size="sm"
                variant={watch(field) === value ? 'white' : 'secondary'}
                disabled={watch(field) === value}
                onClick={() => setValue(field, value)}
                className="cursor-pointer text-center"
              >
                <h3 className="m-0">{value} min</h3>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};
