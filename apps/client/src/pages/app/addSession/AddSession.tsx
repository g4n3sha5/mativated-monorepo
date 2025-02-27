import { useToast } from '@/components/ui/use-toast';
import { AppSection } from '@/pages/app/common/AppSection';
import { trpc } from '@/utils/trpc';
import { AddSessionInput, SessionType, Technique } from '@/utils/types';
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddSessionSchema } from '@mativated-monorepo/server/src/utils/validationSchemas/sessions';
import { Button } from 'components/ui/Button';
import { useEffect } from 'react';
import { FieldErrors, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { DrillingTimePicker } from './subcomponents/DrillingTimePicker';
import { IntensityPicker } from './subcomponents/IntensityPicker';
import { SessionDatePicker } from './subcomponents/SessionDatePicker';
import { SessionLengthPicker } from './subcomponents/SessionLengthPicker';
import { SessionNotesPicker } from './subcomponents/SessionNotesPicker';
import { SessionTimePicker } from './subcomponents/SessionTimePicker';
import { SessionTypePicker } from './subcomponents/SessionTypePicker';
import { SparringTimePicker } from './subcomponents/SparringTimePicker';
import { WeightPicker } from './subcomponents/WeightPicker';
import { techniqueTypeOptions } from 'utils/constants';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/Tooltip';

type SessionFormState = Omit<AddSessionInput, 'type'> & {
  type: SessionType | undefined;
};

export const AddSession = () => {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const utils = trpc.useUtils();
  if (!isLoaded) return <></>;
  if (!user?.id) return <></>;

  const { data: previousSession, isLoading } = trpc.sessions.getSession.useQuery({
    authorId: user.id,
  });

  const defaultValues: SessionFormState = {
    type: undefined,
    date: new Date(),
    time: '',
    location: '',
    minutesLength: 0,
    notes: '',
    sparringTime: 0,
    drillingTime: 0,
    weight: 0,
    intensity: 'MODERATE',
    authorId: user.id,
  };

  const addSessionMutation = trpc.sessions.addSession.useMutation({
    onSuccess: () => {
      utils.sessions.getSessions.invalidate({ authorId: user.id });
      methods.reset();
      toast({
        title: 'Session created successfully',
        description: ':)',
        duration: 2000,
      });
      ``;
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: 'Error connecting to server',
        description: ':(',
        duration: 2000,
      });
    },
  });

  const methods = useForm<AddSessionInput>({
    resolver: zodResolver(AddSessionSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (!isLoading && previousSession?.weight) {
      defaultValues.weight = previousSession.weight;
      methods.reset(defaultValues);
    }
  }, [previousSession?.weight]);

  const onSubmit: SubmitHandler<AddSessionInput> = (data) => {
    addSessionMutation.mutate(data);
  };

  const onError = (errors: FieldErrors<AddSessionInput>) => {
    // @ts-ignore
    const errorMessage = Object.values(errors)[0]?.message;
    if (!errorMessage) return;
    toast({
      title: 'Please check your input',
      description: <p>{errorMessage?.toString()}</p>,
      duration: 3000,
    });
    setTimeout(() => {
      methods.clearErrors();
    }, 3000);
  };

  return (
    <AppSection className="animate-in fade-in zoom-in-75  duration-400">
      <h1 className="text-white text-3xl text-center lg:basis-full lg:grow mb-5   ">Add training session</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="flex flex-col items-center">
          <div className="flex flex-col gap-y-3 lg:flex-row gap-x-3 align-start items-center lg:items-start w-full ">
            <SessionTypePicker />
            <div className="flex flex-col items-center gap-y-3 w-full md:w-2/3 lg:w-1/4">
              <SessionDatePicker />
              <SessionTimePicker />
              <SessionLengthPicker />
            </div>
            <div className="flex flex-col items-center gap-y-3 md:w-2/3 w-full xl:w-1/4">
              <SparringTimePicker />
              <DrillingTimePicker />
            </div>
            <div className="flex flex-col items-center gap-y-3 w-full xl:w-1/3 grow">
              <SessionNotesPicker />
              <IntensityPicker />
              <WeightPicker />
            </div>
          </div>
          <Button type="submit" className="mt-1 mb-6 w-48 hover:scale-105" variant="indigo">
            Create session
          </Button>
        </form>
      </FormProvider>
    </AppSection>
  );
};

const TechniqueContent = ({ technique }: Technique) => {
  const typeOption = techniqueTypeOptions.find((option) => option.type === technique.type);

  if (!typeOption) return;
  return (
    <div className="flex  gap-y-3 w-full min-h-40 -mb-8">
      <div className="flex flex-col flex-1">
        <div className="w-full flex justify-between">
          <h1 className="text-xl font-bold ">{technique.name}</h1>
        </div>

        <p className="text-md text-gray-800">{technique.description}</p>
        <div className="flex items-center gap-x-2 mt-auto">
          <p className="text-sm text-gray-400">Date Added:</p>
          <p className="text-sm text-gray-500">{new Date(technique.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="w-1/6 ml-auto flex justify-end ">
        <TooltipProvider>
          <Tooltip>
            <div>
              <TooltipTrigger>
                <img src={typeOption.image} alt={`${typeOption.label} icon`} className="w-12 h-12" />
              </TooltipTrigger>
            </div>

            <TooltipContent side="left" className="text-white">
              {typeOption.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
