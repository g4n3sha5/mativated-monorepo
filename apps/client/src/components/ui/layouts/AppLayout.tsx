import { ProtectedBaseLayout } from 'components/ui/layouts/ProtectedBaseLayout';
import { LeftNavigation } from 'pages/app/common/LeftNavigation';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <ProtectedBaseLayout>
      <div className="bg-[url('assets/images/sam-mgrdichian5.webp')] bg-[center 50%] min-h-screen relative   pl-leftNavWidth flex">
        <LeftNavigation />
        <Outlet />
      </div>
    </ProtectedBaseLayout>
  );
}
