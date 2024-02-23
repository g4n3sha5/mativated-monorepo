import { InputField } from '@mativated-monorepo/shared/types';
import { Button } from 'components/ui/Button';
import { Plus } from 'react-bootstrap-icons';

export const PlusButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="white" size="icon" onClick={onClick}>
    <Plus />
  </Button>
);

// export const NewPlusButton = ({
//   field,
//   value,
//   setValue,
// }: {
//   field: InputField;
//   value: number;
//   setValue: (field: InputField, value: number) => void;
// }) => (
//   <Button variant="white" size="icon" onClick={() => setValue(field, value + 1)}>
//     <Plus />
//   </Button>
// );
