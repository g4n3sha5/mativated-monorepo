import { DashboardContent } from '@/pages/app/dashboard/subcomponents/DashboardContent';
import { StatisticsRightPanel } from 'pages/app/dashboard/subcomponents/statisticsRightPanel/StatisticsRightPanel';
import { useIsMobile } from 'utils/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export const Dashboard = () => {
  const [isShownRightPanel, setIsShownRightPanel] = useState(true);
  const isMobile = useIsMobile();

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsShownRightPanel(true),
    onSwipedRight: () => setIsShownRightPanel(false),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <section {...handlers} className="w-full flex h-screen items-stretch ">
      {!isMobile && (
        <>
          <DashboardContent setIsShownRightPanel={setIsShownRightPanel} />
          <StatisticsRightPanel setIsShownRightPanel={setIsShownRightPanel} />
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
              <DashboardContent setIsShownRightPanel={setIsShownRightPanel} />
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
              <StatisticsRightPanel setIsShownRightPanel={setIsShownRightPanel} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};
