import { useSearchParams } from 'react-router';
import { startOfDay } from 'date-fns';
import { Loading } from '@/components/Loading';
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
    <TrainingSessionsList
      to={to}
      endOfCurrentMicrocycle={endOfCurrentMicrocycle}
    />
  );
};
