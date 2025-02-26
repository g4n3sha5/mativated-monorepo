import { AddSessionInputField } from '@/utils/types';
import { MinusButton } from '@/components/ui/MinusButton';
import { PlusButton } from '@/components/ui/PlusButton';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'components/ui/Input';
import { useFormContext } from 'react-hook-form';
import { NumberValuePickButtons } from '@/components/ui/NumberValuePickButtons';

export const WeightPicker = () => {
  const field: AddSessionInputField = 'weight';
  const { register, watch, setValue } = useFormContext();

  return (
    <div className="md:w-3/4 lg:w-2/3 p-3 creationSessionPickerStyle flex flex-col items-center">
      <FontAwesomeIcon className="icon" icon={faWeightScale} />
      <h1>Weight</h1>
      <div className="flex gap-x-1 w-full justify-center items-center">
        <MinusButton valueToModify={watch(field)} onClick={() => setValue(field, Number(watch(field)) - 1)} />
        <div className="relative">
          <Input
            {...register(field, {
              valueAsNumber: true,
            })}
            className="text-2xl font-bold w-full max-w-32 text-center h-14"
            type="number"
            min="0"
          />
          <span className="absolute top-1/2 right-1/4 -translate-y-1/2">kg</span>
        </div>
        <PlusButton onClick={() => setValue(field, watch(field) + 1)} />
      </div>

      <NumberValuePickButtons
        scope={120}
        start={50}
        modulo={15}
        variant={(value) => (watch(field) === value ? 'white' : 'secondary')}
        callback={(value) => setValue(field, value)}
        disabled={(value) => watch(field) === value}
        suffix="kg"
      />
    </div>
  );
};
