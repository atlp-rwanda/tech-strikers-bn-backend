export default (sequelize, DataTypes) => {
  const Trips = sequelize.define("Trips", {
    originId: {
      type: DataTypes.INTEGER,
      references: { model: "Locations", key: "id", onDelete: "CASCADE" },
    },
    destinationId: {
      type: DataTypes.INTEGER,
      references: { model: "Locations", key: "id", onDelete: "CASCADE" },
    },
    tripRequest_id: {
      type: DataTypes.INTEGER,
      references: { model: "TripRequests", onDelete: "CASCADE" }
    },
    accommodation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
     
      references: {
        model: "Accommodations",
        key: "id",
        onDelete: "CASCADE",
      }
    }
  });
  Trips.associate = models => {
    Trips.belongsTo(models.Accommodations, { foreignKey: "accommodation_id" });
    Trips.belongsTo(models.TripRequests, { foreignKey: "tripRequest_id" });
    Trips.belongsTo(models.Locations, { foreignKey: "originId" });
    Trips.belongsTo(models.Locations, { foreignKey: "destinationId" });
  };
  return Trips;
};