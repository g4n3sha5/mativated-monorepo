import { SparingTimePicker } from './subcomponents/SparingTimePicker';
import { SesssionDatePicker } from './subcomponents/SesssionDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NumberPicker } from 'pages/matjournal/common/NumberPicker';

export const AddSession = () => {
  return (
    <section className="w-full ">
      <div className="flex gap-x-3">
        <SesssionDatePicker />
        <SparingTimePicker />
      </div>
    </section>
  );
};
