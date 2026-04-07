import { PrimaryNav } from '@/components/PrimaryNav';
import { Outlet } from 'react-router';
import { Footer } from '@/components/Footer';
import { ScrollRestoration } from 'react-router';

export const Layout = () => {
  return (
    <>
      <PrimaryNav />
      <main className="bg-background text-foreground font-body min-h-screen overflow-x-hidden leading-relaxed antialiased">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
};
