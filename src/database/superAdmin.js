import { config } from "dotenv";
import helpers from "../utils/helpers";
import roleService from "../services/role.service";
import models from "./models/index";
import UsersInfo from "../services/user.service"; 
const { Users } = models;
const { hashPassword } = helpers;
config();

const { getUserByIdOrEmail } = UsersInfo

const createAdminUser = async () => {
  const roleName = "SUPER_ADMIN";
  const role = await roleService.findRoleByName(roleName);
  if (!role) {
    console.log(`FATAL: create ${roleName} role first of all.[In your terminal, run:  'npm run role:create ']`);
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
    const superAdminExist = await getUserByIdOrEmail(superAdmin.email);
    if(superAdminExist) {
        console.log("Super Admin can't be created twice. he's already there!!!!!!")
        return;
    }

  await Users.create(superAdmin);
  console.log("super admin has been created");
};

createAdminUser();
