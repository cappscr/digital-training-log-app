import type { TrainingSession } from '@/hooks/useTrainingSessions';
import { HeartPulse, Metronome, Mountain } from 'lucide-react';

interface TrainingSessionCardMetricsRowProps {
  trainingSession: TrainingSession;
}

export const TrainingSessionCardMetricsRow = ({
  trainingSession,
}: TrainingSessionCardMetricsRowProps) => {
  return (
    <div className="col-span-4 flex flex-row gap-3">
      {trainingSession.sport_details.average_heart_rate && (
        <span
          aria-label="Average heart rate"
          className="flex flex-row items-center gap-1"
        >
          <HeartPulse className="text-muted-foreground size-4" />
          {trainingSession.sport_details.average_heart_rate}
        </span>
      )}
      {trainingSession.sport_details.elevation_gain != null && (
        <span
          aria-label="Elevation gain"
          className="flex flex-row items-center gap-1"
        >
          <Mountain className="text-muted-foreground size-4" />
          {trainingSession.sport_details.elevation_unit
            ? `${trainingSession.sport_details.elevation_gain} ${trainingSession.sport_details.elevation_unit}`
            : trainingSession.sport_details.elevation_gain}
        </span>
      )}
      {trainingSession.sport_details_type === 'RunningTrainingSession' &&
        trainingSession.sport_details.average_cadence && (
          <span
            aria-label="Average cadence"
            className="flex flex-row items-center gap-1"
          >
            <Metronome className="text-muted-foreground size-4" />
            {trainingSession.sport_details.average_cadence}
          </span>
        )}
    </div>
  );
};
