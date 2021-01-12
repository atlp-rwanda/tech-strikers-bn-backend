import { config } from "dotenv";
import helpers from "../utils/helpers";
import roleService from "../services/role.service";
import models from "./models/index";

config();
const { Users } = models;
const { hashPassword } = helpers;

 const createAdminUser = async() => {
    const roleName = "SUPER_ADMIN"
    
    const role = await roleService.findRoleByName(roleName);
    if(!role){
        console.log(`FATAL: create ${roleName} role first of all.[In your terminal, run:  'npm run role:create ']`)
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
    