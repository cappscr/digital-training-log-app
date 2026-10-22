import {
  type CrossTrainingSession,
  type RunningTrainingSession,
  type StrengthTrainingSession,
  type StrengthTrainingExercise,
  type TrainingSession,
} from '@/hooks/useTrainingSessions';
import type {
  LogTrainingSessionFormValues,
  StrengthFormValues,
} from './logTrainingSessionSchemas';

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
      // customize this once user settings are implemented
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
      unit: d.distance_unit ?? 'mi', // customize this once user settings are implemented
      elevation_gain: d.elevation_gain ?? undefined,
      elevation_unit: d.elevation_unit ?? undefined,
      average_heart_rate: d.average_heart_rate ?? undefined,
    };
  }

  if (session.sport_details_type === 'StrengthTrainingSession') {
    const d = session.sport_details as StrengthTrainingSession;
    const setsByExercise = new Map<
      string,
      Omit<StrengthTrainingExercise, 'name'>[]
    >();

    for (const { name, ...scheme } of d.exercises) {
      const schemes = setsByExercise.get(name);
      if (schemes) schemes.push(scheme);
      else setsByExercise.set(name, [scheme]);
    }

    return {
      ...shared,
      type: 'strength_training',
      average_heart_rate: d.average_heart_rate ?? undefined,
      exercises: Array.from(setsByExercise.entries()).map(
        ([name, schemes]) => ({
          name,
          schemes,
        }),
      ),
    };
  }

  const d = session.sport_details as RunningTrainingSession;
  return {
    ...shared,
    type: 'running',
    distance: d.distance ?? undefined,
    unit: d.distance_unit ?? 'mi', // customize this once user settings are implemented
    elevation_gain: d.elevation_gain ?? undefined,
    elevation_unit: d.elevation_unit ?? undefined,
    average_heart_rate: d.average_heart_rate ?? undefined,
    average_cadence: d.average_cadence ?? undefined,
  };
};

export const defaultsForSport = (type: string) => {
  const shared = {
    distance: undefined,
    unit: 'mi', // customize this once user settings are implemented
    elevation_gain: undefined,
    elevation_unit: undefined,
    average_heart_rate: undefined,
  };
  switch (type) {
    case 'cross_training':
      return {
        ...shared,
        type: 'cross_training',
        activity: '',
      };
    case 'strength_training':
      return {
        ...shared,
        type: 'strength_training',
        average_heart_rate: undefined,
        exercises: [],
      };
    case 'running':
      return { ...shared, type: 'running', average_cadence: undefined };
    default:
      console.warn('Unsupported sport type');
      return {};
  }
};

export const blankStrengthExerciseScheme =
  (): StrengthFormValues['exercises'][number]['schemes'][number] => ({
    id: crypto.randomUUID(),
    sets: 1,
    reps: 1,
    bodyweight: true,
    weight: null,
    weight_unit: 'lbs', // customize this once user settings are implemented
  });
