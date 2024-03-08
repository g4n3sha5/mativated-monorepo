import error from 'assets/images/404.svg';

export const NotFound = () => {
  return (
    <section className="flex text-center  text-white items-center justify-center pb-0 overflow-hidden h-screen w-screen relative">
      <div className="absolute z-10 w-1/2 h-auto flex flex-col items-center">
        <h1 className="text-8xl  font-rubik text-purple font-extrabold tracking-wide mb-10">Page not found</h1>
        <img src={error} className="h-auto" />
      </div>
      <div className="bg-[url('assets/images/jonathan-borba.webp')] bg-no-repeat bg-cover absolute inset-0 scale-150 bg-bottom blur-[2px] invert-[24%] sepia-[15%] saturate-[105%] hue-rotate-[235deg]"></div>
    </section>
  );
};
