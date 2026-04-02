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
      className="max-w-md border-red-950 bg-red-200"
      {...rest}
    >
      <AlertCircleIcon className="stroke-red-950" />
      <AlertTitle className="font-bold text-red-950">{title}</AlertTitle>
      <AlertDescription className="data-[slot=alert-description]:text-red-950">
        {description}
      </AlertDescription>
    </Alert>
  );
};
