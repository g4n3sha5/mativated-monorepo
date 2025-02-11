import { useForm } from 'react-hook-form';
import { Input } from 'components/ui/Input';
import { Textarea } from 'components/ui/Textarea';
import { techniqueTypeOptions } from 'utils/constants';
import { GiSwitch } from './GiSwitch';

interface Props {
  setIsShownRightPanel: (shown: boolean) => void;
}

export const TechniquesContent = ({ setIsShownRightPanel }: Props) => {
  const mainTechniqueOptions = techniqueTypeOptions.slice(0, 8);
  const sideTechniqueOptions = techniqueTypeOptions.slice(8);

  const defaultValues = {
    name: '',
    description: '',
    type: 'TOTAL',
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { register, handleSubmit, errors } = methods;

  const onSubmit = (data: any) => {
    // TODO: Add form submission logic + handle errors

    console.log('Form submitted:', data);
  };
  return (
    <div className="flex flex-col  w-full text-white pt-navHeight  pl-8 pb-10 pr-5 overflow-y-scroll">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-8">
        <div className="w-full flex justify-between  items-center pl-2 ">
          <h1 className="text-2xl font-semibold mb-4 pt-4">Add a Technique</h1>

          <GiSwitch className="bg-white" />
        </div>
        <div className="flex w-2/3  flex-col ">
          <hr className="border-cyan-500 mb-4 w-1/2" />
          <Input
            placeholder="Technique Name"
            {...register('name', { required: 'Technique name is required' })}
            className="w-2/3 p-2 border border-gray-600 rounded-lg mb-3 bg-indigo-100 text-black"
          />
          <Textarea
            placeholder="Technique info / tips / video link..."
            {...register('description')}
            className="w-full p-3 border border-gray-600 rounded-lg bg-indigo-200 min-h-24 resize-none text-black"
          />
          {/*{errors.name && <p className="text-red-400">{errors.name.message}</p>}*/}
          <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 mt-8 pl-1">
            {mainTechniqueOptions.map(({ label, type, image }) => (
              <label key={type} className="flex flex-col items-center  cursor-pointer">
                <Input type="radio" value={type} {...register('type')} className="hidden peer" />
                <div className="p-2 rounded-lg peer-checked:bg-indigo-100 border bg-indigo-500">
                  <img src={image} alt={`${label} icon`} className="w-12 h-12 md:w-24 md:h-24" />
                </div>
                <div className="mt-2 text-sm md:text-base">{label}</div>
              </label>
            ))}
          </div>

          <hr className="border-cyan-500 mb-3 w-1/2 pt-2 mt-2" />
          <div className="flex flex-wrap flex-col justify-start gap-2 w-full pl-1">
            <h1 className="text-sm font-light text-neutral-200 -mt-2  ">
              Select only if technique type doesn't fit any of the more specific categories.
            </h1>
            <div className="flex  gap-y-2">
              {sideTechniqueOptions.map(({ label, type, image }) => (
                <label key={type} className="flex flex-col items-center p-2 cursor-pointer">
                  <Input type="radio" value={type} {...register('type')} className="hidden peer" />
                  <div className="p-2 rounded-lg peer-checked:bg-indigo-100 border bg-indigo-500">
                    <img src={image} alt={`${label} icon`} className="w-12 h-12 md:w-18 md:h-18" />
                  </div>
                  <div className="mt-2 text-sm md:text-base">{label}</div>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition">
            Add Technique
          </button>
        </div>
      </form>
    </div>
  );
};
