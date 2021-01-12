'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
        },
      accommodationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Accommodations',
          key: 'id',
          as: 'accommodationId',
        }
        },

      roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Rooms',
          key: 'id',
          as: 'roomId',
        }
        },

      tripId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Trips',
          key: 'id',
          as: 'tripId',
        },
      },

      checkin: {
        type: Sequelize.DATE,
        allowNull: false
      },
      checkout: {
        type: Sequelize.DATE,
        allowNull: false

      },
      status:{
        type:Sequelize.ENUM("approved","pending","rejected"),
        defaultValue:"pending"
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      });
    },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bookings");
  },
};


