import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SPORT_ICONS } from '@/mockups/SportIcon'

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

const SCALES = [
  { name: 'volt', role: 'Volt', anchor: 300, schemes: 'Both schemes · primary (tertiary in analogous light)' },
  { name: 'iris', role: 'Iris', anchor: 600, schemes: 'Complementary · secondary and tertiary' },
  { name: 'ember', role: 'Ember', anchor: 300, schemes: 'Analogous · secondary' },
  { name: 'fern', role: 'Fern', anchor: 300, schemes: 'Analogous · tertiary (primary in light mode)' },
] as const

export function PalettePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 @3xl:px-6">
      {SCALES.map((scale) => (
        <section key={scale.name} className="flex flex-col gap-3">
          <div>
            <h2 className="text-xl font-semibold">{scale.role}</h2>
            <p className="text-sm text-muted-foreground">
              <code>{scale.name}-*</code> · anchored at {scale.anchor} · {scale.schemes}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 @2xl:grid-cols-11">
            {STEPS.map((step) => (
              <div key={step} className="flex flex-col gap-1.5">
                <div
                  className={cn('h-16 rounded-lg ring-1 ring-foreground/10', step === scale.anchor && 'ring-2 ring-foreground')}
                  style={{ background: `var(--color-${scale.name}-${step})` }}
                />
                <span className="text-xs tabular-nums">{step}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-xl font-semibold">Sport icons</h2>
          <p className="text-sm text-muted-foreground">
            Tile for lists and cards; mono (<code>currentColor</code>) for inline controls.
          </p>
        </div>
        <div className="grid gap-4 @2xl:grid-cols-3">
          {SPORT_ICONS.map(({ name, Icon }) => (
            <div key={name} className="flex flex-col gap-4 rounded-xl border p-4">
              <span className="text-sm font-medium">{name}</span>
              <div className="flex flex-wrap items-end gap-4">
                <Icon className="size-24" />
                <Icon className="size-12" />
                <Icon className="size-9" />
                <Icon className="size-6" />
              </div>
              <div className="flex flex-wrap items-end gap-4">
                <Icon variant="mono" className="size-12" />
                <Icon variant="mono" className="size-8" />
                <Icon variant="mono" className="size-5" />
                <Icon variant="mono" className="size-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-xl font-semibold">Tokens in use</h2>
          <p className="text-sm text-muted-foreground">Reflects the scheme and mode selected in the toolbar.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="outline">Outline</Button>
          <Badge>Today</Badge>
          <Badge variant="secondary">Planned</Badge>
          <Badge variant="tertiary">Tertiary</Badge>
          <Badge variant="outline">Done</Badge>
        </div>
        <div className="grid grid-cols-3 gap-2 @2xl:grid-cols-6">
          {['primary', 'secondary', 'tertiary', 'chart-1', 'chart-2', 'chart-3'].map((token) => (
            <div key={token} className="flex flex-col gap-1.5">
              <div className="h-10 rounded-lg ring-1 ring-foreground/10" style={{ background: `var(--${token})` }} />
              <code className="text-xs">--{token}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
