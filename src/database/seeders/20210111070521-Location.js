module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
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
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete("Locations", null, {})
};