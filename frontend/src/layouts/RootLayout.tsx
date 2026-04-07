import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster position="bottom-right" />
    </>
  );
};
