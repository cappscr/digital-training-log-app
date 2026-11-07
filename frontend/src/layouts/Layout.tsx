import { Navigate, Outlet, useMatches } from 'react-router';
import { PrimaryNav } from '@/components/PrimaryNav';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Footer } from '@/components/Footer';
import { Loading } from '@/components/Loading';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { hasHandle } from '@/lib/routeHelpers';

export const Layout = () => {
  const { isAuthenticated, isLoading } = useCurrentUser();
  const matches = useMatches();
  const redirectPath = matches.findLast(hasHandle)?.handle.signedInPath ?? null;

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated && redirectPath) {
    return <Navigate to={redirectPath} replace />;
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
