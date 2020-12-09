'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    "Bookings",
    [
      {
        checkin: '2021-01-01',
        checkout: '2021-1-04',
        accommodation_id: 1,
        room_id: 1,
        trip_id: 1,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        checkin: '2021-01-02',
        checkout: '2021-03-02',
        accommodation_id: 1,
        room_id: 2,
        trip_id: 2,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),
  
  

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete("Bookings", null, {}),
};