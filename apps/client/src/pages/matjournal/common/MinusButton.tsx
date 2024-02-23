import { InputField } from '@mativated-monorepo/shared/types';
import { Button } from 'components/ui/Button';
import { Dash } from 'react-bootstrap-icons';

export interface ButtonProps {
  valueToModify: number;
  onClick: () => void;
}

export const MinusButton = ({ onClick, valueToModify }: ButtonProps) => (
  <Button variant="white" size="icon" disabled={valueToModify - 1 < 0} onClick={onClick}>
    <Dash />
  </Button>
);
