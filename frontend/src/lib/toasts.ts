import { toast, type ExternalToast } from 'sonner';

export const successToast = (message: string, options?: ExternalToast) =>
  toast.success(message, {
    style: {
      background: 'var(--success)',
      border: '1px solid var(--success-border)',
      color: 'var(--success-foreground)',
    },
    ...options,
  });

export const errorToast = (message: React.ReactNode, options?: ExternalToast) =>
  toast.error(message, {
    style: {
      background: 'var(--error)',
      border: '1px solid var(--error-border)',
      color: 'var(--error-foreground)',
    },
    ...options,
  });
