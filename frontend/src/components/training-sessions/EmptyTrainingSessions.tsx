import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyContent,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';
import { PlusIcon, SportShoeIcon } from 'lucide-react';

export const EmptyTrainingSessions = ({
  handleActionClick,
}: {
  handleActionClick: () => void;
}) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="size-15 rounded-full bg-rose-400">
          <SportShoeIcon className="color-rose-900 size-10" />
        </EmptyMedia>
        <EmptyTitle>No training sessions found</EmptyTitle>
        <EmptyDescription>
          Create a new training session to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={handleActionClick}>
          <PlusIcon className="size-4" />
          Add Training Session
        </Button>
      </EmptyContent>
    </Empty>
  );
};
