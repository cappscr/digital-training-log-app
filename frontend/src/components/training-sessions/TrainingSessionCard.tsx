import { Card } from '@/components/ui/card';
import { SportShoe } from 'lucide-react';
import {
  formatSportName,
  formatTime,
  isoDateStringToMonthDayString,
  toSentenceCase,
} from '@/lib/utils';
import type { TrainingSession } from '@/hooks/useTrainingSessions';

interface TrainingSessionCardProps {
  training_session: TrainingSession;
}

export const TrainingSessionCard = ({
  training_session,
}: TrainingSessionCardProps) => {
  return (
    <Card
      key={training_session.id}
      className="col-span-4 grid grid-cols-subgrid items-center gap-7 p-3 sm:px-5"
    >
      {training_session.day_of_week && (
        <div className="flex h-full flex-col items-start justify-center gap-2">
          <span className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-base font-medium sm:text-lg">
            {training_session.day_of_week}
          </span>
          <div className="flex flex-row items-baseline gap-1">
            <span className="text-foreground text-md px-2 py-1 font-medium sm:text-lg">
              {isoDateStringToMonthDayString(training_session.session_date)}
            </span>
            {training_session.session_time && (
              <span className="text-muted-foreground font-numeric text-sm sm:text-base">
                {formatTime(training_session.session_time)}
              </span>
            )}
          </div>
        </div>
      )}

      <span className="flex size-12 items-center justify-center rounded-full bg-rose-400">
        <SportShoe className="size-6 text-rose-900" />
      </span>

      <div className="flex flex-col gap-2">
        <span className="text-foreground text-xl font-medium">
          {`${toSentenceCase(training_session.location_type)} ${formatSportName(training_session.sport_details_type)}`}
        </span>
        <p>{training_session.notes}</p>
      </div>

      <div className="font-numeric flex h-full flex-col items-end justify-center gap-2">
        <span className="text-primary text-xl font-medium sm:text-2xl">
          {training_session.sport_details.distance}{' '}
          {training_session.sport_details.distance_unit}
        </span>
        {training_session.duration && (
          <span className="text-secondary-foreground text-lg font-medium sm:text-xl">
            {training_session.duration}
          </span>
        )}
      </div>
    </Card>
  );
};
