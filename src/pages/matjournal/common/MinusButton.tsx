import { Button } from 'components/ui/Button';
import { Dash } from 'react-bootstrap-icons';

export interface ButtonProps {
  onClick: (value: number) => void;
  value: number;
}

export const MinusButton = ({ onClick, value }: ButtonProps) => (
  <Button variant="white" size="icon" onClick={() => onClick(value - 1)}>
    <Dash />
  </Button>
);
