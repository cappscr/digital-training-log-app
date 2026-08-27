import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { LogTrainingSessionForm } from '@/forms/LogTrainingSession';

export const TrainingSessionsPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  return (
    <>
      <div className="mx-4 my-4 flex justify-end">
        <Button variant="outline" className="mb-4" onClick={openModal}>
          <PlusIcon className="h-4 w-4" />
          Add Training Session
        </Button>
      </div>
      <dialog
        ref={dialogRef}
        id="log-session-modal"
        closedby="any"
        className="bg-background mx-auto my-4 w-full max-w-screen-md rounded-lg border p-6 shadow-lg backdrop:bg-black/50"
      >
        <LogTrainingSessionForm handleCancel={closeModal} />
      </dialog>
    </>
  );
};
