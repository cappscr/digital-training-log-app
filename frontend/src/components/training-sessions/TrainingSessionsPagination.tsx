import { useSearchParams } from 'react-router';
import { cn } from 'cn';
import { addDays, format, min, isToday, startOfDay, subDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { THREE_WEEKS } from '@/pages/TrainingSessions/TrainingSessions';
import { toISODateString } from '@/lib/utils';

interface TrainingSessionsPaginationProps {
  endDate: Date;
}

export const TrainingSessionsPagination = ({
  endDate,
}: TrainingSessionsPaginationProps) => {
  const [searchParams] = useSearchParams();
  const to =
    endDate > startOfDay(new Date()) ? startOfDay(new Date()) : endDate;
  const from = subDays(to, THREE_WEEKS - 1);

  const canGoNext = !isToday(to) && to < startOfDay(new Date());

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
            to={paginationHrefFor(subDays(to, THREE_WEEKS))}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="inline-flex items-center gap-1.5 px-2.5 text-sm">
            <CalendarIcon aria-hidden className="size-4" />
            <span>
              {format(from, 'LLL dd, y')} – {format(to, 'LLL dd, y')}
            </span>
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled={!canGoNext}
            tabIndex={canGoNext ? 0 : -1}
            to={paginationHrefFor(
              min([addDays(to, THREE_WEEKS), startOfDay(new Date())]),
            )}
            className={cn(!canGoNext && 'pointer-events-none opacity-50')}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
