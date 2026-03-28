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
      className={`text-base/[1.8] font-light text-ink-muted max-w-140 ${applyTopMargin ? 'mt-4' : ''}`}
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
    <div className="py-8 px-7 border-r-0 border-b border-border last:border-b-0 sm:border-r sm:last:border-r-0">
      <span className="font-display text-4xl font-normal text-accent-light leading-none mb-3 block">
        {num}
      </span>
      <div className="font-display text-lg font-medium text-ink mb-3">
        {title}
      </div>
      <p className="font-light text-base/[1.7] text-ink-muted">{body}</p>
    </div>
  );
};

export const ProblemSection = () => {
  return (
    <section className="max-w-215 mx-auto my-0 py-14 px-5 sm:py-20 sm:px-8">
      <SectionLabel label="The problem" />
      <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-ink mb-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-0 border border-border border-solid rounded-xs overflow-hidden mt-12 bg-white">
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
