'use strict';

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    "Locations",
    [
      {
        townName: "Nairobi",
        country: "Kenya",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        townName: "Bujumbura",
        country: "Burundi",
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        townName: "Kigali",
        country: "Rwanda",
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        townName: "Dar es Salaam",
        country: "Tanzania",
        createdAt: new Date(),
        updatedAt: new Date()

      }
    ]
  ),
  down: async (queryInterface) => queryInterface.bulkDelete("Locations", null, {})
};
