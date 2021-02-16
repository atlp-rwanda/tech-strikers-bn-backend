import models from "../database/models/index";
const { Users } = models;
import { OAuth2Client } from "google-auth-library";
const fetch = require('node-fetch');
import UserService from "../services/user.service"
import { jwtToken } from "../utils/util.jwt"
const { getUserByIdOrEmail } = UserService;
import helper from "../utils/helpers.js";
const { hashPassword } = helper;
import dotenv from "dotenv";
dotenv.config();
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(googleClientID)

class SocialLogin {
    static async googleLogin (req, res){
        try {
            const { tokenId } = req.body;
       const response =  await client.verifyIdToken({idToken: tokenId, audience: googleClientID})
             const { email_verified, name, email, picture } = response.payload;
                if (email_verified) {
                    const user = await getUserByIdOrEmail(email);
                    if(user) {
                        const token = await jwtToken.generateToken(user);
                        const { id, name, email } = user;
                       return res.json({
                           success: true,
                           message: " You logged in successfully using your Google account credentials",
                            token,
                            user: {id, name, email, picture }, 
                            });
                    } 
    
                    const password = hashPassword(email);
                    const newUser =  await Users.create({
                          fullname: name,
                          email: email,
                          password: password,
                          profilePicture: picture,
                          createdAt: new Date(),
                          updatedAt: new Date(),
                        
                    })
                  if(newUser) {
                      const token = jwtToken.generateToken(newUser);
                      return res.status(200)
                      .json({
                          success: true,
                          message: " You registered and logged in successfully using your Google account credentials",
                          token
                      })
                  } else {
                      return res.status(400)
                      .json({
                          success: false,
                          message: "User didn't was not created"
                      })
                  }
                    
                  }
                
            
        } catch (error) {
            
        }
        
        
    
        }
        

    

        static async facebookLogin(req, res ){
            let user;
            const { userID, accessToken } = req.body;
            let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
         fetch(urlGraphFacebook,{ method: "GET"})
         .then(response => response.json())
         .then(response =>{
            const { email, name } = response;
              getUserByIdOrEmail(email).then(user =>{
                     if(user) {
                        const token =  jwtToken.generateToken(user);
                        const { id, fullname, email,profilePicture,roleId } = user;
                       return res.json({
                            success: true,
                            message: " You logged in successfully using Facebook credentials",
                            token,
                            user: {id, fullname, email, profilePicture, roleId,}, 
                            });
                    } 
    
                     Users.create({
                          fullname: name,
                          email: email,
                          password: accessToken,
                          createdAt: new Date(),
                          updatedAt: new Date(),
                        
                    }).then(newSecondUser => {
                        if(newSecondUser) {
                            const { id, fullname, email, profilePicture,roleId } = newSecondUser;
                             const token = jwtToken.generateToken(newSecondUser);
                             return res.status(200)
                             .json({
                                 success: true,
                                 message: " You registed and logged in successfully using Facebook account credentials",
                                 token,
                                 newSecondUser: {id, fullname, email, profilePicture,roleId }
                             })
                        }else {
                            return res.status(400)
                            .json({
                                success: false,
                                message: "User didn't was not created"
                            })
                        }
                    })

                    })
                            
             
            })

    }
        
}



export default SocialLogin;

