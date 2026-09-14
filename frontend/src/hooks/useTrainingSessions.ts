import useSWR from 'swr';

type LocationType = 'outdoor' | 'indoor';
type SportDetailsType = 'RunningTrainingSession';

export type RunningTrainingSession = {
  id: string;
  distance: number | null;
  distance_unit: 'mi' | 'km';
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

type TrainingSessionsResponse = {
  training_sessions: TrainingSession[];
};

type TrainingSessionResponse = {
  training_session: TrainingSession | null;
};

export const TRAINING_SESSIONS_KEY = '/training_sessions';

export const useTrainingSessions = () => {
  const { data, error, isLoading, mutate } = useSWR<TrainingSessionsResponse>(
    TRAINING_SESSIONS_KEY,
  );

  return {
    training_sessions: data?.training_sessions ?? [],
    error,
    isLoading,
    mutate,
  };
};

export const useTrainingSession = (trainingSessionId?: string) => {
  const { data, error, isLoading, mutate } = useSWR<TrainingSessionResponse>(
    trainingSessionId ? `${TRAINING_SESSIONS_KEY}/${trainingSessionId}` : null,
  );

  return {
    training_session: data?.training_session ?? null,
    error,
    isLoading,
    mutate,
  };
};
