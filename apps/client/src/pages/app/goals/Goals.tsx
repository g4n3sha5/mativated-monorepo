import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useIsMobile } from 'utils/hooks';
import { trpc } from 'utils/trpc';
import { AddGoal } from 'pages/app/goals/subcomponents/AddGoal';

export const Goals = () => {
  const [isShownRightPanel, setIsShownRightPanel] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: () => setIsShownRightPanel(true),
    onSwipedRight: () => setIsShownRightPanel(false),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  const isMobile = useIsMobile();

  const { data: techniques, isError, isLoading } = trpc.techniques.getTechniques.useQuery({});

  return (
    <section {...handlers} className=" w-full flex lg:h-screen  items-stretch ">
      {!isMobile && (
        <>
          <AddGoal />
          {/*<TechniquesRightPanel setIsShownRightPanel={setIsShownRightPanel} techniques={techniques} />*/}
        </>
      )}
    </section>
  );
};
