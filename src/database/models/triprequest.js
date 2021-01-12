export default (sequelize, DataTypes) => {
  const tripRequest = sequelize.define(
    "TripRequest",
    {
      id: {
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "userId",
        },
      },
      tripType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      departureDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      returnDate: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "reason is not allowed to be empty"
          }
        }
      },
      isApproved: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
        validate: {
          isIn: {
            args: [["Pending", "Approved", "Rejected"]],
            msg: "Invalid Status, uses Pending, Approved or Rejected only"
          }
        }
      }
    },
    {}
  );
  tripRequest.associate = models => {
    tripRequest.hasMany(models.Trips, { foreignKey: "tripRequestId" });
    tripRequest.belongsTo(models.Users, { foreignKey: "userId" });
  };
  return tripRequest;
};
