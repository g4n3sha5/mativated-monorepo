import { useConfirmModal } from '@/components/common/confirmModal/useConfirmModal';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';
import { useToast } from '@/components/ui/use-toast';
import { SessionsSection } from 'pages/sessions/common/SessionsSection';
import { Session } from '@/pages/sessions/yourSessions/subcomponents/Session';
import { trpc } from '@/utils/trpc';
import { useUser } from '@clerk/clerk-react';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SessionType } from '@mativated-monorepo/shared/types';
import { AppRouter } from '@mativated-monorepo/server/src/routers';

export const YourSessions = () => {
  const { user, isLoaded } = useUser();
  const modal = useConfirmModal();
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  if (!isLoaded) return <></>;
  if (!user?.id) return <></>;

  useEffect(() => {
    setSearchParams({ page: String(page) });
    window.scrollTo(0, 0);
  }, [page]);
  // sessions.getSession();

  const { data, isError, isLoading } = trpc.sessions.getSessions.useQuery({
    authorId: user.id,
    page: page,
  });
  ``;
  const deleteSessionMutation = trpc.sessions.deleteSession.useMutation({
    onSuccess: () => {
      utils.sessions.getSessions.invalidate();
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

  return (
    <>
      <SessionsSection className="w-full md:pb-12  pt-navHeight  px-4 flex relative items-between flex-col flex-1 ">
        <div className="pt-10 flex flex-wrap gap-x-9 md:gap-y-12  gap-y-8 justify-center w-full flex-1">
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
        <div className="flex justify-center items-center flex-col lg:flex-row xl:mt-32 mt-10 relative ">
          {data.pagesTotal > 1 && (
            <Pagination className="mb-10">
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
          )}
          <div className="lg:absolute bottom-0 text-xl text-white lg:mt-14">
            {page} / {data.pagesTotal || 1}
          </div>
        </div>
      </SessionsSection>
    </>
  );
};
