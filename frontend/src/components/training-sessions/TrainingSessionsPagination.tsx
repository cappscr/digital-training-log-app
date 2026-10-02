import { useSearchParams } from 'react-router';
import { cn } from 'cn';
import { format, isToday, startOfDay, subDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toISODateString } from '@/lib/utils';
import { type DateRange } from 'react-day-picker';

const parseISODate = (value: string | null) => {
  if (!value) return undefined;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export const TrainingSessionsPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const date: DateRange = {
    from: parseISODate(searchParams.get('from')) ?? subDays(new Date(), 21),
    to: parseISODate(searchParams.get('to')) ?? new Date(),
  };

  const canGoNext =
    date.to && !isToday(date.to) && date.to < startOfDay(new Date());

  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (dateRange?.from) next.set('from', toISODateString(dateRange.from));
        else next.delete('from');
        if (dateRange?.to) next.set('to', toISODateString(dateRange.to));
        else next.delete('to');
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  };

  return (
    <Pagination className="mx-0 w-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to="#" />
        </PaginationItem>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-range"
                aria-label={
                  date?.from
                    ? date.to
                      ? `Date range, ${format(date.from, 'LLL dd, y')} to ${format(date.to, 'LLL dd, y')}`
                      : `Date range, ${format(date.from, 'LLL dd, y')}`
                    : 'Pick a date range'
                }
                className="justify-start px-2.5 font-normal"
              >
                <CalendarIcon data-icon="inline-start" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            }
          />
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <PaginationItem>
          <PaginationNext
            aria-disabled={!canGoNext}
            tabIndex={canGoNext ? 0 : -1}
            to="#"
            className={cn(!canGoNext && 'pointer-events-none opacity-50')}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
