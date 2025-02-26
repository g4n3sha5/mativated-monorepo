import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useIsMobile } from 'utils/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { TechniquesRightPanel } from 'pages/app/techniques/subcomponents/techniquesRightPanel/TechniquesRightPanel';
import { trpc } from 'utils/trpc';
import { GoalsRightPanel } from 'pages/app/goals/subcomponents/goalsRightPanel/GoalsRightPanel';

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
          <TechniquesRightPanel setIsShownRightPanel={setIsShownRightPanel} techniques={techniques} />
        </>
      )}
      {isMobile && (
        <AnimatePresence mode="popLayout">
          {!isShownRightPanel ? (
            <motion.div
              className="w-full h-full"
              key="dashboardContent"
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <></>
            </motion.div>
          ) : (
            <motion.div
              className="w-full"
              key="rightPanel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <GoalsRightPanel setIsShownRightPanel={setIsShownRightPanel} techniques={techniques} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};
