import { Button } from 'components/ui/Button';

interface Props {
  //   startRange: number;
  endRange: number;
  modulo: number;
  onClick: (modulo: number) => void;
  activeNumber?: any;
}
export const NumberPicker = ({ endRange, modulo, onClick, activeNumber }: Props) => {
  const numbers = Array.from(Array(endRange).keys())
    .map((number) => {
      if (number % modulo === 0) return number;
    })
    .filter(Number);

  return (
    <div className="flex gap-x-1 flex-wrap justify-center gap-y-1">
      {numbers.map((number) => {
        if (!number) return;
        return (
          <Button
            key={number}
            variant={activeNumber === number ? 'white' : 'purple'}
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
