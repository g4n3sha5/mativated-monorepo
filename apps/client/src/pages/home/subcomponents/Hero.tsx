import { Button } from 'components/ui/Button';
import { Github, Key, ArrowDownCircle } from 'react-bootstrap-icons';

export const Hero = ({ featuresRef }: { featuresRef: React.MutableRefObject<HTMLDivElement | null> }) => {
  return (
    <section className="animate-in fade-in slide-in-from-top duration-300 flex text-center  text-white items-center justify-center pb-0 overflow-hidden h-screen w-screen relative">
      <div className="absolute z-10 overflow-hidden w-screen -bottom-[170px]">
        <svg
          width="100%"
          height="305px"
          viewBox="0 0 1920 255"
          version="1.1"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Apple-TV" transform="translate(0.000000, -402.000000)" fill="#F7F6FB">
              <path
                d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,757 L1017.15166,757 L0,757 L0,439.134243 Z"
                id="Path"
              ></path>
            </g>
          </g>
        </svg>
      </div>

      <div className="animate-in fade-in slide-in-from-right duration-400 bg-heroBelt min-h-52 flex flex-col justify-center items-center w-full text-paleWhite top-2/5 z-10 font-medium py-4 px-0 scale-y-95">
        <h2 className="px-4 text-3xl lg:text-4xl mb-2  tracking-tight font-light">
          Do you love Martial Arts? This app is created for you!
        </h2>
        <h3 className="px-2 text-2xl">Know your needs - manage your habits! </h3>
        <p className="px-2 text-lg tracking-wide font-light">
          This is a rebuild of{' '}
          <a
            href="https://github.com/g4n3sha5/MatiVAted"
            target="_blank"
            className="text-indigo-300 hover:text-indigo-100 cursor-pointer"
          >
            Mativated
          </a>
          &nbsp;in early stage of development.
        </p>

        <div className="flex gap-x-3 mt-4">
          {/* <Button
            onClick={() => {
              featuresRef?.current?.scrollIntoView();
              const { current } = featuresRef;
              if (current !== null) {
                window.scroll({ top: current.offsetTop, behavior: 'smooth' });
              }
            }}
            variant="secondary"
            className="w-auto px-5  mt-3 text-base tracking-wide"
          >
            <Key className="w-8 h-auto mx-1" />
            Test Account
          </Button> */}
          <Button
            onClick={() => {
              featuresRef?.current?.scrollIntoView();
              const { current } = featuresRef;
              if (current !== null) {
                window.scroll({ top: current.offsetTop, behavior: 'smooth' });
              }
            }}
            variant="paleBlack"
            size="md"
          >
            <ArrowDownCircle className="h-5 w-auto mx-2" />
            Learn More
          </Button>
          {/* <Button asChild={true} variant="secondaryContrast" size="md">
            <a
              href="https://mativated.space/sign-in/?__clerk_ticket=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlaXMiOjI1OTIwMDAwMDAsImV4cCI6NDMxMDcxNzYxMSwiaWlkIjoiaW5zXzJmS1Q0QkVBWkpOMkV6N0dNeVNYTXVocFd6diIsInNpZCI6InNpdF8yaTNTOHNqRlI4dEV2WlV2NnMyck9INUdTamciLCJzdCI6InNpZ25faW5fdG9rZW4ifQ.QO7kwI8gZtHtqdBkiXeGHtN2Ikc1fgFfNPO-eQZ-HbvqXMHLUyZ6Fbk3vJCfzhGUwRFtUYwvt8eQ0VhU2aXkyU3gm5gz55u6yZWiXdTrkZJwTxEkEH0aRXXKUtJFkyFKLCkQtMhbDEWKgPQIxegT7p6Jovv9w-oX2ojh5y1NnkcJPAkHMwPqgvhN0FjkyWS7m6Cvh-j-aJzHVv-6hByJPR8cK9NTvXOl7nS1dV1o6DnyuGFvgfLSOakKb5ZaLOfXI029IgvCfcXj5nlL24HhY3ZiEJ0jayXG_1_skzRgwQQAHUMq1dibet-YHsYHmhwbRP5VdjOX6sg1atTYMF2FMQ"
              target="_blank"
            >
              <Key className="h-5 w-auto mx-2" />
              Login to Test Account
            </a>
          </Button> */}
          <Button asChild={true} variant="secondaryCyan" size="md">
            <a href="https://github.com/g4n3sha5/mativated-monorepo" target="_blank">
              <Github className="h-5 w-auto mx-2" />
              Repository
            </a>
          </Button>
        </div>
      </div>

      <div className="bg-[url('assets/images/jonathan-borba.webp')] bg-no-repeat bg-cover absolute inset-0 scale-150 bg-bottom blur-[0.4px] invert-[24%] sepia-[15%] saturate-[105%] hue-rotate-[235deg]"></div>
    </section>
  );
};
