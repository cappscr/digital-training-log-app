import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const AlertError = ({
  title,
  description,
  ...rest
}: {
  title: string;
  description: string;
}) => {
  return (
    <Alert
      variant="destructive"
      className="max-w-md border-(--error-border) bg-(--error)"
      {...rest}
    >
      <AlertCircleIcon className="stroke-(--error-foreground)" />
      <AlertTitle className="font-bold text-(--error-foreground)">
        {title}
      </AlertTitle>
      <AlertDescription className="data-[slot=alert-description]:text-(--error-foreground)">
        {description}
      </AlertDescription>
    </Alert>
  );
};
