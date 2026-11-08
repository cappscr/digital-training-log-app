import { Navigate, Outlet, useMatches } from 'react-router';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/components/AppSidebar';
import { ContextBar } from '@/components/ContextBar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';
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
      <TooltipProvider>
        <AppSidebar />
        <SidebarInset className="bg-background text-foreground font-body min-h-screen w-full overflow-x-hidden leading-relaxed antialiased">
          <ErrorBoundary>
            <ContextBar />
            <Outlet />
          </ErrorBoundary>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}
