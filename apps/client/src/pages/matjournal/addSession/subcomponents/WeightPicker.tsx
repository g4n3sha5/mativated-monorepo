import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'components/ui/Input';
import { useState } from 'react';

export const WeightPicker = () => {
  const [weight, setWeight] = useState('');

  return (
    <div className="lg:w-721 w-1/2 p-3 addSessionPickerStyle flex flex-col items-center">
      <FontAwesomeIcon className="icon" icon={faWeightScale} />
      <h1>Weight</h1>
      <div className="relative">
        <Input
          className="text-2xl font-bold w-32 text-center h-14"
          type="number"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
        />
        <span className="absolute top-1/2 right-1/4 -translate-y-1/2">kg</span>
      </div>
    </div>
  );
};
