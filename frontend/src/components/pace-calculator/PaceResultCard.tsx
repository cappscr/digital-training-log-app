import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardAction } from '@/components/ui/card';
import { Eyebrow } from '@/components/Eyebrow';
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
          className="text-secondary-foreground hover:text-primary mb-6 inline-flex items-center gap-1.5 p-0"
        >
          <ChevronLeft />
          Recalculate
        </Button>
      </CardAction>
      <Eyebrow text="Adjusted pace" variant="muted" className="mb-2" />
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-numeric text-primary mb-1 text-5xl font-medium">
          {result?.calculated_pace}
        </span>
        <span className="text-muted-foreground">
          {result?.units.replace('_', ' ')}
        </span>
      </div>

      <div className="bg-border mb-5 h-px" />

      <div className="flex items-baseline justify-between">
        <div>
          <Eyebrow
            text="base pace"
            size="sm"
            variant="muted"
            className="mb-1"
          />
          <div className="font-numeric text-foreground text-sm">
            {result?.original_pace}
          </div>
        </div>
        <div className="align-left">
          <Eyebrow
            text="Percentage"
            size="sm"
            variant="muted"
            className="mb-1"
          />
          <div className="font-numeric text-foreground text-sm">
            {result?.percentage}%
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
