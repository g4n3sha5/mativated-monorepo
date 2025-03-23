import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useIsMobile } from 'utils/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { AddTechnique } from 'pages/app/techniques/subcomponents/AddTechnique';
import { TechniquesRightPanel } from 'pages/app/techniques/subcomponents/techniquesRightPanel/TechniquesRightPanel';

export const Techniques = () => {
  const [isShownRightPanel, setIsShownRightPanel] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: () => setIsShownRightPanel(true),
    onSwipedRight: () => setIsShownRightPanel(false),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  const isMobile = useIsMobile();

  return (
    <section {...handlers} className=" w-full flex lg:h-screen  items-stretch ">
      {!isMobile && (
        <>
          <AddTechnique setIsShownRightPanel={setIsShownRightPanel} />
          <TechniquesRightPanel setIsShownRightPanel={setIsShownRightPanel} />
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
              <AddTechnique setIsShownRightPanel={setIsShownRightPanel} />
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
              <TechniquesRightPanel setIsShownRightPanel={setIsShownRightPanel} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};
