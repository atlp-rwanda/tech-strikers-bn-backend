module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "TripRequests",
      [
        {
          tripType: "Return trip",
          departureDate: "2020-12-23",
          returnDate: "2020-12-31",
          reason: "Vacation",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("TripRequests", null, {});
  },
};
