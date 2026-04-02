import { PageTitle } from '@/components/PageTitle';
import { usePaceResult } from '@/hooks/usePaceCalculator';
import { PaceResultTable } from './components/PaceResultTable';
import { PaceCalculatorForm } from './components/PaceCalculatorForm';

export function PaceCalculatorPage() {
  const { data: result } = usePaceResult();

  return (
    <>
      <PageTitle pageName="Pace Calculator" />
      <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-8">
        <h1 className="font-display text-primary text-3xl">Pace Calculator</h1>
        {result ? <PaceResultTable /> : <PaceCalculatorForm />}
      </div>
    </>
  );
}
