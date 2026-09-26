import {
  type CrossTrainingSession,
  type RunningTrainingSession,
  type TrainingSession,
} from '@/hooks/useTrainingSessions';
import type { LogTrainingSessionFormValues } from './logTrainingSessionSchemas';

export const defaultValuesFromSession = (
  session?: TrainingSession | null,
): LogTrainingSessionFormValues => {
  if (!session)
    return {
      date: new Date(),
      time: '',
      indoor_or_outdoor: 'outdoor',
      duration: '',
      notes: '',
      type: 'running',
      distance: undefined,
      unit: 'mi',
    };

  const shared = {
    date: new Date(session.session_date + 'T00:00:00'),
    time: session.session_time ?? '',
    indoor_or_outdoor: session.location_type,
    duration: session.duration ?? '',
    notes: session.notes ?? '',
  };

  if (session.sport_details_type === 'CrossTrainingSession') {
    const d = session.sport_details as CrossTrainingSession;
    return {
      ...shared,
      type: 'cross_training',
      activity: d.activity,
      distance: d.distance ?? undefined,
      unit: d.distance_unit ?? 'mi',
      elevation_gain: d.elevation_gain ?? undefined,
      elevation_unit: d.elevation_unit ?? undefined,
      average_heart_rate: d.average_heart_rate ?? undefined,
    };
  }

  const d = session.sport_details as RunningTrainingSession;
  return {
    ...shared,
    type: 'running',
    distance: d.distance ?? undefined,
    unit: d.distance_unit ?? 'mi',
    elevation_gain: d.elevation_gain ?? undefined,
    average_heart_rate: d.average_heart_rate ?? undefined,
    average_cadence: d.average_cadence ?? undefined,
  };
};

export const defaultsForSport = (type: string) => {
  const shared = {
    distance: undefined,
    unit: 'mi',
    elevation_gain: undefined,
    average_heart_rate: undefined,
  };
  switch (type) {
    case 'cross_training':
      return {
        ...shared,
        type: 'cross_training',
        activity: '',
        elevation_unit: undefined,
      };
    case 'running':
      return { ...shared, type: 'running', average_cadence: undefined };
    default:
      console.warn('Unsupported sport type');
      return {};
  }
};
