import { Navbar } from 'components/common/navbar/';
import { Footer } from 'components/common/footer/';
import { ReactNode } from 'react';

export const BaseLayout = ({ children, className }: { children: ReactNode; className?: string }) => (
  <main className={className}>
    <Navbar />
    {children}
    <Footer />
  </main>
);
