import jwt from "jsonwebtoken";
import RoleService from "../services/role.service";

    class RoleCheckMiddleware {
       static async isSuperAdmin(req, res, next){
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(403). json({
              message: res.__("Please login")
            });;
        }
        const token = authHeader.split(" ")[1];
        const user = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "12h"});
        if (!user) {
          return res.status(401). json({message: res.__("Unauthorized")});
        }
        req.user = user;
        // eslint-disable-next-line no-sequences
         const { roleId }  = req.user;
         if(roleId === null){
          return res.status(400)
          .json({message: res.__(" You are not  Super Admin in order to perform this action")})
      }
    
      const role = await RoleService.findRoleById(roleId);
      if(role.name === "SUPER_ADMIN") return next();
      return res.status(400)
      .json({message: res.__("You are not Super Admin to perform this action")})
       }

       static async isTravelAdministator (req, res, next){
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(403). json({
              message: res.__("Please login")
            });;
        }
        const token = authHeader.split(" ")[1];
        const user = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "12h"});
        if (!user) {
          return res.status(401). json({message: res.__("Unauthorized")});
        }
        req.user = user;
        // eslint-disable-next-line no-sequences
         const { roleId }  = req.user;
         if(roleId === null){
          return res.status(400)
          .json({message: res.__(" You are not  Travel administrator to manipulate accommodations")})
      }
    
      const role = await RoleService.findRoleById(roleId);
      if(role.name === "Travel Administrator") return next();
      return res.status(400)
      .json({message: res.__("You are not Travel administrator")})
       }
    
    }
    
  

export default RoleCheckMiddleware;
