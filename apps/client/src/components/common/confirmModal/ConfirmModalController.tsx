import { ConfirmModal } from '@/components/common/confirmModal/ConfirmModal';
import { createContext, useState, useCallback, useMemo, useContext } from 'react';

export interface Options {
  callback: (...args: any) => void;
  variant?: 'destructive' | 'default';
}

interface State {
  isOpen: boolean;
  options: Options | null;
}

interface ModalContext extends State {
  open: (options: Options) => void;
}

export const modalContext = createContext<any>({});

export const ConfirmModalController = ({ children }: any) => {
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
      <ConfirmModal isOpen={state.isOpen} close={close} options={state.options} />
    </modalContext.Provider>
  );
};
