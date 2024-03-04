import { Options, modalContext } from '@/components/common/confirmModal/ConfirmModalController';
import { useContext } from 'react';

export const useConfirmModal = () => {
  const modal = useContext(modalContext);
  return {
    open: ({ callback, variant }: Options) => {
      modal.open({ callback, variant });
    },
    close: modal.close,
  };
};
