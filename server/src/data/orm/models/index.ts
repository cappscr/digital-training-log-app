import { Sequelize } from "sequelize";
import { initializeVitalsModels } from "./vitals_helpers";
import { initializeUserModels } from "./user_helpers";

export { DailyVitalsModel } from "./vitals_models";
export { UserModel } from "./user_models";

export const initializeModels = (sequelize: Sequelize) => {
  initializeUserModels(sequelize);
  initializeVitalsModels(sequelize);
}