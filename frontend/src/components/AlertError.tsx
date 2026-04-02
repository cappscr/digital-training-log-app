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
      className="max-w-md border-red-800 bg-red-100"
      {...rest}
    >
      <AlertCircleIcon className="stroke-red-800" />
      <AlertTitle className="font-bold text-red-800">{title}</AlertTitle>
      <AlertDescription className="data-[slot=alert-description]:text-red-800">
        {description}
      </AlertDescription>
    </Alert>
  );
};
