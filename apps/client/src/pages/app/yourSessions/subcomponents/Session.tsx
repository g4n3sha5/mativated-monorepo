import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'components/ui/Card';
import { minutesToHHMM } from 'utils/helpers';
import { SessionGetOutput } from 'utils/types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/Tooltip';
import Katana from 'assets/images/katana.svg?react';
import Drill from 'assets/images/repeat.svg?react';
import { SessionTypeIcon } from 'components/ui/SessionTypeIcon';
import { format } from 'date-fns';

interface Props {
  session: SessionGetOutput;
  index: number;
  openModal?: () => void;
}

// todo: clickable sessions - more info
export const Session = ({ session, index, openModal }: Props) => {
  return (
    <Card className=" animate-in fade-in zoom-in-110  duration-200 border-2 border-[#718ae6] w-112 h-60 flex flex-col rounded-none bg-secondary text-white">
      <CardHeader className="p-3 h-1/5 flex flex-row justify-between items-center  text-white space-y-0">
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
        className="flex leading-[1.2rem] pb-0  [&>*]:text-ellipsis flex-1   [&>*]:overflow-hidden px-0 [&>*]:p-3
      "
      >
        <div className="border-white border-r-2 basis-1/3  lg:basis-1/2">{session.notes}</div>
        {/*todo: add techniques here? more info?     */}
        <div className="basis-2/3 lg:basis-1/2 "></div>
      </CardContent>
      <CardFooter className="flex flex-1 grow-[0.7] [&>*]:h-full p-0 overflow-hidden bg-[#27187e] px-0 justify-center items-center">
        <div className=" basis-1/3  lg:basis-1/2 border-r-2 py-1 border-cyan flex items-center justify-center lg:justify-start">
          <div className="h-1/3">{session.location}</div>
          <div className="text-xl lg:text-2xl lg:pl-3">{minutesToHHMM(session.minutesLength)}h</div>
        </div>

        <div className="basis-2/3 lg:basis-1/2  flex overflow-hidden px-2.5 lg:px-3">
          <div className="basis-auto flex items-center">
            <SessionTypeIcon type={session.type} />
          </div>
          <div className="flex-1 overflow-hidden flex justify-end items-center text-2xl ">
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
      <TooltipContent side="top" className="bg-black rounded-md  z-10 capitalize text-white text-lg font-rajdhani">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
