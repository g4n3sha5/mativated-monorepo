import { Input } from '@/components/ui/Input';
import { NumberValuePickButtons } from '@/components/ui/NumberValuePickButtons';
import { toHoursAndMinutes } from '@/utils/helpers';
import { AddSessionInputField } from '@/utils/types';
import { useEffect, useState } from 'react';
import { HourglassSplit } from 'react-bootstrap-icons';
import { useFormContext } from 'react-hook-form';

export const SessionLengthPicker = () => {
  const field: AddSessionInputField = 'minutesLength';
  const { setValue, formState, watch } = useFormContext();
  const { hours, minutes } = toHoursAndMinutes(watch(field));

  const [duration, setDuration] = useState({ minutes: minutes, hours: hours });

  useEffect(() => {
    setValue(field, duration.hours * 60 + duration.minutes);
  }, [duration]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) setDuration({ minutes: 0, hours: 0 });
  }, [formState]);

  return (
    <div className="w-full p-3 creationSessionPickerStyle flex flex-col  items-center">
      <HourglassSplit className="icon" />
      <h1>Session Length</h1>
      <div className="bg-white w-48 border-2 border-secondaryDarker text-black text-2xl font-bold px-6 py-2 rounded-lg mb-3  flex items-center">
        <Input
          type="number"
          min="0"
          className="inline w-14 text-center"
          value={duration.hours}
          onChange={(evt) => setDuration({ ...duration, hours: Number(evt.target.value) })}
        />
        <span className="text-sm ">h</span>
        &nbsp;
        <Input
          type="number"
          min="0"
          max="59"
          value={duration.minutes}
          className="inline w-14text-center"
          onChange={(evt) => setDuration({ ...duration, minutes: Number(evt.target.value) })}
        />
        <span className="text-sm ">min</span>
      </div>
      <NumberValuePickButtons
        scope={7}
        modulo={1}
        suffix="h"
        variant={(value) => (duration.hours === value ? 'white' : 'secondary')}
        callback={(value) => setDuration({ ...duration, hours: value })}
        disabled={(value) => duration.hours === value}
      />

      <NumberValuePickButtons
        scope={60}
        variant={(value) => (duration.minutes === value ? 'white' : 'secondary')}
        callback={(value) => setDuration({ ...duration, minutes: value })}
        disabled={(value) => duration.minutes === value}
      />
    </div>
    // </div>
  );
};
