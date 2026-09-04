import { Card } from '@/components/ui/card';
import { SportShoe } from 'lucide-react';
import {
  formatSportName,
  isoDateStringToMonthDayString,
  toSentenceCase,
} from '@/lib/utils';
import type { TrainingSession } from '@/hooks/useTrainingSessions';
import styles from './TrainingSessionCard.module.css';

interface TrainingSessionCardProps {
  training_session: TrainingSession;
}

export const TrainingSessionCard = ({
  training_session,
}: TrainingSessionCardProps) => {
  return (
    <Card key={training_session.id} className={styles.cardContent}>
      {training_session.day_of_week && (
        <div className={styles.trainingSessionDayAndDate}>
          <span className={styles.dayOfWeek}>
            {training_session.day_of_week}
          </span>
          <span className={styles.date}>
            {isoDateStringToMonthDayString(training_session.session_date)}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-0.5 sm:justify-self-center">
        <span className={styles.trainingSessionType}>
          {`${toSentenceCase(training_session.location_type)} ${formatSportName(training_session.sport_details_type)}`}
        </span>
        <span className={styles.distance}>
          {training_session.sport_details.distance} miles
        </span>
      </div>

      <span className={styles.iconBg}>
        <SportShoe className={styles.icon} />
      </span>
    </Card>
  );
};
