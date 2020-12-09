export default (sequelize, DataTypes) => {
  const Accommodations = sequelize.define(
    "Accommodations",
    {
      name: DataTypes.STRING,
      User_id: DataTypes.INTEGER,
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
      Accommodations.belongsTo(models.Users,{foreignKey:"user_id"})
      Accommodations.hasOne(models.Room,{foreignKey:"room_id"})
      Accommodations.hasOne(models.Booking,{foreignKey:"booking_id"})
      Accommodations.hasOne(models.Trips,{foreignKey:"trip_id"})

    }
    
  return Accommodations;
};