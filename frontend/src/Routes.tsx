import { createBrowserRouter } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/Home';
import { SignupPage } from './pages/Signup';
import { LoginPage } from './pages/Login';
import { PaceCalculatorPage } from './pages/PaceCalculator';
import { AboutPage } from './pages/About';
import { TermsPage } from './pages/TermsOfUse';
import { AccountActivationPage } from './pages/AccountActivation';
import { ConfirmEmailPage } from './pages/ConfirmEmail';
import { NotFoundPage } from './pages/NotFound';
import { ResetPasswordPage } from './pages/ResetPassword';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { Layout } from './layouts/Layout';
import { RootLayout } from './layouts/RootLayout';

import { UserSettingsPage } from './pages/UserSettings';
import { TrainingSessionsPage } from './pages/TrainingSessions';
import { CreateOrEditTrainingSessionPage } from './pages/TrainingSessions/CreateOrEditTrainingSession';

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
            handle: {
              signedInPath: '/calculators/pace-calculator',
            },
          },
          {
            Component: ForgotPasswordPage,
            path: '/forgot-password',
          },
          {
            Component: ResetPasswordPage,
            path: '/reset-password',
          },
        ],
      },
      {
        Component: AppLayout,
        children: [
          {
            Component: TrainingSessionsPage,
            path: '/training-sessions',
            handle: {
              breadcrumbs: [
                { label: 'Training Sessions', to: '/training-sessions' },
                { label: 'All sessions' },
              ],
            },
          },
          {
            Component: CreateOrEditTrainingSessionPage,
            path: '/training-sessions/new',
            handle: {
              breadcrumbs: [
                { label: 'Training Sessions', to: '/training-sessions' },
                { label: 'Log a session' },
              ],
            },
          },
          {
            Component: CreateOrEditTrainingSessionPage,
            path: '/training-sessions/:trainingSessionId/edit',
            handle: {
              breadcrumbs: [
                { label: 'Training Sessions', to: '/training-sessions' },
                { label: 'Edit session' },
              ],
            },
          },
          {
            Component: UserSettingsPage,
            path: '/settings',
            handle: {
              breadcrumbs: [{ label: 'Settings' }],
            },
          },
          {
            Component: PaceCalculatorPage,
            path: '/calculators/pace-calculator',
            handle: {
              breadcrumbs: [
                // TODO: Update this breadcrumb once a /calculators route is created
                { label: 'Calculators', to: '/calculators/pace-calculator' },
                { label: 'Pace calculator' },
              ],
              publicPath: '/pace-calculator',
            },
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
