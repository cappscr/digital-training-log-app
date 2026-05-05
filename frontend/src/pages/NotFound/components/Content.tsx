import { JournalMark } from './JournalMark';
import { Rule } from './Rule';

export const Content = () => {
  return (
    <div className="relative z-1 flex w-100 max-w-135 flex-col items-center text-center">
      <JournalMark />
      <Rule />
      <p className="text-primary mb-4 text-xs font-medium tracking-widest uppercase">
        Error 404
      </p>
      <h1 className="font-display text-foreground mx-0 mt-0 mb-6 text-[clamp(3.5rem,12vw,6rem)] leading-none tracking-tight italic">
        Lost pace.
      </h1>
      <p className="font-display text-muted-foreground mx-0 mt-0 mb-8 text-[clamp(1.125rem,3vw,1.5rem)] leading-5.5 tracking-wide italic">
        This page doesn't appear in the log.
      </p>
      <Rule />
    </div>
  );
};
