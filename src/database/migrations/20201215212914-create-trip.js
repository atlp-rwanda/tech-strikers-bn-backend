
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Trips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      originId: {
        type: Sequelize.INTEGER,
      },
      destinationId: {
        type: Sequelize.INTEGER,
      },
      accomodationId: Sequelize.INTEGER,
      tripRequestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("Trips");
  },
};
