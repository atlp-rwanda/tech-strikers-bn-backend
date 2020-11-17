import jwt from "jwt-simple";

const generateToken = (user) => {
  if (!user || !process.env.ACCESS_TOKEN_SECRET) {
    return { message: "Something went wrong!" };
  }
  const accessToken = jwt.encode(user, process.env.ACCESS_TOKEN_SECRET);
  return { token: accessToken };
};
export default generateToken;
