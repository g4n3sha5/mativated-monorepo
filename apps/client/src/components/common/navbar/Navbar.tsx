import { SignedOut, UserButton } from '@clerk/clerk-react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from 'assets/images/logo-removebg.png';
import { Button, Variant } from 'components/ui/Button';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Home', url: '/' },
  { name: 'MatJournal', url: '/mat-journal' },
];

export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="bg-navBarBg z-20 fixed top-0 h-navHeight w-screen">
      <div className="max-w-7xl mx-auto ">
        <div className="flex mx-auto justify-between w-5/6 ">
          <div className="flex items-center gap-16 my-4 w-full">
            <a className="ml-2 w-14 fitIMG" target="_blank" href="/">
              <img src={logo} alt="logo" />
            </a>

            <div className="hidden lg:flex gap-8 w-full">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.url}
                  className="text-white font-light hover:text-footerCyan text-[20px] tracking-[1.8px]"
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="ml-auto flex gap-x-2">
                <UserButton afterSignOutUrl="/" />
                <SignButton url="/sign-up" text="Sign up" variant="white" />
                <SignButton url="/sign-in" text="Sign in" variant="basicCyan" />
                {/* <SignButton url="/sign-up" text="Sign up" variant="white" />
                <SignButton url="/sign-in" text="Sign in" variant="basicCyan" /> */}
              </div>
            </div>
          </div>
          <div className="lg:hidden flex items-center cursor-pointer">
            <FontAwesomeIcon onClick={() => setToggleMenu(!toggleMenu)} icon={faBars} inverse />
          </div>
        </div>
      </div>

      {/* mobile navigation */}
      <div
        className={`bg-navBarBg fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
          !toggleMenu ? 'h-0' : 'h-full'
        }`}
      >
        <div className="px-8 pl-14">
          <div className="flex flex-col gap-5 font-bold tracking-wider">
            {navItems.map((item) => (
              <NavLink key={item.name} to={item.url} className="text-white hover:text-sky-300 text-lg tracking-wider">
                {item.name}
              </NavLink>
            ))}
            <div className="flex flex-col gap-3">
              {/* <SignButton url="/sign-up" text="Sign up" variant="white" />
              <SignButton url="/sign-in" text="Sign in" variant="basicCyan" /> */}
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const SignButton = ({ text, url, variant }: { text: string; url: string; variant: Variant }) => (
  <SignedOut>
    <Button variant={variant} className="font-semibold text-lg tracking-tight">
      <NavLink to={url}>{text}</NavLink>
    </Button>
  </SignedOut>
);
