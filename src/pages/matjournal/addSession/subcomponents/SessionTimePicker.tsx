import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { useState } from 'react';
import { ClockFill } from 'react-bootstrap-icons';

export const SessionTimePicker = () => {
  const [time, setTime] = useState('');
  const hourValues = ['08:00', '12:00', '16:00', '18:00', '20:00'];

  return (
    <div className="lg:w-721 w-full addSessionPickerStyle ">
      <ClockFill className="icon" />
      <h1>Time</h1>
      <div className="relative w-max h-min mb-3">
        <Input
          variant="purple"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className=""
        />
      </div>
      <div className="flex gap-x-1 justify-center flex-wrap">
        {hourValues.map((value) => {
          if (!value) return;
          return (
            <Button
              key={value}
              variant={time === value ? 'white' : 'secondary'}
              disabled={time === value}
              onClick={() => setTime(value)}
              className="border-white p-3 w-1/6 border-[1px] cursor-pointer text-center"
            >
              <h3 className="m-0">{value}</h3>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
