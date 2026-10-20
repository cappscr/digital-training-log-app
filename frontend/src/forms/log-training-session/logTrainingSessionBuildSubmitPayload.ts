import type { LogTrainingSessionFormValues } from './logTrainingSessionSchemas';
import { toISODateString, parseDuration } from '@/lib/utils';

const buildSportDetailsSubmit = (values: LogTrainingSessionFormValues) => {
  const sport = values.type;

  const sharedCrossTrainingAndRunningDetails =
    sport === 'cross_training' || sport === 'running'
      ? {
          distance: values.distance ?? null,
          distance_unit: values.unit ?? null,
          elevation_gain: values.elevation_gain ?? null,
          elevation_unit: values.elevation_unit ?? null,
        }
      : null;

  switch (sport) {
    case 'cross_training':
      return {
        ...sharedCrossTrainingAndRunningDetails,
        activity: values.activity,
      };
    case 'running':
      return {
        ...sharedCrossTrainingAndRunningDetails,
        average_cadence: values.average_cadence ?? null,
      };
    case 'strength_training':
      return {
        exercises: values.exercises
          .flatMap((exercise) =>
            exercise.schemes.map((scheme) => ({
              name: exercise.name,
              ...scheme,
            })),
          )
          .map((exercise, index) => ({
            ...exercise,
            position: index + 1,
          })),
      };
    default:
      console.warn('Unsupported sport type');
      return {};
  }
};

export const buildSubmitPayload = (
  values: LogTrainingSessionFormValues,
  id: string,
  sportDetailsId: string,
) => {
  const sport = values.type;

  const shared = {
    id,
    session_date: toISODateString(values.date),
    session_time: values.time ?? null,
    duration_seconds: parseDuration(values.duration),
    location_type: values.indoor_or_outdoor,
    notes: values.notes,
  };

  const sharedSportDetails = {
    average_heart_rate: values.average_heart_rate ?? null,
  };

  return {
    ...shared,
    sport_details: {
      id: sportDetailsId,
      kind: sport,
      ...sharedSportDetails,
      ...buildSportDetailsSubmit(values),
    },
  };
};
