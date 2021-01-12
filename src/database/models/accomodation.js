export default (sequelize, DataTypes) => {
  const Accommodations = sequelize.define(
    "Accommodations",
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      locationId: { type: DataTypes.INTEGER,
        references: { model: "Location", key: "id", onDelete: "CASCADE" }
      },
      address: DataTypes.STRING,
      amenities:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false
      },
      services:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false
      },
      description: DataTypes.STRING,
      image:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false
      },
      status: {type:DataTypes.ENUM({
        values: ["Pending", "Approved"]
      }),defaultValue:"Pending"},
    },
    {});
    Accommodations.associate=models=>{
      Accommodations.belongsTo(models.Users,{foreignKey:"userId"})
      Accommodations.belongsTo(models.Location, { foreignKey: "locationId" });

    }
    
  return Accommodations;
};