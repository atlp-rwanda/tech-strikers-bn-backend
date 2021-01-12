'use strict';
module.exports = {
  up: queryInterface => queryInterface.bulkInsert("Trips", [{
    originId: 1,
    destinationId: 2,
    tripRequestId: 1,
    accommodationId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    originId: 1,
    destinationId: 2,
    tripRequestId: 2,
    accommodationId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete("Trips", null, {})
};