import { useConfirmModal } from '@/components/common/confirmModal/ConfirmModalController';

interface Props {
  callback: () => void;
}
export const withDeleteConfirmation = ({ callback }: Props) => {
  return () => {
    const confirmModal = useConfirmModal();

    const customMutate = () => {
      confirmModal.open({
        text: `Czy na pewno chcesz to usunąć?`,
        confirmText: 'Usuń',
        callback: callback,
      });
    };

    return {
      mutate: customMutate,
    };
  };
};
