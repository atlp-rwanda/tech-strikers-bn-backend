export default (sequelize, DataTypes) => {
  const TripRequests = sequelize.define(
    "TripRequests",
    {
      departureDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      reason: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TripRequests",
    }
  );
  TripRequests.associate = (models) => {
    TripRequests.BelongsTo(models.Users, { foreignKey: "userId" });
  };
  TripRequests.associate = (models) => {
    TripRequests.hasOne(models.Trips, {
      foreignKey: "id",
    });
  };
  return TripRequests;
};