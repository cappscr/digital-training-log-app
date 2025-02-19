import { DailyVitalsRepository } from "./vitals_repository";
import { DailyVitalsRepoImpl } from "./orm";

export const dailyVitalsRepository: DailyVitalsRepository = new DailyVitalsRepoImpl();