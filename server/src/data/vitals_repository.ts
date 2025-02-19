import { User } from "./user_models";
import { DailyVitals } from "./vitals_models";

export interface DailyVitalsRepository {

  getDailyVitals(user: User): Promise<DailyVitals[]>;

  storeDailyVitals(vitals: DailyVitals): Promise<DailyVitals>;
}