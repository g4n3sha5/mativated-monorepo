import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/common/navbar/';
import { Footer } from '@/components/common/footer/';

export default function Layout() {
  return (
    <main>
      <Navbar />

      <Outlet />
      <Footer />
    </main>
  );
}
