import { SignInButton, SignIn as SignInWindow } from '@clerk/clerk-react';
import { Button } from 'components/ui/Button';
import { BaseLayout } from 'components/ui/layouts/BaseLayout';
import sam from 'assets/images/sam-mgrdichian5.webp';

export const SignIn = () => (
  <div className="rounded-md xl:ml-10 bg-cyan pb-10 z-10 w-full lg:w-3/5 h-max mt-5 shadow-lg p-4 px-6">
    <h1 className="text-4xl mt-10 font-semibold text-black pl-1">Welcome back!</h1>
    <h2 className="text-2xl text-black ">Please sign in to use Mativated</h2>
    <div className="w-3/4 flex flex-col mt-5 h-max text-black ">
      <SignInWindow
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            main: 'gap-3',
          },
        }}
      />
    </div>
  </div>
);
