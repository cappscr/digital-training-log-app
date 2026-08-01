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
      className="border-error-border bg-error max-w-md"
      {...rest}
    >
      <AlertCircleIcon className="stroke-error-foreground" />
      <AlertTitle className="text-error-foreground font-bold">
        {title}
      </AlertTitle>
      <AlertDescription className="data-[slot=alert-description] text-error-foreground">
        {description}
      </AlertDescription>
    </Alert>
  );
};
