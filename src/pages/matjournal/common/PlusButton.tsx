import { Button } from 'components/ui/Button';
import { ButtonProps } from 'pages/matjournal/common/MinusButton';
import { Plus } from 'react-bootstrap-icons';

export const PlusButton = ({ onClick, numValue }: ButtonProps) => (
  <Button variant="white" size="icon" onClick={() => onClick(numValue + 1)}>
    <Plus />
  </Button>
);
