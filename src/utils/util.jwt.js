import jwt from "jsonwebtoken";

const generateToken = (user) => {
  if (!user || !process.env.ACCESS_TOKEN_SECRET) {
    return { message: "Something went wrong!" };
  }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"24h"});
  return { token: accessToken };
};

const decodeToken = (token) => {
  const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
  return decoded;
}

export default { generateToken, decodeToken };
