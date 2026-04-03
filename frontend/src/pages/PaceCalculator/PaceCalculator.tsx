import { PageTitle } from '@/components/PageTitle';
import { usePaceResult } from '@/hooks/usePaceCalculator';
import { PaceResultTable } from './components/PaceResultTable';
import { PaceCalculatorForm } from './components/PaceCalculatorForm';
import styles from './PaceCalculator.module.css';

export function PaceCalculatorPage() {
  const { data: result } = usePaceResult();

  return (
    <>
      <PageTitle pageName="Pace Calculator" />
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <span className={styles.eyebrow}>Training Tools</span>
          <h1 className={styles.pageTitle}>
            Pace <em>Calculator</em>
          </h1>
          <p className={styles.pageDescription}>
            Enter a target pace and percentage to find your adjusted trainging
            pace — calculated in the Canvoa style.
          </p>
        </header>
        {result ? <PaceResultTable /> : <PaceCalculatorForm />}
      </div>
    </>
  );
}
