const PhilosophyItem = ({
  label,
  description,
}: {
  label: string;
  description: string;
}) => {
  return (
    <div className="border-b border-b-solid border-b-border pb-8 last:pb-0 last:border-b-0">
      <h3 className="font-display text-[1.1rem] font-medium text-ink mb-2">
        {label}
      </h3>
      <p className="text-[0.9rem] font-light text-ink-muted leading-[1.75]">
        {description}
      </p>
    </div>
  );
};

export const PhilosophySection = () => {
  return (
    <section className="max-w-215 my-0 mx-auto py-20 px-8 grid grid-cols-[1fr_2fr] gap-16 items-start">
      <div className="font-display text-[1.25rem] italic text-ink-muted leading-[1.4] sticky top-20">
        No opinions.
        <br />
        No prescriptions.
        <br />
        No noise.
      </div>
      <div className="flex flex-col gap-8">
        <PhilosophyItem
          label="Not a coaching platform"
          description="Digital Training Log won't tell you to run more, rest more, or push harder. It doesn't know your goals and it doesn't pretend to. It's a tool for athletes who already know what they're doing — and just need a place to put it."
        />
        <PhilosophyItem
          label="Not a social network"
          description="No followers. No feeds. No performance theater. Your training is yours. The only person who sees it is you — and whoever you choose to share it with."
        />
        <PhilosophyItem
          label="Hardware agnostic"
          description="No GPS trace required. No watch integration to set up. Whether you train with a Garmin, a Casio, or no watch at all — Digital Training Log works exactly the same."
        />
        <PhilosophyItem
          label="Built for the long haul"
          description="Templates enforce consistency without rigidity. Your data is structured so calculations happen automatically — but the log never prescribes what to do with them."
        />
      </div>
    </section>
  );
};
