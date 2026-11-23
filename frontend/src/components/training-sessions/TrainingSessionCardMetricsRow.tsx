import type { TrainingSession } from '@/hooks/useTrainingSessions';
import {
  CloudyIcon,
  CloudFogIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudSunIcon,
  Droplet,
  HeartPulse,
  Metronome,
  Mountain,
  SunIcon,
  Thermometer,
  WindIcon,
} from 'lucide-react';

interface TrainingSessionCardMetricsRowProps {
  trainingSession: TrainingSession;
}

const CONDITIONS_ICON_MAP = [
  {
    match: 'rain',
    icon: CloudRainIcon,
  },
  {
    match: 'wind',
    icon: WindIcon,
  },
  {
    match: 'fog',
    icon: CloudFogIcon,
  },
  {
    match: 'snow',
    icon: CloudSnowIcon,
  },
  {
    exactMatch: 'partly cloudy',
    icon: CloudSunIcon,
  },
  {
    match: 'cloud',
    icon: CloudyIcon,
  },
  {
    match: 'sun',
    icon: SunIcon,
  },
];

export const TrainingSessionCardMetricsRow = ({
  trainingSession,
}: TrainingSessionCardMetricsRowProps) => {
  const showElevationGain =
    (trainingSession.sport_details_type === 'RunningTrainingSession' ||
      trainingSession.sport_details_type === 'CrossTrainingSession') &&
    trainingSession.sport_details.elevation_gain !== null;

  const ConditionsIcon = CONDITIONS_ICON_MAP.find((condition) => {
    const sessionConditions =
      trainingSession.weather_conditions?.conditions?.toLowerCase().trim() ??
      null;
    if (!sessionConditions) return null;

    if (condition.match) {
      return sessionConditions.includes(condition.match.toLowerCase());
    }
    if (condition.exactMatch) {
      return sessionConditions === condition.exactMatch.toLowerCase();
    }
  })?.icon;

  const displayTemperature =
    trainingSession.weather_conditions?.temperature != null
      ? `${String(Number(trainingSession.weather_conditions.temperature))}º${trainingSession.weather_conditions.temperature_unit?.toUpperCase()}`
      : null;

  return (
    <div className="col-span-4 flex flex-row justify-between">
      <div className="flex flex-row gap-3">
        {trainingSession.sport_details.average_heart_rate && (
          <span
            aria-label="Average heart rate"
            className="flex flex-row items-center gap-1"
          >
            <HeartPulse className="text-muted-foreground size-4" />
            {trainingSession.sport_details.average_heart_rate}
          </span>
        )}
        {showElevationGain && (
          <span
            aria-label="Elevation gain"
            className="flex flex-row items-center gap-1"
          >
            <Mountain className="text-muted-foreground size-4" />
            {trainingSession.sport_details.elevation_unit
              ? `${trainingSession.sport_details.elevation_gain} ${trainingSession.sport_details.elevation_unit}`
              : trainingSession.sport_details.elevation_gain}
          </span>
        )}
        {trainingSession.sport_details_type === 'RunningTrainingSession' &&
          trainingSession.sport_details.average_cadence && (
            <span
              aria-label="Average cadence"
              className="flex flex-row items-center gap-1"
            >
              <Metronome className="text-muted-foreground size-4" />
              {trainingSession.sport_details.average_cadence}
            </span>
          )}
      </div>
      <div className="flex flex-row gap-3">
        {trainingSession.weather_conditions?.conditions && (
          <span
            aria-label={
              trainingSession.weather_conditions.conditions ?? 'Conditions'
            }
            className="flex flex-row items-center gap-1"
          >
            {ConditionsIcon ? (
              <ConditionsIcon className="text-muted-foreground size-4" />
            ) : (
              trainingSession.weather_conditions.conditions
            )}
          </span>
        )}
        {(trainingSession.weather_conditions?.temperature ||
          trainingSession.weather_conditions?.temperature === 0) && (
          <span
            aria-label={
              displayTemperature
                ? `Temperature: ${displayTemperature}`
                : 'Temperature'
            }
            className="flex flex-row items-center gap-1"
          >
            <Thermometer className="text-muted-foreground size-4" />
            {displayTemperature}
          </span>
        )}
        {(trainingSession.weather_conditions?.humidity ||
          trainingSession.weather_conditions?.humidity === 0) && (
          <span
            aria-label={
              trainingSession.weather_conditions?.humidity != null
                ? `Humidity: ${trainingSession.weather_conditions?.humidity}%`
                : 'Humidity'
            }
            className="flex flex-row items-center gap-1"
          >
            <Droplet className="text-muted-foreground size-4" />
            {trainingSession.weather_conditions.humidity}%
          </span>
        )}
      </div>
    </div>
  );
};
