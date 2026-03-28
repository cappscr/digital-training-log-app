import { Hero } from './components/Hero';
import { Tagline } from './components/Tagline';
import { ProblemSection } from './components/ProblemSection';
import { MobileCallout } from './components/MobileCallout';
import { PhilosophySection } from './components/PhilosophySection';
import { FooterCta } from './components/FooterCta';

export const HomePage = () => {
  return (
    <main className="bg-cream text-ink font-body min-h-screen leading-relaxed antialiased">
      <Hero />
      <Tagline />
      <ProblemSection />
      <MobileCallout />
      <PhilosophySection />
      <FooterCta />
    </main>
  );
};
