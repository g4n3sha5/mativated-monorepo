import { useConfirmModal } from '@/components/common/confirmModal/useConfirmModal';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';
import { useToast } from '@/components/ui/use-toast';
import { Session } from '@/pages/matjournal/yourSessions/subcomponents/Session';
import { trpc } from '@/utils/trpc';
import { useUser } from '@clerk/clerk-react';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const YourSessions = () => {
  const { user, isLoaded } = useUser();
  const modal = useConfirmModal();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const sessionsKey = getQueryKey(trpc.sessions);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  if (!isLoaded) return <></>;
  if (!user || !user?.id) return <></>;

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page]);
  const { data, isError, isLoading } = trpc.sessions.getSessions.useQuery({
    authorId: user.id,
    page: page,
    keepPreviousData: true,
  });

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

  if (isError) return <></>;
  if (isLoading) return <></>;
  if (!data.sessions) return <></>;
  console.log(data.pagesTotal);
  return (
    <>
      <section className="w-full pb-20 h-full min-h-full pt-10  px-4 flex relative items-start ">
        <div className="flex flex-wrap gap-x-9 md:gap-y-12  gap-y-8 justify-center w-full">
          {data.sessions.map((session, index) => {
            const indexCalc = data.itemsCount - index - data.pageSize * (page - 1);
            return (
              <Session
                key={session.id}
                index={indexCalc}
                session={session}
                openModal={() => {
                  modal.open({
                    callback: () => deleteSessionMutation.mutate({ id: session.id }),
                    variant: 'destructive',
                  });
                }}
              />
            );
          })}
        </div>
        <div className="absolute bottom-0 w-full flex lg: justify-center lg:items-center flex-col lg:flex-row">
          <Pagination className="mb-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink disabled={page <= 1} onClick={() => setPage(1)}>
                  <FontAwesomeIcon icon={faAnglesLeft} />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(page - 1)} disabled={page <= 1} />
              </PaginationItem>
              {[...Array(data.pagesTotal <= 4 ? data.pagesTotal + 1 : 4).keys()].filter(Number).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={page === pageNum}
                    disabled={page === pageNum}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext disabled={page + 1 > data.pagesTotal} onClick={() => setPage(page + 1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink disabled={page + 1 > data.pagesTotal} onClick={() => setPage(data.pagesTotal)}>
                  <FontAwesomeIcon icon={faAnglesRight} />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="lg:absolute text-xl text-white mt-14">
            {page} / {data.pagesTotal}
          </div>
        </div>
      </section>
    </>
  );
};
