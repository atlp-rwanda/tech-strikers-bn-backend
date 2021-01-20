'use strict';

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    "Locations",
    [
      {
        city: "Nairobi",
        country: "Kenya",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Bujumbura",
        country: "Burundi",
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        city: "Kigali",
        country: "Rwanda",
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        city: "Dar es Salaam",
        country: "Tanzania",
        createdAt: new Date(),
        updatedAt: new Date()

      }
    ]
  ),
  down: async (queryInterface) => queryInterface.bulkDelete("Locations", null, {})
};
