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
    return Users.create(user);
  }
}
