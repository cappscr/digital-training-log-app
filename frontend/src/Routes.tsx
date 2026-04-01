import { Routes, Route } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/Home';
import { SignupPage } from './pages/Signup';
import { UserProfilePage } from './pages/UserProfile';
import { PaceCalculatorPage } from './pages/PaceCalculator';
import { AboutPage } from './pages/About';
import { TermsPage } from './pages/TermsOfUse';
import { Layout } from './layouts/Layout';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/pace-calculator" element={<PaceCalculatorPage />} />
      </Route>
    </Routes>
  );
}
