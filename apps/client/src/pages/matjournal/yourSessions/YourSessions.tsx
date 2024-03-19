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
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const YourSessions = () => {
  const { user, isLoaded } = useUser();
  const modal = useConfirmModal();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const sessionsKey = getQueryKey(trpc.sessions);
  if (!isLoaded) return <></>;
  if (!user || !user?.id) return <></>;

  const { data: sessions } = trpc.sessions.getSessions.useQuery({ authorId: user.id });

  const deleteSessionMutation = trpc.sessions.deleteSession.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionsKey });
      toast({
        title: 'Session deleted',
        description: ':)',
        duration: 2000,
      });
    },
  });

  if (!sessions) return <></>;

  const deleteSession = (id: SessionType['id']) => {
    deleteSessionMutation.mutate({ id: id });
  };

  return (
    <>
      <section className="w-full h-full pt-10 min-h-screen px-4 flex gap-x-12 flex-wrap gap-y-8 justify-center items-start relative ">
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
        <Pagination className="absolute bottom-0">
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
