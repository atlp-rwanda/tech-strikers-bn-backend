import UserService from "../services/user.service";
import { jwtToken } from "../utils/util.jwt";
import helpers from "../utils/helpers.js";

const { decryptPassword } = helpers;
const { getUserByIdOrEmail } = UserService;
/**
 * @description
 */
export default class loginController {
  /**
 * @description
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @return {object}
 */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await getUserByIdOrEmail(email);
      if (!user) {
        return res.status(400).json({ error: res.__("Email not found") });
      }
      if (user.dataValues.isVerified === false) {
        return res
          .status(400)
          .json({ error: res.__("Your account has not been verified") });
      }
      const decodePassword = await decryptPassword(password, user.password);
      const token = jwtToken.generateToken(user);
      if (!decodePassword) {
        return res.status(400).json({
          Error: res.__("Wrong Password"),
        });
      }

      return res.status(200).json({
        message: res.__("User logged in successfully"),
        token,
      });
    } catch (err) {
      return next(new Error(err));
    }
  }
}
