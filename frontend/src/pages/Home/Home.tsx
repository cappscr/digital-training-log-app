import { Hero } from './components/Hero';
import { PrimaryNav } from '@/components/PrimaryNav';
import { Tagline } from './components/Tagline';

export const HomePage = () => {
  return (
    <>
      <PrimaryNav />
      <main className="bg-cream min-h-screen color-ink font-body leading-[1.6] antialiased">
        <Hero />
        <Tagline />
      </main>
    </>
  );
};
