import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePaceResult, usePaceCalculator } from '@/hooks/usePaceCalculator';
import styles from './PaceResultCard.module.css';

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
        <ChevronLeft />
        Recalculate
      </Button>
      <div className={styles.eyebrow}>Adjusted pace</div>
      <div className={styles.resultPace}>{result?.calculated_pace}</div>
      <div className={styles.units}>{result?.units.replace('_', ' ')}</div>

      <div className={styles.divider} />

      <div className={styles.metaRow}>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Base pace</div>
          <div className={styles.metaValue}>{result?.original_pace}</div>
        </div>
        <div className={styles.metaItem} style={{ textAlign: 'right' }}>
          <div className={styles.metaLabel}>Percentage</div>
          <div className={styles.metaValue}>
            <em>{result?.percentage}</em>%
          </div>
        </div>
      </div>

      <p className={styles.note}>
        {Math.abs(100 - (result?.percentage ?? 0))}%{' '}
        {(result?.percentage ?? 0) > 100 ? 'faster' : 'slower'} than your base
        pace
      </p>
    </>
  );
}
