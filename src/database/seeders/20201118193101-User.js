const { hashPassword } = require("../../utils/hash");

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    "Users",
    [
      {
        fullname: "user one",
        email: "user1@example.com",
        username: "user1",
        password: await hashPassword("tytyne12345"),
        roleId: null,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "user two",
        email: "user2@example.com",
        username: "user2",
        password: await hashPassword("fofo12345"),
        roleId: null,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "user three",
        email: "user3@example.com",
        username: "user3",
        password: await hashPassword("password2"),
        roleId: null,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "user four",
        email: "user4@example.com",
        username: "user4",
        password: await hashPassword("password4"),
        roleId: null,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
