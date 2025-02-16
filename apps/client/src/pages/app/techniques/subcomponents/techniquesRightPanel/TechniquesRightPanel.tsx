import { DateScope, Technique } from '@/utils/types';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { ArrowLeftRight } from 'react-bootstrap-icons';
import { RadioGroup, RadioGroupItem } from 'components/ui/RadioGroup';
import { Label } from 'components/ui/Label';
import { techniqueTypeOptions } from 'utils/constants';

interface Props {
  setIsShownRightPanel: (shown: boolean) => void;
  techniques: Technique[];
}

export const TechniquesRightPanel = ({ setIsShownRightPanel, techniques }: Props) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <></>;
  if (!user?.id) return <></>;

  const [dateScope, setDateScope] = useState<DateScope>({ lte: new Date(), gte: new Date() });

  console.log(techniques);
  return (
    <div
      className="xl:min-w-[37vw] animate-in fade-in slide-in-from-right duration-400    z-10  lg:pl-0  md:w-1/2 lg:w-[45vw] xl:w-[40vw] 2xl:w-[37vw]   h-full pb-10
      bg-indigo-800   min-h-screen pt-navHeight"
    >
      <div className=" flex-1 flex flex-col items-center justify-center w-full gap-x-3 pb-10 pt-8 ">
        <ArrowLeftRight
          className="md:hidden mb-auto cursor-pointer text-white  mr-auto ml-3 text-3xl hover:scale-110"
          onClick={() => setIsShownRightPanel(false)}
        />
        <div className="w-full bg-indigo-900 flex justify-center">
          <RadioGroup className="flex flex-wrap justify-center w-4/5 gap-0 ">
            {techniqueTypeOptions.map((option) => (
              // <Button variant="indigoDark" asChild>
              <Label
                className="[&:has([data-state=checked])]:bg-indigo-600
              [&:has([data-state=checked])]:border-indigo-900 rounded-none px-3 py-2 text-white border-none outline-none"
              >
                <RadioGroupItem value={option.type} id="option1" className="hidden" />
                {option.label}
              </Label>
              // </Button>
            ))}
          </RadioGroup>
        </div>
        <div className=" px-1 2xl:px-10 flex flex-col justify-start  gap-y-4 overflow-y-auto 2xl:overflow-hidden h-[calc(100vh-226px)]">
          <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center lg:justify-around">
            {techniques?.map((technique) => (
              <h1>{technique.name}</h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
