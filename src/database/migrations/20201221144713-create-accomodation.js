module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Accommodations", {
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
          as: 'user_id',
        },
      },
      name: {
        type: Sequelize.STRING,
      },

      address: {
        type: Sequelize.STRING,
      
      },
      amenities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      services: {
        type: Sequelize.STRING,
    
      },
      description: {
        type: Sequelize.STRING,
      },
      image:{
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      status: {
        type:Sequelize.ENUM({
          values: ["Pending", "Approved"]
        }),
        defaultValue:"Pending"
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
    await queryInterface.dropTable("Accommodations");
  },
};
