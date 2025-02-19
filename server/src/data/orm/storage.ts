import { User } from "../user_models";
import { DailyVitals } from "../vitals_models";
import { UserModel, DailyVitalsModel } from "./models";
import { BaseRepo, Constructor } from "./core";

export function AddStorage<TBase extends Constructor<BaseRepo>>(Base: TBase) {
  return class extends Base {

    async storeUser(u: User) {
      const [stored] = await UserModel.upsert({
        id: u.id,
        name: u.name,
        username: u.username
      });
      return stored;
    }

    async storeDailyVitals(dv: DailyVitals) {
      const [stored] = await DailyVitalsModel.upsert({
        userId: dv.user?.id,
        date: dv.date,
        sleepHr: dv.sleep?.hours,
        sleepMin: dv.sleep?.min,
        restingHeartRate: dv.restingHeartRate,
        hrv: dv.hrv,
        weight: dv.weight,
        bodyFat: dv.bodyFat
      });
      return stored;
    }
  }
}