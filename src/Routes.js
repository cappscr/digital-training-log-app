import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PaceCalculatorPage } from './pages/PaceCalculatorPage';
import { SignUpPage } from './pages/SignUpPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PaceCalculatorPage />,
    },
    {
      path: '/sign-up',
      element: <SignUpPage />,
    },
    {
      path: '/verify-email',
      element: <VerifyEmailPage />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}