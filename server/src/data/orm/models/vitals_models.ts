import { UUID } from "crypto";
import { Model, CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";

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

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {

  declare id?: CreationOptional<UUID>;

  declare username: string;
  declare name: string;

  declare dailyVitals?: InferAttributes<DailyVitalsModel>[];
}