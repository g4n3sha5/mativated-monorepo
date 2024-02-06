import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/common/navbar/';
import { Footer } from '@/components/common/footer/';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
