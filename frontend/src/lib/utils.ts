import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toSentenceCase = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const toKebabCase = (str: string): string =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

export const parseDuration = (duration: string): number | null => {
  const trimmed = duration.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(':');

  if (parts.length > 3) return null;

  const numbers = parts.map((part) => Number(part));
  if (numbers.some((n) => Number.isNaN(n) || n < 0)) return null;

  let hours = 0;
  let minutes = 0;
  let seconds;

  if (parts.length === 1) {
    seconds = numbers[0];
  } else if (parts.length === 2) {
    [minutes, seconds] = numbers;
  } else {
    [hours, minutes, seconds] = numbers;
  }

  if (minutes >= 60 || seconds >= 60) return null;
  if (hours === 0 && minutes === 0 && seconds === 0) return null;

  return hours * 3600 + minutes * 60 + seconds;
};

export const formatPace = (
  minutes: number,
  seconds: number,
  unit: 'mi' | 'km',
): string => {
  return `${minutes}:${seconds.toString().padStart(2, '0')} min/${unit}`;
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const displayHours = hours === 0 || hours > 12 ? Math.abs(hours - 12) : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
};

export const formatSportName = (sportDetailsType: string): string => {
  switch (sportDetailsType) {
    case 'RunningTrainingSession':
      return 'Run';
    default:
      return 'Cross Training';
  }
};

export const isoDateStringToMonthDayString = (date: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
};

export const toISODateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
