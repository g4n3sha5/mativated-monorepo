import { Button } from 'components/ui/Button';

interface Props {
  onClick: (modulo: number) => void;
  activeNumber?: number;
  numbers: number[];
}
// todo
export const NumberPicker = ({ onClick, numbers, activeNumber }: Props) => {
  return (
    <div className="flex gap-x-1 flex-wrap justify-center gap-y-1">
      {numbers.map((number) => {
        if (!number) return;
        return (
          <Button
            key={number}
            variant={activeNumber === number ? 'white' : 'secondary'}
            disabled={activeNumber === number}
            onClick={() => onClick(number)}
            className="border-white p-3 w-1/6 border-[1px] cursor-pointer text-center"
          >
            <h3 className="m-0">{number} min</h3>
          </Button>
        );
      })}
    </div>
  );
};
