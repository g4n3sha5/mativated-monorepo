import { Button } from 'components/ui/Button';
import { Dash } from 'react-bootstrap-icons';

export interface ButtonProps {
  onClick: (value: number) => void;
  numValue: number;
}

export const MinusButton = ({ onClick, numValue }: ButtonProps) => (
  <Button variant="white" size="icon" onClick={() => onClick(numValue - 1)}>
    <Dash />
  </Button>
);
