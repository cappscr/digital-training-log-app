export const Hero = () => {
  return (
    <section className="max-w-225 pt-16 px-5 sm:px-8 sm:pt-28 pb-0 my-0 mx-auto animate-fade-up">
      <div className="max-w-170">
        <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-6">
          About
        </p>
        <h1 className="font-display text-[clamp(2.4rem,5.5vw,3.75rem)] font-bold leading-[1.12] tracking-tight mb-7">
          A training log built by a runner,
          <br />
          <em className="italic text-accent">for runners.</em>
        </h1>
        <p className="text-lg/[1.7] text-muted max-w-140">
          Digital Training Log is a personal project. Not a startup, not a
          platform, not a product roadmap backed by investor money. Just a tool
          I wanted to exist — so I built it.
        </p>
      </div>
      <div className="mt-20 h-px bg-rule" aria-hidden="true" />
    </section>
  );
};
