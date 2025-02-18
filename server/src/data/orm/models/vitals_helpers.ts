import { DataTypes, Sequelize } from "sequelize";
import { UserModel, DailyVitalsModel } from "./vitals_models";

const primaryKey = {
  id: { type: DataTypes.UUIDV4, primaryKey: true }
}

export const initializeCatalogModels = (sequelize: Sequelize) => {

  UserModel.init({
    ...primaryKey,
    name: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING }
  }, { sequelize });

  DailyVitalsModel.init({
    date: { type: DataTypes.DATEONLY },
    sleepHr: { type: DataTypes.INTEGER },
    sleepMin: { type: DataTypes.INTEGER },
    restingHeartRate: { type: DataTypes.INTEGER },
    hrv: { type: DataTypes.INTEGER },
    weight: { type: DataTypes.DECIMAL(10, 1) },
    bodyFat: { type: DataTypes.DECIMAL(10, 1) }
  }, { sequelize });
}

DailyVitalsModel.belongsTo(UserModel, {
  foreignKey: "userId", as: "user"
});

UserModel.hasMany(DailyVitalsModel);
