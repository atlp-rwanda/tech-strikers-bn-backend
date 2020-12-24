import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const jwtToken={
    createToken({id,email}){
        return jwt.sign(
            {userId:id,email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"24h"}
        )
    },
    verifyToken(token){
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"24h"});
        return decoded;
    }
};
