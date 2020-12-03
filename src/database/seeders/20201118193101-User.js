module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    "Users",
    [
      {
        fullname: "tytyne",
        email: "tytyne@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "fofo",
        email: "fofo@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Users", null, {}),
};
