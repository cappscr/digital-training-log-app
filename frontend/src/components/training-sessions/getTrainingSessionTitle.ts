import type { TrainingSession } from '@/hooks/useTrainingSessions';
import { toSentenceCase, formatSportName } from '@/lib/utils';

export const getTrainingSessionTitle = (trainingSession: TrainingSession) => {
  const location = toSentenceCase(trainingSession.location_type);
  if (trainingSession.sport_details_type === 'CrossTrainingSession')
    return `${location} ${trainingSession.sport_details.activity}`;
  return `${location} ${formatSportName(trainingSession.sport_details_type)}`;
};
