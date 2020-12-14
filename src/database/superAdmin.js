import { config } from "dotenv";
import helpers from "../utils/helpers";
import roleService from "../services/role.service";
import models from "./models/index";
const { Users } = models;

config();
const { hashPassword } = helpers;

 const createAdminUser = async() => {
    const roleName = "SUPER_ADMIN"
    
    const role = await roleService.findRoleByName(roleName);
    if(!role){
        console.log(`create ${roleName} first`);
        return;

    }

    const hashedPassword = await hashPassword(process.env.SUPER_ADMIN_PASSWORD);
    const superAdmin = {
        fullname: "super Admin",
        username: "superAdmin00",
        email: "admin@gmail.com",
        password: hashedPassword,
        isVerified: true,
        roleId: role.id,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    await Users.create(superAdmin);
    console.log("super admin has been created")

    }

    createAdminUser();
    