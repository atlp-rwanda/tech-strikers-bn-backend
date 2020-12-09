'use strict';
  
export default (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    "Locations",
    {
      city: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {}
  );
  Locations.associate = (models) => {
    Locations.hasOne(models.Trips, {
      foreignKey: "originId",
    });
  };
  Locations.associate = (models) => {
    Locations.hasOne(models.Trips, {
      foreignKey: "destinationId",
    });
  };
  return Locations;
};