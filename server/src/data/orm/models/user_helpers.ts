import { DataTypes, Sequelize } from "sequelize";
import { DailyVitalsModel } from "./vitals_models";
import { UserModel } from "./user_models";

const primaryKey = {
  id: { type: DataTypes.UUIDV4, primaryKey: true }
}

export const initializeUserModels = (sequelize: Sequelize) => {

  UserModel.init({
    ...primaryKey,
    name: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING }
  }, { sequelize });
}

UserModel.hasMany(DailyVitalsModel);