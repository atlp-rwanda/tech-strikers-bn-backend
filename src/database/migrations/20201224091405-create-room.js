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

      accommodationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Accommodations',
          key: 'id',
          as: 'accommodationId',
        },
      },
      booked: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      roomNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      totalBedroom: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      amenities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      image: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
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