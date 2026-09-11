import { Link, useNavigate } from 'react-router';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Empty,
  EmptyHeader,
  EmptyContent,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';
import { JournalMark } from './JournalMark';

export const EmptyPageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="size-20 rounded-full">
          <JournalMark />
        </EmptyMedia>
        <EmptyTitle>Lost pace</EmptyTitle>
        <EmptyDescription>
          The session you're looking for may have moved, been deleted, or never
          existed. Even the best athletes take a wrong turn.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className={buttonVariants({
              variant: 'default',
              size: 'xl',
              radius: 'none',
            })}
          >
            Go to dashboard
          </Link>
          <Button
            variant="ghost"
            size="xl"
            radius="none"
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};
