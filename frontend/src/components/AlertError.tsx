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
      className="max-w-md border-red-300 bg-red-100"
      {...rest}
    >
      <AlertCircleIcon className="stroke-red-700" />
      <AlertTitle className="font-bold text-red-700">{title}</AlertTitle>
      <AlertDescription className="data-[slot=alert-description]:text-red-700">
        {description}
      </AlertDescription>
    </Alert>
  );
};
