import { CreateSessionInputField } from '@mativated-monorepo/shared/types';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/ui/Button';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IntensityDictionary, intensityLevels } from 'utils/constants';

export const IntensityPicker = () => {
  const field: CreateSessionInputField = 'intensity';
  const { setValue } = useFormContext();
  const [intensity, setIntensity] = useState(IntensityDictionary.MODERATE);

  return (
    <div className="w-full p-3 px-6 createSessionPickerStyle flex flex-col items-center">
      <FontAwesomeIcon className="icon" icon={faChartSimple} />
      <h1>Intensity</h1>
      <div className="flex gap-x-4">
        {intensityLevels.map((level, index) => {
          return (
            <Button
              key={level.value + index}
              variant={level.value === intensity ? 'white' : 'secondary'}
              disabled={level.value === intensity}
              className="w-1/5 h-auto tracking-tight text-md flex flex-col justify-center items-center !rounded-2xl"
              onClick={() => setIntensity(level.value)}
            >
              <FontAwesomeIcon className="w-5 h-5" icon={level.icon} />
              <h2>{level.value}</h2>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
