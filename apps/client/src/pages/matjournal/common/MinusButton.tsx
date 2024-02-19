import { InputField } from '@/pages/matjournal/addSession/types';
import { Button } from 'components/ui/Button';
import { Dash } from 'react-bootstrap-icons';

export interface ButtonProps {
  valueToModify: number;
  onClick: (field: InputField, valueToModify: number) => void;
}

export const MinusButton = ({ onClick, valueToModify }: ButtonProps) => (
  <Button variant="white" size="icon" onClick={() => (valueToModify - 1 >= 0 ? onClick : null)}>
    <Dash />
  </Button>
);
