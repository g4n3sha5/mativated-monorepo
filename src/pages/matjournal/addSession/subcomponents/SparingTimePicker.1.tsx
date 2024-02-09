import { useState } from 'react';
import { NumberPicker } from 'pages/matjournal/common/NumberPicker';
import { Input } from 'components/ui/Input';
import { PlusButton } from 'pages/matjournal/common/PlusButton';
import { MinusButton } from 'pages/matjournal/common/MinusButton';

export const SparingTimePicker = () => {
  const [sparringTime, setSparringTime] = useState(0);
  let yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div className="w-auto rounded-xl flex flex-col items-center gap-y-1 text-center p-3 overflow-hidden bg-cyan max-w-96">
      <h1 className="text-lg font-semibold">Sparring Time</h1>
      <MinusButton onClick={setSparringTime} />
      <Input type="number" variant="purple" value={sparringTime} className="w-1/2" />
      <PlusButton onClick={setSparringTime} />
      <NumberPicker onClick={setSparringTime} endRange={40} modulo={5} />
    </div>
  );
};
