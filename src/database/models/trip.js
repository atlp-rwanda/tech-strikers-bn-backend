export default (sequelize, DataTypes) => {
  const trips = sequelize.define("Trips", {
    originId: {
      type: DataTypes.INTEGER,
      references: { model: "Location", key: "id", onDelete: "CASCADE" },
    },
    destinationId: {
      type: DataTypes.INTEGER,
      references: { model: "Location", key: "id", onDelete: "CASCADE" },
    },
    tripRequestId: {
      type: DataTypes.INTEGER,
      references: { model: "TripRequests", key: "id", onDelete: "CASCADE" },
    }
  });
  trips.associate = models => {
    trips.belongsTo(models.TripRequest, { foreignKey: "tripRequestId" });
    trips.belongsTo(models.Location, { foreignKey: "originId" });
    trips.belongsTo(models.Location, { foreignKey: "destinationId" });
  };
  return trips;
};
