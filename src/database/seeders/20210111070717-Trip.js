'use strict';
module.exports = {
  up: queryInterface => queryInterface.bulkInsert("Trips", [{
    originId: 1,
    destination_id: 2,
    tripRequest_id: 1,
    accommodation_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    originId: 1,
    destination_id: 2,
    tripRequest_id: 2,
    accommodation_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete("Trips", null, {})
};