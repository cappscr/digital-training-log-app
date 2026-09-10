import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const FooterCta = () => {
  return (
    <div className="border-t-solid border-t-border bg-card flex flex-col items-center justify-center border-t px-8 py-20">
      <h2 className="font-heading text-foreground mb-2 text-[clamp(1.75rem,_4vw,_2.5rem)]">
        Your training deserves a real log.
      </h2>
      <p className="text-muted-foreground mb-8 text-sm font-light">
        Free to use. No credit card required.
      </p>
      <Button
        size="xl"
        radius="none"
        uppercase
        nativeButton={false}
        render={<Link to="/signup" />}
      >
        Create your free account
      </Button>
    </div>
  );
};
