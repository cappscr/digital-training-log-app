import { Hero } from './components/Hero';
import { OriginSection } from './components/OriginSection';
import { PhilosophySection } from './components/PhilosophySection';
import { BuilderSection } from './components/BuilderSection';
import { CtaSection } from './components/CtaSection';

export default function About() {
  return (
    <main className="bg-cream text-ink font-body overflow-x-hidden leading-relaxed">
      <Hero />
      <OriginSection />
      <PhilosophySection />
      <BuilderSection />
      <CtaSection />
    </main>
  );
}
