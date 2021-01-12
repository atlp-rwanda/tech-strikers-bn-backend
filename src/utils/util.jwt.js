import jwt from "jsonwebtoken";

const generateToken = (user) => {
  if (!user || Object.entries(user).length == 0 || !process.env.ACCESS_TOKEN_SECRET) {
    return { message: "Something went wrong!" };
  }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1d"});
  return { token: accessToken };
};

const decodeToken = (token) => {
let decoded;
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, ( err, user) => {
      decoded = user
    })
    return decoded
}

export default { generateToken, decodeToken };
