import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loading } from '@/components/Loading';
import { EmptyTrainingSessions } from '@/components/training-sessions/EmptyTrainingSessions';
import { TrainingSessionCard } from '@/components/training-sessions/TrainingSessionCard';
import { PlusIcon } from 'lucide-react';
import { useTrainingSessions } from '@/hooks/useTrainingSessions';
import { LogTrainingSessionForm } from '@/forms/LogTrainingSession';
import styles from './TrainingSessions.module.css';

export const TrainingSessionsPage = () => {
  const [open, setOpen] = useState(false);
  const { training_sessions, isLoading, error } = useTrainingSessions();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {training_sessions.length > 0 && (
          <DialogTrigger
            render={
              <Button
                variant="outline"
                className="mx-4 my-4 flex justify-self-end"
              >
                <PlusIcon className="h-4 w-4" />
                Add Training Session
              </Button>
            }
          />
        )}
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Log Training Session</DialogTitle>
            <DialogDescription>
              Enter the details of your training session
            </DialogDescription>
          </DialogHeader>
          <div className="no-scrollbar -mx-4 max-h-[75vh] overflow-y-auto px-4">
            <LogTrainingSessionForm
              handleModalClose={() => setOpen(false)}
              showHeader={false}
            />
          </div>
        </DialogContent>
      </Dialog>
      <section className={styles.trainingSessionsSection}>
        <h1 className={styles.heading}>Training Sessions</h1>
        {isLoading && <Loading />}
        {!isLoading && training_sessions.length === 0 && (
          <EmptyTrainingSessions handleActionClick={() => setOpen(true)} />
        )}
        {!isLoading && training_sessions.length > 0 && (
          <div className={styles.trainingSessionsList}>
            {training_sessions.map((training_session) => (
              <TrainingSessionCard
                key={training_session.id}
                training_session={training_session}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
