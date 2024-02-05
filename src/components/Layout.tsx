import { Outlet } from 'react-router-dom';
<<<<<<< HEAD
import { Navbar } from '@/components/common/navbar/';
import { Footer } from '@/components/common/footer/';
=======
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
>>>>>>> d94b541 (init)

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
