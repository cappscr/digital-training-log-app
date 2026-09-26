import type { TrainingSession } from '@/hooks/useTrainingSessions';
import { Activity, SportShoe } from 'lucide-react';

interface TrainingSessionSportIconProps {
  trainingSession: TrainingSession;
}

export const TrainingSessionSportIcon = ({
  trainingSession,
}: TrainingSessionSportIconProps) => {
  return (
    <span className="flex size-8 items-center justify-center rounded-full bg-rose-400 sm:size-10">
      {trainingSession.sport_details_type === 'RunningTrainingSession' && (
        <SportShoe className="size-5 text-rose-900 sm:size-6" />
      )}
      {trainingSession.sport_details_type === 'CrossTrainingSession' && (
        <Activity className="size-5 text-rose-900 sm:size-6" />
      )}
    </span>
  );
};
