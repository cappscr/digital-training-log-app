export type DistanceUnit = 'mi' | 'km'

export const KM_PER_MILE = 1.609344

export function toSeconds(h: number, m: number, s: number) {
  return h * 3600 + m * 60 + s
}

export function formatDuration(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return '—'
  const rounded = Math.round(totalSeconds)
  const h = Math.floor(rounded / 3600)
  const m = Math.floor((rounded % 3600) / 60)
  const s = rounded % 60
  const ss = String(s).padStart(2, '0')
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${ss}`
  return `${m}:${ss}`
}

export function convertDistance(value: number, from: DistanceUnit, to: DistanceUnit) {
  if (from === to) return value
  return from === 'mi' ? value * KM_PER_MILE : value / KM_PER_MILE
}

export const RACE_DISTANCES: { label: string; km: number }[] = [
  { label: '1 mile', km: KM_PER_MILE },
  { label: '5K', km: 5 },
  { label: '10K', km: 10 },
  { label: '15K', km: 15 },
  { label: 'Half marathon', km: 21.0975 },
  { label: 'Marathon', km: 42.195 },
]
