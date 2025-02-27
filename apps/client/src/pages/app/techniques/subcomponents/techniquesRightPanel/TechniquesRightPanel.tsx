import { DateScope } from '@/utils/types';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { ArrowLeftRight } from 'react-bootstrap-icons';
import { RadioGroup, RadioGroupItem } from 'components/ui/RadioGroup';
import { Label } from 'components/ui/Label';
import { techniqueTypeOptions } from 'utils/constants';
import { Button } from 'components/ui/Button';
import { useModal } from 'utils/hooks';
import { trpc } from '@/utils/trpc';

interface Props {
  setIsShownRightPanel: (shown: boolean) => void;
}

export const TechniquesRightPanel = ({ setIsShownRightPanel }: Props) => {
  const { user, isLoaded } = useUser();
  const modal = useModal();

  if (!isLoaded) return <></>;
  if (!user?.id) return <></>;

  const { data, isError, isLoading } = trpc.techniques.getTechniques.useQuery();

  const [dateScope, setDateScope] = useState<DateScope>({ lte: new Date(), gte: new Date() });

  console.log(data);
  return (
    <div
      className="xl:min-w-[37vw] ml-auto animate-in fade-in slide-in-from-right duration-400    z-10  lg:pl-0  md:w-1/2 lg:w-[45vw] xl:w-[40vw] 2xl:w-[37vw]   h-full pb-10
      bg-indigo-800   min-h-screen pt-navHeight flex"
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
        <div className=" 2xl:px-10 flex flex-col items-center   gap-2 overflow-y-auto justify-start h-full mt-4 w-full">
          {data?.map((technique) => {
            return (
              <Button
                onClick={() => modal.open({ content: <TechniqueContent technique={technique} /> })}
                variant="ghost"
                className="w-3/4  pb-1 flex flex-col items-center cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <h1 className="text-white text-2xl text-center">{technique.name}</h1>
                </div>
                <hr className="text-cyan-400 w-14" />
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
