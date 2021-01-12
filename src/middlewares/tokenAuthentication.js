import tokenUtil from "../utils/util.jwt"

const { decodeToken } = tokenUtil;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(403);
  }
  const token = authHeader.split(" ")[1];
  if (!token) { return res.sendStatus(401) }
  
  const user = decodeToken(token) 
  if (!user) {
    return res.sendStatus(401);
  }
    req.user = user;
    // eslint-disable-next-line no-sequences
    return next();

};
export default verifyToken;
