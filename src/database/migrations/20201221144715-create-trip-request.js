module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TripRequests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "userId"
        }
      },
      tripType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      departureDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      returnDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      reason: {
        type: Sequelize.STRING
      },
      isApproved: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pending"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TripRequests");
  }
};