import { useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  convertDistance,
  formatDuration,
  RACE_DISTANCES,
  toSeconds,
  type DistanceUnit,
} from '@/mockups/lib/pace'
import { DurationInput } from '@/mockups/LogSessionPage'

type Mode = 'pace' | 'time' | 'distance'

const MODE_COPY: Record<Mode, string> = {
  pace: 'Enter a distance and a finish time.',
  time: 'Enter a distance and a pace.',
  distance: 'Enter a finish time and a pace.',
}

export function PaceCalculatorPage() {
  const [mode, setMode] = useState<Mode>('pace')
  const [unit, setUnit] = useState<DistanceUnit>('mi')
  const [distanceKm, setDistanceKm] = useState(21.0975)
  const [distanceText, setDistanceText] = useState(convertDistance(21.0975, 'km', 'mi').toFixed(2))
  const [time, setTime] = useState({ h: '1', m: '39', s: '45' })
  const [pace, setPace] = useState({ m: '7', s: '30' })

  const distanceInUnit = convertDistance(distanceKm, 'km', unit)
  const timeSec = toSeconds(Number(time.h) || 0, Number(time.m) || 0, Number(time.s) || 0)
  const paceSecInput = toSeconds(0, Number(pace.m) || 0, Number(pace.s) || 0)

  let paceSec = paceSecInput
  let resultSec = timeSec
  let resultDist = distanceInUnit
  if (mode === 'pace') paceSec = distanceInUnit > 0 ? timeSec / distanceInUnit : 0
  if (mode === 'time') resultSec = paceSecInput * distanceInUnit
  if (mode === 'distance') resultDist = paceSecInput > 0 ? timeSec / paceSecInput : 0

  const other: DistanceUnit = unit === 'mi' ? 'km' : 'mi'
  const paceOther = paceSec / convertDistance(1, unit, other)
  const speed = paceSec > 0 ? 3600 / paceSec : 0

  const presetLabel = RACE_DISTANCES.find((d) => Math.abs(d.km - distanceKm) < 0.001)?.label ?? 'custom'

  function setDistanceFromText(text: string) {
    setDistanceText(text)
    const n = Number(text)
    if (n > 0) setDistanceKm(convertDistance(n, unit, 'km'))
  }

  function selectPreset(label: string) {
    const preset = RACE_DISTANCES.find((d) => d.label === label)
    if (!preset) return
    setDistanceKm(preset.km)
    setDistanceText(convertDistance(preset.km, 'km', unit).toFixed(2))
  }

  function changeUnit(next: DistanceUnit) {
    setUnit(next)
    setDistanceText(convertDistance(distanceKm, 'km', next).toFixed(2))
  }

  const splitsDistance = mode === 'distance' ? resultDist : distanceInUnit
  const splits: { at: string; elapsed: number }[] = []
  for (let i = 1; i <= Math.floor(splitsDistance) && i <= 60; i++) splits.push({ at: `${i}`, elapsed: paceSec * i })
  if (splitsDistance % 1 > 0.005) splits.push({ at: splitsDistance.toFixed(2), elapsed: paceSec * splitsDistance })

  const headline =
    mode === 'pace'
      ? { label: 'Pace', value: formatDuration(paceSec), unit: `/${unit}` }
      : mode === 'time'
        ? { label: 'Finish time', value: formatDuration(resultSec), unit: '' }
        : { label: 'Distance', value: resultDist.toFixed(2), unit }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 @3xl:px-6 @3xl:py-8">
      <div className="mb-6 flex flex-col gap-4 @3xl:flex-row @3xl:items-end @3xl:justify-between">
        <div>
          <h1 className="text-3xl font-semibold @3xl:text-4xl">Pace calculator</h1>
          <p className="text-muted-foreground">{MODE_COPY[mode]}</p>
        </div>
        <ToggleGroup
          value={[unit]}
          onValueChange={(v) => v[0] && changeUnit(v[0] as DistanceUnit)}
          variant="outline"
          spacing={0}
        >
          <ToggleGroupItem value="mi">Miles</ToggleGroupItem>
          <ToggleGroupItem value="km">Kilometers</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid gap-6 @5xl:grid-cols-[380px_1fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Solve for</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
                <TabsList className="w-full">
                  <TabsTrigger value="pace">Pace</TabsTrigger>
                  <TabsTrigger value="time">Time</TabsTrigger>
                  <TabsTrigger value="distance">Distance</TabsTrigger>
                </TabsList>
              </Tabs>

              <FieldGroup>
                {mode !== 'distance' && (
                  <Field>
                    <FieldLabel htmlFor="pc-distance">Distance</FieldLabel>
                    <ToggleGroup
                      value={[presetLabel]}
                      onValueChange={(v) => v[0] && selectPreset(v[0] as string)}
                      variant="outline"
                      size="sm"
                      className="flex-wrap"
                    >
                      {RACE_DISTANCES.map((d) => (
                        <ToggleGroupItem key={d.label} value={d.label}>
                          {d.label === 'Half marathon' ? 'Half' : d.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                    <InputGroup>
                      <InputGroupInput
                        id="pc-distance"
                        inputMode="decimal"
                        value={distanceText}
                        onChange={(e) => setDistanceFromText(e.target.value)}
                        className="tabular-nums"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>{unit}</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                )}

                {mode !== 'time' && (
                  <Field>
                    <FieldLabel>Time</FieldLabel>
                    <DurationInput value={time} onChange={setTime} />
                  </Field>
                )}

                {mode !== 'pace' && (
                  <Field>
                    <FieldLabel>Pace</FieldLabel>
                    <div className="flex items-center gap-1">
                      <InputGroup>
                        <InputGroupInput
                          aria-label="Pace minutes"
                          inputMode="numeric"
                          value={pace.m}
                          onChange={(e) => setPace({ ...pace, m: e.target.value })}
                          className="tabular-nums"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupText>m</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <span className="text-muted-foreground">:</span>
                      <InputGroup>
                        <InputGroupInput
                          aria-label="Pace seconds"
                          inputMode="numeric"
                          value={pace.s}
                          onChange={(e) => setPace({ ...pace, s: e.target.value })}
                          className="tabular-nums"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupText>s /{unit}</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Field>
                )}
              </FieldGroup>
            </CardContent>
          </Card>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <div className="rounded-xl bg-primary p-6 text-primary-foreground">
            <div className="text-sm opacity-70">{headline.label}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tight tabular-nums">{headline.value}</span>
              <span className="text-lg opacity-70">{headline.unit}</span>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-primary-foreground/15 pt-4 @2xl:grid-cols-4">
              <ResultStat label={`Pace /${unit}`} value={formatDuration(paceSec)} />
              <ResultStat label={`Pace /${other}`} value={formatDuration(paceOther)} />
              <ResultStat label={unit === 'mi' ? 'Speed (mph)' : 'Speed (km/h)'} value={speed ? speed.toFixed(2) : '—'} />
              <ResultStat label="Finish" value={formatDuration(mode === 'time' ? resultSec : timeSec)} />
            </dl>
          </div>

          <div className="grid gap-6 @3xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Equivalent times</CardTitle>
                <CardDescription>At {formatDuration(paceSec)} /{unit}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Distance</TableHead>
                      <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RACE_DISTANCES.map((d) => (
                      <TableRow key={d.label} data-state={d.label === presetLabel ? 'selected' : undefined}>
                        <TableCell>{d.label}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatDuration(paceSec * convertDistance(d.km, 'km', unit))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Even splits</CardTitle>
                <CardDescription>Elapsed time at each {unit === 'mi' ? 'mile' : 'kilometer'}</CardDescription>
              </CardHeader>
              <CardContent className="max-h-80 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{unit === 'mi' ? 'Mile' : 'Km'}</TableHead>
                      <TableHead className="text-right">Elapsed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {splits.map((s) => (
                      <TableRow key={s.at}>
                        <TableCell className="tabular-nums">{s.at}</TableCell>
                        <TableCell className="text-right tabular-nums">{formatDuration(s.elapsed)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs opacity-70">{label}</dt>
      <dd className="text-lg font-medium tabular-nums">{value}</dd>
    </div>
  )
}
