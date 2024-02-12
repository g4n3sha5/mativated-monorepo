import { faChartSimple, faFeather } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/ui/Button';
import { useState } from 'react';
import { intensityLevels } from 'utils/constants';
import { Intensity } from 'utils/types';

export const IntensityPicker = () => {
  const [intensity, setIntensity] = useState<Intensity>('Moderate');

  return (
    <div className="lg:w-721 w-2/3 p-3 px-6 addSessionPickerStyle flex flex-col items-center">
      <FontAwesomeIcon className="icon" icon={faChartSimple} />
      <h1>Intensity</h1>
      <div className="flex gap-x-4">
        {intensityLevels.map((level) => {
          return (
            <Button
              variant={level.value === intensity ? 'white' : 'secondary'}
              disabled={level.value === intensity}
              className="w-16 h-18 tracking-tight text-md flex flex-col justify-center items-center !rounded-2xl"
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
