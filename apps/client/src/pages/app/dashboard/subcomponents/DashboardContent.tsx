import { Separator } from '@/components/ui/Separator';
import { GoalProgressIndicator } from '@/pages/app/dashboard/subcomponents/GoalProgressIndicator';
import { SessionTypePicker } from 'pages/app/dashboard/subcomponents/SessionTypePicker';
import { totalSessionTypeOptions } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { TotalSessionType } from '@/utils/types';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { ArrowLeftRight } from 'react-bootstrap-icons';
import { FormProvider, useForm } from 'react-hook-form';

import { Statistics } from './Statistics';
import { SessionTypeIcon } from 'components/ui/SessionTypeIcon';

interface Props {
  setIsShownRightPanel: (shown: boolean) => void;
}

export const DashboardContent = ({ setIsShownRightPanel }: Props) => {
  const { user, isLoaded } = useUser();
  const utils = trpc.useUtils();
  const defaultValues: Record<'type', TotalSessionType> = {
    type: 'TOTAL',
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { watch } = methods;
  if (!user?.id) return <></>;

  const { data: statistics } = trpc.sessions.getSessionSpecificStats.useQuery({
    authorId: user.id,
    type: watch('type'),
  });
  console.log(watch('type'));

  useEffect(() => {
    utils.sessions.getSessionSpecificStats.invalidate();
  }, []);

  return (
    <div className=" h-full w-full xl:pt-0 xl:p-10 flex flex-col  animate-in fade-in slide-in-from-left duration-400 lg:p-2 overflow-x-hidden overflow-y-auto ">
      <div className="w-full md:pt-navHeight pt-[calc(var(--navHeight)_+_20px)] flex pr-4 align-middle px-4 md:px-0">
        <h1 className=" text-2xl  text-zinc-300 text-center md:text-left mb-1 pl-2 xl:pl-0">
          <span className="text-zinc-100  font-bold ">
            {totalSessionTypeOptions.find((obj) => obj.type === watch('type'))?.label}
          </span>{' '}
          statistics
        </h1>
        <ArrowLeftRight
          className="md:hidden cursor-pointer text-white  mb-3 ml-auto mr-3 hover:scale-110 text-3xl "
          onClick={() => setIsShownRightPanel(true)}
        />
      </div>

      <div className="flex justify-between gap-2 lg:gap-10 items-center md:items-start px-2 xl:px-0">
        <div className="flex justify-between w-1/2 hidden md:flex">
          <h1 className=" text-white text-4xl xl:text-5xl tracking-tighter font-extralight ">Dashboard</h1>{' '}
          <SessionTypeIcon className="h-12 w-12 text-white" type={watch('type')} />
        </div>
        <FormProvider {...methods}>
          <form className="flex flex-1 flex-col items-center  basis-[100%] my-3">
            <SessionTypePicker />
          </form>
        </FormProvider>
      </div>

      <Separator className="bg-white w-64 mt-2 mb-6 mx-auto md:mx-0" />
      <div className="flex flex-col flex-1  w-full     overflow-x-hidden  overflow-auto 2xl:overflow-hidden lg:mt-10">
        {statistics && <Statistics statistics={statistics} type={watch('type')} />}
        <GoalProgressIndicator />
      </div>
    </div>
  );
};
