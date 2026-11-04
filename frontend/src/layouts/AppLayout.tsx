import { useLayoutEffect } from 'react';
import { Navigate } from 'react-router';
import { PrimaryNav } from '@/components/PrimaryNav';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';
import { Outlet } from 'react-router';
import { Footer } from '@/components/Footer';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTheme } from '@/components/ThemeProvider';

export function AppLayout() {
  const { isAuthenticated, isLoading, user } = useCurrentUser();
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    const saved = user?.settings.theme;
    if (saved && saved !== theme) {
      setTheme(saved);
    }
  }, [user?.settings.theme]);

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
        <main className="bg-background text-foreground font-body min-h-screen w-full overflow-x-hidden leading-relaxed antialiased">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}
