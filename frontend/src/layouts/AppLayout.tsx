import { PrimaryNav } from '@/components/PrimaryNav';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Outlet } from 'react-router';
import { Footer } from '@/components/Footer';

export function AppLayout() {
  return (
    <>
      <PrimaryNav />
      <ErrorBoundary>
        <main className="bg-background text-foreground font-body min-h-screen overflow-x-hidden leading-relaxed antialiased">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}
