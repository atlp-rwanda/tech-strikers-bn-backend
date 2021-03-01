module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert(
    "Notifications",
    [
      {
        title: "Notification: Trip Request edited",
        content: `This is to notify you that a trip request has been edited.</p> <p>You can access the updated trip request via <a href=${process.env.APP_URL}/requests/1>${process.env.APP_URL}/requests/1`,
        seen: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),

  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete("Notifications", null, {}),
};
