import { Outlet } from 'react-router-dom';
import { BaseLayout } from './BaseLayout';
import sam from 'assets/images/sam-mgrdichian5.webp';

const SignInLayout = () => (
  <BaseLayout>
    <div className="grid grid-cols-12 lg:h-screen overflow-hidden">
      <div className="col-span-12 pb-5 lg:col-span-7  text-white flex ">
        <div className="pt-navHeight text-white px-5 w-full z-10">
          <Outlet />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5  h-full bg-no-repeat flex flex-col items-center relative">
        <img className="w-full h-full object-cover absolute right-0 " src={sam} />
        <div className="z-10 pt-40 py-14 relative text-white px-8 pb-40  w-100">
          <h2 className="mb-3 text-4xl font-semibold">Every Journey begins with a single step</h2>
          <h2 className="mb-0 px-1 text-2xl">Train jiu-jitsu, save your progress and advance faster.</h2>
        </div>
      </div>
    </div>
  </BaseLayout>
);

export default SignInLayout;