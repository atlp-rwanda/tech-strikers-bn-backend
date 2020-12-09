'use strict';

export default(sequelize,DataTypes)=>{
  const Booking=sequelize.define("Booking",{
    checkin:{
      type:DataTypes.DATE,
      allowNull:false
    },
    checkout:{
      type:DataTypes.DATE,
      allowNull:false
    }
  },{})
  Booking.associate=models=>{
    Booking.belongsTo(models.Users,{foreignKey:"user_id"})
    Booking.belongsTo(models.Accommodations,{foreignKey:"accomodation_id"})
    Booking.belongsTo(models.Room,{foreignKey:"room_id"})
    Booking.belongsTo(models.TripRequests,{foreignKey:"tripRequest_id"})
  }

  return Booking;
}

