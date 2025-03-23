import { Button, Variant } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/Dialog';
import { ConfirmModalOptions } from 'components/common/modal/ModalController';

interface Props {
  isOpen: boolean;
  close: () => void;
  options: ConfirmModalOptions | null;
}

export const ConfirmModal = ({ isOpen, close, options }: Props) => {
  const modalVariant = options?.variant || 'default';
  const modalVariants = {
    default: {
      headerText: 'Are you sure?',
      btnVariant: 'default',
      confirmText: 'Confirm',
    },
    destructive: {
      headerText: 'Are you sure you want to remove this item?',
      btnVariant: 'destructive',
      confirmText: 'Remove',
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="bg-white w-5/6 rounded-lg  md:max-w-lg lg:max-w-lg px-4 lg:px-5">
        <DialogHeader className="text-start">{modalVariants[modalVariant].headerText}</DialogHeader>
        <div className="d-flex pt-2">
          <Button
            variant={modalVariants[modalVariant].btnVariant as Variant}
            className="mr-1 ml-auto text-start"
            onClick={() => {
              options?.callback?.();
              close();
            }}
          >
            {modalVariants[modalVariant].confirmText}
          </Button>
          <Button variant="black" onClick={close} className="border  bg-black text-white border-black">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
