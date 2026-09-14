import { useParams } from 'react-router';
// import { Button } from '@/components/ui/button';
import { Loading } from '@/components/Loading';
import { useTrainingSession } from '@/hooks/useTrainingSessions';
import { LogTrainingSessionForm } from '@/forms/LogTrainingSession';

export const CreateOrEditTrainingSessionPage = () => {
  const { trainingSessionId } = useParams<{ trainingSessionId?: string }>();
  const isEditMode = !!trainingSessionId;
  const { training_session, isLoading, error } =
    useTrainingSession(trainingSessionId);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="mx-auto my-4 max-w-2xl px-4">
      <h1 className="text-primary mb-8">
        {isEditMode ? 'Edit Training Session' : 'Log Training Session'}
      </h1>
      {isLoading && <Loading />}
      {!isLoading && (
        <LogTrainingSessionForm trainingSessionToEdit={training_session} />
      )}
    </section>
  );
};
