import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { useState } from 'react';
import { HourglassSplit } from 'react-bootstrap-icons';

export const SessionLengthPicker = () => {
  const [duration, setDuration] = useState({ minutes: 0, hours: 0 });

  return (
    <div className="w-full p-3 addSessionPickerStyle flex flex-col  items-center">
      <HourglassSplit className="icon" />
      <h1>Session Length</h1>
      <div className="bg-white w-36 border-2 border-secondaryDark text-black text-2xl font-bold px-6 py-2 rounded-lg mb-3">
        {duration.hours}
        <span className="text-sm ml-1">h</span>
        &nbsp;
        {duration.minutes}
        <span className="text-sm ml-1">min</span>
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
              variant={duration.minutes === durationValue ? 'white' : 'secondaryDark'}
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
// const durationButtonsHours = [
//   { text: '1h', value: 1 },
//   { text: '2h', value: 2 },
//   { text: '3h', value: 3 },
//   { text: '4h', value: 4 },
//   { text: '5h', value: 5 },
//   { text: '6h', value: 6 },
// ];
// const durationButtonsMinutes = [
//   { text: '10 min', value: 10 },
//   { text: '20 min', value: 20 },
//   { text: '30 min', value: 30 },
//   { text: '40 min', value: 40 },
//   { text: '50 min', value: 50 },
// ];
