import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { sessionTypeIconDictionary } from '@/utils/constants';
import { toHoursAndMinutes } from '@/utils/helpers';
import { SessionType } from '@/utils/types';
import { SessionGetOutput } from '@mativated-monorepo/shared/types';
import { format } from 'date-fns';
import { useMemo } from 'react';
import Drill from 'assets/images/repeat.svg?react';
import Katana from 'assets/images/katana.svg?react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  session: SessionGetOutput;
  index: number;
  openModal?: () => void;
}

export const Session = ({ session, index, openModal }: Props) => {
  return (
    <Card className="border-2 border-[#718ae6] w-112 h-60 flex flex-col rounded-none bg-secondary text-white">
      <CardHeader className="p-3 h-1/5 flex flex-row justify-between items-center bg-lightPurple text-white space-y-0">
        <CardTitle className="text-xl">{format(new Date(session.date), 'dd/MM/yyyy')}</CardTitle>
        <div className="flex gap-x-3 items-center">
          <FontAwesomeIcon
            className="hover:scale-[110%] cursor-pointer hover:text-cyan"
            icon={faTrash}
            onClick={openModal}
          />
          <h2>#{index}</h2>
        </div>
      </CardHeader>
      <CardContent
        className="flex leading-[1.2rem] pb-0  [&>*]:text-ellipsis flex-1 [&>*]:basis-1/2  [&>*]:overflow-hidden px-0 [&>*]:p-3 
      "
      >
        <div className="border-white border-r-2">{session.notes}</div>

        <div>techniques.</div>
      </CardContent>
      <CardFooter className="flex flex-1 grow-[0.7] [&>*]:px-3 [&>*]:h-full p-0 overflow-hidden bg-[#27187e] px-0 justify-center items-center">
        <div className="basis-1/2 border-r-2 py-1 border-cyan ">
          <div className="h-1/3">{session.location}</div>
          <div className="text-2xl">{toHoursAndMinutes(session.minutesLength)}h</div>
        </div>
        <div className="basis-1/2 flex overflow-hidden">
          <div className="basis-auto flex items-center">
            <SessionTypeIcon type={session.type} />
          </div>
          <div className="flex-1 overflow-hidden flex justify-end items-center text-2xl">
            <SessionTimeIcon Icon={Drill} value={session.drillingTime || 0} tooltipText="Drilling time" />
            <SessionTimeIcon Icon={Katana} value={session.sparringTime || 0} tooltipText="Sparring time" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const SessionTimeIcon = ({
  Icon,
  value,
  tooltipText,
}: {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  value: number;
  tooltipText: string;
}) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <div className="flex flex-col items-center">
        <TooltipTrigger>
          <Icon className="w-5 h-5 lg:w-8 lg:h-8" fill="white" />
        </TooltipTrigger>

        <div className="leading-none text-lg ml-1">
          {value}
          <span className="ml-1 tracking-tighter text-sm">min</span>
        </div>
      </div>
      <TooltipContent side="top" className="bg-black rounded-md px-3 z-10 capitalize text-white text-lg font-rajdhani">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const SessionTypeIcon = ({ type }: { type: SessionType }) => {
  const entry = useMemo(() => sessionTypeIconDictionary.find((entry) => entry.type === 'GI'), [type]);
  if (!entry) return type;

  return (
    <div className="lg:ml-2">
      <entry.Icon className="w-auto lg:py-1 h-8 lg:h-14 fill-white" fill="white" />
    </div>
  );
};
