import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import { ScrollRestoration } from 'react-router';

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster position="bottom-right" />
      <ScrollRestoration />
    </>
  );
};
