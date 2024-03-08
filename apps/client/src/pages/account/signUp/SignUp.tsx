import { SignUp as SignUpWindow } from '@clerk/clerk-react';

export const SignUp = () => (
  <div className="rounded-md min-w[231px] xl:ml-10 bg-paleBlue pb-10 z-10 w-full lg:w-3/5 h-max mt-5 shadow-lg p-4 px-6">
    <h1 className="text-4xl mt-10 font-semibold text-black pl-1">Welcome!</h1>
    <h2 className="text-2xl text-black ">Please sign up to use Mativated</h2>
    <div className="flex flex-col mt-5 h-max text-black overflow-hidden rounded-xl">
      <SignUpWindow
        signInUrl="/sign-in"
        appearance={{
          elements: {
            main: 'gap-3 w-4/5',
          },
        }}
      />
    </div>
  </div>
);
