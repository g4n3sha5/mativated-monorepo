import { SparringTimePicker } from './subcomponents/SparringTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SectionHeader } from 'pages/matjournal/common/SectionHeader';
import { SessionTypePicker } from './subcomponents/SessionTypePicker';
import { SessionDatePicker } from './subcomponents/SessionDatePicker';
import { SessionTimePicker } from './subcomponents/SessionTimePicker';
import { SessionNotesPicker } from './subcomponents/SessionNotesPicker';
import { DrillingTimePicker } from './subcomponents/DrillingTimePicker';
import { SessionLengthPicker } from './subcomponents/SessionLengthPicker';
import { WeightPicker } from './subcomponents/WeightPicker';
import { IntensityPicker } from './subcomponents/IntensityPicker';

export const AddSession = () => {
  return (
    <section className="w-full px-4 pt-3 h-full">
      <SectionHeader text="Add training session" />
      <div className="flex flex-col gap-y-3 lg:flex-row gap-x-3 items-start align-start content-start">
        <SessionTypePicker />
        <div className="flex flex-col gap-y-3 w-full lg:w-1/4">
          <SessionDatePicker />
          <SessionTimePicker />
          <SessionLengthPicker />
        </div>
        <div className="flex flex-col gap-y-3 w-full xl:w-1/3">
          <SparringTimePicker />
          <DrillingTimePicker />
        </div>
        <div className="flex flex-col items-center gap-y-3 w-full xl:w-1/3 grow">
          <SessionNotesPicker />
          <WeightPicker />
          <IntensityPicker />
        </div>
      </div>
    </section>
  );
};
