import { AddSessionInputField } from '@/pages/matjournal/addSession/types';
import { MinusButton } from '@/pages/matjournal/common/MinusButton';
import { PlusButton } from '@/pages/matjournal/common/PlusButton';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'components/ui/Input';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const WeightPicker = () => {
  const field: AddSessionInputField = 'weight';
  const { register, watch, setValue } = useFormContext();

  return (
    <div className="lg:w-721 w-1/2 p-3 addSessionPickerStyle flex flex-col items-center">
      <FontAwesomeIcon className="icon" icon={faWeightScale} />
      <h1>Weight</h1>
      <div className="flex gap-x-1 w-full justify-center items-center">
        <MinusButton valueToModify={watch(field)} onClick={() => setValue(field, watch(field) - 1)} />
        <div className="relative">
          <Input {...register(field)} className="text-2xl font-bold w-32 text-center h-14" type="number" min="0" />
          <span className="absolute top-1/2 right-1/4 -translate-y-1/2">kg</span>
        </div>
        <PlusButton onClick={() => setValue(field, Number(watch(field)) + 1)} />
      </div>
    </div>
  );
};
