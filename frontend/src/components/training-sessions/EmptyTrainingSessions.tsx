import { Link } from 'react-router';
import { buttonVariants } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyContent,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';
import { PlusIcon, SportShoeIcon } from 'lucide-react';

export const EmptyTrainingSessions = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-15 rounded-full bg-rose-400 text-rose-900"
        >
          <SportShoeIcon className="size-10" />
        </EmptyMedia>
        <EmptyTitle>No training sessions found</EmptyTitle>
        <EmptyDescription>
          Create a new training session to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
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
      </EmptyContent>
    </Empty>
  );
};
