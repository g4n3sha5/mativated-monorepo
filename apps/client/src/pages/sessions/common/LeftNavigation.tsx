import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { useState } from 'react';
import { BorderAll, CollectionFill, FileEarmarkPlusFill, Icon } from 'react-bootstrap-icons';
import { NavLink, useLocation } from 'react-router-dom';

interface NavRef {
  name: string;
  Icon: Icon;
  url: string;
}

const navigationRefs: NavRef[] = [
  {
    name: 'Dashboard',
    Icon: BorderAll,
    url: '/sessions/dashboard',
  },
  {
    name: 'Add Session',
    Icon: FileEarmarkPlusFill,
    url: '/sessions/create-session',
  },
  {
    name: 'Your Sessions',
    Icon: CollectionFill,
    url: '/sessions/your-sessions',
  },
  // {
  //   name: 'Techniques',
  //   Icon: Diagram3Fill,
  //   url: '',
  // },
  // {
  //   name: 'To Do',
  //   Icon: CardChecklist,
  //   url: '',
  // },
];

export const LeftNavigation = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`absolute top-0 z-20 bottom-0 left-0 h-full  bg-secondary lg:bg-leftNavbar  linear   transition-all duration-200 text-paleWhite pt-[18vh] ${
        expanded ? 'w-[290px]' : 'w-leftNavWidth'
      }`}
    >
      <div
        className={`cursor-pointer text-2xl font-thin flex mb-5  ${expanded ? 'justify-end mr-6' : 'justify-center'}`}
      >
        <FontAwesomeIcon
          className={`hover:text-secondaryDarker ${expanded ? 'hidden' : 'block'}`}
          icon={faBars}
          onClick={() => setExpanded(true)}
        />
        <FontAwesomeIcon
          className={`hover:text-secondaryDarker  
           ${expanded ? 'block' : 'hidden'}`}
          icon={faX}
          onClick={() => setExpanded(false)}
        />
      </div>

      <nav className="p-0 m-0 pt-5">
        <div className={`pt-1 flex flex-col justify-center  gap-y-4 ${expanded ? 'pl-4 items-start' : 'items-center'}`}>
          {navigationRefs.map((link, index) => (
            <NavigationLink key={index} link={link} expanded={expanded} />
          ))}
        </div>
      </nav>
    </div>
  );
};

const NavigationLink = ({ link, expanded }: { link: NavRef; expanded: boolean }) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return cx('flex hover:text-secondaryDarker', {
          'text-secondaryDark pointer-events-none': isActive,
        });
      }}
      to={link.url}
    >
      <link.Icon className="text-3xl" />
      <div
        className={`ml-10 text-xl tracking-wider transition-transform absolute text-nowrap  duration-200 ease-out ${
          expanded ? 'block scale-100' : 'hidden scale-0'
        }`}
      >
        {link.name}
      </div>
    </NavLink>
  );
};
