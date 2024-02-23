import { SessionCreateInput } from '@mativated-monorepo/shared/types';
import { trpc } from '@/utils/trpc';
import { Button } from 'components/ui/Button';
import { SectionHeader } from 'pages/matjournal/common/SectionHeader';
import 'react-datepicker/dist/react-datepicker.css';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { DrillingTimePicker } from './subcomponents/DrillingTimePicker';
import { IntensityPicker } from './subcomponents/IntensityPicker';
import { SessionDatePicker } from './subcomponents/SessionDatePicker';
import { SessionLengthPicker } from './subcomponents/SessionLengthPicker';
import { SessionNotesPicker } from './subcomponents/SessionNotesPicker';
import { SessionTimePicker } from './subcomponents/SessionTimePicker';
import { SessionTypePicker } from './subcomponents/SessionTypePicker';
import { SparringTimePicker } from './subcomponents/SparringTimePicker';
import { WeightPicker } from './subcomponents/WeightPicker';
import { useToast } from '@/components/ui/use-toast';
import { SessionCreateSchema } from '@mativated-monorepo/shared/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export const CreateSession = () => {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();

  if (!isLoaded) return <></>;
  if (!user || !user?.id) return <></>;

  const previousWeight: number = 0;
  const defaultValues: SessionCreateInput = {
    type: 'GI',
    date: new Date(),
    time: '',
    location: '',
    minutesLength: 0,
    notes: '',
    sparringTime: 0,
    drillingTime: 0,
    weight: previousWeight,
    intensity: 'MODERATE',
    authorId: user.id,
  };
  const methods = useForm<SessionCreateInput>({
    resolver: zodResolver(SessionCreateSchema),
    defaultValues: defaultValues,
  });

  console.log(trpc.sessions);
  const createSessionMutation = trpc.sessions.createSession.useMutation({
    onSuccess: (data: any) => {
      toast({
        title: 'Session created successfully',
        description: ':)',
      });
    },
  });

  const onSubmit: SubmitHandler<SessionCreateInput> = (data) => {
    createSessionMutation.mutate(data);
  };

  // useEffect(() => {
  //   const errors = Object.values(methods.formState.errors);
  //   const message = errors[0]?.message;
  //   if (errors.length) {
  //     toast({
  //       title: 'Please check your input',
  //       description: <p>{message?.toString()}</p>,
  //     });
  //   }

  //   setTimeout(() => {
  //     methods.clearErrors();
  //   }, 2000);
  // }, [methods.formState.errors]);

  return (
    <section className="w-full px-4 pt-3 h-full">
      <SectionHeader text="Add training session" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col items-center">
          <div className="flex flex-col gap-y-3 lg:flex-row gap-x-3 align-start items-center lg:items-start">
            <SessionTypePicker />
            <div className="flex flex-col gap-y-3 w-full lg:w-1/4">
              <SessionDatePicker />
              <SessionTimePicker />
              <SessionLengthPicker />
            </div>
            <div className="flex flex-col gap-y-3 w-full xl:w-1/4">
              <SparringTimePicker />
              <DrillingTimePicker />
            </div>
            <div className="flex flex-col items-center gap-y-3 w-full xl:w-1/3 grow">
              <SessionNotesPicker />
              <WeightPicker />
              <IntensityPicker />
            </div>
          </div>
          <Button type="submit" className="mt-10 w-48" variant="cyan">
            Add session
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
