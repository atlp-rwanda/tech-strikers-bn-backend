import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(403);
  }
  const token = authHeader.split(" ")[1];

  const user = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
  if (!user) {
    return res.sendStatus(401);
  }

  req.user = user;
  // eslint-disable-next-line no-sequences
  return next(), res.sendStatus(202);
};
export default verifyToken;
