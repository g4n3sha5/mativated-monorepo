import { useState } from 'react';
import { Input } from 'components/ui/Input';
import { PlusButton } from 'pages/matjournal/common/PlusButton';
import { MinusButton } from 'pages/matjournal/common/MinusButton';
import drill from 'assets/images/rinse.png';
import { Button } from 'components/ui/Button';
import { quickTimeValues } from 'utils/constants';

export const DrillingTimePicker = () => {
  const [drillingTime, setDrillingTime] = useState(0);
  let yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div className="addSessionPickerStyle w-full">
      <img src={drill} className="icon" alt="Drilling icon" />
      <h1>Drilling Time</h1>
      <div className="flex gap-x-1 w-full justify-center items-center">
        <MinusButton numValue={drillingTime} onClick={setDrillingTime} />
        <div
          className="relative w-1/3 lg:w-1/4  
        text-2xl"
        >
          <Input
            variant="purple"
            value={drillingTime}
            onChange={(event) => {
              setDrillingTime(parseInt(event.target.value));
            }}
            className="w-full text-center pr-5"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm">min</div>
        </div>
        <PlusButton numValue={drillingTime} onClick={setDrillingTime} />
      </div>
      {quickTimeValues && (
        <div className="flex gap-x-1 flex-wrap justify-center gap-y-1">
          {quickTimeValues.map((value) => {
            if (!value) return;
            return (
              <Button
                key={value}
                size="sm"
                variant={drillingTime === value ? 'white' : 'secondary'}
                disabled={drillingTime === value}
                onClick={() => setDrillingTime(value)}
                className="cursor-pointer text-center"
              >
                <h3 className="m-0">{value} min</h3>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};
