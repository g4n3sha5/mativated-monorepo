import { DashboardContent } from '@/pages/sessions/dashboard/subcomponents/DashboardContent';
import { StatisticsRightPanel } from '@/pages/sessions/dashboard/subcomponents/statisticsRightPanel/StatisticsRightPanel';
import { useIsMobile } from '@/utils/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export const Dashboard = () => {
  const [isShownRightPanel, setIsShownRightPanel] = useState(true);
  // setIsShownRightPanel(false),
  const handlers = useSwipeable({
    onSwipedLeft: () => setIsShownRightPanel(true),
    onSwipedRight: () => setIsShownRightPanel(false),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  const isMobile = useIsMobile();

  const panelAttributes = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
    // transition: { duration: 0.3, ease: 'easeInOut' },
  };

  const dashboardAttributes = {
    initial: { x: 0, opacity: 1 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
    // transition: { duration: 0.3, ease: 'easeInOut' },
  };

  return (
    <section {...handlers} className=" w-full flex h-screen items-stretch ">
      {!isMobile && (
        <>
          <DashboardContent isShownRightPanel={isShownRightPanel} setIsShownRightPanel={setIsShownRightPanel} />
          <StatisticsRightPanel setIsShownRightPanel={setIsShownRightPanel} />
        </>
      )}
      {isMobile && (
        <AnimatePresence mode="popLayout">
          {!isShownRightPanel ? (
            <motion.div className="w-full h-full" key="dashboardContent" {...dashboardAttributes}>
              <DashboardContent isShownRightPanel={isShownRightPanel} setIsShownRightPanel={setIsShownRightPanel} />
            </motion.div>
          ) : (
            <motion.div className="w-full" key="rightPanel" {...panelAttributes}>
              <StatisticsRightPanel setIsShownRightPanel={setIsShownRightPanel} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};
