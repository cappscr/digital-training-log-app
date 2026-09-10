import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const eyebrowVariants = cva(
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

type EyebrowProps = VariantProps<typeof eyebrowVariants> & {
  text: string | number;
  className?: string;
};

export const Eyebrow = ({
  text,
  size = 'default',
  variant = 'default',
  className,
}: EyebrowProps) => {
  return (
    <span className={cn(eyebrowVariants({ size, variant, className }))}>
      {text}
    </span>
  );
};
