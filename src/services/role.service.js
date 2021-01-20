import models from "../database/models/index";
const { userRoles} = models;
class RoleService {
    static async findRoleByName(userRole){
        const role = await userRoles.findOne({ where: {name: userRole}});
        if(role) return role;
    }

    static async findRoleById(roleId){
        const roleExist = await userRoles.findOne({where: {id: roleId}});
        if (roleExist) return roleExist;
    }
}

export default RoleService;
