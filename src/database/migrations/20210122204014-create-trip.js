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
        references: { model: 'Locations', key: 'id' }

      },
      destinationId: {
        type: Sequelize.INTEGER,
        references: { model: 'Locations', key: 'id' }
      },
      tripRequestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'TripRequests', key: 'id' },
        onDelete: "cascade",
        hooks:true,
        onUpdate: "cascade",
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
