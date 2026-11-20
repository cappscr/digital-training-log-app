import { useState } from 'react'
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  LayoutTemplateIcon,
  MoreHorizontalIcon,
  MoveIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  UsersIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { SPORT_LABEL, WEEK, WEEKLY_VOLUME, type Session, type Sport } from '@/mockups/data'
import { SportIcon } from '@/mockups/SportIcon'
import type { Screen } from '@/mockups/screens'

const SPORT_FILTERS = [
  { value: 'all', label: 'All sports' },
  { value: 'run', label: 'Running' },
  { value: 'strength', label: 'Strength' },
  { value: 'cross', label: 'Cross-training' },
]

const TOTALS = [
  { label: 'Running distance', value: '20.7 mi', sub: '+ 16 mi planned' },
  { label: 'Running time', value: '2:50:07', sub: '3 runs' },
  { label: 'Strength', value: '1 session', sub: '+ 1 planned' },
  { label: 'Cross-training', value: '40 min', sub: '1 session' },
]

export function SessionsListPage({ navigate }: { navigate: (screen: Screen) => void }) {
  const [sport, setSport] = useState<'all' | Sport>('all')

  const days = WEEK.map((day) => ({
    ...day,
    sessions: day.sessions.filter((s) => sport === 'all' || s.sport === sport),
  }))

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-6 pb-24 @3xl:px-6 @3xl:pt-8 @5xl:grid-cols-[1fr_300px]">
      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col gap-4 @3xl:flex-row @3xl:items-end @3xl:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Week 43</p>
            <h1 className="text-3xl font-semibold @3xl:text-4xl">Oct 19 – 25, 2026</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Previous week">
              <ChevronLeftIcon />
            </Button>
            <Button variant="outline">Today</Button>
            <Button variant="outline" size="icon" aria-label="Next week">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border @3xl:grid-cols-4">
          {TOTALS.map((t) => (
            <div key={t.label} className="bg-background p-4">
              <div className="text-xs text-muted-foreground">{t.label}</div>
              <div className="mt-1 text-xl font-semibold tabular-nums">{t.value}</div>
              <div className="text-xs text-muted-foreground">{t.sub}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="agenda">
          <div className="flex items-center justify-between gap-2">
            <TabsList>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="grid">Week grid</TabsTrigger>
            </TabsList>
            <Select
              items={SPORT_FILTERS}
              value={sport}
              onValueChange={(v) => setSport(v as 'all' | Sport)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SPORT_FILTERS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="agenda" className="mt-4 flex flex-col gap-6">
            {days.map((day) => (
              <section key={day.date} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h2 className={cn('text-base font-semibold tracking-wide uppercase', !day.isToday && 'text-muted-foreground')}>
                    {day.weekday} · {day.date}
                  </h2>
                  {day.isToday && <Badge>Today</Badge>}
                </div>
                {day.sessions.length === 0 ? (
                  <p className="rounded-xl border border-dashed py-4 text-center text-sm text-muted-foreground">
                    Nothing planned
                  </p>
                ) : (
                  day.sessions.map((s) => <SessionCard key={s.id} session={s} onEdit={() => navigate('log')} />)
                )}
              </section>
            ))}
          </TabsContent>

          <TabsContent value="grid" className="mt-4">
            <div className="grid gap-2 @3xl:grid-cols-7">
              {days.map((day) => (
                <div
                  key={day.date}
                  className={cn(
                    'flex min-h-40 flex-col gap-2 rounded-xl border p-2',
                    day.isToday && 'border-foreground/40',
                  )}
                >
                  <div className="flex items-baseline justify-between px-1 text-xs">
                    <span className="font-medium">{day.weekday}</span>
                    <span className="text-muted-foreground">{day.date}</span>
                  </div>
                  {day.sessions.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => navigate('log')}
                      className={cn(
                        'rounded-lg bg-muted p-2 text-left text-xs',
                        s.status === 'planned' && 'border border-dashed border-secondary/50 bg-transparent',
                      )}
                    >
                      <div className="font-medium">{s.title}</div>
                      <div className="text-muted-foreground tabular-nums">{s.metrics[0]?.value}</div>
                    </button>
                  ))}
                  <Button
                    variant="ghost"
                    size="xs"
                    className="mt-auto self-start text-muted-foreground"
                    onClick={() => navigate('log')}
                  >
                    <PlusIcon data-icon="inline-start" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Drag sessions between days to reschedule.</p>
          </TabsContent>
        </Tabs>
      </div>

      <aside className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Weekly running distance</CardTitle>
            <CardDescription>Miles per week · last 7 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <VolumeChart />
          </CardContent>
        </Card>

        <Card className="hidden @5xl:flex">
          <CardContent className="flex justify-center px-2">
            <Calendar
              mode="single"
              selected={new Date(2026, 9, 23)}
              defaultMonth={new Date(2026, 9, 1)}
              modifiers={{ logged: WEEK.slice(0, 4).map((_, i) => new Date(2026, 9, 19 + i)) }}
              modifiersClassNames={{ logged: 'underline decoration-2 underline-offset-4' }}
            />
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="size-4" />
              Shared with 1 coach
            </CardTitle>
            <CardDescription>Dana Reyes can view your log. She can't edit it.</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      </aside>

      <Button
        onClick={() => navigate('log')}
        aria-label="Log session"
        className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-20 size-14 rounded-full shadow-lg hover:bg-primary/90 @3xl:right-6 @3xl:bottom-6 @3xl:h-14 @3xl:w-auto @3xl:gap-2 @3xl:px-5 @3xl:text-base [&_svg:not([class*='size-'])]:size-6"
      >
        <PlusIcon />
        <span className="hidden @3xl:inline">Log session</span>
      </Button>
    </div>
  )
}

function SessionCard({ session, onEdit }: { session: Session; onEdit: () => void }) {
  const planned = session.status === 'planned'
  return (
    <Card
      size="sm"
      className={cn('cursor-pointer transition-colors hover:bg-muted/40', planned && 'border border-dashed border-secondary/50 bg-transparent ring-0')}
      onClick={onEdit}
    >
      <CardContent className="flex gap-3">
        <SportIcon sport={session.sport} indoor={session.indoor} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{session.title}</span>
                {planned && <Badge variant="secondary">Planned</Badge>}
              </div>
              <div className="text-xs text-muted-foreground">
                {SPORT_LABEL[session.sport]} · {session.time}
              </div>
            </div>
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              {planned && (
                <Button variant="outline" size="sm">
                  <CheckIcon data-icon="inline-start" />
                  Complete
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Session actions" />}>
                  <MoreHorizontalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={onEdit}>
                    <PencilIcon />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MoveIcon />
                    Move to another day
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CopyIcon />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LayoutTemplateIcon />
                    Save as template
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <Trash2Icon />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {session.metrics.map((m) => (
              <div key={m.label}>
                <dt className="text-xs text-muted-foreground">{m.label}</dt>
                <dd className="font-medium tabular-nums">{m.value}</dd>
              </div>
            ))}
          </dl>

          {session.notes && <p className="mt-3 line-clamp-2 text-muted-foreground">{session.notes}</p>}

          {session.tags && (
            <div className="mt-3 flex flex-wrap gap-1">
              {session.tags.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function VolumeChart() {
  const max = Math.max(...WEEKLY_VOLUME.map((w) => w.miles + (w.planned ?? 0)))
  return (
    <div>
      <div className="flex h-32 items-end gap-2">
        {WEEKLY_VOLUME.map((w) => (
          <div key={w.week} className="flex h-full flex-1 flex-col justify-end gap-px" title={`${w.week}: ${w.miles} mi`}>
            {w.planned && (
              <div
                className="rounded-t-sm border border-dashed border-chart-2 bg-chart-2/10"
                style={{ height: `${(w.planned / max) * 100}%` }}
              />
            )}
            <div
              className={cn('bg-chart-1', w.planned ? 'rounded-b-sm' : 'rounded-sm')}
              style={{ height: `${(w.miles / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2 text-[10px] text-muted-foreground">
        {WEEKLY_VOLUME.map((w) => (
          <span key={w.week} className="flex-1 truncate text-center">
            {w.week}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-chart-1" /> Logged
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm border border-dashed border-chart-2 bg-chart-2/10" /> Planned
        </span>
      </div>
    </div>
  )
}
