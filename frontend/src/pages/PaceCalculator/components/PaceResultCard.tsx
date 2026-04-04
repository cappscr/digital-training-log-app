import { Button } from '@/components/ui/button';
import { usePaceResult, usePaceCalculator } from '@/hooks/usePaceCalculator';
import styles from './PaceResultTable.module.css';

export function PaceResultCard() {
  const { data: result } = usePaceResult();
  const { reset } = usePaceCalculator();

  return (
    <>
      <Button
        onClick={reset}
        size="xl"
        variant="link"
        className={styles.backLink}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Recalculate
      </Button>
      <div className={styles.eyebrow}>Adjusted pace</div>
      <div className={styles.resultPace}>{result?.calculated_pace}</div>
      <div className={styles.units}>{result?.units.replace('_', ' ')}</div>

      <div className={styles.divider} />

      <p className={styles.caption}>
        Calculated paces based on {result?.original_pace}
      </p>
    </>
  );
}
