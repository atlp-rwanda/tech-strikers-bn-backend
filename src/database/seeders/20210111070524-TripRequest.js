'use strict';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert("TripRequests", [{
    userId: 1,
    departureDate: "2020-10-29",
    returnDate: "2021-10-29",
    tripType: "return trip",
    reason: "life is short, just chill",
    status: "Pending"
  },
  {
    userId: 2,
    departureDate: "2020-10-29",
    returnDate: "2021-10-29",
    tripType: "return trip",
    reason: "life is short, just chill",
    status: "Pending"
  }], {}),

  down: queryInterface => queryInterface.bulkDelete("TripRequests", null, {})
};