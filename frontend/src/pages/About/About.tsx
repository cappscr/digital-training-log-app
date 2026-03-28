import { Hero } from './components/Hero';
import { OriginSection } from './components/OriginSection';
import { PhilosophySection } from './components/PhilosophySection';
import { BuilderSection } from './components/BuilderSection';
import { CtaSection } from './components/CtaSection';

export default function About() {
  return (
    <>
      <Hero />
      <OriginSection />
      <PhilosophySection />
      <BuilderSection />
      <CtaSection />
    </>
  );
}
