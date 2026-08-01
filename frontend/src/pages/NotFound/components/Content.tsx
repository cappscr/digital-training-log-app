import { Link, useNavigate } from 'react-router';
import { Button, buttonVariants } from '@/components/ui/button';
import { JournalMark } from './JournalMark';
import { Rule } from './Rule';

export const Content = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-1 flex w-100 max-w-135 flex-col items-center text-center">
      <JournalMark />
      <Rule />
      <p className="text-primary mb-4 text-xs font-medium tracking-widest uppercase">
        Error 404
      </p>
      <h1 className="font-display text-foreground mx-0 mt-0 mb-6 text-[clamp(3.5rem,12vw,6rem)] leading-none tracking-tight whitespace-nowrap">
        Lost pace.
      </h1>
      <p className="font-display text-muted-foreground mx-0 mt-0 mb-8 text-[clamp(1.125rem,3vw,1.5rem)] leading-5.5 tracking-wide italic">
        This page doesn't appear in the log.
      </p>
      <Rule />
      <p className="text-muted-foreground mb-10 leading-[1.625]">
        The session you're looking for may have moved, been deleted, or never
        existed. Even the best athletes take a wrong turn.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className={buttonVariants({
            variant: 'default',
            size: 'xl',
            radius: 'none',
          })}
        >
          Go to dashboard
        </Link>
        <Button
          variant="ghost"
          size="xl"
          radius="none"
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </div>
    </div>
  );
};
