import { useToast } from '@/components/ui/use-toast';
import { AppSection } from '@/pages/app/common/AppSection';
import { trpc } from 'utils/trpc';
import { AddSessionInput } from 'utils/types';
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddSessionSchema } from '@mativated-monorepo/server/src/utils/validationSchemas/sessions';
import { Button } from 'components/ui/Button';
import { useEffect } from 'react';
import { FieldErrors, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SessionType } from '@mativated-monorepo/server/src/utils/types';
import { DrillingTimePicker } from './subcomponents/DrillingTimePicker';
import { IntensityPicker } from './subcomponents/IntensityPicker';
import { SessionDatePicker } from './subcomponents/SessionDatePicker';
import { SessionLengthPicker } from './subcomponents/SessionLengthPicker';
import { SessionNotesPicker } from './subcomponents/SessionNotesPicker';
import { SessionTimePicker } from './subcomponents/SessionTimePicker';
import { SessionTypePicker } from './subcomponents/SessionTypePicker';
import { SparringTimePicker } from './subcomponents/SparringTimePicker';
import { WeightPicker } from './subcomponents/WeightPicker';

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
    type: null,
    date: null,
    time: '',
    location: '',
    minutesLength: null,
    notes: '',
    sparringTime: null,
    drillingTime: null,
    weight: null,
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
