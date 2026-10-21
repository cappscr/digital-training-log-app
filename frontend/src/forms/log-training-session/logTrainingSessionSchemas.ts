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

const strengthTrainingSchema = shared.extend({
  type: z.literal('strength_training'),
  average_heart_rate: z
    .number({ error: 'Enter a heart rate' })
    .positive('Heart rate must be greater than 0')
    .optional(),
  exercises: z
    .array(
      z.object({
        name: z
          .string()
          .trim()
          .min(1, { message: 'Enter an exercise name' })
          .max(100, {
            message: 'Exercise name must be less than 100 characters',
          }),
        schemes: z
          .array(
            z
              .object({
                sets: z.int().positive('Sets must be greater than 0'),
                reps: z.int().positive('Reps must be greater than 0'),
                bodyweight: z.boolean().optional(),
                weight: z
                  .number()
                  .positive('Weight must be greater than 0')
                  .refine((n) => Math.round(n * 10) / 10 === n, {
                    message: 'Use at most one decimal place',
                  })
                  .nullable()
                  .optional(),
                weight_unit: z.enum(['kg', 'lbs']).nullable().optional(),
                id: z.string().optional(),
              })
              .refine(
                (data) =>
                  data.bodyweight ? data.weight == null : data.weight != null,
                {
                  message:
                    'Weight must be specified or bodyweight must be toggled',
                  path: ['weight'],
                },
              ),
          )
          .min(1, { message: 'Add at least one set, rep, and weight scheme' }),
      }),
    )
    .min(1, { message: 'Add at least one exercise' }),
});

export const logTrainingSessionFormSchema = z.discriminatedUnion('type', [
  runningSchema,
  crossTrainingSchema,
  strengthTrainingSchema,
]);

export type LogTrainingSessionFormValues = z.infer<
  typeof logTrainingSessionFormSchema
>;

export type StrengthFormValues = Extract<
  LogTrainingSessionFormValues,
  { type: 'strength_training' }
>;
