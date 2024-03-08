import { SignIn as SignInWindow } from '@clerk/clerk-react';

export const SignIn = () => (
  <div className="signWrapperSection">
    <h1>Welcome back!</h1>
    <h2>Please sign in to use Mativated</h2>
    <div className="signWrapper">
      <SignInWindow
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            main: 'gap-3',
            rootBox: 'w-full',
            card: 'w-full p-6 lg:p-10',
            headerTitle: 'tracking-tighter',
          },
        }}
      />
    </div>
  </div>
);
