import { Card } from '@/components/ui/card';
import { SportShoe } from 'lucide-react';
import {
  formatSportName,
  formatTime,
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
          <div className={styles.dateAndTime}>
            <span className={styles.date}>
              {isoDateStringToMonthDayString(training_session.session_date)}
            </span>
            {training_session.session_time && (
              <span className={styles.sessionTime}>
                {formatTime(training_session.session_time)}
              </span>
            )}
          </div>
        </div>
      )}

      <span className={styles.iconBg}>
        <SportShoe className={styles.icon} />
      </span>

      <span className={styles.trainingSessionType}>
        {`${toSentenceCase(training_session.location_type)} ${formatSportName(training_session.sport_details_type)}`}
      </span>

      <span className={styles.distance}>
        {training_session.sport_details.distance} mi
      </span>
    </Card>
  );
};
