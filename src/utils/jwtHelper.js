import jwt from "jsonwebtoken";
const generateToken = (user) => 
{  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);  
    if (!accessToken) {   
         return { message: "Failed to generate token!" };  
        }  return { Token: accessToken };
    };
    export default generateToken;
    