import { Hero } from './components/Hero';
import { PrimaryNav } from '@/components/PrimaryNav';
import { Tagline } from './components/Tagline';
import { ProblemSection } from './components/ProblemSection';
import { MobileCallout } from './components/MobileCallout';

export const HomePage = () => {
  return (
    <>
      <PrimaryNav />
      <main className="bg-cream min-h-screen color-ink font-body leading-[1.6] antialiased">
        <Hero />
        <Tagline />
        <ProblemSection />
        <MobileCallout />
      </main>
    </>
  );
};
