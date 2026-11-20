export type Screen = 'landing' | 'sessions' | 'log' | 'pace' | 'palette'

export const SCREENS: { id: Screen; label: string }[] = [
  { id: 'landing', label: 'Landing' },
  { id: 'sessions', label: 'Training sessions' },
  { id: 'log', label: 'Log session' },
  { id: 'pace', label: 'Pace calculator' },
  { id: 'palette', label: 'Palette' },
]
