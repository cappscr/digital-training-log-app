import { useLayoutEffect } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { ScrollRestoration } from 'react-router';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTheme } from '@/components/ThemeProvider';

export const RootLayout = () => {
  const { user } = useCurrentUser();
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    const saved = user?.settings.theme;
    if (saved && saved !== theme) {
      setTheme(saved);
    }
  }, [user?.settings.theme]);

  return (
    <>
      <Outlet />
      <Toaster position="bottom-right" />
      <ScrollRestoration />
    </>
  );
};
