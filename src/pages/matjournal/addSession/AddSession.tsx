import { SparingTimePicker } from './subcomponents/SparingTimePicker';
import { SesssionDatePicker } from './subcomponents/SesssionDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NumberPicker } from 'pages/matjournal/common/NumberPicker';
import { SectionHeader } from 'pages/matjournal/common/SectionHeader';
import { SessionTypePicker } from 'pages/matjournal/addSession/subcomponents/SessionTypePicker';

export const AddSession = () => {
  return (
    <section className="w-full px-4 pt-3 h-full">
      <SectionHeader text="Add training session" />
      <div className="flex flex-col gap-y-3 lg:flex-row gap-x-3 items-start align-start content-start">
        <SessionTypePicker />
        <SesssionDatePicker />
        <SparingTimePicker />
      </div>
    </section>
  );
};
