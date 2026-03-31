import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const FooterCta = () => {
  return (
    <div className="border-t-solid border-t-border bg-card border-t px-8 py-20 text-center">
      <h2 className="font-display text-foreground mb-2 text-[clamp(1.75rem,_4vw,_2.5rem)]">
        Your training deserves a real log.
      </h2>
      <p className="text-muted-foreground mb-8 text-sm font-light">
        Free to use. No credit card required.
      </p>
      <Button
        size="xl"
        radius="none"
        uppercase
        disabled
        nativeButton={false}
        render={<Link to="/signup" />}
      >
        Coming soon
      </Button>
    </div>
  );
};
