/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable prefer-destructuring */
/* eslint-disable require-jsdoc */
import UserService from "../services/user.service";
import tokenUtil from "../utils/util.jwt";
import helpers from "../utils/helpers.js";

const { decryptPassword } = helpers;
const { getUserByIdOrEmail } = UserService;
const { generateToken } = tokenUtil;

export default class loginController {
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
      const token = generateToken(user.dataValues).token;
      if (!decodePassword)
        return res.status(400).json({
          Error: res.__("Wrong Password"),
        });

      return res.status(200).json({
        message: res.__("successfully logged in"),
        token,
      });
    } catch (err) {
      return next(new Error(err));
    }
  }
}
