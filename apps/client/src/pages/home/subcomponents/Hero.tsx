import { Button } from 'components/ui/Button';

export const Hero = () => {
  return (
    <section className="flex text-center  text-white items-center justify-center pb-0 overflow-hidden h-screen w-screen relative">
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

      <div className="bg-heroBelt min-h-52 flex flex-col justify-center items-center font-rajdhani w-full top-2/5 z-10 font-medium position-absolute py-4 px-0 ">
        <h2 className="px-4 text-4xl mb-2 font-medium tracking-tight ">
          Do you love Jiu Jitsu? This app is created for you!
        </h2>
        <p className="px-2 text-2xl tracking-wide">Know your needs - manage your habits! </p>
        <h4></h4>
        {/* <a className="btn btn-light btn-lg my-1" type="button" href="{% url 'magiclogin' %}">
          <i className="bi bi-key"></i> Log in to Test Account"
        </a> */}
        <Button className="w-auto px-5 bg-transparent border-[1px] mt-3 text-base tracking-wide bg-slate-50 text-black hover:bg-indigo-800 hover:text-white border-white">
          Learn More
        </Button>
      </div>

      <div className="bg-[url('assets/images/jonathan-borba.webp')] bg-no-repeat bg-cover absolute inset-0 scale-150 bg-bottom blur-[0.4px] invert-[24%] sepia-[15%] saturate-[105%] hue-rotate-[235deg]"></div>
    </section>
  );
};
