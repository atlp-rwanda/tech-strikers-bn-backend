import jwt from "jsonwebtoken";
import { userRoles } from "../database/models";
import RoleService from "../services/role.service";

    class RoleCheckMiddleware {
       static async isSuperAdmin(req, res, next){
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(403). json({
              message: "Please login"
            });;
        }
        const token = authHeader.split(" ")[1];
      
        const user = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
        if (!user) {
          return res.status(401). json({message: "Unauthorized"});
        }
      
        req.user = user;
        console.log( req.user);
        // eslint-disable-next-line no-sequences
         const { roleId }  = req.user;
         if(roleId === null){
          return res.status(400)
          .json({message: " You are not allowed Super Admin in order to perform this action"})
      }
    
      const role = await RoleService.findRoleById(roleId);
      if(role.name === "SUPER_ADMIN") return next();
      return res.status(400)
      .json({message: "You are not to perform this action"})
       }
    
    }
    
    export default RoleCheckMiddleware;
    


