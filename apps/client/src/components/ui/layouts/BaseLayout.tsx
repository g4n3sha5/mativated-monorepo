import { Navbar } from 'components/common/navbar/';
import { Footer } from 'components/common/footer/';
import { ReactNode } from 'react';
import { Toaster } from 'components/ui/Toaster';

export const BaseLayout = ({ children, className }: { children: ReactNode; className?: string }) => (
  <main className={className}>
    <Navbar />
    <div className="min-h-screen overflow-hidden">{children}</div>
    <Footer />
    <Toaster />
  </main>
);
