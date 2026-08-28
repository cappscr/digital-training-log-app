import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@base-ui/react/dialog';
import { PlusIcon } from 'lucide-react';
import { LogTrainingSessionForm } from '@/forms/LogTrainingSession';
import styles from './TrainingSessions.module.css';

export const TrainingSessionsPage = () => {
  const [open, setOpen] = useState(false);

  return (
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
  );
};
