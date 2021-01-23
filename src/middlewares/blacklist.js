import tokenlist from "../services/index";

export default class blacklist {
  static async checklisted(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearertoken = bearer[1];
      const tt = `${bearertoken}`;
      const listtoken = tokenlist.checklist(tt);
      if (listtoken == false) {
        res.status(200);
        next();
      } else {
        res.status(403).json({ message: "you loged out" });
      }
    } else {
      return res.status(401).json({message:"invalid session"})

        }
    }
  }
