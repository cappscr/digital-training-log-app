import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const FooterCta = () => {
  return (
    <div className="border-t border-t-solid border-t-border text-center py-20 px-8 bg-white">
      <h2 className="font-display text-[clamp(1.75rem,_4vw,_2.5rem)] text-ink mb-2">
        Your training deserves a real log.
      </h2>
      <p className="text-[0.9rem] font-light text-ink-muted mb-8">
        Free to us. No credit card required.
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
