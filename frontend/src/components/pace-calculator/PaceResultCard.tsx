import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardAction } from '@/components/ui/card';
import { usePaceResult, usePaceCalculator } from '@/hooks/usePaceCalculator';

export function PaceResultCard() {
  const { data: result } = usePaceResult();
  const { reset } = usePaceCalculator();

  return (
    <>
      <CardAction>
        <Button
          onClick={reset}
          size="xl"
          variant="link"
          className="text-secondary hover:text-primary mb-6 inline-flex items-center gap-1.5 p-0"
        >
          <ChevronLeft />
          Recalculate
        </Button>
      </CardAction>
      <div className="text-muted-foreground mb-2 text-xs font-medium tracking-widest uppercase">
        Adjusted pace
      </div>
      <div className="font-display text-primary mb-1 text-5xl">
        {result?.calculated_pace}
      </div>
      <div className="text-muted-foreground mb-6 text-sm">
        {result?.units.replace('_', ' ')}
      </div>

      <div className="bg-border mb-5 h-px" />

      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-muted-foreground mb-1 text-sm font-medium tracking-wider uppercase">
            Base pace
          </div>
          <div className="text-foreground text-sm">{result?.original_pace}</div>
        </div>
        <div className="align-left">
          <div className="text-muted-foreground mb-1 text-sm font-medium tracking-wider uppercase">
            Percentage
          </div>
          <div className="text-foreground text-sm">
            <em className="font-display">{result?.percentage}</em>%
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mt-6 text-xs">
        {Math.abs(100 - (result?.percentage ?? 0))}%{' '}
        {(result?.percentage ?? 0) > 100 ? 'faster' : 'slower'} than your base
        pace
      </p>
    </>
  );
}
