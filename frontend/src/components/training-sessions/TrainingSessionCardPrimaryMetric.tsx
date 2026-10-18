import type { TrainingSession } from '@/hooks/useTrainingSessions';

interface TrainingSessionCardPrimaryMetricProps {
  trainingSession: TrainingSession;
}

export const TrainingSessionCardPrimaryMetric = ({
  trainingSession,
}: TrainingSessionCardPrimaryMetricProps) => {
  return (
    <div className="font-numeric flex h-full flex-col items-end justify-center gap-2">
      <span className="text-primary text-xl font-medium sm:text-2xl">
        {trainingSession.sport_details_type === 'StrengthTrainingSession' ? (
          <>
            {trainingSession.sport_details.volume_load?.toLocaleString()}{' '}
            {trainingSession.sport_details.volume_load_unit}
          </>
        ) : (
          <>
            {trainingSession.sport_details.distance}{' '}
            {trainingSession.sport_details.distance_unit}
          </>
        )}
      </span>
      {trainingSession.duration && (
        <span className="text-secondary-foreground text-lg font-medium sm:text-xl">
          {trainingSession.duration}
        </span>
      )}
    </div>
  );
};
