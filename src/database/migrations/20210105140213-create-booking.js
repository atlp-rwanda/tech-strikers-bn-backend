
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
        accommodation_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'Accommodations',
            key: 'id',
          },
          room_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
              model: 'Room',
              key: 'id',
            },

            tripRequest_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              onDelete: 'CASCADE',
              references: {
                model: 'TripRequests',
                key: 'id'
              },
            },
          },

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
  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bookings");
  },
};


