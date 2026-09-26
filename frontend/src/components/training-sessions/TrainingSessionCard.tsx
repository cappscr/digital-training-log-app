import { useId } from 'react';
import { Link } from 'react-router';
import { cn } from 'cn';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { TrainingSessionCardMetricsRow } from './TrainingSessionCardMetricsRow';
import { TrainingSessionSportIcon } from './TrainingSessionSportIcon';
import { Trash, PencilIcon } from 'lucide-react';
import { isApiError } from '@/lib/fetcher';
import { errorToast } from '@/lib/toasts';
import { getTrainingSessionTitle } from './getTrainingSessionTitle';
import { formatTime, isoDateStringToMonthDayString } from '@/lib/utils';
import {
  useDeleteTrainingSession,
  type TrainingSession,
} from '@/hooks/useTrainingSessions';

interface TrainingSessionCardProps {
  training_session: TrainingSession;
}

const UNEXPECTED_ERROR_MESSAGE =
  'An unexpected error occurred while deleting the training session, please try again later.';

export const TrainingSessionCard = ({
  training_session,
}: TrainingSessionCardProps) => {
  const { deleteTrainingSession, isDeleting } = useDeleteTrainingSession(
    training_session.id,
  );
  const confirmDeleteLabelId = useId();

  const handleDelete = async () => {
    try {
      await deleteTrainingSession();
    } catch (apiError) {
      if (isApiError(apiError) && apiError.status === 404) {
        errorToast('Training session not found');
      } else {
        errorToast(UNEXPECTED_ERROR_MESSAGE);
      }
    }
  };

  return (
    <Card
      key={training_session.id}
      className="col-span-4 grid grid-cols-subgrid grid-rows-[auto_auto_auto] items-center gap-4 p-3 sm:px-5"
    >
      <div className="flex h-full flex-col items-start gap-1">
        <span className="bg-secondary text-secondary-foreground rounded-md px-1 py-1 text-base font-medium sm:px-2 sm:text-lg">
          {training_session.day_of_week}
        </span>
        <div className="flex flex-row items-baseline gap-1">
          <span className="text-foreground px-1 text-base font-medium sm:px-2 sm:text-lg">
            {isoDateStringToMonthDayString(training_session.session_date)}
          </span>
          {training_session.session_time && (
            <span className="text-muted-foreground font-numeric px-1 text-sm sm:px-2 sm:text-base">
              {formatTime(training_session.session_time)}
            </span>
          )}
        </div>
      </div>

      <TrainingSessionSportIcon trainingSession={training_session} />

      <div className="text-foreground text-base font-medium sm:text-2xl">
        {getTrainingSessionTitle(training_session)}
      </div>

      <div className="font-numeric flex h-full flex-col items-end justify-center gap-2">
        <span className="text-primary text-xl font-medium sm:text-2xl">
          {training_session.sport_details.distance}{' '}
          {training_session.sport_details.distance_unit}
        </span>
        {training_session.duration && (
          <span className="text-secondary-foreground text-lg font-medium sm:text-xl">
            {training_session.duration}
          </span>
        )}
      </div>

      <p className="text-muted-foreground col-span-4 text-base">
        {training_session.notes}
      </p>

      <TrainingSessionCardMetricsRow trainingSession={training_session} />

      <div className="col-span-4 flex flex-row items-end justify-end gap-2 border-t pt-2">
        <Link
          to={`/training-sessions/${training_session.id}/edit`}
          aria-label="Edit training session"
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'icon',
            }),
          )}
        >
          <PencilIcon className="text-muted-foreground size-4" />
        </Link>
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                aria-label="Delete training session"
                size="icon"
                variant="outline"
                disabled={isDeleting}
              >
                <Trash className="text-muted-foreground size-4" />
              </Button>
            }
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete training session?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the training session and all of its
                data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={isDeleting}
                onClick={handleDelete}
                aria-labelledby={confirmDeleteLabelId}
              >
                {isDeleting && <Spinner data-icon="inline-start" />}
                <span id={confirmDeleteLabelId}>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
};
