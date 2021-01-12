export default (sequelize, DataTypes) => {
  const trips = sequelize.define('Trips', 
  {
      originId: DataTypes.INTEGER,
      destinationId: DataTypes.INTEGER,
      tripRequestId: DataTypes.INTEGER
  },
  {});
  trips.associate = models => {
    trips.belongsTo(models.TripRequest, { 
      foreignKey: "tripRequestId"
    })
  }
  trips.associate = models => {
    trips.belongsTo(models.Location, { 
      foreignKey: "originId"
    })
  }
  trips.associate = models => {
    trips.belongsTo(models.Location, { 
      foreignKey: "destinationId"
    })
  }
  return trips;
};
