import UserService from "../services/user.service.js";
import customMessage from "../utils/customMessage.js";
import helper from "../utils/helpers.js";
import responses from "../utils/responses.js";
import statusCode from "../utils/statusCode.js";
import email from "../utils/email.js";

const { createUser } = UserService;
const { hashPassword } = helper;
const { signedup } = customMessage;
const { created, ok } = statusCode;
const { successResponse } = responses;
const { sendConfirmationEmail } = email;
/**
 * @description this controller deals with user services
 */
export default class UserControllers {
/**
   * @description this controller saves/signup a user in database
   * @param {object} req request
   * @param {object} res response
   * @return {object} returns json object with signup message
   */
  static async signup(req, res) {
    const formData = req.body;
    const textPassword = formData.password;
    formData.password = hashPassword(textPassword);
    const user = await createUser(formData);
    await sendConfirmationEmail(user);
    return successResponse(res, created, undefined, signedup, user);
  }
}
