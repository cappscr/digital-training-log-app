import { describe, expect, test } from 'vitest';
import { buildSubmitPayload } from '@/forms/log-training-session/logTrainingSessionBuildSubmitPayload';
import { defaultValuesFromSession } from '@/forms/log-training-session/logTrainingSessionDefaultValues';
import { logTrainingSessionFormSchema } from '@/forms/log-training-session/logTrainingSessionSchemas';
import type { TrainingSession } from '@/hooks/useTrainingSessions';

const runningBase = {
  date: new Date('2026-09-26T00:00:00'),
  time: '',
  indoor_or_outdoor: 'outdoor' as const,
  duration: '45:30',
  notes: '',
  type: 'running' as const,
  unit: 'mi' as const,
};

describe('running elevation gain', () => {
  test('requires a unit when elevation gain is present', () => {
    const result = logTrainingSessionFormSchema.safeParse({
      ...runningBase,
      elevation_gain: 800,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path.join('.'))).toContain(
        'elevation_unit',
      );
    }
  });

  test('accepts elevation gain with a unit', () => {
    const result = logTrainingSessionFormSchema.safeParse({
      ...runningBase,
      elevation_gain: 800,
      elevation_unit: 'ft',
    });

    expect(result.success).toBe(true);
  });

  test('accepts a run with no elevation gain', () => {
    const result = logTrainingSessionFormSchema.safeParse(runningBase);

    expect(result.success).toBe(true);
  });

  test('includes elevation unit on the running submit payload', () => {
    const payload = buildSubmitPayload(
      {
        ...runningBase,
        elevation_gain: 800,
        elevation_unit: 'm',
      },
      'session-id',
      'sport-id',
    );

    expect(payload.sport_details).toMatchObject({
      kind: 'running',
      elevation_gain: 800,
      elevation_unit: 'm',
    });
  });

  test('reads elevation unit from a running session', () => {
    const session: TrainingSession = {
      id: 'session-id',
      session_date: '2026-09-26',
      session_time: null,
      day_of_week: 'Saturday',
      duration: '45:30',
      location_type: 'outdoor',
      notes: null,
      sport_details_type: 'RunningTrainingSession',
      sport_details: {
        id: 'sport-id',
        distance: 8,
        distance_unit: 'mi',
        elevation_gain: 800,
        elevation_unit: 'ft',
        average_heart_rate: 140,
        average_cadence: 170,
      },
    };

    expect(defaultValuesFromSession(session)).toMatchObject({
      type: 'running',
      elevation_gain: 800,
      elevation_unit: 'ft',
    });
  });
});
