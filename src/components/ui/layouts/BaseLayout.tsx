import { Navbar } from 'components/common/navbar/';
import { Footer } from 'components/common/footer/';
import { ReactNode } from 'react';

export const BaseLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <Navbar />
    {children}
    <Footer />
  </main>
);
