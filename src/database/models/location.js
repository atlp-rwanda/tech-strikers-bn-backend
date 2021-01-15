export default(sequelize, DataTypes) => {
  const Location= sequelize.define(
    "Location",
    {
      roomType: DataTypes.STRING,
      isRoomBooked: DataTypes.BOOLEAN,
      accommodationId: DataTypes.INTEGER
    },{}
  );
  Location.associate = models =>{
    Location.belongsTo(models.Accommodation, {
      as: "location",
      foreignKey: "locationId"
    });
  }

  return Location;
};
