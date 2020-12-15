export default (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Location.associate = models => {
    Location.hasMany(models.Trips, {
      foreignKey: "originId",
    });
    Location.hasMany(models.Trips, { foreignKey: "destinationId" });
  };
  return Location;
};
