import { NumberValuePickButtons } from '@/components/ui/NumberValuePickButtons';
import { AddSessionInputField } from 'utils/types';
import Katana from 'assets/images/katana.svg?react';
import { Input } from 'components/ui/Input';
import { MinusButton } from '@/components/ui/MinusButton';
import { PlusButton } from '@/components/ui/PlusButton';
import { useFormContext } from 'react-hook-form';

export const SparringTimePicker = () => {
  const field: AddSessionInputField = 'sparringTime';
  const { register, watch, setValue } = useFormContext();

  return (
    <div className="addSessionPicker min-w-48 ">
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
            className="w-24 text-center pr-5"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm">min</div>
        </div>
        <PlusButton onClick={() => setValue(field, Number(watch(field)) + 1)} />
      </div>
      <div className="flex gap-x-1 flex-wrap justify-center mt-1 gap-y-1">
        <NumberValuePickButtons
          scope={55}
          variant={(value) => (watch(field) === value ? 'white' : 'secondary')}
          callback={(value) => setValue(field, value)}
          disabled={(value) => watch(field) === value}
        />
      </div>
    </div>
  );
};
