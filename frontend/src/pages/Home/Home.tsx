import { Hero } from './components/Hero';
import { Tagline } from './components/Tagline';
import { ProblemSection } from './components/ProblemSection';
import { MobileCallout } from './components/MobileCallout';
import { PhilosophySection } from './components/PhilosophySection';
import { FooterCta } from './components/FooterCta';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Tagline />
      <ProblemSection />
      <MobileCallout />
      <PhilosophySection />
      <FooterCta />
    </>
  );
};
