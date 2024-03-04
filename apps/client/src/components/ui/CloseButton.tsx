import { Button, Variant } from '@/components/ui/Button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  onClick: () => void;
  variant?: Variant;
}

export const CloseButton = ({ onClick, variant }: Props) => (
  <Button onClick={onClick} variant={variant}>
    <FontAwesomeIcon icon={faXmark} />
  </Button>
);
