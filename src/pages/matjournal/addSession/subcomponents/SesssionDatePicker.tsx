import { Button } from 'components/ui/Button';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

export const SesssionDatePicker = () => {
  const [date, setDate] = useState(new Date());
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div className="w-72 rounded-xl text-center p-3 overflow-hidden bg-cyan">
      <h1 className="text-lg font-semibold">Date</h1>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        className="rounded-md px-2 mb-2 w-4/5 text-lg font-semibold text-center"
        selected={date}
        onChange={(date: any) => setDate(date)}
      />
      <div className="flex gap-x-5 justify-center">
        <Button
          variant="purple"
          onClick={() => {
            setDate(new Date());
          }}
        >
          Today
        </Button>
        <Button
          variant="purple"
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
