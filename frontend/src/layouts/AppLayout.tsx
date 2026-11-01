import { Navigate } from 'react-router';
import { PrimaryNav } from '@/components/PrimaryNav';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';
import { Outlet } from 'react-router';
import { Footer } from '@/components/Footer';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export function AppLayout() {
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
