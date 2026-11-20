import { useState } from 'react'
import { format } from 'date-fns'
import { ArrowLeftIcon, CalendarIcon, PlusIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import type { Sport } from '@/mockups/data'
import { formatDuration, toSeconds } from '@/mockups/lib/pace'
import { SportIcon } from '@/mockups/SportIcon'
import type { Screen } from '@/mockups/screens'

const TEMPLATES: Record<Sport, { value: string; label: string }[]> = {
  run: [
    { value: 'none', label: 'Blank run' },
    { value: 'easy', label: 'Easy run' },
    { value: 'long', label: 'Long run' },
    { value: 'track', label: 'Track workout' },
  ],
  strength: [
    { value: 'none', label: 'Blank session' },
    { value: 'lower', label: 'Lower body' },
    { value: 'upper', label: 'Upper body + core' },
  ],
  cross: [
    { value: 'none', label: 'Blank session' },
    { value: 'spin', label: 'Recovery spin' },
  ],
}

const RUN_TYPES = [
  { value: 'easy', label: 'Easy' },
  { value: 'long', label: 'Long' },
  { value: 'tempo', label: 'Tempo' },
  { value: 'intervals', label: 'Intervals' },
  { value: 'race', label: 'Race' },
  { value: 'other', label: 'Other' },
]

const CROSS_ACTIVITIES = [
  { value: 'bike', label: 'Bike' },
  { value: 'swim', label: 'Swim' },
  { value: 'row', label: 'Row' },
  { value: 'hike', label: 'Hike' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'other', label: 'Other' },
]

const UNITS = [
  { value: 'mi', label: 'mi' },
  { value: 'km', label: 'km' },
]

type Exercise = { name: string; sets: { weight: string; reps: string }[] }

export function LogSessionPage({ navigate }: { navigate: (screen: Screen) => void }) {
  const [sport, setSport] = useState<Sport>('run')
  const [status, setStatus] = useState<'completed' | 'planned'>('completed')
  const [date, setDate] = useState<Date>(new Date(2026, 9, 23))
  const [distance, setDistance] = useState('8')
  const [unit, setUnit] = useState<'mi' | 'km'>('mi')
  const [duration, setDuration] = useState({ h: '1', m: '07', s: '30' })
  const [crossDuration, setCrossDuration] = useState({ h: '0', m: '40', s: '00' })
  const [effort, setEffort] = useState(5)
  const [customFields, setCustomFields] = useState([
    { label: 'Shoes', value: 'Pegasus 41' },
    { label: 'Weather', value: '48°F, light wind' },
  ])
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: 'Back squat', sets: [{ weight: '185', reps: '5' }, { weight: '185', reps: '5' }, { weight: '185', reps: '5' }] },
    { name: 'Romanian deadlift', sets: [{ weight: '155', reps: '8' }, { weight: '155', reps: '8' }] },
  ])

  const seconds = toSeconds(Number(duration.h) || 0, Number(duration.m) || 0, Number(duration.s) || 0)
  const dist = Number(distance)
  const pace = dist > 0 && seconds > 0 ? formatDuration(seconds / dist) : '—'
  const weekTotal = 20.7 + (sport === 'run' && unit === 'mi' && dist > 0 ? dist : 0)

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 @3xl:px-6 @3xl:py-8">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" aria-label="Back" onClick={() => navigate('sessions')}>
          <ArrowLeftIcon />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold">
            {status === 'planned' ? 'Plan a session' : 'Log a session'}
          </h1>
          <p className="text-sm text-muted-foreground">{format(date, 'EEEE, MMMM d')}</p>
        </div>
        <div className="hidden gap-2 @3xl:flex">
          <Button variant="outline" onClick={() => navigate('sessions')}>
            Cancel
          </Button>
          <Button onClick={() => navigate('sessions')}>Save session</Button>
        </div>
      </div>

      <div className="grid gap-8 @5xl:grid-cols-[1fr_300px]">
        <form className="flex min-w-0 flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          <FieldSet>
            <FieldLegend>Sport</FieldLegend>
            <ToggleGroup
              value={[sport]}
              onValueChange={(v) => v[0] && setSport(v[0] as Sport)}
              variant="outline"
              spacing={2}
              className="grid w-full grid-cols-3"
            >
              {(['run', 'strength', 'cross'] as const).map((s) => (
                <ToggleGroupItem
                  key={s}
                  value={s}
                  className="h-auto flex-col gap-1.5 py-3 data-pressed:border-foreground"
                >
                  <SportIcon sport={s} variant="mono" className="size-8 bg-transparent" />
                  <span className="text-xs">{s === 'run' ? 'Run' : s === 'strength' ? 'Strength' : 'Cross-train'}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FieldSet>

          <FieldGroup className="grid gap-4 @2xl:grid-cols-2">
            <Field>
              <FieldLabel>Status</FieldLabel>
              <ToggleGroup
                value={[status]}
                onValueChange={(v) => v[0] && setStatus(v[0] as typeof status)}
                variant="outline"
                spacing={0}
                className="w-full"
              >
                <ToggleGroupItem value="completed" className="flex-1">
                  Completed
                </ToggleGroupItem>
                <ToggleGroupItem value="planned" className="flex-1">
                  Planned
                </ToggleGroupItem>
              </ToggleGroup>
            </Field>
            <Field>
              <FieldLabel>Start from template</FieldLabel>
              <Select key={sport} items={TEMPLATES[sport]} defaultValue={TEMPLATES[sport][1].value}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATES[sport].map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Date</FieldLabel>
              <Popover>
                <PopoverTrigger render={<Button variant="outline" className="w-full justify-start font-normal" />}>
                  <CalendarIcon data-icon="inline-start" />
                  {format(date, 'MMM d, yyyy')}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} defaultMonth={date} />
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <FieldLabel htmlFor="time">Start time</FieldLabel>
              <Input id="time" type="time" defaultValue="06:15" />
            </Field>
            <Field className="@2xl:col-span-2">
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                key={sport}
                defaultValue={sport === 'run' ? 'Easy run' : sport === 'strength' ? 'Lower body' : 'Recovery spin'}
              />
            </Field>
          </FieldGroup>

          <FieldSeparator />

          {sport === 'run' && (
            <FieldSet>
              <FieldLegend>{status === 'planned' ? 'Targets' : 'Details'}</FieldLegend>
              <FieldGroup className="grid gap-4 @2xl:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="distance">Distance</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      id="distance"
                      inputMode="decimal"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="tabular-nums"
                    />
                    <Select items={UNITS} value={unit} onValueChange={(v) => setUnit(v as 'mi' | 'km')}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {UNITS.map((u) => (
                          <SelectItem key={u.value} value={u.value}>
                            {u.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </Field>
                <Field>
                  <FieldLabel>Duration</FieldLabel>
                  <DurationInput value={duration} onChange={setDuration} />
                </Field>
                <Field>
                  <FieldLabel>Pace</FieldLabel>
                  <div className="flex h-8 items-center rounded-lg bg-muted px-2.5 text-sm tabular-nums">
                    {pace} <span className="ml-1 text-muted-foreground">/{unit}</span>
                  </div>
                  <FieldDescription>Calculated from distance and duration.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="elev">Elevation gain</FieldLabel>
                  <InputGroup>
                    <InputGroupInput id="elev" inputMode="numeric" placeholder="0" defaultValue="340" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>ft</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Run type</FieldLabel>
                  <Select items={RUN_TYPES} defaultValue="easy">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RUN_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="hr">Avg heart rate</FieldLabel>
                  <InputGroup>
                    <InputGroupInput id="hr" inputMode="numeric" placeholder="Optional" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>bpm</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>
            </FieldSet>
          )}

          {sport === 'strength' && (
            <FieldSet>
              <FieldLegend>Exercises</FieldLegend>
              <div className="flex flex-col gap-3">
                {exercises.map((ex, i) => (
                  <Card key={i} size="sm">
                    <CardContent className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Input
                          value={ex.name}
                          onChange={(e) =>
                            setExercises(exercises.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
                          }
                          className="font-medium"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Remove exercise"
                          onClick={() => setExercises(exercises.filter((_, j) => j !== i))}
                        >
                          <XIcon />
                        </Button>
                      </div>
                      <div className="grid grid-cols-[2rem_1fr_1fr] items-center gap-2 text-xs text-muted-foreground">
                        <span>Set</span>
                        <span>Weight (lb)</span>
                        <span>Reps</span>
                        {ex.sets.map((set, k) => (
                          <SetRow key={k} index={k} set={set} />
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="self-start"
                        onClick={() =>
                          setExercises(
                            exercises.map((x, j) =>
                              j === i ? { ...x, sets: [...x.sets, { ...(x.sets.at(-1) ?? { weight: '', reps: '' }) }] } : x,
                            ),
                          )
                        }
                      >
                        <PlusIcon data-icon="inline-start" />
                        Add set
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  variant="outline"
                  className="border-dashed"
                  onClick={() => setExercises([...exercises, { name: '', sets: [{ weight: '', reps: '' }] }])}
                >
                  <PlusIcon data-icon="inline-start" />
                  Add exercise
                </Button>
              </div>
            </FieldSet>
          )}

          {sport === 'cross' && (
            <FieldSet>
              <FieldLegend>Details</FieldLegend>
              <FieldGroup className="grid gap-4 @2xl:grid-cols-2">
                <Field>
                  <FieldLabel>Activity</FieldLabel>
                  <Select items={CROSS_ACTIVITIES} defaultValue="bike">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CROSS_ACTIVITIES.map((a) => (
                        <SelectItem key={a.value} value={a.value}>
                          {a.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Duration</FieldLabel>
                  <DurationInput value={crossDuration} onChange={setCrossDuration} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="xdist">Distance</FieldLabel>
                  <InputGroup>
                    <InputGroupInput id="xdist" inputMode="decimal" placeholder="Optional" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>mi</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>
            </FieldSet>
          )}

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel>Perceived effort</FieldLabel>
              <span className="text-sm font-medium tabular-nums">{effort} / 10</span>
            </div>
            <Slider value={[effort]} onValueChange={(v) => setEffort(Array.isArray(v) ? v[0] : v)} min={1} max={10} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very easy</span>
              <span>Maximal</span>
            </div>
          </Field>

          <FieldSet>
            <FieldLegend>Your fields</FieldLegend>
            <FieldDescription>Track anything else — shoes, weather, sleep, fueling. Fields you add are remembered.</FieldDescription>
            <div className="flex flex-col gap-2">
              {customFields.map((f, i) => (
                <div key={i} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] gap-2">
                  <Input
                    value={f.label}
                    placeholder="Field"
                    onChange={(e) =>
                      setCustomFields(customFields.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))
                    }
                    className="text-muted-foreground"
                  />
                  <Input
                    value={f.value}
                    placeholder="Value"
                    onChange={(e) =>
                      setCustomFields(customFields.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remove field"
                    onClick={() => setCustomFields(customFields.filter((_, j) => j !== i))}
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                className="self-start"
                onClick={() => setCustomFields([...customFields, { label: '', value: '' }])}
              >
                <PlusIcon data-icon="inline-start" />
                Add field
              </Button>
            </div>
          </FieldSet>

          <Field>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <Textarea
              id="notes"
              rows={5}
              placeholder="How did it feel? What was going on? Write as much or as little as you like."
              defaultValue="Legs heavy for the first two miles, loosened up after."
            />
          </Field>
        </form>

        <aside className="flex flex-col gap-4 @5xl:sticky @5xl:top-20 @5xl:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Updates as you type</CardDescription>
            </CardHeader>
            <CardContent>
              {sport === 'run' ? (
                <dl className="grid grid-cols-2 gap-4">
                  <Stat label="Distance" value={dist > 0 ? `${dist} ${unit}` : '—'} />
                  <Stat label="Duration" value={formatDuration(seconds)} />
                  <Stat label="Pace" value={`${pace} /${unit}`} />
                  <Stat label="Week total" value={`${weekTotal.toFixed(1)} mi`} />
                </dl>
              ) : sport === 'strength' ? (
                <dl className="grid grid-cols-2 gap-4">
                  <Stat label="Exercises" value={String(exercises.length)} />
                  <Stat label="Sets" value={String(exercises.reduce((n, e) => n + e.sets.length, 0))} />
                  <Stat
                    label="Volume"
                    value={`${exercises
                      .reduce((n, e) => n + e.sets.reduce((m, s) => m + (Number(s.weight) || 0) * (Number(s.reps) || 0), 0), 0)
                      .toLocaleString()} lb`}
                  />
                  <Stat label="Effort" value={`${effort} / 10`} />
                </dl>
              ) : (
                <dl className="grid grid-cols-2 gap-4">
                  <Stat
                    label="Duration"
                    value={formatDuration(
                      toSeconds(Number(crossDuration.h) || 0, Number(crossDuration.m) || 0, Number(crossDuration.s) || 0),
                    )}
                  />
                  <Stat label="Effort" value={`${effort} / 10`} />
                </dl>
              )}
            </CardContent>
          </Card>
          <Button variant="outline">Save as new template</Button>
        </aside>
      </div>

      <div className="sticky bottom-0 z-10 -mx-4 mt-8 flex gap-2 border-t bg-background/95 px-4 py-3 backdrop-blur @3xl:hidden">
        <Button variant="outline" className="flex-1" onClick={() => navigate('sessions')}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={() => navigate('sessions')}>
          Save session
        </Button>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-lg font-semibold tabular-nums">{value}</dd>
    </div>
  )
}

function SetRow({ index, set }: { index: number; set: { weight: string; reps: string } }) {
  return (
    <>
      <span className="text-center tabular-nums">{index + 1}</span>
      <Input
        aria-label={`Set ${index + 1} weight`}
        defaultValue={set.weight}
        inputMode="decimal"
        className="text-foreground tabular-nums"
      />
      <Input
        aria-label={`Set ${index + 1} reps`}
        defaultValue={set.reps}
        inputMode="numeric"
        className="text-foreground tabular-nums"
      />
    </>
  )
}

export function DurationInput({
  value,
  onChange,
  className,
}: {
  value: { h: string; m: string; s: string }
  onChange: (v: { h: string; m: string; s: string }) => void
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {(['h', 'm', 's'] as const).map((k, i) => (
        <div key={k} className="flex flex-1 items-center gap-1">
          {i > 0 && <span className="text-muted-foreground">:</span>}
          <InputGroup>
            <InputGroupInput
              aria-label={{ h: 'Hours', m: 'Minutes', s: 'Seconds' }[k]}
              inputMode="numeric"
              value={value[k]}
              onChange={(e) => onChange({ ...value, [k]: e.target.value })}
              className="tabular-nums"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText>{k}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      ))}
    </div>
  )
}
