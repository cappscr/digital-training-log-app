import {
  ArrowRightIcon,
  CalendarRangeIcon,
  LayoutTemplateIcon,
  PenLineIcon,
  ShareIcon,
  SigmaIcon,
  SmartphoneIcon,
  XIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Wordmark } from '@/mockups/AppShell'
import { SportIcon } from '@/mockups/SportIcon'
import type { Screen } from '@/mockups/screens'
import type { Sport } from '@/mockups/data'

const PRINCIPLES = [
  {
    icon: PenLineIcon,
    title: 'Write it your way',
    body: 'Distance and time when they matter. Sets, reps, weather, shoes, or a paragraph about how it felt when they matter more. Add the fields you care about.',
  },
  {
    icon: LayoutTemplateIcon,
    title: 'Templates for consistency',
    body: 'Save the shape of your recurring sessions — long run, track day, lower body — so every entry captures the same details, week after week.',
  },
  {
    icon: SigmaIcon,
    title: 'Totals, not advice',
    body: 'Weekly, monthly, and yearly volume are calculated for you. What you do with the numbers is up to you — no scores, nudges, or algorithmic coaching.',
  },
  {
    icon: CalendarRangeIcon,
    title: 'Plan like a paper calendar',
    body: 'Pencil in the weeks ahead, then move, edit, or erase sessions as life happens. Planned and completed live side by side.',
  },
  {
    icon: SmartphoneIcon,
    title: 'Any device, any watch',
    body: 'Log from your phone at the trailhead or plan on a laptop. Manual entry means it works with whatever hardware you own — or none at all.',
  },
  {
    icon: ShareIcon,
    title: 'Share with your coach',
    body: 'Give a coach read access to your log so they see exactly what you wrote — without turning your journal into a feed.',
  },
]

const NOT_LIST = [
  { title: 'Not a coaching platform', body: 'It never tells you what to do next.' },
  { title: 'Not a social network', body: 'No followers, kudos, or leaderboards.' },
  { title: 'Not a GPS aggregator', body: 'No sync required. You are the source of truth.' },
]

const PREVIEW: { day: string; sport?: Sport; indoor?: boolean; title: string; detail: string; planned?: boolean }[] = [
  { day: 'Mon', sport: 'run', title: 'Easy run', detail: '6.2 mi · 8:30 /mi' },
  { day: 'Tue', sport: 'run', title: '6 × 800m', detail: '7.5 mi · 2:58 avg' },
  { day: 'Wed', sport: 'cross', title: 'Spin bike', detail: '40 min · effort 4' },
  { day: 'Thu', sport: 'run', indoor: true, title: 'Treadmill + strides', detail: '7.0 mi · 8:28 /mi' },
  { day: 'Fri', sport: 'strength', title: 'Upper body + core', detail: '6 exercises', planned: true },
  { day: 'Sat', sport: 'run', title: 'Long run', detail: '16 mi planned', planned: true },
]

export function LandingPage({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <div className="min-h-full">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 @3xl:px-6">
          <Wordmark />
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate('sessions')}>
              Log in
            </Button>
            <Button onClick={() => navigate('sessions')}>Get started</Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 @3xl:px-6 @5xl:grid-cols-[1.1fr_1fr] @5xl:items-center @5xl:py-24">
        <div className="flex flex-col gap-6">
          <Badge variant="outline">Running · Strength · Cross-training</Badge>
          <h1 className="text-5xl font-semibold text-balance @3xl:text-6xl">
            The training journal you'd keep on paper — with the math done for you.
          </h1>
          <p className="max-w-prose text-lg text-muted-foreground">
            Plan and log every session in your own words. Training Log totals your volume and trends,
            and then gets out of the way. No coaching. No feed. No watch required.
          </p>
          <div className="flex flex-col gap-3 @sm:flex-row">
            <Button size="lg" className="px-4" onClick={() => navigate('sessions')}>
              Start your log
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" className="px-4" onClick={() => navigate('pace')}>
              Try the pace calculator
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Free while in early access.</p>
        </div>

        <Card className="gap-0 py-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <div className="text-sm font-medium">Week of Oct 19</div>
              <div className="text-xs text-muted-foreground">4 logged · 2 planned</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold tabular-nums">20.7 mi</div>
              <div className="text-xs text-muted-foreground">running this week</div>
            </div>
          </div>
          <ul className="divide-y">
            {PREVIEW.map((row) => (
              <li key={row.day + row.title} className="flex items-center gap-3 px-4 py-3">
                <span className="w-8 text-xs font-medium text-muted-foreground">{row.day}</span>
                {row.sport && <SportIcon sport={row.sport} indoor={row.indoor} className="size-8" />}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{row.title}</div>
                  <div className="truncate text-xs text-muted-foreground tabular-nums">{row.detail}</div>
                </div>
                {row.planned ? (
                  <Badge variant="secondary">Planned</Badge>
                ) : (
                  <Badge variant="outline">Done</Badge>
                )}
              </li>
            ))}
          </ul>
          <div className="border-t bg-muted/50 px-4 py-3 text-sm text-muted-foreground italic">
            "2:59, 2:58, 2:57, 2:58, 2:59, 2:56. Felt controlled."
          </div>
        </Card>
      </section>

      <Separator />

      <section className="mx-auto max-w-6xl px-4 py-16 @3xl:px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold @3xl:text-4xl">
            A structured place to reflect — not a spreadsheet dump.
          </h2>
          <p className="mt-3 text-muted-foreground">
            The flexibility of a notebook, the consistency of a template, and the arithmetic of a database.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-10 @2xl:grid-cols-2 @5xl:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col gap-2">
              <Icon className="size-5" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 @3xl:px-6 @5xl:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-3xl font-semibold">What it isn't</h2>
            <p className="mt-3 text-muted-foreground">
              Saying no keeps the journal yours.
            </p>
          </div>
          <div className="grid gap-4 @3xl:grid-cols-3">
            {NOT_LIST.map((item) => (
              <Card key={item.title} size="sm">
                <CardHeader>
                  <XIcon className="mb-1 size-4 text-muted-foreground" />
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 @3xl:px-6">
        <div className="grid gap-6 @3xl:grid-cols-3">
          {(
            [
              { sport: 'run', title: 'Running', body: 'Distance, duration, pace, elevation, splits, shoes — and the notes that explain them.' },
              { sport: 'strength', title: 'Strength', body: 'Exercises, sets, reps, and load as first-class data, not a note stuffed into a run.' },
              { sport: 'cross', title: 'Cross-training', body: 'Bike, swim, row, hike, yoga. Log time and effort for anything that builds your fitness.' },
            ] as const
          ).map((s) => (
            <Card key={s.sport}>
              <CardHeader>
                <SportIcon sport={s.sport} />
                <CardTitle className="mt-2">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{s.body}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:px-6">
          <div>
            <h2 className="text-3xl font-semibold">Open a fresh page.</h2>
            <p className="mt-2 text-muted-foreground">Your first week takes about two minutes to set up.</p>
          </div>
          <Button size="lg" className="px-4" onClick={() => navigate('sessions')}>
            Start your log
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground @3xl:flex-row @3xl:justify-between @3xl:px-6">
          <span>© 2026 Digital Training Log</span>
          <div className="flex gap-4">
            <span>About</span>
            <span>Privacy</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
