import * as z from 'zod';
import { parseDuration } from '@/lib/utils';

const shared = z.object({
  date: z.date({ error: 'Select a date' }),
  time: z.string().optional(),
  indoor_or_outdoor: z.enum(['indoor', 'outdoor']),
  duration: z
    .string()
    .refine((value) => !value.trim() || parseDuration(value) !== null, {
      message: 'Enter a valid duration (e.g. 1:30:00 or 45:30)',
    }),
  notes: z.string().optional(),
});

const runningSchema = shared
  .extend({
    type: z.literal('running'),
    distance: z
      .number({ error: 'Enter a distance' })
      .positive('Distance must be greater than 0')
      .optional()
      .refine((n) => n === undefined || Math.round(n * 100) / 100 === n, {
        message: 'Use at most two decimal places',
      }),
    unit: z.enum(['mi', 'km']),
    elevation_gain: z
      .number({ error: 'Enter an elevation gain' })
      .nonnegative('Elevation gain must be 0 or greater')
      .optional(),
    elevation_unit: z.enum(['ft', 'm']).optional(),
    average_heart_rate: z
      .number({ error: 'Enter a heart rate' })
      .positive('Heart rate must be greater than 0')
      .optional(),
    average_cadence: z
      .number({ error: 'Enter a cadence' })
      .positive('Cadence must be greater than 0')
      .optional(),
  })
  .refine(
    (data) =>
      parseDuration(data.duration) !== null || data.distance !== undefined,
    {
      message: "Duration and distance can't both be blank",
      path: ['duration'],
    },
  )
  .refine(
    (data) =>
      data.elevation_gain === undefined || data.elevation_unit !== undefined,
    {
      message: 'Elevation unit must be specified if elevation gain is provided',
      path: ['elevation_unit'],
    },
  );

const crossTrainingSchema = shared
  .extend({
    type: z.literal('cross_training'),
    activity: z.string().trim().min(1).max(100),
    distance: z
      .number({ error: 'Enter a distance' })
      .positive('Distance must be greater than 0')
      .optional()
      .refine((n) => n === undefined || Math.round(n * 100) / 100 === n, {
        message: 'Use at most two decimal places',
      }),
    unit: z.enum(['mi', 'km']),
    elevation_gain: z
      .number({ error: 'Enter an elevation gain' })
      .nonnegative('Elevation gain must be  0 or greater')
      .optional(),
    elevation_unit: z.enum(['ft', 'm']).optional(),
    average_heart_rate: z
      .number({ error: 'Enter a heart rate' })
      .positive('Heart rate must be greater than 0')
      .optional(),
  })
  .refine(
    (data) =>
      parseDuration(data.duration) !== null || data.distance !== undefined,
    {
      message: "Duration and distance can't both be blank",
      path: ['duration'],
    },
  )
  .refine(
    (data) =>
      data.elevation_gain === undefined || data.elevation_unit !== undefined,
    {
      message: 'Elevation unit must be specified if elevation gain is provided',
      path: ['elevation_unit'],
    },
  );

export const logTrainingSessionFormSchema = z.discriminatedUnion('type', [
  runningSchema,
  crossTrainingSchema,
]);

export type LogTrainingSessionFormValues = z.infer<
  typeof logTrainingSessionFormSchema
>;
