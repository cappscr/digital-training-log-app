import { LogTrainingSessionForm } from '@/forms/LogTrainingSession';

export const TrainingSessionsPage = () => {
  return (
    <div className="mx-auto mt-10 flex max-w-screen-md flex-col gap-4">
      <LogTrainingSessionForm />
    </div>
  );
};
