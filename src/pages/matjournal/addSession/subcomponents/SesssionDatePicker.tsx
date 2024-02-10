import { Button } from 'components/ui/Button';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import calendar from 'assets/images/calendar.png';

export const SesssionDatePicker = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return (
    <div className="lg:w-72 rounded-xl text-center p-3 bg-cyan flex flex-col  items-center pt-5">
      <h1 className="text-lg font-semibold">Date</h1>
      <div className="relative w-max h-min mb-3">
        <DatePicker
          dateFormat="dd/MM/yyyy"
          className="rounded-md px-2 w-4/5 text-lg font-semibold text-center"
          selected={date}
          onChange={(date: any) => setDate(date)}
        />
        <img src={calendar} alt="Calendar icon" className="absolute w-5 h-5 right-6 top-1/2 -translate-y-1/2" />
      </div>
      <div className="flex gap-x-5 justify-center">
        <Button
          variant={today.toDateString() === date.toDateString() ? 'white' : 'purple'}
          disabled={today.toDateString() === date.toDateString()}
          onClick={() => {
            setDate(today);
          }}
        >
          Today
        </Button>
        <Button
          variant={date.toDateString() === yesterday.toDateString() ? 'white' : 'purple'}
          disabled={date.toDateString() === yesterday.toDateString()}
          onClick={() => {
            setDate(yesterday);
          }}
        >
          Yesterday
        </Button>
      </div>
    </div>
  );
};
