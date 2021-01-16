'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accommodation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accommodationType: {
        type: Sequelize.STRING
      },
      accommodationName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      photoUrl: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      facilities: {
       type: Sequelize.STRING
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
    await queryInterface.dropTable('Accommodation');
  }
};