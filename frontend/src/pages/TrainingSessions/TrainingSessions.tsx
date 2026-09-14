import { Link } from 'react-router';
import { buttonVariants } from '@/components/ui/button';
import { Loading } from '@/components/Loading';
import { EmptyTrainingSessions } from '@/components/training-sessions/EmptyTrainingSessions';
import { TrainingSessionCard } from '@/components/training-sessions/TrainingSessionCard';
import { PlusIcon } from 'lucide-react';
import { useTrainingSessions } from '@/hooks/useTrainingSessions';

export const TrainingSessionsPage = () => {
  const { training_sessions, isLoading, error } = useTrainingSessions();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {training_sessions.length > 0 && (
        <div className="m-4 flex flex-row items-center justify-end">
          <Link
            to="/training-sessions/new"
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
            })}
          >
            <PlusIcon className="h-4 w-4" />
            Add Training Session
          </Link>
        </div>
      )}
      <section className="mx-auto my-4 max-w-2xl px-4">
        <h1 className="text-primary mb-8">Training Sessions</h1>
        {isLoading && <Loading />}
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
      </section>
    </>
  );
};
