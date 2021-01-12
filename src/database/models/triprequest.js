export default (sequelize, DataTypes) => {
  const tripRequest = sequelize.define('TripRequest', 
  {
      tripType: DataTypes.STRING,
      departureDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      reason: DataTypes.STRING,
      userId: DataTypes.INTEGER
  },
  {});

  tripRequest.associate = models => {
      tripRequest.hasMany(models.Trips, { 
          foreignKey: "tripRequestId",
          onDelete: "cascade"
      })
  };
  tripRequest.associate = models => {
      tripRequest.belongsTo(models.Users, { 
          foreignKey: "userId"
      });
  };
  return tripRequest;  
};
