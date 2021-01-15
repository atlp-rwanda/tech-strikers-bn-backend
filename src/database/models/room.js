export default(sequelize, DataTypes) => {
  const Rooms = sequelize.define(
    "Rooms",
    {
    UserId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    roomType: DataTypes.STRING,
    roomNumber: DataTypes.STRING,
    price: DataTypes.STRING,
    isRoomBooked: DataTypes.BOOLEAN,
    facilities: DataTypes.STRING,
    },{}
  );
  Rooms.associate = models =>{
    Rooms.belongsTo(models.Accommodation, {
      foreignKey: "accommodationId",
    });
  }

  return Rooms;
};
