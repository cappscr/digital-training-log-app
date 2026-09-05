import useSWR from 'swr';

type LocationType = 'outdoor' | 'indoor';
type SportDetailsType = 'RunningTrainingSession';

export type RunningTrainingSession = {
  id: string;
  distance: number | null;
  distance_unit: string | null;
  elevation_gain: number | null;
  average_heart_rate: number | null;
  average_cadence: number | null;
};

export type TrainingSession = {
  id: string;
  session_date: string;
  session_time: string | null;
  day_of_week: string | null;
  duration: string | null;
  location_type: LocationType;
  notes: string | null;
  sport_details_type: SportDetailsType;
  sport_details: RunningTrainingSession;
};

type TrainingSessionResponse = {
  training_sessions: TrainingSession[];
};

export const TRAINING_SESSIONS_KEY = '/training_sessions';

export const useTrainingSessions = () => {
  const { data, error, isLoading, mutate } = useSWR<TrainingSessionResponse>(
    TRAINING_SESSIONS_KEY,
  );

  return {
    training_sessions: data?.training_sessions ?? [],
    error,
    isLoading,
    mutate,
  };
};
