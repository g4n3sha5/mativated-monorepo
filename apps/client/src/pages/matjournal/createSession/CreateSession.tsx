import { useToast } from '@/components/ui/use-toast';
import { trpc } from '@/utils/trpc';
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SessionCreateSchema } from '@mativated-monorepo/shared/validationSchemas';
import { Button } from 'components/ui/Button';
import { SectionHeader } from 'pages/matjournal/common/SectionHeader';
import { useEffect } from 'react';
// todo
// import 'react-datepicker/dist/react-datepicker.css';
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
import { type SessionCreateInput } from '@mativated-monorepo/server/src/utils/types';
import { MatJournalSection } from '@/pages/matjournal/common/MatJournalSection';

export const CreateSession = () => {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const utils = trpc.useUtils();
  if (!isLoaded) return <></>;
  if (!user || !user?.id) return <></>;
  const { data: previousSession, isLoading } = trpc.sessions.getSession.useQuery({
    authorId: user.id,
    staleTime: Infinity,
    retry: false,
  });

  const defaultValues: SessionCreateInput = {
    type: '',
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

  const createSessionMutation = trpc.sessions.createSession.useMutation({
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

  const methods = useForm<SessionCreateInput>({
    resolver: zodResolver(SessionCreateSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (!isLoading && previousSession?.weight) {
      defaultValues.weight = previousSession.weight;
      methods.reset(defaultValues);
    }
  }, [previousSession?.weight]);

  const onSubmit: SubmitHandler<SessionCreateInput> = (data) => {
    createSessionMutation.mutate(data);
  };

  const onError = (errors: FieldErrors<SessionCreateInput>) => {
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
    <MatJournalSection>
      <SectionHeader text="Add training session" />
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
          <Button type="submit" className="mt-6 mb-6 w-48" variant="basicCyan">
            Create session
          </Button>
        </form>
      </FormProvider>
    </MatJournalSection>
  );
};
