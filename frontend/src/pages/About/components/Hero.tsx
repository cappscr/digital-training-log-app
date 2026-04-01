export const Hero = () => {
  return (
    <section className="animate-fade-up mx-auto my-0 max-w-225 px-5 pt-16 pb-0 sm:px-8 sm:pt-28">
      <div className="max-w-170">
        <p className="text-primary mb-6 text-sm font-semibold tracking-widest uppercase">
          About
        </p>
        <h1 className="font-display mb-7 text-[clamp(2.4rem,5.5vw,3.75rem)] leading-tight font-bold tracking-tight">
          A training log built by a runner,
          <br />
          <em className="text-primary italic">for runners.</em>
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
