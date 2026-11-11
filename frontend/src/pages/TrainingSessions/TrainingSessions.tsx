import { Link, useSearchParams } from 'react-router';
import { cn } from 'cn';
import { startOfDay } from 'date-fns';
import { PlusIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Loading } from '@/components/Loading';
import { TrainingSessionsPagination } from '@/components/training-sessions/TrainingSessionsPagination';
import { TrainingSessionsList } from '@/components/training-sessions/TrainingSessionsList';

import { parseISODate } from '@/lib/utils';
import { useUserEndOfMicrocycle } from '@/hooks/useCurrentUser';

export const TrainingSessionsPage = () => {
  const [searchParams] = useSearchParams();
  const toParam =
    parseISODate(searchParams.get('to')) ?? startOfDay(new Date());
  const to = useUserEndOfMicrocycle(toParam);
  const endOfCurrentMicrocycle = useUserEndOfMicrocycle(startOfDay(new Date()));

  if (!to || !endOfCurrentMicrocycle) {
    return <Loading />;
  }

  return (
    <>
      <div className="m-4 flex flex-row items-center justify-between">
        <TrainingSessionsPagination
          endDate={to}
          endOfCurrentMicrocycle={endOfCurrentMicrocycle}
        />
        <Link
          to="/training-sessions/new"
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'lg',
            }),
          )}
        >
          <PlusIcon className="h-4 w-4" />
          Add Training Session
        </Link>
      </div>
      <section className="mx-auto my-4 max-w-2xl px-4">
        <h1 className="text-emphasis mb-8">Training Sessions</h1>
        <TrainingSessionsList
          to={to}
          endOfCurrentMicrocycle={endOfCurrentMicrocycle}
        />
      </section>
    </>
  );
};
