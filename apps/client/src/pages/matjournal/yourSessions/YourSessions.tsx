import { Session } from '@/pages/matjournal/yourSessions/subcomponents/Session';
import { trpc } from '@/utils/trpc';
import { useUser } from '@clerk/clerk-react';
import { Session as SessionType } from '@/utils/types';
import { useConfirmModal } from '@/components/common/confirmModal/useConfirmModal';

export const YourSessions = () => {
  const { user, isLoaded } = useUser();
  const modal = useConfirmModal();

  if (!isLoaded) return <></>;
  if (!user || !user?.id) return <></>;

  const { data: sessions } = trpc.sessions.getSessions.useQuery({ authorId: user.id });
  if (!sessions) return <></>;

  const removeSession = (id: SessionType['id']) => {
    console.log('removed!');
  
  };

  return (
    <>
      <section className="w-full px-4 pt-3 h-full flex gap-x-4 flex-wrap gap-y-6 justify-center items-center">
        {sessions.map((session, index) => (
          <Session
            key={session.id}
            index={sessions.length - 1 - index}
            session={session}
            openModal={() => {
              modal.open({ callback: () => removeSession(session.id), variant: 'destructive' });
            }}
          />
        ))}
      </section>
    </>
  );
};
