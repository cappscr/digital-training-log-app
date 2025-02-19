import { Model, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";
import { UserModel } from "./user_models";

export class DailyVitalsModel extends Model<InferAttributes<DailyVitalsModel>, InferCreationAttributes<DailyVitalsModel>> {

  declare userId: ForeignKey<UserModel["id"]>;

  declare user?: InferAttributes<UserModel>;

  declare date: Date;
  declare sleepHr?: number;
  declare sleepMin?: number;
  declare restingHeartRate?: number;
  declare hrv?: number;
  declare weight?: number;
  declare bodyFat?: number;
}