import { SessionCreateInput } from '@/pages/matjournal/addSession/types';
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
import { SessionSchema } from '@mativated-monorepo/shared/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { i } from 'vite/dist/node/types.d-jgA8ss1A';

export const AddSession = () => {
  const addSessionMutation = trpc.sessions.addSession.useMutation();
  const { toast } = useToast();
  // const previousWeight = usePrevious(addSessionMutation.data?.session?.weight);
  const previousWeight = 0;

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
  };
  const methods = useForm<SessionCreateInput>({ resolver: zodResolver(SessionSchema), defaultValues: defaultValues });

  // console.log(methods.formState.errors);
  // if (methods.formState.errors) {
  //   toast({
  //     title: 'An unexpected error occurred',
  //     description: 'Friday, February 10, 2023 at 5:57 PM',
  //   });
  // }

  const onSubmit: SubmitHandler<SessionCreateInput> = (data) => {
    toast({
      title: 'Backend is not ready yet',
      description: ':)',
    });
    addSessionMutation.mutate(data);
  };

  useEffect(() => {
    const errors = Object.values(methods.formState.errors);
    if (errors.length) {
      toast({
        title: 'An unexpected error occurred',
        description: errors[0]?.message,
      });
    }
  }, [methods.formState.errors]);

  return (
    <section className="w-full px-4 pt-3 h-full">
      <SectionHeader text="Add training session" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col items-center">
          <div className="flex flex-col gap-y-3 lg:flex-row gap-x-3 items-start align-start content-start">
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
