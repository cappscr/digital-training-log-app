import { PageTitle } from '@/components/PageTitle';
import { usePaceResult } from '@/hooks/usePaceCalculator';
import { Card } from '@/components/ui/card';
import { PaceResultCard } from '@/components/pace-calculator/PaceResultCard';
import { PaceCalculatorForm } from '@/forms/PaceCalculator';

export function PaceCalculatorPage() {
  const { data: result } = usePaceResult();

  return (
    <>
      <PageTitle pageName="Pace Calculator" />
      <div className="flex flex-col items-center px-4 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
        <header className="mb-12 max-w-md text-center">
          <span className="text-primary mb-3 inline-block text-xs font-medium tracking-widest uppercase">
            Training Tools
          </span>
          <h1 className="font-display mb-3 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
            Pace <em>Calculator</em>
          </h1>
          <p className="text-muted-foreground mx-auto my-0 max-w-sm text-sm">
            Enter a target pace and percentage to find your adjusted trainging
            pace — calculated in the Canvoa style.
          </p>
        </header>
        <Card className="w-full max-w-md p-8">
          {result ? <PaceResultCard /> : <PaceCalculatorForm />}
        </Card>
      </div>
    </>
  );
}
