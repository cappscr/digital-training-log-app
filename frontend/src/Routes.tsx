import { createBrowserRouter } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/Home';
import { SignupPage } from './pages/Signup';
import { LoginPage } from './pages/Login';
import { UserProfilePage } from './pages/UserProfile';
import { PaceCalculatorPage } from './pages/PaceCalculator';
import { AboutPage } from './pages/About';
import { TermsPage } from './pages/TermsOfUse';
import { AccountActivationPage } from './pages/AccountActivation';
import { ConfirmEmailPage } from './pages/ConfirmEmail';
import { NotFoundPage } from './pages/NotFound';
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
            Component: LoginPage,
            path: '/login',
          },
          {
            Component: ConfirmEmailPage,
            path: '/signup/confirm',
          },
          {
            Component: AccountActivationPage,
            path: '/activate',
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
      {
        Component: NotFoundPage,
        path: '*',
      },
    ],
  },
]);
