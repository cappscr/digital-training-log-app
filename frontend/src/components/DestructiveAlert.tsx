import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const AlertDestructive = ({
  title,
  description,
  ...rest
}: {
  title: string;
  description: string;
}) => {
  return (
    <Alert variant="destructive" className="max-w-md" {...rest}>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
