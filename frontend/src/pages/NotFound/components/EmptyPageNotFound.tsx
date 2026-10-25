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
import AppIcon from '@/assets/app-icon.svg';

export const EmptyPageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="size-20 rounded-full">
          <img src={AppIcon} alt="App Icon" className="size-20" />
        </EmptyMedia>
        <EmptyTitle className="text-4xl">Lost pace</EmptyTitle>
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
              size: 'default',
            })}
          >
            Go to dashboard
          </Link>
          <Button variant="ghost" size="default" onClick={() => navigate(-1)}>
            Go back
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};
