import { useState } from 'react';
import { Input } from 'components/ui/Input';
import { PlusButton } from 'pages/matjournal/common/PlusButton';
import { MinusButton } from 'pages/matjournal/common/MinusButton';
import katana from 'assets/images/katana.png';
import { Button } from 'components/ui/Button';
import { quickTimeValues } from 'utils/constants';

export const SparringTimePicker = () => {
  const [sparringTime, setSparringTime] = useState(0);
  let yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div className="addSessionPickerStyle  min-w-48 w-full lg:max-w-961">
      <img src={katana} className="icon" alt="Swords icon" />
      <h1>Sparring Time</h1>
      <div className="flex gap-x-1 w-full justify-center items-center">
        <MinusButton numValue={sparringTime} onClick={setSparringTime} />
        <div
          className="relative w-1/3 lg:w-1/4  
        text-2xl max-w-24"
        >
          <Input
            variant="purple"
            value={sparringTime}
            onChange={(event) => {
              setSparringTime(parseInt(event.target.value));
            }}
            className="w-full text-center pr-5"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm">min</div>
        </div>
        <PlusButton numValue={sparringTime} onClick={setSparringTime} />
      </div>
      {quickTimeValues && (
        <div className="flex gap-x-1 flex-wrap justify-center mt-1 gap-y-1">
          {quickTimeValues.map((value) => {
            if (!value) return;
            return (
              <Button
                key={value}
                variant={sparringTime === value ? 'white' : 'secondary'}
                disabled={sparringTime === value}
                onClick={() => setSparringTime(value)}
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
