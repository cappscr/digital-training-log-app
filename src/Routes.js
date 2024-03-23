import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PaceCalculatorPage } from './pages/PaceCalculatorPage';
import { SignUpPage } from './pages/SignUpPage';

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PaceCalculatorPage />,
    },
    {
      path: '/sign-up',
      element: <SignUpPage />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}