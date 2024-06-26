import { NumberValuePickButtons } from '@/components/ui/NumberValuePickButtons';
import { CreateSessionInputField } from '@/utils/types';
import Drill from 'assets/images/repeat.svg?react';
import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { MinusButton } from '@/components/ui/MinusButton';
import { PlusButton } from '@/components/ui/PlusButton';
import { useFormContext } from 'react-hook-form';

export const DrillingTimePicker = () => {
  const field: CreateSessionInputField = 'drillingTime';
  const { register, watch, setValue } = useFormContext();

  return (
    <div className="createSessionPickerStyle">
      <Drill className="icon" />
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
      <div className="flex gap-x-1 flex-wrap justify-center  mt-1 gap-y-1">
        <NumberValuePickButtons
          variant={(value) => (watch(field) === value ? 'white' : 'secondary')}
          callback={(value) => setValue(field, value)}
          disabled={(value) => watch(field) === value}
        />
      </div>
    </div>
  );
};
