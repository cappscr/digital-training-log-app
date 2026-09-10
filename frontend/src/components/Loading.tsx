import { Spinner } from '@/components/ui/spinner';

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Spinner className="size-16" />
      <p className="text-muted-foreground text-lg">{message}</p>
    </div>
  );
};
