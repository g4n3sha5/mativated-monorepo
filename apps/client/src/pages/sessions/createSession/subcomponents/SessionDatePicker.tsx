import { CreateSessionInputField } from '@/utils/types';
import calendar from 'assets/images/calendar.png';
import { Button } from 'components/ui/Button';
import { useRef } from 'react';
import { getPriorDate } from '@mativated-monorepo/shared/helpers';
import { CalendarDateFill } from 'react-bootstrap-icons';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import { useFormContext } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

export const SessionDatePicker = () => {
  const field: CreateSessionInputField = 'date';
  const { setValue, watch } = useFormContext();
  const calendarRef = useRef<ReactDatePicker>(null);

  const dateButtons: { name: string; value: Date }[] = [
    { name: 'Today', value: new Date() },
    { name: 'Yesterday', value: getPriorDate(1) },
  ];

  return (
    <div className="w-3/4 lg:w-full createSessionPickerStyle overflow-visible">
      <CalendarDateFill className="icon" />
      <h1>Date</h1>
      <div className="relative w-max h-min mb-3">
        <DatePicker
          ref={calendarRef}
          dateFormat="dd/MM/yyyy"
          className="cursor-pointer rounded-md px-2 w-4/5 text-lg font-semibold text-center z-10 "
          selected={watch(field)}
          onChange={(date: Date) => setValue(field, date)}
        />
        <img
          src={calendar}
          onClick={() => {
            calendarRef.current?.setOpen(true);
          }}
          alt="Calendar icon"
          className="absolute w-5 h-5 right-6 top-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex gap-x-5 justify-center">
        {dateButtons.map((button) => (
          <Button
            key={button.name}
            variant={watch(field).toDateString() === button.value.toDateString() ? 'white' : 'secondary'}
            disabled={watch(field).toDateString() === button.value.toDateString()}
            onClick={() => {
              setValue(field, button.value);
            }}
          >
            {button.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
