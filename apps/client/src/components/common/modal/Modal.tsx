import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { ModalOptions } from 'components/common/modal/ModalController';

interface Props {
  isOpen: boolean;
  close: () => void;
  options: ModalOptions | null;
}

export const Modal = ({ isOpen, close, options }: Props) => {
  // const modalVariant = options?.variant || 'default';
  // const modalVariants = {
  //   default: {
  //     btnVariant: 'default',
  //   },
  //   destructive: {
  //     btnVariant: 'destructive',
  //   },
  // };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="bg-white max-w-sm rounded-lg  md:max-w-lg lg:max-w-screen-lg">
        {/*<DialogHeader>{modalVariants[modalVariant]}</DialogHeader>*/}
        <div className="flex flex-col pt-2">
          {options?.content}
          <Button
            className="mr-1 ml-auto"
            onClick={() => {
              options?.callback?.();
              close();
            }}
          >
            Close
            {/*{modalVariants[modalVariant]}*/}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
