import { PrimaryNav } from '@/components/PrimaryNav';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Outlet } from 'react-router';
import { Footer } from '@/components/Footer';

export const Layout = () => {
  return (
    <>
      <PrimaryNav />
      <ErrorBoundary>
        <main className="text-foreground font-body bg-background min-h-screen overflow-x-hidden leading-relaxed antialiased">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
};
