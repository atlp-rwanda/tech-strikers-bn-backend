import models from "./models/index";
const { userRoles } = models;
import RoleInfo from "../services/role.service"; 
const { findRoleByName } = RoleInfo;
const createAdminRole = async () =>{
    
    const role = {
        name: "SUPER_ADMIN",
        description: "This is the super Admin or IT stuff responsible for assigning roles to other users",
        createdAt : new Date(),
        updatedAt: new Date()
    }

    const superAdminRoleExist = await findRoleByName(role.name);
    if(superAdminRoleExist){
        console.log("'......SUPER_ADMIN Role can't be created twice......'")
        return;
    }
    await userRoles.create(role);
    console.log("Super Admin role has been created")
}


createAdminRole();
