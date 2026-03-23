import { Hero } from './components/Hero';
import { PrimaryNav } from '@/components/PrimaryNav';
import { Tagline } from './components/Tagline';
import { ProblemSection } from './components/ProblemSection';
import { MobileCallout } from './components/MobileCallout';
import { PhilosophySection } from './components/PhilosophySection';
import { FooterCta } from './components/FooterCta';
import { Footer } from '@/components/Footer';

export const HomePage = () => {
  return (
    <>
      <PrimaryNav />
      <main className="bg-cream min-h-screen color-ink font-body leading-[1.6] antialiased">
        <Hero />
        <Tagline />
        <ProblemSection />
        <MobileCallout />
        <PhilosophySection />
        <FooterCta />
      </main>
      <Footer />
    </>
  );
};
