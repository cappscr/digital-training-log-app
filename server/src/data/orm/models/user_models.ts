import { UUID } from "crypto";
import { Model, CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";
import { DailyVitalsModel } from "./vitals_models";

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {

  declare id?: UUID;

  declare username: string;
  declare name: string;

  declare dailyVitals?: InferAttributes<DailyVitalsModel>[];
}