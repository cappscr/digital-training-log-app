import { createBrowserRouter } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/Home';
import { SignupPage } from './pages/Signup';
import { UserProfilePage } from './pages/UserProfile';
import { PaceCalculatorPage } from './pages/PaceCalculator';
import { AboutPage } from './pages/About';
import { TermsPage } from './pages/TermsOfUse';
import { Layout } from './layouts/Layout';
import { RootLayout } from './layouts/RootLayout';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        Component: Layout,
        children: [
          {
            Component: HomePage,
            index: true,
          },
          {
            Component: AboutPage,
            path: '/about',
          },
          {
            Component: TermsPage,
            path: '/terms',
          },
          {
            Component: SignupPage,
            path: '/signup',
          },
          {
            Component: PaceCalculatorPage,
            path: '/pace-calculator',
          },
        ],
      },
      {
        Component: AppLayout,
        children: [
          {
            Component: UserProfilePage,
            path: '/users/:id',
          },
        ],
      },
    ],
  },
]);
