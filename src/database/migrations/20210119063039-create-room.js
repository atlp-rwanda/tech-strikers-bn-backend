'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      accommodationId: {
        type: Sequelize.INTEGER
      },
      roomType: {
        type: Sequelize.STRING
      },
      roomNumber: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.STRING
      },
      facilities: {
        type: Sequelize.STRING
      },
      isRoomBooked: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  }
};
