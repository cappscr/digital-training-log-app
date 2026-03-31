import { SectionLabel } from './SectionLabel';

const ProblemSectionText = ({
  text,
  applyTopMargin = false,
}: {
  text: string;
  applyTopMargin?: boolean;
}) => {
  return (
    <p
      className={`text-muted-foreground max-w-140 text-base/[1.8] font-light ${applyTopMargin ? 'mt-4' : ''}`}
    >
      {text}
    </p>
  );
};

const FeatureCard = ({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) => {
  return (
    <div className="border-border border-r-0 border-b px-7 py-8 last:border-b-0 sm:border-r sm:last:border-r-0">
      <span className="font-display text-muted-foreground mb-3 block text-4xl leading-none font-normal">
        {num}
      </span>
      <div className="font-display text-foreground mb-3 text-lg font-medium">
        {title}
      </div>
      <p className="text-muted-foreground text-base/[1.7] font-light">{body}</p>
    </div>
  );
};

export const ProblemSection = () => {
  return (
    <section className="mx-auto my-0 max-w-215 px-5 py-14 sm:px-8 sm:py-20">
      <SectionLabel label="The problem" />
      <h2 className="font-display text-foreground mb-6 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
        You already know
        <br />
        you need a log.
      </h2>
      <ProblemSectionText text="Serious athletes have kept training journals for decades. The problem has never been whether to log — it's been the friction of doing it well." />
      <ProblemSectionText
        applyTopMargin
        text="Paper gets messy. Spreadsheets get complicated. And most apps are either too simple to be useful or too complex to actually use. Digital Training
        Log is structured enough to keep you consistent, and flexbile enough to
        stay out of your way."
      />
      <div className="border-border bg-accent mt-12 grid grid-cols-1 gap-0 overflow-hidden rounded-xs border border-solid sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        <FeatureCard
          num="01"
          title="Plan"
          body="Map out your training before it happens. Move sessions, adjust your week, and keep the ease of a paper calendar — without the white-out."
        />
        <FeatureCard
          num="02"
          title="Log"
          body="Record what matters to you, not just what a GPS can measure. Running, lifting, cycling — your log works the way you train."
        />
        <FeatureCard
          num="03"
          title="Reflect"
          body="Weekly, monthly, and yearly volume calculated automatically. See how your training builds without ever touching a formula."
        />
        <FeatureCard
          num="04"
          title="Share"
          body="Share your log with your coach when it's useful. Keep it to yourself when it isn't. Your training, your terms."
        />
      </div>
    </section>
  );
};
