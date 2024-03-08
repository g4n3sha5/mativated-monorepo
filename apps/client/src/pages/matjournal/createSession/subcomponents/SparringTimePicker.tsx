import { NumberValuePickButtons } from '@/pages/matjournal/common/NumberValuePickButtons';
import { CreateSessionInputField } from '@/utils/types';
import Katana from 'assets/images/katana.svg?react';
import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { MinusButton } from 'pages/matjournal/common/MinusButton';
import { PlusButton } from 'pages/matjournal/common/PlusButton';
import { useFormContext } from 'react-hook-form';

export const SparringTimePicker = () => {
  const field: CreateSessionInputField = 'sparringTime';
  const { register, watch, setValue } = useFormContext();

  return (
    <div className="createSessionPickerStyle min-w-48 ">
      <Katana className="icon" />
      <h1>Sparring Time</h1>
      <div className="flex gap-x-1 w-full justify-center items-center">
        <MinusButton valueToModify={watch(field)} onClick={() => setValue(field, watch(field) - 1)} />
        <div className="relative text-2xl w-24">
          <Input
            {...register(field, {
              valueAsNumber: true,
            })}
            variant="purple"
            value={watch(field)}
            type="number"
            min="0"
            className="w-24 text-center pr-5"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm">min</div>
        </div>
        <PlusButton onClick={() => setValue(field, Number(watch(field)) + 1)} />
      </div>
      <div className="flex gap-x-1 flex-wrap justify-center mt-1 gap-y-1">
        <NumberValuePickButtons
          variant={(value) => (watch(field) === value ? 'white' : 'secondary')}
          callback={(value) => setValue(field, value)}
          disabled={(value) => watch(field) === value}
        />
      </div>
    </div>
  );
};
