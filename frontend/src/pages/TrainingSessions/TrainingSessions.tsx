import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog } from '@base-ui/react/dialog';
import { PlusIcon, SportShoe } from 'lucide-react';
import { useTrainingSessions } from '@/hooks/useTrainingSessions';
import { LogTrainingSessionForm } from '@/forms/LogTrainingSession';
import { formatTime, formatSportName, toSentenceCase } from '@/lib/utils';
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
            <Card key={training_session.id}>
              <CardContent className="flex items-center gap-5 py-3">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-terracotta-400">
                    <SportShoe className="text-terracotta-900 size-6" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex min-w-0 flex-1 justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-foreground text-lg font-medium">
                      {`${toSentenceCase(training_session.location_type)} ${formatSportName(training_session.sport_details_type)}`}
                    </span>
                    <span className={styles.distance}>
                      {training_session.sport_details.distance} miles
                    </span>
                  </div>

                  <div className="text-muted-foreground flex flex-col items-end justify-between">
                    {training_session.session_time && (
                      <span className="inline-flex items-center gap-1 text-xs">
                        {formatTime(training_session.session_time)}
                      </span>
                    )}
                    <span className="text-xs">
                      {training_session.session_date}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
