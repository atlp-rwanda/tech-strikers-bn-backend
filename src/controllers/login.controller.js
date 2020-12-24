import UserService from "../services/user.service";
import { jwtToken } from "../utils/index"

import helpers from "../utils/helpers.js";
const { decryptPassword } = helpers;
const { getUserByIdOrEmail } = UserService;
export default class loginController{
  static async login(req, res, next){
       try{
        const { email, password } = req.body;
        const user = await getUserByIdOrEmail(email);
        if(!user){
          return res.status(400).json({error: res.__("Email not found")}); 
          }
       if(user.isVerified === false){
          return res.status(400).json({ error: res.__("Your account has not been verified")});
        }
        const decodePassword = await decryptPassword(password,user.password);
        const token  = jwtToken.createToken(user);
        console.log(token);
        if(!decodePassword) return res.status(400)
        .json({ 
          Error: res.__("Wrong Password")
        });

        return res.status(200).json({ 
          message: res.__("successfully logged in"), token
        });
        
      }catch(err){
         return next(new Error(err));
        }

        
     }
}
