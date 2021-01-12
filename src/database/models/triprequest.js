export default (sequelize, DataTypes) => {
    const tripRequest = sequelize.define('TripRequest', 
    {
        tripType: DataTypes.STRING,
        departureDate: DataTypes.DATE,
        returnDate: DataTypes.DATE,
        reason: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        status: DataTypes.STRING
    },
    {});
  
    tripRequest.associate = models => {
        tripRequest.hasMany(models.Trips, { 
          onDelete: "cascade",
          hooks:true,
          onUpdate: "cascade",
          foreignKey: {
              name: "tripRequestId",
              allowNull: false,
          }
        })
  
        tripRequest.belongsTo(models.Users, { 
          foreignKey: "userId"
      });
    };
  
    return tripRequest;  
  };

  