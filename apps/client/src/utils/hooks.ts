import { useContext, useEffect, useState } from 'react';
import { ConfirmModalOptions, modalContext, ModalOptions } from 'components/common/modal/ModalController';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}

export const useConfirmModal = () => {
  const modal = useContext(modalContext);
  return {
    open: ({ callback, variant }: Omit<ConfirmModalOptions, 'type'>) => {
      modal.open({ callback: callback || (() => {}), variant, type: 'confirmModal' });
    },
  };
};

export const useModal = () => {
  const modal = useContext(modalContext);
  return {
    open: ({ callback = () => {}, content }: Omit<ModalOptions, 'type'>) => {
      modal.open({ callback: callback || (() => {}), content, type: 'modal' });
    },
  };
};
