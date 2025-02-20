import { createContext, useCallback, useMemo, useState } from 'react';
import { Modal } from './Modal';
import { ConfirmModal } from './ConfirmModal';

type ModalType = 'modal' | 'confirmModal';

type BaseOptions<T extends ModalType> = {
  type: T;
  callback?: (...args: any) => void;
};

export type ConfirmModalOptions = BaseOptions<'confirmModal'> & {
  variant: 'destructive' | 'default';
};

export type ModalOptions = BaseOptions<'modal'> & {
  content: React.ReactNode;
};

type Options = ConfirmModalOptions | ModalOptions;

interface State {
  isOpen: boolean;
  options: Options | null;
}

interface ModalContext extends State {
  open: (options: Options) => void;
}

export const modalContext = createContext<ModalContext>({
  isOpen: false,
  options: null,
  open: () => false,
});

export const ModalController = ({ children }: any) => {
  const [state, setState] = useState<State>({
    isOpen: false,
    options: null,
  });
  const close = useCallback(() => setState((s) => ({ isOpen: false, options: s.options })), []);
  const open = useCallback((options: Options) => setState({ options, isOpen: true }), []);
  const value = useMemo(() => ({ ...state, open }), [state, open]);

  return (
    <modalContext.Provider value={value}>
      {children}
      {state.options?.type === 'confirmModal' ? (
        <ConfirmModal isOpen={state.isOpen} close={close} options={state.options} />
      ) : (
        <Modal isOpen={state.isOpen} close={close} options={state.options} />
      )}
    </modalContext.Provider>
  );
};
