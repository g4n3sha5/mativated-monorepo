import { SignUp as SignUpWindow } from '@clerk/clerk-react';

export const SignUp = () => (
  <div className="signWrapperSection">
    <h1>Welcome!</h1>
    <h2>Please sign up to use Mativated</h2>
    <div className="signWrapper">
      <SignUpWindow
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
