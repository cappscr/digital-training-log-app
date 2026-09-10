import { Label } from '@/components/Label';

export const Hero = () => {
  return (
    <section className="animate-fade-up mx-auto my-0 max-w-225 px-5 pt-16 pb-0 sm:px-8 sm:pt-28">
      <div className="max-w-170">
        <Label text="About" variant="emphasized" className="mb-6" />
        <h1 className="font-heading mb-7 text-[clamp(2.4rem,5.5vw,3.75rem)] leading-none tracking-tight">
          A training log built by a runner,
          <br />
          <span className="text-primary">for runners.</span>
        </h1>
        <p className="text-muted-foreground max-w-140 text-lg/[1.7]">
          Digital Training Log is a personal project. Not a startup, not a
          platform, not a product roadmap backed by investor money. Just a tool
          I wanted to exist — so I built it.
        </p>
      </div>
      <div className="bg-border mt-20 h-px" aria-hidden="true" />
    </section>
  );
};
