export type Sport = 'run' | 'strength' | 'cross'

export type Session = {
  id: string
  sport: Sport
  title: string
  status: 'completed' | 'planned'
  indoor?: boolean
  time?: string
  metrics: { label: string; value: string }[]
  notes?: string
  tags?: string[]
}

export type Day = {
  date: string
  weekday: string
  isToday?: boolean
  sessions: Session[]
}

export const SPORT_LABEL: Record<Sport, string> = {
  run: 'Run',
  strength: 'Strength',
  cross: 'Cross-training',
}

export const WEEK: Day[] = [
  {
    date: 'Oct 19',
    weekday: 'Mon',
    sessions: [
      {
        id: 's1',
        sport: 'run',
        title: 'Easy run',
        status: 'completed',
        time: '6:15 AM',
        metrics: [
          { label: 'Distance', value: '6.2 mi' },
          { label: 'Time', value: '52:40' },
          { label: 'Pace', value: '8:30 /mi' },
        ],
        notes: 'Legs heavy for the first two miles, loosened up after. Cool and dry.',
        tags: ['Pegasus 41'],
      },
      {
        id: 's2',
        sport: 'strength',
        title: 'Lower body',
        status: 'completed',
        time: '5:30 PM',
        metrics: [
          { label: 'Exercises', value: '5' },
          { label: 'Sets', value: '17' },
          { label: 'Time', value: '45:00' },
        ],
        notes: 'Bumped RDLs to 155. Bulgarian split squats still humbling.',
      },
    ],
  },
  {
    date: 'Oct 20',
    weekday: 'Tue',
    sessions: [
      {
        id: 's3',
        sport: 'run',
        title: 'Track: 6 × 800m',
        status: 'completed',
        time: '6:00 AM',
        metrics: [
          { label: 'Distance', value: '7.5 mi' },
          { label: 'Time', value: '58:12' },
          { label: 'Reps', value: '2:58 avg' },
        ],
        notes: '2:59, 2:58, 2:57, 2:58, 2:59, 2:56. 400m jog recovery. Felt controlled.',
        tags: ['Workout', 'Endorphin Pro'],
      },
    ],
  },
  {
    date: 'Oct 21',
    weekday: 'Wed',
    sessions: [
      {
        id: 's4',
        sport: 'cross',
        title: 'Spin bike',
        status: 'completed',
        time: '6:30 AM',
        metrics: [
          { label: 'Time', value: '40:00' },
          { label: 'Effort', value: '4 / 10' },
        ],
        notes: 'Recovery spin, podcast.',
      },
    ],
  },
  {
    date: 'Oct 22',
    weekday: 'Thu',
    sessions: [
      {
        id: 's5',
        sport: 'run',
        title: 'Treadmill easy + strides',
        status: 'completed',
        indoor: true,
        time: '6:10 AM',
        metrics: [
          { label: 'Distance', value: '7.0 mi' },
          { label: 'Time', value: '59:15' },
          { label: 'Pace', value: '8:28 /mi' },
        ],
        tags: ['Pegasus 41'],
      },
    ],
  },
  {
    date: 'Oct 23',
    weekday: 'Fri',
    isToday: true,
    sessions: [
      {
        id: 's6',
        sport: 'strength',
        title: 'Upper body + core',
        status: 'planned',
        time: '5:30 PM',
        metrics: [
          { label: 'Exercises', value: '6' },
          { label: 'Est. time', value: '40:00' },
        ],
      },
    ],
  },
  {
    date: 'Oct 24',
    weekday: 'Sat',
    sessions: [
      {
        id: 's7',
        sport: 'run',
        title: 'Long run',
        status: 'planned',
        time: '7:00 AM',
        metrics: [
          { label: 'Distance', value: '16 mi' },
          { label: 'Target', value: '8:45 /mi' },
        ],
        notes: 'Last 3 at marathon effort if feeling good.',
      },
    ],
  },
  {
    date: 'Oct 25',
    weekday: 'Sun',
    sessions: [],
  },
]

export const WEEKLY_VOLUME = [
  { week: '9/7', miles: 34 },
  { week: '9/14', miles: 38 },
  { week: '9/21', miles: 41 },
  { week: '9/28', miles: 32 },
  { week: '10/5', miles: 43 },
  { week: '10/12', miles: 46 },
  { week: '10/19', miles: 20.7, planned: 16 },
]
