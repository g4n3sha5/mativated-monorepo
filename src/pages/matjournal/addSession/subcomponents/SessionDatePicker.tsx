import { Button } from 'components/ui/Button';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import calendar from 'assets/images/calendar.png';
import { CalendarDateFill } from 'react-bootstrap-icons';

export const SessionDatePicker = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  let yesterday = new Date();
  const calendarRef = useRef<any>();
  yesterday.setDate(today.getDate() - 1);

  return (
    <div className="lg:w-full addSessionPickerStyle ">
      <CalendarDateFill className="icon" />
      <h1>Date</h1>
      <div className="relative w-max h-min mb-3">
        <DatePicker
          ref={calendarRef}
          dateFormat="dd/MM/yyyy"
          className="rounded-md px-2 w-4/5 text-lg font-semibold text-center z-10"
          selected={date}
          onChange={(date: Date) => setDate(date)}
        />
        <img
          src={calendar}
          onClick={() => {
            calendarRef.current.setOpen(true);
          }}
          alt="Calendar icon"
          className="absolute w-5 h-5 right-6 top-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex gap-x-5 justify-center">
        <Button
          variant={today.toDateString() === date.toDateString() ? 'white' : 'secondary'}
          disabled={today.toDateString() === date.toDateString()}
          onClick={() => {
            setDate(today);
          }}
        >
          Today
        </Button>
        <Button
          variant={date.toDateString() === yesterday.toDateString() ? 'white' : 'secondary'}
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
