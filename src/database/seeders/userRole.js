module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    "userRoles",
    [
      {
        name: "manager",
        description: "This is the one to organize trips",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "trip advisor",
        description: "this is the one to advise employees",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("userRoles", null, {}),
};
