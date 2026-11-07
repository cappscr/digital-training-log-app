import { Navigate, Outlet, useMatches } from 'react-router';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ContextBar } from '@/components/ContextBar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';
import { Footer } from '@/components/Footer';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { hasHandle } from '@/lib/routeHelpers';

export function AppLayout() {
  const { isAuthenticated, isLoading } = useCurrentUser();
  const matches = useMatches();

  const redirectTo = matches.findLast(hasHandle)?.handle.publicPath ?? '/login';

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <SidebarProvider>
      <SidebarInset>
        <ErrorBoundary>
          <ContextBar />
          <main className="bg-background text-foreground font-body min-h-screen w-full overflow-x-hidden leading-relaxed antialiased">
            <Outlet />
          </main>
        </ErrorBoundary>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
