import { SignedOut, UserButton } from '@clerk/clerk-react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from 'assets/images/logo-removebg.png';
import { Button } from 'components/ui/Button';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Home', url: '/' },
  { name: 'App', url: '/app' },
];

// todo: should Navbar be named header?
export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="bg-indigo-800 lg:bg-navBarBg z-30 fixed top-0 h-navHeight w-screen">
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

                <SignedOut>
                  <Button variant="white" className="font-semibold text-lg tracking-tight ">
                    <NavLink to="/sign-up">Sign up</NavLink>
                  </Button>
                  <Button variant="indigo" className="font-semibold text-lg tracking-tight">
                    <NavLink to="/sign-in">Sign in</NavLink>
                  </Button>
                </SignedOut>
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
        className={`bg-indigo-800  fixed z-40 w-full overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
          !toggleMenu ? 'h-0' : 'h-full'
        }`}
      >
        <div className="px-8 pl-14 pt-10">
          <div className="flex flex-col gap-5 font-bold tracking-wider">
            {navItems.map((item) => (
              <NavLink key={item.name} to={item.url} className="text-white hover:text-sky-300 text-lg tracking-wider">
                {item.name}
              </NavLink>
            ))}
            <div className="flex flex-col gap-3">
              <SignedOut>
                <Button variant="white" className="font-semibold text-lg tracking-tight">
                  <NavLink to="/sign-up">Sign up</NavLink>
                </Button>
                <Button variant="indigo" className="font-semibold text-lg tracking-tight">
                  <NavLink to="/sign-in">Sign in</NavLink>
                </Button>
              </SignedOut>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
};
