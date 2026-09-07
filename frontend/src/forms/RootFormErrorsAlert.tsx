import { AlertError } from '@/components/AlertError';

interface RootFormErrorsAlertProps {
  errorMessage: string;
}

export const RootFormErrorsAlert = ({
  errorMessage,
}: RootFormErrorsAlertProps) => {
  return (
    <div className="mb-4">
      <AlertError title="Error" description={errorMessage} />
    </div>
  );
};
