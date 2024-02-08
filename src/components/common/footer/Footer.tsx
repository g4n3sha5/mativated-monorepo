import brucelee from 'assets/images/brucelee.webp';
import { ChevronDoubleRight, Github, Linkedin } from 'react-bootstrap-icons';
import cx from 'classnames';
import blueBelt from 'assets/images/BlueBelt.png';
import logo from 'assets/images/logo-removebg.png';
import wlkp from 'assets/images/wlkp.png';
import g4n3sha5 from 'assets/images/g4n3sha5.jpg';
import gbpoznan from 'assets/images/gbpoznan.webp';

interface Link {
  text: string;
  url: string;
  // todo
}
const cyanBlue = getComputedStyle(document.documentElement).getPropertyValue('--footerCyan');

export const Footer = () => {
  return (
    <footer className="mb-0 font-normal bg-paleBlack pt-[85px] pb-8 pl-[2vw] border-t-[5px] border-footerCyan text-white ">
      <div className="grid grid-cols-16 gap-x-8 px-2 px-lg-5 justify-around text-lg">
        <div className="col-span-full xl:col-span-5 lg:col-span-4 md:col-span-6 itIMG flex items-center xl:items-start px-12 lg:px-lg-1 px-xl-4 order-0">
          <img src={brucelee} alt="Bruce Lee" />
        </div>
        <FooterSection links={bjjournalLinks} className="order-2" name="BJJournal" />
        <FooterSection links={clubsLinks} className="order-3" name="Clubs" />

        <div className="col-span-fulllg:col-span-6 xl:col-span-4 lg:mt-5 xl:mt-0 px-2 order-4 bg-[#101010] border-[1px] shadow-buddha border-primary mb-4 py-8 flex flex-col items-center">
          <div className="flex">
            {badges.map((badge) => (
              <a
                href={badge.href}
                target="_blank"
                className="hoverScale mx-2 mb-3 profilePicture smallProfile profile bg-white"
                style={{ backgroundImage: `url(${badge.src})` }}
              ></a>
            ))}
          </div>
          <h5>g4n3sha5 - creator</h5>

          <img className="w-28" src={blueBelt} alt="Blue Belt" />

          <div className="social-links mt-3 flex gap-x-2 justify-center">
            <a href="https://github.com/g4n3sha5" className="socialLink" target="_blank">
              <Github className="w-7 h-auto" />
            </a>
            <a href="https://www.linkedin.com/in/kamilmatysiak" className="socialLink" target="_blank">
              <Linkedin className="w-7 h-auto" />
            </a>
            <a href="#" className="socialLink">
              <img className="w-12 h-auto" src={logo} alt="Logo" />
            </a>
            {/* tba gofundme? */}
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterSection = ({ name, links, className }: { name: string; links: Link[]; className?: string }) => {
  return (
    <div
      className={cx(className, 'pl-14 lg:pl-0 mt-5 lg:mt-0 col-span-full xl:col-span-3 lg:col-span-4 md:col-span-6')}
    >
      <h4 className="pl-2 mb-1 text-2xl font-semibold">{name}</h4>
      <ul>
        {links.map((link) => (
          <li className="flex items-center mb-2 tracking-wide">
            <ChevronDoubleRight color={cyanBlue} />
            <a className="px-3" href={link.url}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const bjjournalLinks: Link[] = [
  { text: 'Dashboard', url: '/bjjournal' },
  { text: 'Add Training Session', url: '/addSession' },
  { text: 'Your Training Sessions', url: '/yourSessions' },
  { text: 'Techniques Base', url: '/techniques' },
  { text: 'To Do App', url: '/create' },
];

const clubsLinks: Link[] = [
  { text: 'Add / Edit Club', url: '/clubsIndex' },
  { text: 'Club Members', url: '/clubMembers' },
  { text: 'Club Training Sessions', url: '/clubTrainings' },
  { text: 'Club Schedule', url: '/clubSchedule' },
  { text: 'Clubs List', url: '/clubsList' },
];

const badges = [
  {
    href: 'https://en.wikipedia.org/wiki/Greater_Poland_Voivodeship',
    src: wlkp,
  },
  {
    href: 'https://github.com/g4n3sha5/',
    src: g4n3sha5,
  },
  {
    href: 'https://www.gb-poznan.pl/',
    src: gbpoznan,
  },
];
