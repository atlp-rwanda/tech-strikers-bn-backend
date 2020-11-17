
import UserService from "../services/user.service.js";
import customMessage from "../utils/customMessage.js";
import helper from "../utils/helpers.js";
import responses from "../utils/responses.js";
import statusCode from "../utils/statusCode.js";
import email from "../utils/email.js";
import tokenUtil from "../utils/util.jwt";
import cloudinary from "../utils/cloudinary"


const { createUser,retrieveUserById, upDateUserInfo} = UserService;
const { hashPassword } = helper;
const { signedup } = customMessage;
const { created } = statusCode;
const { successResponse } = responses;
const { sendConfirmationEmail } = email;
const { uploadProfilePic } = cloudinary;
const { generateToken } = tokenUtil;
/**
 * @description this controller deals with user services
 */
export default class UserControllers {
/**
   * @description this controller saves/signup a user in database
   * @param {object} req request
   * @param {object} res response
   * @return {object} return json object with signup message
   */
  static async signup(req, res) {
    const formData = req.body;
    const textPassword = formData.password;
    formData.password = hashPassword(textPassword);
    formData.role = "user";
    const user = await createUser(formData);
    const { token } = generateToken(user);
    await sendConfirmationEmail(user);
    return successResponse(res, created, token, signedup, user);
  }

  static async getUserInfo(req, res) {
    const userInfo = await retrieveUserById(req.user.id)
    if ( userInfo != null) {
        res.status(200).json({"requested user" : userInfo})
    } else {
        res.status(404).json({"message": res.__("userNotFound")})
    }      
  }

  static async upDateUser(req, res) {
    const newProfileInfo = JSON.parse(JSON.stringify(req.body)) 
    if (req.file) {
        const userNewImg = await uploadProfilePic(base64FileStringGenerator(req).content, "profile_pics")
  
        newProfileInfo.profilePicture = userNewImg.url
    }
    if (req.body.password) {
        newProfileInfo.password = hashPassword(req.body.password)       
    }
    if (req.body.email) {
        delete newProfileInfo.email
    }
   const dbResponse = await upDateUserInfo(newProfileInfo, req.user.id)
   if (dbResponse == true) {
       res.status(200).send({"message" : res.__("updatedSuccessfully")})
   } else if (dbResponse == false) {
       res.status(400).send({"message" : res.__("updateFailed")})
   } else if (dbResponse === "Username has been taken") {
       res.status(400).send({"message" : res.__("userNameTaken")})
   }
  }
}
