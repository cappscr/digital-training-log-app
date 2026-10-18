import type { TrainingSession } from '@/hooks/useTrainingSessions';

interface StrengthTrainingExercisesProps {
  trainingSession: TrainingSession;
}

export const StrengthTrainingExercises = ({
  trainingSession,
}: StrengthTrainingExercisesProps) => {
  const isStrengthTrainingSession =
    trainingSession.sport_details_type === 'StrengthTrainingSession';

  if (!isStrengthTrainingSession) {
    return null;
  }

  const exercises = new Set<string>();

  trainingSession.sport_details.exercises.forEach((exercise) => {
    exercises.add(exercise.name);
  });

  const setsByExercise = new Map<
    string,
    {
      sets: number;
      reps: number;
      weight: number | null;
      weight_unit: string | null;
      bodyweight: boolean;
      position: number;
    }[]
  >();

  exercises.forEach((exercise) => {
    const exerciseSets = trainingSession.sport_details.exercises.filter(
      (e) => e.name === exercise,
    );

    setsByExercise.set(
      exercise,
      exerciseSets.map((e) => ({
        sets: e.sets,
        reps: e.reps,
        weight: e.weight,
        weight_unit: e.weight_unit,
        bodyweight: e.bodyweight,
        position: e.position,
      })),
    );
  });

  return (
    <div className="col-span-4 flex flex-col gap-3 sm:gap-0.5">
      {[...setsByExercise].map(([exercise, sets]) => (
        <div
          key={exercise}
          className="flex flex-col items-baseline gap-1 sm:flex-row"
        >
          <h3 className="text-base font-medium">{exercise}</h3>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
            {sets.map((set) => (
              <span key={set.position}>
                {set.sets}x{set.reps} @{' '}
                {set.bodyweight
                  ? 'Bodyweight'
                  : `${set.weight} ${set.weight_unit}`}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
