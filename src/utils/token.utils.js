import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const jwtToken={
    generateToken({id,email}){
        return jwt.sign(
            {userId:id,email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"24h"}
        )
    },
    verifyToken(token){
        // const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"24h"});
        // return decoded;
        let decoded;
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, ( err, user) => {
          decoded = user
        })
        return decoded

    }
};



