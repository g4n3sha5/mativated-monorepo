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

  return (
    <div className="w-full p-3 createSessionPickerStyle flex flex-col  items-center">
      <HourglassSplit className="icon" />
      <h1>Session Length</h1>
      <div className="bg-white w-48 border-2 border-secondaryDarker text-black text-2xl font-bold px-6 py-2 rounded-lg mb-3  flex items-center">
        <input
          type="number"
          min="0"
          className="inline max-w-10 text-center"
          value={duration.hours}
          onChange={(evt) => setDuration({ ...duration, hours: Number(evt.target.value) })}
        />
        <span className="text-sm ">h</span>
        &nbsp;
        <input
          type="number"
          min="0"
          value={duration.minutes}
          className="inline max-w-10 text-center"
          onChange={(evt) => setDuration({ ...duration, minutes: Number(evt.target.value) })}
        />
        <span className="text-sm ">min</span>
      </div>
      <div className="flex gap-x-1 justify-center flex-wrap mb-2 gap-y-1">
        {durationValuesHours.map((durationValue) => {
          return (
            <Button
              key={durationValue}
              size="sm"
              variant={duration.hours === durationValue ? 'white' : 'secondary'}
              onClick={() => setDuration({ ...duration, hours: durationValue })}
            >
              <h3 className="m-0">{durationValue} h</h3>
            </Button>
          );
        })}
      </div>
      <div className="flex gap-x-1 justify-center flex-wrap gap-y-1">
        {durationValuesMinutes.map((durationValue) => {
          return (
            <Button
              key={durationValue}
              size="sm"
              variant={duration.minutes === durationValue ? 'white' : 'secondaryDarker'}
              onClick={() => setDuration({ ...duration, minutes: durationValue })}
            >
              <h3 className="m-0">{durationValue} min</h3>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
const durationValuesHours = [...Array(6).keys()];
const durationValuesMinutes = [...Array(51).keys()].filter((duration) => duration % 10 === 0 && Number);
