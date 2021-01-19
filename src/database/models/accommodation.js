export default(sequelize, DataTypes) => {
  const Accommodation = sequelize.define(
    "Accommodation",
    {
      accommodationType: DataTypes.STRING,
      accommodationName: DataTypes.STRING,
      description: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      location: DataTypes.STRING,
      facilities: DataTypes.STRING
    },{}
  );
  Accommodation.associate = models =>{
   Accommodation.hasMany(models.Rooms, {
    foreignKey: "accommodationId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
   });
  }
  return Accommodation;
};
