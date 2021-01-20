import models from "../database/models/index";
import  statusCode from "../utils/statusCode";
import RoleService from "../services/role.service";
import UserService from "../services/user.service";
const {ok,
    created,
    badRequest,
    unAuthorized,
    forbidden,
    notFound,
    conflict,
    serverError
} = statusCode;

const { userRoles } = models;

class UserRoleController{
  static async assign(req, res){
  const { email, userRole } = req.body;
  //const user=await getUserByIdOrEmail(decoded.email)
   //if(user.dataValues.isVerified) 

  const role = await RoleService.findRoleByName(userRole);
  if(!role) return res.status(notFound)
  .json({
    message: res.__("The role doesn't exist in the system")
  });

  const userExist = await UserService.findUserByEmail(email);
  if(!userExist) return res.status(notFound)
    .json({
      message: res.__("User with that email does not exist in the system")
    });
  const roleId = role.id;
  const updateRole = await UserService.updateUserByRole (roleId, email);
  if(updateRole) return res.status (ok)
    .json({message: res.__("role is successifully assigned")
    });
  }

static async createRole(req, res){
    const { name } = req.body;
  const roleName = await RoleService.findRoleByName(name);
  if(roleName) return res.status(badRequest)
    .json({
      message: res.__("That role already exist in the system")
    });

  const createRole = await userRoles.create({
     name: req.body.name,
     description: req.body.description,
     createdAt: new Date(),
     updatedAt: new Date()
  });
  if(createRole) return res.status(created)
    .json({
      message: res.__("Role is created in the system")
    });
  return res.status(serverError).json({ msg: 'Server error' });

}

static async getRoles (req, res){
  const roles = await userRoles.findAll({attribute: ["id", "name", "description"]});
  if(!roles) return res.status(notFound)
    .json({
      message: res.__("No roles available in the system")
    });
  if(roles) return res.status(ok)
    .json({
      message: res.__("roles are fetched successfully"), roles
    });
}

static async updateRole(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
  const roleToUpdate = await RoleService.findRoleById(id);
  if(!roleToUpdate) return res.status(notFound)
  .json({
    message: res.__("the role with that Id does not exist")
  });
  if(roleToUpdate.name === "SUPER_ADMIN") {
  return res.status(forbidden)
  .json({
    message: res.__("SUPER_ADMIN role cannot be updated")
  });
  }
  if(roleToUpdate) {
    await roleToUpdate.update({
      name: req.body.name,
      description: req.body.description
    });

  }
  
    return res.status(ok).json({
      message: res.__("The is role updated successfully")
    });
  }

  static async getRole(req, res) {
    const { id } = req.params;
  const roleToFetch = await RoleService.findRoleById(id);
  if(!roleToFetch) return res.status(notFound)
  .json({
    message: res.__("the role with that Id does not exist")
  });
  if(roleToFetch) {
    return res.status(ok)
    .json({
      message: res.__("role was fetched successfully"), roleToFetch
    });
  }
  
  }

  static async deleteRole(req, res) {
    const { id } = req.params;
   const role = await RoleService.findRoleById(id)
   if(role.name === "SUPER_ADMIN" ){
    return res.status(forbidden).json({
      message: res.__("SUPER_ADMIN role cannot be deleted")
    })
   }
   await userRoles.destroy({ where: { id } });
   return res.status(ok).json({
     message: res.__("role deleted successfully")
   });
    
  }
}

export default UserRoleController;
