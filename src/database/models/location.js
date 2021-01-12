'use strict';
  
export default (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      townName: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {}
  );
  Location.associate = (models) => {
    Locations.hasOne(models.Trips, {
      foreignKey: "originId",
    });
  };
  Location.associate = (models) => {
    Location.hasOne(models.Trips, {
      foreignKey: "destinationId",
    });
  };
  return Location;
};