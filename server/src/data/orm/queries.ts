import { Op } from "sequelize";
import { User } from "../user_models";
import { UserModel, DailyVitalsModel } from "./models";
import { BaseRepo, Constructor } from "./core";
import { UUID } from "crypto";

export function AddQueries<TBase extends Constructor<BaseRepo>>(Base: TBase) {
  return class extends Base {

    getUser(id: UUID) {
      return UserModel.findByPk(id, { raw: true });
    }

    getDailyVitals(user: User) {
      return DailyVitalsModel.findAll({
        where: {
          userId: {
            [Op.eq]: user.id
          }
        },
        include: [
          { model: UserModel, as: "user" }
        ],
        raw: true, nest: true
      });
    }
  }
}