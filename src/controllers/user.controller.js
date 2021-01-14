import UserService from "../services/user.service.js";
import customMessage from "../utils/customMessage.js";
import helper from "../utils/helpers.js";
import responses from "../utils/responses.js";
import statusCode from "../utils/statusCode.js";
import email from "../utils/email.js";
import {jwtToken} from "../utils/token.utils.js"
import cloudinary from "../utils/cloudinary"

const { createUser, retrieveUserById, upDateUserInfo,getUserByIdOrEmail,updateUser } = UserService;
const { hashPassword, base64FileStringGenerator } = helper;
const { signedup,accountVerified,emailAssociate,thisAccountVerified,userVerification,resend } = customMessage;
const { created,ok,badRequest } = statusCode;
const { successResponse,errorResponse } = responses;
const { sendConfirmationEmail } = email;
const { uploadProfilePic } = cloudinary;

/**
 * @description this controller deals with user services
 */
export default class UserControllers {
/**
   * @description this controller saves/signup a user in database
   * @param {object} req request
   * @param {object} res response
   * * @param {object} next jump to error
   * @return {object} return json object with signup message
   */
  static async signup(req, res,next) {

    try{
      const formData = req.body;
      const textPassword = formData.password;
      formData.password = hashPassword(textPassword);
      formData.role = "user";
      const user = await createUser(formData);
      const token = jwtToken.createToken(user);
      await sendConfirmationEmail(user,token);
      return successResponse(res, created, token, res.__(signedup), user);
    }
  
    catch(e){
      return next(new Error(e))
    }
  }

  /**
   * @description this controller saves/signup a user in database
   * @param {object} req request
   * @param {object} res response
   * @param {object} next jump to error
   * @return {object} return json object with signup message
   */
  static async confirmation(req,res,next){

    try{
      const {token}=req.params
      const decoded = jwtToken.verifyToken(token);
      const user=await getUserByIdOrEmail(decoded.email)
      if(user.dataValues.isVerified) 
      return errorResponse(res,badRequest,res.__(userVerification))
      const userUpdated=await updateUser(decoded)
      const { id,email,} = userUpdated[1];
      return successResponse(res,ok,undefined,res.__(accountVerified))
    
    }
    catch(e){
      return next(new Error(e))
    }
  

  }

 
    /**
   * @description this controller saves/signup a user in database
   * @param {object} req request
   * @param {object} res response
   * @param {object} next jump to error
   * @return {object} return json object with signup message
   */
  static async resend(req,res,next){
    try{
      const{email}=req.body
      const user= await getUserByIdOrEmail(email)
      if(!user) return errorResponse(res,badRequest,res.__(emailAssociate))
      if(user.isVerified) return errorResponse(res,badRequest,res.__(thisAccountVerified))
      const token = jwtToken.createToken(user)
      await sendConfirmationEmail(user,token);
      return successResponse(res,ok, token,res.__(resend),user);

    }
    catch(e){
      return next(new Error(e))
    }

  }

  static async getUserInfo(req, res) {
    const userInfo = await retrieveUserById(req.user.id)
    if ( userInfo != null) {
        res.status(200).json({"Requested user" : userInfo})
    } else {
        res.status(404).json({"message": res.__("User Not Found")})
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
       res.status(200).send({"message" : res.__("Updated Successfully")})
   } else if (dbResponse == false) {
       res.status(400).send({"message" : res.__("Update Failed")})
   } else if (dbResponse === "Username has been taken") {
       res.status(400).send({"message" : res.__("Username in use")})
   }
  }

}
