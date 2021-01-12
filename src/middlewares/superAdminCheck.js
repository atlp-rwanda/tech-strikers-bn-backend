import RoleService from "../services/role.service";

    class RoleCheckMiddleware {
       static async isSuperAdmin(req, res, next){
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
    
    }
    
    export default RoleCheckMiddleware;
    