import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { apiClient, type ApiError } from '@/lib/fetcher';

type LocationType = 'outdoor' | 'indoor';
export type SportDetailsType =
  'RunningTrainingSession' | 'CrossTrainingSession';

export type CrossTrainingSession = {
  id: string;
  activity: string;
  distance: number | null;
  distance_unit: 'mi' | 'km' | null;
  elevation_gain: number | null;
  elevation_unit: 'ft' | 'm' | null;
  average_heart_rate: number | null;
};

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
  day_of_week: string;
  duration: string | null;
  location_type: LocationType;
  notes: string | null;
} & (
  | {
      sport_details_type: 'RunningTrainingSession';
      sport_details: RunningTrainingSession;
    }
  | {
      sport_details_type: 'CrossTrainingSession';
      sport_details: CrossTrainingSession;
    }
);

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

export const useDeleteTrainingSession = (trainingSessionId: string) => {
  const { trigger, error, isMutating } = useSWRMutation<
    undefined,
    ApiError,
    string
  >(
    `${TRAINING_SESSIONS_KEY}/${trainingSessionId}`,
    (path) => apiClient('DELETE', path),
    {
      populateCache: false,
      revalidate: false,
      onSuccess: async () => {
        await mutate(TRAINING_SESSIONS_KEY);
        await mutate(
          `${TRAINING_SESSIONS_KEY}/${trainingSessionId}`,
          undefined,
          {
            revalidate: false,
          },
        );
      },
    },
  );

  return { deleteTrainingSession: trigger, error, isDeleting: isMutating };
};
