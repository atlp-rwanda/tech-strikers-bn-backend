'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    "Rooms",
    [
      {
        accommodationId:1,
        booked:true,
        roomNumber:34,
        cost:300,
        totalBedroom:2,
        type:'standard',
        amenities:['wifi','rty'],
        image:['nsnss.png','mmaa.png'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accommodationId:2,
        booked:false,
        roomNumber:20,
        cost:300,
        totalBedroom:1,
        type:'vip',
        amenities:['wifi','erty'],
        image:['nsnss.png','mmaa.png'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accommodationId:1,
        booked:false,
        roomNumber:44,
        cost:300,
        totalBedroom:1,
        type:'vip',
        amenities:['wifi','erty'],
        image:['nsnss.png','mmaa.png'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete("Rooms", null, {}),

};
