import { PrimaryNav } from '@/components/PrimaryNav';
import { Outlet } from 'react-router';
import { Footer } from '@/components/Footer';

export const Layout = () => {
  return (
    <>
      <PrimaryNav />
      <main className="bg-cream text-ink font-body min-h-screen overflow-x-hidden leading-relaxed antialiased">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
