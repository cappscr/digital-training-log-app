import { PageTitle } from '@/components/PageTitle';
import { usePaceResult } from '@/hooks/usePaceCalculator';
import { Card } from '@/components/ui/Card';
import { PaceResultCard } from './components/PaceResultCard';
import { PaceCalculatorForm } from './components/PaceCalculatorForm';
import styles from './PaceCalculator.module.css';

export function PaceCalculatorPage() {
  const { data: result } = usePaceResult();

  return (
    <>
      <PageTitle pageName="Pace Calculator" />
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={`primary ${styles.eyebrow}`}>Training Tools</span>
          <h1 className={`fg ${styles.title}`}>
            Pace <em>Calculator</em>
          </h1>
          <p className={`fg-muted ${styles.description}`}>
            Enter a target pace and percentage to find your adjusted trainging
            pace — calculated in the Canvoa style.
          </p>
        </header>
        <Card>{result ? <PaceResultCard /> : <PaceCalculatorForm />}</Card>
      </div>
    </>
  );
}
