import { Options } from '@/components/common/confirmModal/ConfirmModalController';
import { Button, Variant } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/Dialog';

interface Props {
  isOpen: boolean;
  close: () => void;
  options: Options | null;
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
      <DialogContent className="bg-white">
        <DialogHeader>{modalVariants[modalVariant].headerText}</DialogHeader>
        <div className="d-flex pt-2">
          <Button
            variant={modalVariants[modalVariant].btnVariant as Variant}
            className="mr-1 ml-auto"
            onClick={() => {
              options!.callback();
              close();
            }}
          >
            {modalVariants[modalVariant].confirmText}
          </Button>
          <Button variant="white" onClick={close} className="border border-black">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
