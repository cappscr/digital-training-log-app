import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-primary font-medium block text-xs tracking-widest uppercase',
  {
    variants: {
      variant: {
        default: 'text-primary',
        emphasized: 'text-primary font-semibold',
        muted: 'text-muted-foreground',
      },
      size: {
        default: 'text-xs',
        sm: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  },
);

type LabelProps = VariantProps<typeof labelVariants> & {
  text: string | number;
  className?: string;
};

export const Label = ({
  text,
  size = 'default',
  variant = 'default',
  className,
}: LabelProps) => {
  return (
    <span className={cn(labelVariants({ size, variant, className }))}>
      {text}
    </span>
  );
};
