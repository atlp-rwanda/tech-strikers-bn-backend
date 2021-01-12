export default (sequelize, DataTypes) => {
  const location = sequelize.define('Location', 
  {
    city: DataTypes.STRING,
    country: DataTypes.STRING
  },
  {});
  location.associate = models => {
    location.hasMany(models.Trips, { 
      foreignKey: "originId"
    })
  }
  location.associate = models => {
    location.hasMany(models.Trips, { 
      foreignKey: "destinationId"
    })
  }
  return location;
};
