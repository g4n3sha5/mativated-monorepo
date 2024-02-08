import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '@/assets/images/logo-removebg.png';

export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const navItems = [
    { name: 'Home', url: '/' },
    { name: 'BJJournal', url: '/' },
    { name: 'Clubs', url: '/' },
    { name: 'Settings', url: '/' },
  ];
  return (
    <nav className="bg-navBarBg z-10 fixed w-screen">
      <div className="max-w-7xl mx-auto ">
        <div className="flex mx-auto justify-between w-5/6 ">
          <div className="flex items-center gap-16 my-4">
            <a className="ml-2 w-14 fitIMG" target="_blank" href="/">
              <img src={logo} alt="logo" />
            </a>

            <div className="hidden lg:flex gap-8 ">
              {navItems.map((item) => (
                <a href={item.url} className="text-white hover:text-sky-300 text-[20px] tracking-[1.8px]">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setToggleMenu(!toggleMenu)}>
              <FontAwesomeIcon icon={faBars} inverse />
            </button>
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
              <a href={item.url} className="text-white hover:text-sky-300 text-lg tracking-wider">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
