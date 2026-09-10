import { Eyebrow } from '@/components/Eyebrow';

export const SignupHeader = () => {
  return (
    <header className="mb-10">
      <Eyebrow
        text="Get started — it's free"
        variant="emphasized"
        className="mb-3.5"
      />
      <h1 className="font-heading text-foreground mb-2.5 text-4xl tracking-tight">
        Start your
        <br />
        <span className="text-primary">training log.</span>
      </h1>
      <p className="text-muted-foreground leading-relaxed font-light">
        No algorithms, no social feed, no GPS required. Just your training —
        organized and yours.
      </p>
    </header>
  );
};
