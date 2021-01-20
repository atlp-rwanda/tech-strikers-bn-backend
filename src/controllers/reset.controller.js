
import UserService from "../services/user.service.js";
import{jwtToken} from "../utils/util.jwt"
import customMessage from "../utils/customMessage.js";
import helper from "../utils/helpers.js";
import responses from "../utils/responses.js";
import statusCode from "../utils/statusCode.js";
import email from "../utils/email.js";

const {getUserByIdOrEmail,updatePassword} = UserService;
const { hashPassword } = helper;
const {noEmailAssociate,passwordReset,passwordMatch,passwordUpdated} = customMessage;
const {ok,notFound,badRequest} = statusCode;
const { successResponse,errorResponse} = responses;
const { sendResetEmail } = email;



/**
 * @class resetController
 * @classdesc deals with forget and reset password
 */


class resetController{
    /**
     * @description send reset link 
     * @param {object} req  request
     * @param {object} res response
     * @param {object} next for jumping to error
     * @return error json object with notFound message
     * @return return json object with passwordReset message
     */

    static async forgetPassword(req,res,next){
        try{

            const{email}=req.body
            const user= await getUserByIdOrEmail(email)
            if(!user) return errorResponse(res,notFound,noEmailAssociate);
            const token = jwtToken.generateToken(user)
            await sendResetEmail(user,token)
            return successResponse(res,ok,token,res.__(passwordReset),user);
        }
        catch(e){
            return next(new Error(e))
        }

    }
        /**
         * @description reset password
         * @param {object} req request 
         * @param {*} res  response
         * @param {*} next checking error
         * @return passwordMatch error
         * 
         */
    static async resetPassword(req,res,next){

        try{
            const {password,confirmPassword} = req.body;
              if (password !== confirmPassword) return errorResponse(res,badRequest,res.__(passwordMatch));
            const { token } = req.params;
            const decoded = jwtToken.verifyToken(token);
            const hash = hashPassword(password);
            const updatedUser= await updatePassword(hash,decoded)
            const { id, name, email } = updatedUser[1];
            console.log(updatedUser)
            return successResponse(res,ok,undefined,res.__(passwordUpdated),updatedUser[1]);
        }
        catch(e){
            return next(new Error(e))
        }

        }
}

export default resetController