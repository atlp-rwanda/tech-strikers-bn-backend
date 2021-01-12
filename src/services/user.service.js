/* eslint-disable operator-linebreak */
/* eslint-disable eqeqeq */
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
   * @return {object} return the created user
   */
  static async getUserByIdOrEmail(value) {
    let user;
    if (typeof value === "string") {
      user = await Users.findOne({ where: { email: value } });
      return user;
    }
    return await Users.findOne({ where: { id: value } });
  }

  /**
   * @description this service create a new user in the db
   * @param {object} userid
   * @return {object} return the created user
   */
  static async retrieveUserById(userid) {
    const data = await Users.findOne({
      where: { id: userid },
      attributes: { exclude: "password" },
    });
    return data;
  }

  /**
   * @description this service create a new user in the db
   * @param {object} updates
   * @param {object} id
   * @return {object} return the created user
   */
  static async upDateUserInfo(updates, id) {
    let userNameCheck, colsAffected;
    if (updates.username) {
      userNameCheck = await Users.findAll({
        where: { username: updates.username },
      });
    }

    if (
      userNameCheck == undefined ||
      userNameCheck.length == 0 ||
      (userNameCheck.length == 1 && userNameCheck[0].id == id)
    ) {
      colsAffected = await Users.update(updates, {
        where: { id },
        attributes: { exclude: "email" },
      });
      if (colsAffected[0] != 0) {
        return true;
      }
      return false;
    }
    return "Username has been taken";
  }

  /**
   * @description this service find user by Email
   * @param {object} email
   * @return {object} return current user
   */

   static async findUserByEmail(email){
     const currentUser = await Users.findOne({where:{email}});
return currentUser;
   }

   /**
    * @description this sercice updateUserByRole
    * @param {object} roleId
    * @return {object} updatedUser by role
    */

    static async updateUserByRole(roleId, email){
    const updatedUser = await Users.update({roleId}, {where: {email}});
    if(updatedUser) return updatedUser;
    }
}
