import { Routes, Route } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/Home';
import { SignupPage } from './pages/Signup';
import { UserProfilePage } from './pages/UserProfile';
import { PaceCalculatorPage } from './pages/PaceCalculator';

export function AppRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route element={<AppLayout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/pace-calculator" element={<PaceCalculatorPage />} />
      </Route>
    </Routes>
  );
}
