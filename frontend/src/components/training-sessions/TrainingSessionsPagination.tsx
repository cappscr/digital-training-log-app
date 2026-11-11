import { useSearchParams } from 'react-router';
import { cn } from 'cn';
import {
  addDays,
  differenceInCalendarDays,
  format,
  min,
  subDays,
} from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { THREE_WEEKS } from '@/components/training-sessions/TrainingSessionsList';
import { toISODateString } from '@/lib/utils';

interface TrainingSessionsPaginationProps {
  endDate: Date;
  endOfCurrentMicrocycle: Date;
}

export const TrainingSessionsPagination = ({
  endDate,
  endOfCurrentMicrocycle,
}: TrainingSessionsPaginationProps) => {
  const [searchParams] = useSearchParams();
  const from = subDays(endDate, THREE_WEEKS - 1);

  const canGoNext =
    differenceInCalendarDays(endOfCurrentMicrocycle, endDate) > 0;

  const paginationHrefFor = (to: Date) => {
    const next = new URLSearchParams(searchParams);
    next.set('to', toISODateString(to));
    return { search: next.toString() };
  };

  return (
    <Pagination className="mx-0 w-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={paginationHrefFor(subDays(endDate, THREE_WEEKS))}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="inline-flex items-center gap-1.5 px-2.5 text-sm">
            <CalendarIcon aria-hidden className="size-4" />
            <span>
              {format(from, 'LLL dd, y')} – {format(endDate, 'LLL dd, y')}
            </span>
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled={!canGoNext}
            tabIndex={canGoNext ? 0 : -1}
            to={paginationHrefFor(
              min([addDays(endDate, THREE_WEEKS), endOfCurrentMicrocycle]),
            )}
            className={cn(!canGoNext && 'pointer-events-none opacity-50')}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
