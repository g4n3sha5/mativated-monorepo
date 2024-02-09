import { Button } from 'components/ui/Button';
import { ButtonProps } from 'pages/matjournal/common/MinusButton';
import { Plus } from 'react-bootstrap-icons';

export const PlusButton = ({ onClick, value }: ButtonProps) => (
  <Button variant="white" size="icon" onClick={() => onClick(value + 1)}>
    <Plus />
  </Button>
);
