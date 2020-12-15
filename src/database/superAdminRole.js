import models from "./models/index";

const { userRoles } = models;
const createAdminRole = async () => {
  const role = {
    name: "SUPER_ADMIN",
    description: "This is the super Admin or IT stuff responsible for assigning roles to other users",
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await userRoles.create(role);
  console.log("Super Admin role has been created");
};

createAdminRole();
