const isVerified = (req, res, next) => {
  if (!req.user.isVerified) { return res.status(403).send("Access denied"); }

  next();
};

export default isVerified;
