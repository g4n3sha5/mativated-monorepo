import { DateScope, Technique } from '@/utils/types';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { techniqueTypeOptions } from 'utils/constants';
import { useModal } from 'utils/hooks';

interface Props {
  setIsShownRightPanel: (shown: boolean) => void;
  goals: Technique[];
}

const TechniqueContent = ({ technique }: Technique) => {
  const typeOption = techniqueTypeOptions.find((option) => option.type === technique.type);
  if (!typeOption) return;
  return <div className="flex  gap-y-3 w-full min-h-40 -mb-8"></div>;
};

export const GoalsRightPanel = ({ setIsShownRightPanel, goals }: Props) => {
  const { user, isLoaded } = useUser();
  const modal = useModal();
  if (!isLoaded) return <></>;
  if (!user?.id) return <></>;

  const [dateScope, setDateScope] = useState<DateScope>({ lte: new Date(), gte: new Date() });

  // console.log(goals);
  return (
    <div
      className="ml-auto xl:min-w-[37vw] animate-in fade-in slide-in-from-right duration-400    z-10  lg:pl-0  md:w-1/2 lg:w-[45vw] xl:w-[40vw] 2xl:w-[37vw]   h-full pb-10
      bg-indigo-800   min-h-screen pt-navHeight flex"
    ></div>
  );
};
