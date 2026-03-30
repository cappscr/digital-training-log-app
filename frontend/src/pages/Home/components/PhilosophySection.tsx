const PhilosophyItem = ({
  label,
  description,
}: {
  label: string;
  description: string;
}) => {
  return (
    <div className="border-b-solid border-b-border border-b pb-8 last:border-b-0 last:pb-0">
      <h3 className="font-display text-ink mb-2 text-lg font-medium">
        {label}
      </h3>
      <p className="text-muted-foreground text-base/[1.75] font-light">
        {description}
      </p>
    </div>
  );
};

export const PhilosophySection = () => {
  return (
    <section className="mx-auto my-0 grid max-w-215 grid-cols-1 items-start gap-8 px-8 py-20 sm:grid-cols-[1fr_2fr] sm:gap-16">
      <div className="font-display text-muted-foreground static top-20 text-xl italic sm:sticky">
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
