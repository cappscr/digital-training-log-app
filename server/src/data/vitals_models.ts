import { User } from "./user_models";

export interface DailyVitals {
  user: User;
  date: Date;
  sleep?: Sleep;
  restingHeartRate?: number;
  hrv?: number;
  weight?: number;
  bodyFat?: number;
}

export interface Sleep {
  hours: number;
  min: number;
}