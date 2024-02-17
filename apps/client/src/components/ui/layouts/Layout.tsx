import { Outlet } from 'react-router-dom';
import { BaseLayout } from './BaseLayout';

const Layout = () => (
  <BaseLayout>
    <Outlet />
  </BaseLayout>
);

export default Layout;
