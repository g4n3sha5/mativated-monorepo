import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {
  BorderAll,
  CardChecklist,
  CollectionFill,
  Diagram3Fill,
  FileEarmarkPlusFill,
  Icon,
} from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

interface NavRef {
  name: string;
  Icon: Icon;
  url: string;
}

export const LeftNavigation = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`fixed top-0 z-10 bottom-0 left-0  h-full bg-leftNavbar  ease-in-out overflow-hidden transition-all duration-200 pt-[18vh] ${
        expanded ? 'w-[290px]' : 'w-leftNavWidth'
      }`}
    >
      <div
        className={`cursor-pointer text-2xl font-thin flex mb-5  ${expanded ? 'justify-end mr-6' : 'justify-center'}`}
      >
        <FontAwesomeIcon
          className={`closeNavIcon  ${expanded ? 'hidden' : 'block'}`}
          icon={faBars}
          color="white"
          onClick={() => setExpanded(true)}
        />
        <FontAwesomeIcon
          className={`closeNavIcon   
           ${expanded ? 'block' : 'hidden'}`}
          icon={faX}
          color="white"
          onClick={() => setExpanded(false)}
        />
      </div>

      <nav className="p-0 m-0 pt-5">
        <div className={`pt-1 flex flex-col  justify-center  ${expanded ? 'pl-4 items-start' : 'items-center'}`}>
          {navigationRefs.map((link, index) => (
            <NavigationLink key={index} link={link} expanded={expanded} />
          ))}
        </div>
      </nav>
    </div>
  );
};

const NavigationLink = ({ link, expanded }: { link: NavRef; expanded: boolean }) => {
  const lightGray = getComputedStyle(document.documentElement).getPropertyValue('--lightGray');
  const activeColor = getComputedStyle(document.documentElement).getPropertyValue('--footerCyan');

  return (
    <NavLink
      className="mb-6 flex text-lightGray"
      style={({ isActive }) => {
        return { fontWeight: isActive ? 'semibold' : '', color: isActive ? activeColor : lightGray };
      }}
      to={link.url}
    >
      <link.Icon className="text-3xl" />
      <div
        className={`ml-10 text-xl tracking-wider transition-transform absolute text-nowrap  duration-200 
                ease-out ${expanded ? 'block scale-100' : 'hidden scale-0'}`}
      >
        {link.name}
      </div>
    </NavLink>
  );
};

const navigationRefs: NavRef[] = [
  {
    name: 'Dashboard',
    Icon: BorderAll,
    url: '/matjournal',
  },
  {
    name: 'Add Session',
    Icon: FileEarmarkPlusFill,
    url: '/create-session',
  },
  {
    name: 'Your Sessions',
    Icon: CollectionFill,
    url: '/yourSessions',
  },
  {
    name: 'Techniques',
    Icon: Diagram3Fill,
    url: '/techniques',
  },
  {
    name: 'To Do',
    Icon: CardChecklist,
    url: '/create',
  },
];
