import jwt from "jwt-simple";

const generateToken = (user) => {
  const accessToken = jwt.encode(user, process.env.ACCESS_TOKEN_SECRET);

  if (!accessToken) {
    return { message: "Something went wrong!" };
  }
  return { token: accessToken };
};
export default generateToken;
