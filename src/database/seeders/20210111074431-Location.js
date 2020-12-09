module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
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
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete("Locations", null, {})
};