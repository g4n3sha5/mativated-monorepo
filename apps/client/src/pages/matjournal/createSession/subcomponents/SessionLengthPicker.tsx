import { Input } from '@/components/ui/Input';
import { NumberValuePickButtons } from '@/pages/matjournal/common/NumberValuePickButtons';
import { CreateSessionInputField } from '@/utils/types';
import { Button } from 'components/ui/Button';
import { useEffect, useState } from 'react';
import { HourglassSplit } from 'react-bootstrap-icons';
import { useFormContext } from 'react-hook-form';

export const SessionLengthPicker = () => {
  const field: CreateSessionInputField = 'minutesLength';
  const [duration, setDuration] = useState({ minutes: 0, hours: 0 });
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(field, duration.hours * 60 + duration.minutes);
  }, [duration]);

  const durationValuesHours = [...Array(6).keys()];

  return (
    <div className="w-full p-3 createSessionPickerStyle flex flex-col  items-center">
      <HourglassSplit className="icon" />
      <h1>Session Length</h1>
      <div className="bg-white w-48 border-2 border-secondaryDarker text-black text-2xl font-bold px-6 py-2 rounded-lg mb-3  flex items-center">
        <Input
          type="number"
          min="0"
          className="inline max-w-10 text-center"
          value={duration.hours}
          onChange={(evt) => setDuration({ ...duration, hours: Number(evt.target.value) })}
        />
        <span className="text-sm ">h</span>
        &nbsp;
        <Input
          type="number"
          min="0"
          value={duration.minutes}
          className="inline max-w-10 text-center"
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
