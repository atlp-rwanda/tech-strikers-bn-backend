module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    "Users",
    [
      {
        fullname: "kamos",
        username: "kamo12",
        role: "Admin",
        email: "kamo@b@gmail.com",
        password: "$2a$10$x4aUAmOglnLuUCFSsc6KzuQzxg94xEjK0PKPMsF1h4mKRER8QV1ca",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Evelyn",
        username: "Evalo",
        role: "user",
        email: "evalop@b@gmail.com",
        password: "$2a$10$rFWwsdYhtGcXC2EzcgjFwONVlWNLjpDwACa1H/cC5dFEygbNSYSZ.",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Users", null, {}),
};
