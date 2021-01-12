export default (sequelize, DataTypes) => {
  const Trips = sequelize.define("Trips", {
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
      references: { model: "TripRequests", onDelete: "CASCADE" }
    },
    accommodationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "CASCADE",
      references: {
        model: "Accommodations",
        key: "id",
      }
    }
  });
  Trips.associate = models => {
    Trips.belongsTo(models.Accommodations, { foreignKey: "accommodationId" });
    Trips.belongsTo(models.TripRequest, { foreignKey: "tripRequestId" });
    Trips.belongsTo(models.Location, { foreignKey: "originId" });
    Trips.belongsTo(models.Location, { foreignKey: "destinationId" });
  };
  return Trips;
};