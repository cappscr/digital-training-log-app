import { PrimaryNav } from '@/components/PrimaryNav';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Outlet } from 'react-router';
import { Footer } from '@/components/Footer';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { hasHandle } from '@/lib/routeHelpers';
import { Navigate, useMatches } from 'react-router';

export const Layout = () => {
  const { isAuthenticated } = useCurrentUser();
  const matches = useMatches();

  if (isAuthenticated) {
    return (
      <Navigate
        to={
          matches.findLast(hasHandle)?.handle.signedInPath ?? '/pace-calculator'
        }
        replace
      />
    );
  }

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
