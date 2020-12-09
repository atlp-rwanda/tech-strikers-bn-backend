'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>  queryInterface.bulkInsert(
    "Accommodations",
    [
      {
        user_id:1,
        name: "serena",
        address:"kigali",
        amenities:['wifi','wifi'],
        services:['sauna','massage'],
        description:"hjk",
        image:['nsnss.png','mmaa.png'],
        status:'Approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id:2,
        name:"OO",
        address:"musanze",
        amenities:['wifi','wifi'],
        services:['sauna','massage'],
        description:"hjk",
        image:['nsnss.png','mmaa.png'],
        status:'Approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete("Accommodations", null, {}),
};
  

