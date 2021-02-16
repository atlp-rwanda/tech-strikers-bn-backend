import RoleService from "../services/role.service";
import jwt from "jsonwebtoken";

    class ManagerCheckMiddleware {
       static async isManager(req, res, next){
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
          .json({message: res.__(" You are not  Manager in order to perform this action")})
      }
    
      const role = await RoleService.findRoleById(roleId);
      if(role.name === "manager") return next();
      return res.status(400)
      .json({message: res.__("You are not Manager to perform this action")})
       }
    
    }
    
export default ManagerCheckMiddleware ;
   