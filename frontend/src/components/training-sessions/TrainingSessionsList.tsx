import { Loading } from '@/components/Loading';
import { EmptyTrainingSessions } from '@/components/training-sessions/EmptyTrainingSessions';
import { TrainingSessionCard } from '@/components/training-sessions/TrainingSessionCard';
import { useTrainingSessions } from '@/hooks/useTrainingSessions';

interface TrainingSessionsListProps {
  to: Date;
  endOfCurrentMicrocycle: Date;
}

export const TrainingSessionsList = ({ to }: TrainingSessionsListProps) => {
  const { training_sessions, isLoading, error } = useTrainingSessions({ to });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!isLoading && training_sessions.length === 0 && (
        <EmptyTrainingSessions />
      )}
      {!isLoading && training_sessions.length > 0 && (
        <div className="grid grid-cols-[max-content_auto_1fr_auto] gap-3 sm:gap-5">
          {training_sessions.map((training_session) => (
            <TrainingSessionCard
              key={training_session.id}
              training_session={training_session}
            />
          ))}
        </div>
      )}
    </>
  );
};
