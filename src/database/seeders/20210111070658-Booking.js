'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    "Bookings",
    [
      {
        checkin: '2021-01-01',
        checkout: '2021-1-04',
        accommodationId: 1,
        roomId: 1,
        tripId: 1,
        userId: 1,
        status:"approved",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        checkin: '2021-01-02',
        checkout: '2021-03-02',
        accommodationId: 1,
        roomId: 2,
        tripId: 2,
        userId: 2,
        status:"pending",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),
  
  

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete("Bookings", null, {}),
};