import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@base-ui/react/dialog';
import { TrainingSessionCard } from '@/components/training-sessions/TrainingSessionCard';
import { PlusIcon } from 'lucide-react';
import { useTrainingSessions } from '@/hooks/useTrainingSessions';
import { LogTrainingSessionForm } from '@/forms/LogTrainingSession';
import styles from './TrainingSessions.module.css';

export const TrainingSessionsPage = () => {
  const [open, setOpen] = useState(false);
  const { training_sessions, isLoading, error } = useTrainingSessions();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          render={
            <div className="mx-4 my-4 flex justify-end">
              <Button variant="outline" className="mb-4">
                <PlusIcon className="h-4 w-4" />
                Add Training Session
              </Button>
            </div>
          }
        />
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Popup className={styles.Popup}>
            <LogTrainingSessionForm handleCancel={() => setOpen(false)} />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
      <section className={styles.trainingSessionsSection}>
        <h1 className={styles.heading}>Training Sessions</h1>
        <div className={styles.trainingSessionsList}>
          {training_sessions.map((training_session) => (
            <TrainingSessionCard
              key={training_session.id}
              training_session={training_session}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
