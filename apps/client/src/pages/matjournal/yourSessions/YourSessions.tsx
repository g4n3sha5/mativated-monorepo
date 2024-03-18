import { Session } from '@/pages/matjournal/yourSessions/subcomponents/Session';
import { trpc } from '@/utils/trpc';
import { useUser } from '@clerk/clerk-react';
import { Session as SessionType } from '@/utils/types';
import { useConfirmModal } from '@/components/common/confirmModal/useConfirmModal';
import { useToast } from '@/components/ui/use-toast';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';

export const YourSessions = () => {
  const { user, isLoaded } = useUser();
  const modal = useConfirmModal();
  const { toast } = useToast();
  if (!isLoaded) return <></>;
  if (!user || !user?.id) return <></>;

  const { data: sessions } = trpc.sessions.getSessions.useQuery({ authorId: user.id });
  const deSessionMutation = trpc.sessions.createSession.useMutation({
    onSuccess: () => {
      toast({
        title: 'Session deleted',
        description: ':)',
        duration: 2000,
      });
    },
  });

  if (!sessions) return <></>;

  const deleteSession = (id: SessionType['id']) => {
    console.log('removed!');
  };

  return (
    <>
      <section className="w-full px-4 pt-3 h-full flex gap-x-12 flex-wrap gap-y-8 justify-center items-center">
        {sessions.map((session, index) => (
          <Session
            key={session.id}
            index={sessions.length - 1 - index}
            session={session}
            openModal={() => {
              modal.open({ callback: () => deleteSession(session.id), variant: 'destructive' });
            }}
          />
        ))}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#1">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#2" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </>
  );
};
