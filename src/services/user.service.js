import models from "../database/models/index.js";
import "regenerator-runtime/runtime";

const { Users } = models;
/**
 * @description This service deals with the User model
 */
export default class UserServices {
/**
   * @description this service create a new user in the db
   * @param {object} user
   * @return {object} return the created user
   */
  static async createUser(user) {
    const User = await Users.create(user);
    const { password, ...result } = User.dataValues;
    return result;
  }

  /**
   * @description this service create a new user in the db
   * @param {object} value
   * @return {object} return object if found
   */
  static async getUserByIdOrEmail(value) {
    let user;
    if (typeof value === "string") {
      user = await Users.findOne({ where: { email: value } });
      return user;
    }
    return await Users.findOne({ where: { id: value } });
  }
}
