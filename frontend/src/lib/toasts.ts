import { toast, type ExternalToast } from 'sonner';

export const successToast = (message: string, options?: ExternalToast) =>
  toast.success(message, {
    style: {
      background: 'var(--color-green-100)',
      border: '1px solid var(--color-green-900)',
      color: 'var(--color-green-900)',
    },
    ...options,
  });

export const errorToast = (message: React.ReactNode, options?: ExternalToast) =>
  toast.error(message, {
    style: {
      background: 'var(--color-red-100)',
      border: '1px solid var(--color-red-900)',
      color: 'var(--color-red-900)',
    },
    ...options,
  });
