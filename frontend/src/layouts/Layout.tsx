import { PrimaryNav } from '@/components/PrimaryNav';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Outlet } from 'react-router';
import { Footer } from '@/components/Footer';

export const Layout = () => {
  return (
    <>
      <PrimaryNav />
      <ErrorBoundary>
        <main className="text-foreground font-body min-h-screen overflow-x-hidden bg-(image:--grid-paper) bg-size-(--grid-md) leading-relaxed antialiased dark:bg-(image:--grid-paper-dark)">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
};
