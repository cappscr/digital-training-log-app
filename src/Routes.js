import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
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
    },
    {
      path: '/forgot-password',
      element: <ForgotPasswordPage />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}