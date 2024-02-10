import { useState } from 'react';
import { NumberPicker } from 'pages/matjournal/common/NumberPicker';
import { Input } from 'components/ui/Input';
import { PlusButton } from 'pages/matjournal/common/PlusButton';
import { MinusButton } from 'pages/matjournal/common/MinusButton';
import katana from 'assets/images/katana.png';

export const SparingTimePicker = () => {
  const [sparringTime, setSparringTime] = useState(0);
  let yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div className="w-auto rounded-xl flex flex-col items-center gap-y-1 text-center p-3 overflow-hidden bg-cyan min-w-48 max-w-full lg:max-w-96">
      <img src={katana} className="w-9 h-9" alt="Swords icon" />
      <h1 className="text-lg font-rubik font-bold">Sparring Time</h1>
      <div className="flex gap-x-1 w-full justify-center items-center">
        <MinusButton numValue={sparringTime} onClick={setSparringTime} />
        <div
          className="relative w-1/3 lg:w-1/4  
        text-2xl"
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
      <NumberPicker onClick={setSparringTime} endRange={40} modulo={5} activeNumber={sparringTime} />
    </div>
  );
};
