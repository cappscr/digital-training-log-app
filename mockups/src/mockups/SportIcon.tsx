import type { ReactNode, SVGProps } from 'react'
import { BikeIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Sport } from '@/mockups/data'

type Variant = 'tile' | 'mono'
type Tone = 'hi' | 'mid' | 'lo' | 'accent'

const MONO_OPACITY: Record<Tone, number> = { hi: 1, mid: 0.85, lo: 0.5, accent: 0.4 }

// Tile tones come from --icon-* in index.css so they follow the color scheme.
// They go through `style` because var() isn't reliable in SVG presentation attributes.
function paint(variant: Variant, prop: 'fill' | 'stroke') {
  return (t: Tone) =>
    variant === 'tile'
      ? { style: { [prop]: `var(--icon-${t})` } }
      : { [prop]: 'currentColor', opacity: MONO_OPACITY[t] }
}

const fill = (variant: Variant) => paint(variant, 'fill')
const stroke = (variant: Variant) => paint(variant, 'stroke')

/** Runner drawn on a 48-unit grid, facing right. */
function Runner({ variant }: { variant: Variant }) {
  const f = fill(variant)
  const s = stroke(variant)
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="27,17 20,21 15,26" strokeWidth={4} {...s('lo')} />
      <polyline points="22,28 17,36 8,37" strokeWidth={5} {...s('lo')} />
      <line x1={28} y1={16} x2={22} y2={28} strokeWidth={5.5} {...s('mid')} />
      <rect x={27} y={3} width={9} height={9} rx={2.5} stroke="none" {...f('hi')} />
      <polyline points="28,17 35,22 40,17" strokeWidth={4} {...s('hi')} />
      <polyline points="22,28 31,33 29,43" strokeWidth={5} {...s('hi')} />
    </g>
  )
}

function RunningGlyph({ variant }: { variant: Variant }) {
  const s = stroke(variant)
  return (
    <>
      <g strokeLinecap="round" strokeWidth={3.5}>
        <line x1={3} y1={10} x2={13} y2={10} {...s('accent')} />
        <line x1={6} y1={17} x2={12} y2={17} {...s('accent')} />
      </g>
      <Runner variant={variant} />
    </>
  )
}

function TreadmillGlyph({ variant }: { variant: Variant }) {
  const f = fill(variant)
  const s = stroke(variant)
  return (
    <>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5}>
        <polyline points="35,22 42,20 38,40" {...s('accent')} />
      </g>
      <rect x={3} y={38} width={37} height={6} rx={3} {...f('accent')} />
      <g transform="translate(5 3) scale(0.72)">
        <Runner variant={variant} />
      </g>
    </>
  )
}

function StrengthGlyph({ variant }: { variant: Variant }) {
  const f = fill(variant)
  const s = stroke(variant)
  return (
    <>
      <line x1={2} y1={24} x2={46} y2={24} strokeWidth={3} strokeLinecap="round" {...s('accent')} />
      <rect x={4} y={15} width={5} height={18} rx={2} {...f('mid')} />
      <rect x={10} y={9} width={6} height={30} rx={2.5} {...f('hi')} />
      <rect x={17} y={19.5} width={2.5} height={9} rx={1.25} {...f('lo')} />
      <rect x={28.5} y={19.5} width={2.5} height={9} rx={1.25} {...f('lo')} />
      <rect x={32} y={9} width={6} height={30} rx={2.5} {...f('hi')} />
      <rect x={39} y={15} width={5} height={18} rx={2} {...f('mid')} />
    </>
  )
}

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & { variant?: Variant }

function IconFrame({ variant = 'tile', children, className, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn('shrink-0', className)} {...props}>
      {variant === 'tile' ? (
        <>
          <rect width={48} height={48} rx={11} fill="#0A0A0A" />
          <rect x={0.75} y={0.75} width={46.5} height={46.5} rx={10.25} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1.5} />
          <g transform="translate(7 7) scale(0.7083)">{children}</g>
        </>
      ) : (
        children
      )}
    </svg>
  )
}

export function RunningIcon({ variant = 'tile', ...props }: IconProps) {
  return (
    <IconFrame variant={variant} {...props}>
      <RunningGlyph variant={variant} />
    </IconFrame>
  )
}

export function TreadmillIcon({ variant = 'tile', ...props }: IconProps) {
  return (
    <IconFrame variant={variant} {...props}>
      <TreadmillGlyph variant={variant} />
    </IconFrame>
  )
}

export function StrengthIcon({ variant = 'tile', ...props }: IconProps) {
  return (
    <IconFrame variant={variant} {...props}>
      <StrengthGlyph variant={variant} />
    </IconFrame>
  )
}

export const SPORT_ICONS = [
  { name: 'Running', Icon: RunningIcon },
  { name: 'Treadmill', Icon: TreadmillIcon },
  { name: 'Strength', Icon: StrengthIcon },
] as const

export function SportIcon({
  sport,
  indoor,
  variant = 'tile',
  className,
}: {
  sport: Sport
  indoor?: boolean
  variant?: Variant
  className?: string
}) {
  const size = cn('size-9', className)
  if (sport === 'run') {
    return indoor ? <TreadmillIcon variant={variant} className={size} /> : <RunningIcon variant={variant} className={size} />
  }
  if (sport === 'strength') return <StrengthIcon variant={variant} className={size} />
  return (
    <span className={cn('flex shrink-0 items-center justify-center rounded-lg bg-muted text-foreground', size)}>
      <BikeIcon className="size-4" />
    </span>
  )
}
