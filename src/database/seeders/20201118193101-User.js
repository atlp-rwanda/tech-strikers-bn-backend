const {hashPassword}=require("../../utils/hash");

module.exports = {
  up: async queryInterface=> queryInterface.bulkInsert(
    "Users",
    [
      {
        fullname: "tytyne dusa",
        email:"dusaflora2@gmail.com",
        username:"tytyne",
        isVerified:false,
        password: await hashPassword("tytyne12345"),
        roleId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "fofo dudu",
        email: "fofo3@example.com",
        username:"fofo",
        isVerified:true,
        password: await hashPassword("fofo12345"),
        roleId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
   
    ],
    {},
  ),

  down:queryInterface => queryInterface.bulkDelete("Users", null, {}),
};

