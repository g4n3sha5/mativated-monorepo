import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CreateSessionInputField } from '@/utils/types';
import { Button } from 'components/ui/Button';
import { useFormContext } from 'react-hook-form';
import { intensityLevels } from 'utils/constants';

export const IntensityPicker = () => {
  const field: CreateSessionInputField = 'intensity';
  const { setValue, watch } = useFormContext();

  return (
    <div className="w-4/5 xl:w-3/4 p-3 px-6 createSessionPickerStyle flex flex-col items-center">
      <FontAwesomeIcon className="icon" icon={faChartSimple} />
      <h1>Intensity</h1>
      <div className="flex gap-x-2 gap-y-2 flex-wrap justify-center">
        {intensityLevels.map((level, index) => {
          return (
            <Button
              key={level.value + index}
              variant={level.value === watch(field) ? 'white' : 'secondary'}
              disabled={level.value === watch(field)}
              className="w-20 h-auto tracking-tight text-md flex flex-col justify-center items-center !rounded-2xl"
              onClick={() => setValue(field, level.value)}
            >
              <FontAwesomeIcon className="w-5 h-5" icon={level.icon} />
              <h2>{level.readable}</h2>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
